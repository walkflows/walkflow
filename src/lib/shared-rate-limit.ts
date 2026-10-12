import net from "node:net";

/**
 * Rate limiting that holds across instances and restarts.
 *
 * Two interchangeable backends, chosen by environment:
 *  1. REDIS_URL (self-hosted: redis://:password@redis:6379, a private Redis on
 *     the same Docker network, never published). Spoken over the plain Redis
 *     protocol with node:net, so no extra dependency.
 *  2. A Redis REST store (Upstash: UPSTASH_REDIS_REST_URL + _TOKEN, or the
 *     KV_REST_API_URL + KV_REST_API_TOKEN aliases) for serverless hosting.
 * When neither is configured, or the store is unreachable/slow, the call
 * returns "unavailable" and the caller falls back to its in-memory limiter:
 * a single self-hosted process then still enforces the same limits, and no
 * request is ever rejected merely because the store is down.
 * Only an IP-based key and a counter are stored; no form content ever leaves
 * this process.
 */
export type RateLimitResult = "limited" | "allowed" | "unavailable";

const TIMEOUT_MS = 1500;
// Failure handling: after one failed attempt the store is skipped for RETRY_AFTER_MS (so a dead store costs
// one slow request, not one per visitor), then the next request tries it again. Recovery is automatic and
// needs no restart. The first failure and the recovery are each logged once (no request data in the line).
const RETRY_AFTER_MS = 10_000;
let storeDownUntil = 0;
let storeMarkedDown = false;
const markDown = () => {
  storeDownUntil = Date.now() + RETRY_AFTER_MS;
  if (!storeMarkedDown) {
    storeMarkedDown = true;
    console.warn("[rate-limit] shared store unavailable; using the weaker in-memory limiter until it recovers");
  }
};
const markUp = () => {
  storeDownUntil = 0;
  if (storeMarkedDown) {
    storeMarkedDown = false;
    console.info("[rate-limit] shared store recovered; shared limits active again");
  }
};

function restStore(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  // http:// only for the local mock used by scripts/test-security.mjs.
  const usable = !!url && (/^https:\/\//.test(url) || (process.env.ENQUIRY_TEST_RECEIVER === "1" && /^http:\/\/127\.0\.0\.1(:\d+)?\//.test(url)));
  return url && token && usable ? { url: url.replace(/\/$/, ""), token } : null;
}

function redisTarget(): { host: string; port: number; password: string } | null {
  const raw = process.env.REDIS_URL;
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "redis:") return null;
    return { host: u.hostname, port: Number(u.port) || 6379, password: decodeURIComponent(u.password) };
  } catch {
    return null;
  }
}

export const sharedLimiterConfigured = (): boolean => redisTarget() !== null || restStore() !== null;

const command = (...parts: string[]) => `*${parts.length}\r\n${parts.map((p) => `$${Buffer.byteLength(p)}\r\n${p}\r\n`).join("")}`;

/** One short-lived connection: [AUTH] INCR key, EXPIRE key ttl NX. Resolves the INCR result. */
function redisIncr(t: { host: string; port: number; password: string }, key: string, windowSeconds: number): Promise<number | null> {
  return new Promise((resolve) => {
    const replies: string[] = [];
    let buf = "";
    let settled = false;
    const done = (v: number | null) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(v);
    };
    const socket = net.connect({ host: t.host, port: t.port });
    socket.setTimeout(TIMEOUT_MS, () => done(null));
    socket.on("error", () => done(null));
    // A server that closes the connection without an error (restart, auth failure, overload) must not leave the request hanging.
    socket.on("close", () => done(null));
    socket.on("end", () => done(null));
    const expected = t.password ? 3 : 2;
    socket.on("connect", () => {
      const auth = t.password ? command("AUTH", t.password) : "";
      socket.write(auth + command("INCR", key) + command("EXPIRE", key, String(windowSeconds), "NX"));
    });
    socket.on("data", (chunk) => {
      buf += chunk.toString("utf8");
      let i: number;
      while ((i = buf.indexOf("\r\n")) !== -1) {
        replies.push(buf.slice(0, i));
        buf = buf.slice(i + 2);
      }
      if (replies.length >= expected) {
        const offset = t.password ? 1 : 0;
        if (t.password && replies[0] !== "+OK") return done(null);
        const incr = replies[offset];
        done(incr && incr.startsWith(":") ? Number(incr.slice(1)) : null);
      }
    });
  });
}

/** Fixed-window counter: INCR the key, set its expiry on first hit. */
export async function sharedRateLimit(bucket: string, key: string, max: number, windowSeconds: number): Promise<RateLimitResult> {
  const redisKey = `walkflow:rl:${bucket}:${key}`;

  const target = redisTarget();
  if (target) {
    if (Date.now() < storeDownUntil) return "unavailable";
    const count = await redisIncr(target, redisKey, windowSeconds);
    if (count === null || !Number.isFinite(count)) {
      markDown();
      return "unavailable";
    }
    markUp();
    return count > max ? "limited" : "allowed";
  }

  const s = restStore();
  if (!s) return "unavailable";
  try {
    const res = await fetch(`${s.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${s.token}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", redisKey], ["EXPIRE", redisKey, String(windowSeconds), "NX"]]),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return "unavailable";
    const data = (await res.json()) as { result?: unknown }[];
    const count = Number(data?.[0]?.result);
    if (!Number.isFinite(count)) return "unavailable";
    return count > max ? "limited" : "allowed";
  } catch {
    return "unavailable";
  }
}
