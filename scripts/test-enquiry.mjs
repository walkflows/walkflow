// End-to-end test of the contact form's server route against a LOCAL stand-in for n8n.
// Nothing is sent to n8n, Google Sheets or Gmail.
//
//   npm run build
//   node scripts/test-enquiry.mjs
//
// Starts a fake n8n receiver on 127.0.0.1:4599 and `next start` on port 3100 pointed at it,
// then checks validation, duplicate retries, busy/failed saves, timeouts, the secret header,
// rate limiting and that no secret or form content leaks back to the browser.
import { createServer } from "node:http";
import { spawn } from "node:child_process";

const SECRET = "local-test-secret-not-real";
const SITE = "http://127.0.0.1:3100";
const saved = new Map();
const seen = [];

const receiver = createServer((req, res) => {
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    const body = JSON.parse(raw || "{}");
    seen.push({ headers: req.headers, body });
    const send = (status, json) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(json));
    };
    if (req.headers["x-walkflow-secret"] !== SECRET) return send(403, { message: "Authorization data is wrong!" });
    const id = String(body.submissionId);
    if (id.includes("hang")) return; // never answers -> timeout
    if (id.includes("busy")) return send(503, { success: false, error: { code: "BUSY", message: "x" } });
    if (id.includes("fail")) return send(500, { success: false, error: { code: "ENQUIRY_NOT_SAVED", message: "x" } });
    if (id.includes("gateway")) return send(502, { message: "Bad gateway" });
    if (id.includes("badphone")) return send(400, { success: false, error: { code: "INVALID_ENQUIRY", details: [{ field: "whatsappNumber", message: "Please enter a WhatsApp number starting with + and your country code." }] } });
    if (saved.has(id)) return send(200, { success: true, duplicate: true, message: "Your enquiry was already received." });
    saved.set(id, body);
    return send(200, { success: true, message: "Your enquiry has been received." });
  });
});
await new Promise((r) => receiver.listen(4599, "127.0.0.1", r));

const next = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3100", "-H", "127.0.0.1"], {
  env: { ...process.env, N8N_ENQUIRY_WEBHOOK_URL: "http://127.0.0.1:4599/webhook/walkflow-business/enquiry", N8N_ENQUIRY_SECRET: SECRET, N8N_ENQUIRY_TIMEOUT_MS: "2000", ENQUIRY_TEST_RECEIVER: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
next.stdout.on("data", (d) => (serverLog += d));
next.stderr.on("data", (d) => (serverLog += d));
for (let i = 0; i < 60; i++) {
  try {
    await fetch(SITE + "/api/enquiry", { method: "GET" });
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}

let pass = 0, fail = 0;
const check = (what, ok, detail) => {
  if (ok) pass++;
  else fail++;
  console.log((ok ? "PASS " : "FAIL ") + what + (ok ? "" : "  — " + JSON.stringify(detail)));
};
let ip = 1;
const post = async (body, opts = {}) => {
  const res = await fetch(SITE + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": opts.ip || "10.0.0." + ip++ }, body: typeof body === "string" ? body : JSON.stringify(body) });
  const text = await res.text();
  let json = {};
  try { json = JSON.parse(text); } catch { json = {}; }
  return { status: res.status, json, text };
};
const base = (id, extra = {}) => ({ submissionId: "web-" + id + "-0123456789abcdef", name: "TEST Person", email: "epagedesignstudio@gmail.com", company: "TEST Co", role: "", website: "", service: "web-design", industry: "clinics", timing: "asap", message: "TEST message", method: "email", ...extra });

let r = await post(base("ok1"));
check("Valid enquiry: 200 only after the receiver confirms the save", r.status === 200 && r.json.ok === true && r.json.duplicate === false && saved.has(base("ok1").submissionId), r);
check("Secret sent only server-side as X-WalkFlow-Secret, never returned to the browser", seen.at(-1).headers["x-walkflow-secret"] === SECRET && !r.text.includes(SECRET));
r = await post(base("ok1"));
check("Retry with the same submission reference: success, marked duplicate, saved once", r.status === 200 && r.json.duplicate === true && [...saved.keys()].filter((k) => k === base("ok1").submissionId).length === 1, r);
r = await post(base("ok2", { email: "epagedesignstudio@gmail.com" }));
check("New submission from the same email is a new enquiry", r.status === 200 && r.json.duplicate === false && saved.size === 2, r);
r = await post(base("other", { industry: "other", otherIndustry: "Logistics" }));
check("Other Industry is forwarded when industry is Other", r.status === 200 && seen.at(-1).body.otherIndustry === "Logistics", seen.at(-1).body);
r = await post(base("other2", { industry: "other" }));
check("Industry Other without a name: 400 field error, nothing forwarded", r.status === 400 && r.json.fieldErrors?.otherIndustry && seen.at(-1).body.submissionId !== base("other2").submissionId, r.json);
r = await post(base("oi", { otherIndustry: "Logistics" }));
check("Other Industry with a normal industry: rejected", r.status === 400 && r.json.fieldErrors?.otherIndustry, r.json);
r = await post(base("wa1", { method: "whatsapp", whatsappNumber: "+234 803 123 4567" }));
check("WhatsApp with + and country code: accepted", r.status === 200, r);
r = await post(base("wa2", { method: "whatsapp", whatsappNumber: "0803 123 4567" }));
check("WhatsApp without +: field error", r.status === 400 && /\+/.test(r.json.fieldErrors?.whatsappNumber || ""), r.json);
r = await post(base("wa3", { method: "whatsapp" }));
check("WhatsApp chosen but no number: field error", r.status === 400 && r.json.fieldErrors?.whatsappNumber, r.json);
r = await post(base("wa4", { whatsappNumber: "+234 803 123 4567" }));
check("Email method with a stray WhatsApp number: rejected", r.status === 400 && r.json.fieldErrors?.whatsappNumber, r.json);
r = await post(base("blank", { role: "", website: "" }));
check("Optional fields left blank: accepted", r.status === 200, r);
r = await post(base("bad", { email: "not-an-email", name: "", service: "pizza" }));
check("Invalid email, missing name, unknown service: field errors, nothing forwarded", r.status === 400 && r.json.fieldErrors?.email && r.json.fieldErrors?.name && r.json.fieldErrors?.service, r.json);
r = await post({ ...base("extra"), admin: true });
check("Unexpected fields are rejected", r.status === 400, r.json);
r = await post(base("hp", { hpField: "http://spam" }));
check("Honeypot filled: rejected, nothing forwarded", r.status === 400 && !seen.some((s) => s.body.submissionId === base("hp").submissionId), r);
r = await post("{not json");
check("Broken JSON: 400", r.status === 400);
r = await post(JSON.stringify(base("big", { message: "x".repeat(9000) })));
check("Oversized body: 413", r.status === 413, r.status);
r = await post(base("long", { message: "x".repeat(2001) }));
check("Message over 2000 characters: field error", r.status === 400 && r.json.fieldErrors?.message, r.json);
r = await post(base("busy"));
check("n8n busy: 503 not_saved (honest failure, retry allowed)", r.status === 503 && r.json.code === "not_saved", r);
r = await post(base("fail"));
check("n8n could not save: 503 not_saved", r.status === 503 && r.json.code === "not_saved", r);
r = await post(base("gateway"));
check("Unexpected gateway error: 504 uncertain (never success)", r.status === 504 && r.json.code === "uncertain", r);
r = await post(base("hang"));
check("n8n does not answer in time: 504 uncertain (never success)", r.status === 504 && r.json.code === "uncertain", r);
r = await post(base("badphone", { method: "whatsapp", whatsappNumber: "+1 (555) 000-0000" }));
check("n8n rejects a field: 400 with that field's error", r.status === 400 && r.json.fieldErrors?.whatsappNumber, r.json);
const one = "10.9.9.9";
const results = [];
for (let i = 0; i < 6; i++) results.push((await post(base("rate" + i), { ip: one })).status);
check("Rate limit: 6th new submission from one visitor within 10 minutes is refused (429)", results.slice(0, 5).every((s) => s === 200) && results[5] === 429, results);
r = await post(base("rate0"), { ip: one });
check("…but a retry of an earlier submission from that visitor still goes through", r.status === 200 && r.json.duplicate === true, r);
check("No form contents or secrets in the server log", !serverLog.includes("TEST message") && !serverLog.includes(SECRET) && !serverLog.includes("epagedesignstudio"), serverLog.slice(-500));

next.kill();
receiver.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
