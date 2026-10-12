// Security regression test for the production build, using ONLY local stand-ins:
// a fake Upstash-style counter store and no n8n at all (N8N_* unset), so nothing
// real is contacted and nothing is emailed or saved.
//
//   npm run build
//   node scripts/test-security.mjs
//
// Run A (not on Vercel): security headers, spoofed x-forwarded-for is ignored,
//   chat validation, method handling, demo stubs.
// Run B (VERCEL=1): the trusted Vercel header is used and the shared store decides
//   the limit; if the store is down the in-memory limiter still applies.
import { createServer } from "node:http";
import { spawn } from "node:child_process";

let pass = 0, fail = 0;
const check = (what, ok, detail) => {
  if (ok) pass++; else fail++;
  console.log(`${ok ? "PASS" : "FAIL"} ${what}${ok ? "" : "  -> " + JSON.stringify(detail)}`);
};

const storeCalls = [];
let storeMode = "ok"; // ok | down | blocked
const store = createServer((req, res) => {
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    storeCalls.push({ auth: req.headers.authorization, body: raw });
    if (storeMode === "down") { res.writeHead(500); return res.end("{}"); }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ result: storeMode === "blocked" ? 999 : 1 }, { result: 1 }]));
  });
});
await new Promise((r) => store.listen(4598, "127.0.0.1", r));

async function start(port, extraEnv) {
  const env = { ...process.env, ...extraEnv };
  delete env.N8N_ENQUIRY_WEBHOOK_URL; delete env.N8N_ENQUIRY_SECRET;
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], { env, stdio: "ignore" });
  const site = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 80; i++) {
    try { await fetch(site + "/robots.txt"); break; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  return { child, site };
}
const chat = (site, message, headers = {}) =>
  fetch(site + "/api/chat", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: typeof message === "string" && message.startsWith("RAW:") ? message.slice(4) : JSON.stringify({ message }) });

// ---------- Run A ----------
{
  const { child, site } = await start(3101, { VERCEL: "", ENQUIRY_TEST_RECEIVER: "" });
  for (const path of ["/", "/contact", "/api/chat", "/does-not-exist"]) {
    const r = await fetch(site + path, { method: path === "/api/chat" ? "POST" : "GET", headers: { "Content-Type": "application/json" }, body: path === "/api/chat" ? "{}" : undefined });
    const h = r.headers;
    const csp = h.get("content-security-policy") || "";
    check(`Headers on ${path} (status ${r.status})`,
      h.get("x-content-type-options") === "nosniff" && h.get("x-frame-options") === "DENY" && !!h.get("referrer-policy") && !!h.get("permissions-policy") && !!h.get("strict-transport-security") &&
      csp.includes("default-src 'self'") && csp.includes("frame-ancestors 'none'") && csp.includes("object-src 'none'") && !csp.includes("unsafe-eval"),
      Object.fromEntries(h.entries()));
  }
  let r = await fetch(site + "/");
  const html = await r.text();
  check("Homepage renders (200) and has no third-party script/iframe tags", r.status === 200 && !/<script[^>]+src="https?:\/\//.test(html) && !/<iframe/.test(html));
  check("404 for unknown URL", (await fetch(site + "/nope")).status === 404);
  check("GET /api/enquiry is refused (405)", (await fetch(site + "/api/enquiry")).status === 405);
  r = await fetch(site + "/api/demo/real-estate", { method: "POST" });
  check("Demo stub returns 501, no side effects", r.status === 501);

  r = await chat(site, "What services do you offer?");
  check("Chat: valid question answered (200)", r.status === 200 && !!(await r.json()).reply);
  check("Chat: empty message rejected (400)", (await chat(site, "   ")).status === 400);
  check("Chat: extra field rejected (400)", (await chat(site, 'RAW:{"message":"hi","role":"admin"}')).status === 400);
  check("Chat: broken JSON rejected (400)", (await chat(site, "RAW:{nope")).status === 400);
  check("Chat: oversized body rejected (413)", (await chat(site, "RAW:" + JSON.stringify({ message: "a".repeat(3000) }))).status === 413);
  // Oversized bodies: the app itself answers 413 (never a proxy-style 502), with or without Content-Length.
  const big = (n) => JSON.stringify({ message: "a".repeat(n) });
  let rr = await fetch(site + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: "x".repeat(20000) });
  check("Enquiry: 20 KB body with Content-Length -> 413", rr.status === 413, rr.status);
  rr = await fetch(site + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: new ReadableStream({ start(c) { for (let i = 0; i < 12; i++) c.enqueue(new TextEncoder().encode("y".repeat(1000))); c.close(); } }), duplex: "half" });
  check("Enquiry: 12 KB chunked body (no Content-Length) -> 413", rr.status === 413, rr.status);
  rr = await fetch(site + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: "x".repeat(5_000_000) });
  check("Enquiry: 5 MB body -> 413 without buffering it all", rr.status === 413, rr.status);
  rr = await fetch(site + "/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: new ReadableStream({ start(c) { for (let i = 0; i < 3; i++) c.enqueue(new TextEncoder().encode("z".repeat(1000))); c.close(); } }), duplex: "half" });
  check("Chat: 3 KB chunked body (no Content-Length) -> 413", rr.status === 413, rr.status);
  void big;
  check("Chat: over-length message rejected (400)", (await chat(site, "a".repeat(600))).status === 400);
  // Spoofed x-forwarded-for must NOT give each request its own bucket.
  const statuses = [];
  for (let i = 0; i < 25; i++) statuses.push((await chat(site, "hello", { "x-forwarded-for": `203.0.113.${i + 1}` })).status);
  check("Spoofed x-forwarded-for does not bypass the limit (429 reached)", statuses.includes(429), statuses);
  child.kill();
}

// ---------- Run B ----------
{
  const { child, site } = await start(3102, { VERCEL: "1", ENQUIRY_TEST_RECEIVER: "1", UPSTASH_REDIS_REST_URL: "http://127.0.0.1:4598/", UPSTASH_REDIS_REST_TOKEN: "mock-token" });
  storeCalls.length = 0;
  let r = await chat(site, "hello", { "x-vercel-forwarded-for": "198.51.100.7" });
  check("Shared store consulted with bearer token and a per-client key (200 while under limit)",
    r.status === 200 && storeCalls.length === 1 && storeCalls[0].auth === "Bearer mock-token" && storeCalls[0].body.includes("walkflow:rl:chat:198.51.100.7"), storeCalls);
  check("Nothing but the counter key goes to the store (no message text)", !storeCalls[0].body.includes("hello"));
  storeMode = "blocked";
  r = await chat(site, "hello", { "x-vercel-forwarded-for": "198.51.100.8" });
  check("Store says over the limit -> 429 even on a fresh instance bucket", r.status === 429, r.status);
  const enq = await fetch(site + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json", "x-vercel-forwarded-for": "198.51.100.9" }, body: JSON.stringify({ submissionId: "synthetic-limit-test-0001", name: "Test", email: "t@example.com", company: "X", service: "web-design", industry: "other", otherIndustry: "Test", timing: "asap", message: "synthetic", method: "email" }) });
  check("Enquiry: store says over the limit -> 429, nothing forwarded", enq.status === 429, enq.status);
  storeMode = "down";
  r = await chat(site, "hello", { "x-vercel-forwarded-for": "198.51.100.10" });
  check("Store down -> falls back to in-memory limiter (still answers, no crash)", r.status === 200, r.status);
  const downStatuses = [];
  for (let i = 0; i < 25; i++) downStatuses.push((await chat(site, "hello", { "x-vercel-forwarded-for": "198.51.100.11" })).status);
  check("Store down -> in-memory limit still applies (429 reached)", downStatuses.includes(429), downStatuses);
  child.kill();
}
store.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
