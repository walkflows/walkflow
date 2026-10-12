/**
 * Rate limiting that holds across serverless instances.
 *
 * When a Redis REST store is configured (Upstash, e.g. via the Vercel
 * Marketplace: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or the
 * KV_REST_API_URL + KV_REST_API_TOKEN aliases) counters are kept there, so the
 * limit is real for the whole deployment. When it is not configured, or the
 * store is unreachable, callers fall back to their per-instance in-memory
 * limiter (best effort only). Nothing about the visitor except a hashed-free
 * IP key and counters is stored; no form content ever leaves this process.
 */
export type RateLimitResult = "limited" | "allowed" | "unavailable";

function store(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  // http:// only for the local mock used by scripts/test-security.mjs.
  const usable = !!url && (/^https:\/\//.test(url) || (process.env.ENQUIRY_TEST_RECEIVER === "1" && /^http:\/\/127\.0\.0\.1(:\d+)?\//.test(url)));
  return url && token && usable ? { url: url.replace(/\/$/, ""), token } : null;
}

export const sharedLimiterConfigured = (): boolean => store() !== null;

/** Fixed-window counter: INCR the key, set its expiry on first hit. */
export async function sharedRateLimit(bucket: string, key: string, max: number, windowSeconds: number): Promise<RateLimitResult> {
  const s = store();
  if (!s) return "unavailable";
  const redisKey = `walkflow:rl:${bucket}:${key}`;
  try {
    const res = await fetch(`${s.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${s.token}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", redisKey], ["EXPIRE", redisKey, String(windowSeconds), "NX"]]),
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
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
