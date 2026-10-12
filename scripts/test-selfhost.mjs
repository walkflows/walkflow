// Tests the self-hosted rate limiting and client-IP trust against a production build, using ONLY a
// local fake Redis (RESP) server. N8N_* is unset, so valid enquiries stop at "not configured":
// nothing is saved, sent or emailed.
//
//   npm run build        (any build; BUILD_STANDALONE is not required)
//   node scripts/test-selfhost.mjs
import net from "node:net";
import { spawn } from "node:child_process";

let pass = 0, fail = 0;
const check = (what, ok, detail) => { ok ? pass++ : fail++; console.log(`${ok ? "PASS" : "FAIL"} ${what}${ok ? "" : "  -> " + JSON.stringify(detail)}`); };

// ---- fake Redis: AUTH, INCR, EXPIRE (NX) with real TTL bookkeeping ----
const PASSWORD = "test-redis-password";
const store = new Map(); // key -> {n, exp}
const keysSeen = [];
let redisUp = true;
function parseCommands(buf) {
  const cmds = []; let i = 0;
  while (i < buf.length && buf[i] === "*") {
    let e = buf.indexOf("\r\n", i); const n = Number(buf.slice(i + 1, e)); i = e + 2; const parts = [];
    for (let k = 0; k < n; k++) { e = buf.indexOf("\r\n", i); const len = Number(buf.slice(i + 1, e)); i = e + 2; parts.push(buf.slice(i, i + len)); i += len + 2; }
    cmds.push(parts);
  }
  return cmds;
}
const redis = net.createServer((sock) => {
  let authed = false;
  sock.on("data", (d) => {
    if (!redisUp) return sock.destroy();
    for (const c of parseCommands(d.toString("utf8"))) {
      const op = c[0].toUpperCase();
      if (op === "AUTH") { authed = c[1] === PASSWORD; sock.write(authed ? "+OK\r\n" : "-ERR invalid password\r\n"); continue; }
      if (!authed) { sock.write("-NOAUTH Authentication required.\r\n"); continue; }
      if (op === "INCR") { const e = store.get(c[1]); const live = e && e.exp > Date.now() ? e : { n: 0, exp: Infinity }; live.n++; store.set(c[1], live); keysSeen.push(c[1]); sock.write(`:${live.n}\r\n`); }
      else if (op === "EXPIRE") { const e = store.get(c[1]); const nx = c[3]?.toUpperCase() === "NX"; if (e && (!nx || e.exp === Infinity)) { e.exp = Date.now() + Number(c[2]) * 1000; sock.write(":1\r\n"); } else sock.write(":0\r\n"); }
      else sock.write("-ERR unknown\r\n");
    }
  });
  sock.on("error", () => {});
});
await new Promise((r) => redis.listen(4597, "127.0.0.1", r));

async function start(port, env) {
  const e = { ...process.env, ...env };
  for (const k of ["N8N_ENQUIRY_WEBHOOK_URL", "N8N_ENQUIRY_SECRET", "VERCEL", "ENQUIRY_TEST_RECEIVER", "UPSTASH_REDIS_REST_URL", "KV_REST_API_URL"]) delete e[k];
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], { env: e, stdio: "ignore" });
  const site = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 80; i++) { try { await fetch(site + "/robots.txt"); break; } catch { await new Promise((r) => setTimeout(r, 500)); } }
  return { child, site };
}
const chat = (site, headers) => fetch(site + "/api/chat", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify({ message: "hello" }) }).then((r) => r.status);
const enquiry = (site, n, headers) => fetch(site + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify({ submissionId: `synthetic-selfhost-${n}-abcdefgh`, name: "Synthetic", email: "s@example.com", company: "C", service: "web-design", industry: "clinics", timing: "asap", message: "synthetic", method: "email" }) }).then((r) => r.status);
const ENV = { CLIENT_IP_HEADER: "x-wf-client-ip", REDIS_URL: `redis://:${PASSWORD}@127.0.0.1:4597` };

// ---- Run 1: Redis backend, trusted proxy header ----
let { child, site } = await start(3111, ENV);
let s = [];
for (let i = 0; i < 22; i++) s.push(await chat(site, { "x-wf-client-ip": "203.0.113.10", "x-forwarded-for": `198.51.100.${i}`, "x-real-ip": `198.51.100.${i}` }));
check("Chat: 20 allowed, then 429, even though x-forwarded-for / x-real-ip were forged on every request", s.slice(0, 20).every((x) => x === 200) && s[20] === 429 && s[21] === 429, s);
check("Chat: a different trusted client address has its own bucket", (await chat(site, { "x-wf-client-ip": "203.0.113.11" })) === 200);
check("Counters live in Redis under the trusted address (not the forged ones)", keysSeen.some((k) => k === "walkflow:rl:chat:203.0.113.10") && !keysSeen.some((k) => k.includes("198.51.100")), [...new Set(keysSeen)]);
check("Missing proxy header -> one shared 'unverified' bucket, forged x-forwarded-for ignored", await (async () => { await chat(site, { "x-forwarded-for": "192.0.2.1" }); await chat(site, { "x-forwarded-for": "192.0.2.2" }); return keysSeen.includes("walkflow:rl:chat:unverified") && !keysSeen.some((k) => k.includes("192.0.2.")); })());
check("A malformed proxy header value is not trusted", await (async () => { await chat(site, { "x-wf-client-ip": "not an ip; drop table" }); return !keysSeen.some((k) => k.includes("drop")); })());
s = []; for (let n = 1; n <= 7; n++) s.push(await enquiry(site, n, { "x-wf-client-ip": "203.0.113.20" }));
check("Enquiry: 5 requests pass the limiter (503 not configured, nothing sent), 6th and 7th -> 429", s.slice(0, 5).every((x) => x === 503) && s[5] === 429 && s[6] === 429, s);
child.kill();

// ---- Run 2: restart, counters persist in Redis ----
({ child, site } = await start(3112, ENV));
check("After an app restart the same client is still limited (state is in Redis)", (await enquiry(site, 99, { "x-wf-client-ip": "203.0.113.20" })) === 429);
check("...and a new client is not", (await enquiry(site, 100, { "x-wf-client-ip": "203.0.113.21" })) === 503);
child.kill();

// ---- Run 3: Redis down -> safe in-memory fallback, nothing breaks ----
redisUp = false;
({ child, site } = await start(3113, ENV));
s = []; for (let i = 0; i < 22; i++) s.push(await chat(site, { "x-wf-client-ip": "203.0.113.30" }));
check("Redis down: requests still answered (no outage) and the in-memory limit still applies (429 after 20)", s.slice(0, 20).every((x) => x === 200) && s[20] === 429, s);
child.kill();

// ---- Run 4: wrong password -> treated as unavailable, fallback ----
redisUp = true;
({ child, site } = await start(3114, { ...ENV, REDIS_URL: "redis://:wrong@127.0.0.1:4597" }));
check("Wrong Redis password: falls back to in-memory (still answers)", (await chat(site, { "x-wf-client-ip": "203.0.113.40" })) === 200);
child.kill();

redis.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
