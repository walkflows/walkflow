/**
 * Server side of the enquiry form: validates a submission, then forwards it
 * to the WALKFLOW BUSINESS n8n workflow ("Receive Website Enquiry"), which
 * saves it to Google Sheets BEFORE answering. Success is only reported when
 * n8n confirms the save (or that the same submission was saved earlier).
 *
 * The rules below mirror n8n's own check (automation repo:
 * WALKFLOW/code/sheets/checkEnquiry.js) so visitors get field errors here
 * instead of a round trip; n8n re-checks everything anyway.
 *
 * Secrets: N8N_ENQUIRY_SECRET is sent only from this server as the
 * X-WalkFlow-Secret header. It is never exposed to the browser, never
 * logged, and must never be a NEXT_PUBLIC_ variable.
 */

export const ENQUIRY_FIELDS = [
  "submissionId",
  "name",
  "email",
  "company",
  "role",
  "website",
  "service",
  "industry",
  "otherIndustry",
  "timing",
  "message",
  "method",
  "whatsappNumber",
  "hpField",
] as const;

type Field = (typeof ENQUIRY_FIELDS)[number];
export type FieldErrors = Partial<Record<Field, string>>;
export type CleanEnquiry = Partial<Record<Exclude<Field, "hpField">, string>>;

const SERVICES = ["business-automation-crm", "email-marketing", "web-design", "mobile-app-development", "all", "not-sure-yet"];
const INDUSTRIES = ["real-estate", "home-services", "clinics", "consulting-firm", "other"];
const TIMINGS = ["asap", "within-1-month", "within-3-months", "just-exploring"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+[0-9\s().-]{6,23}$/;
const SUBMISSION_RE = /^[A-Za-z0-9_-]{16,64}$/;
// Control characters (newlines/tabs allowed only in the message).
const hasControl = (s: string, allowNewlines: boolean) =>
  Array.from(s).some((ch) => {
    const c = ch.charCodeAt(0);
    return c === 127 || (c < 32 && !(allowNewlines && (c === 9 || c === 10 || c === 13)));
  });

export function validateEnquiry(body: unknown): { ok: true; data: CleanEnquiry } | { ok: false; errors: FieldErrors; spam?: boolean } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return { ok: false, errors: { name: "Please fill in the form." } };
  const b = body as Record<string, unknown>;
  const errors: FieldErrors = {};
  const data: CleanEnquiry = {};

  const unexpected = Object.keys(b).filter((k) => !(ENQUIRY_FIELDS as readonly string[]).includes(k));
  if (unexpected.length) return { ok: false, errors: { name: "The form sent unexpected information. Please reload the page and try again." } };
  if (typeof b.hpField === "string" && b.hpField.trim() !== "") return { ok: false, errors: {}, spam: true };

  const text = (key: Exclude<Field, "hpField">, label: string, required: boolean, max: number, newlines = false) => {
    const v = b[key];
    if (v === undefined || v === null || v === "") {
      if (required) errors[key] = `${label} is required.`;
      return "";
    }
    if (typeof v !== "string") {
      errors[key] = `${label} must be text.`;
      return "";
    }
    const t = v.trim();
    if (!t) {
      if (required) errors[key] = `${label} is required.`;
      return "";
    }
    if (t.length > max) errors[key] = `${label} must be ${max} characters or fewer.`;
    else if (hasControl(t, newlines)) errors[key] = `${label} contains characters that are not allowed.`;
    else data[key] = t;
    return t;
  };
  const choice = (key: "service" | "industry" | "timing" | "method", label: string, allowed: string[]) => {
    const t = text(key, label, true, 40);
    if (t && !allowed.includes(t)) {
      errors[key] = `Please select a ${label.toLowerCase()} from the list.`;
      delete data[key];
    }
    return t;
  };

  const submissionId = text("submissionId", "Submission reference", true, 64);
  if (submissionId && !SUBMISSION_RE.test(submissionId)) errors.submissionId = "Please reload the page and try again.";
  // Limits match the WALKFLOW BUSINESS n8n checker (checkEnquiry.js), so a value
  // accepted here is never rejected by n8n.
  text("name", "Name", true, 120);
  const email = text("email", "Email address", true, 254);
  if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  text("company", "Company name", true, 150);
  text("role", "Role", false, 100);
  const website = text("website", "Website URL", false, 200);
  if (website && /\s/.test(website)) errors.website = "Website URL must not contain spaces.";
  choice("service", "Service", SERVICES);
  const industry = choice("industry", "Industry", INDUSTRIES);
  if (industry === "other") text("otherIndustry", "Your industry", true, 100);
  else if (b.otherIndustry !== undefined && b.otherIndustry !== "") errors.otherIndustry = "Only needed when your industry is Other.";
  choice("timing", "Timeframe", TIMINGS);
  text("message", "Your message", true, 2000, true);
  const method = choice("method", "Contact method", ["email", "whatsapp"]);
  if (method === "whatsapp") {
    const n = text("whatsappNumber", "WhatsApp number", true, 24);
    const digits = n.replace(/[^0-9]/g, "");
    if (n && (!PHONE_RE.test(n) || digits.length < 7 || digits.length > 15)) {
      errors.whatsappNumber = "Please enter your number starting with + and your country code.";
    }
  } else if (b.whatsappNumber !== undefined && b.whatsappNumber !== "") {
    errors.whatsappNumber = "Only needed when WhatsApp is your contact method.";
  }
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

/** Best-effort, per-instance limit (serverless instances do not share memory). */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
export function enquiryRateLimited(clientKey: string, submissionId: string, now = Date.now()): boolean {
  if (hits.size > 5_000) hits.clear();
  const key = clientKey;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  // Retries of the same submission do not count against the visitor.
  const seenKey = `${clientKey}|${submissionId}`;
  if (hits.has(seenKey)) return false;
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(key, recent);
  hits.set(seenKey, [now]);
  return false;
}

export type ForwardResult =
  | { kind: "saved"; duplicate: boolean }
  | { kind: "invalid"; errors: FieldErrors }
  | { kind: "not-saved" } // n8n answered and confirmed nothing was saved (busy / storage failure)
  | { kind: "uncertain" } // no clear answer (timeout, network) - the enquiry may or may not be saved
  | { kind: "not-configured" }; // env vars missing, or n8n refused our credentials / the workflow is not published

// http:// is accepted only for a local test receiver outside production (scripts/test-enquiry.mjs).
const usableUrl = (url: string) =>
  /^https:\/\//.test(url) || (process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(url)) || (process.env.ENQUIRY_TEST_RECEIVER === "1" && /^http:\/\/127\.0\.0\.1(:\d+)?\//.test(url));

export async function forwardEnquiry(data: CleanEnquiry, timeoutMs = Number(process.env.N8N_ENQUIRY_TIMEOUT_MS) || 20_000): Promise<ForwardResult> {
  const url = process.env.N8N_ENQUIRY_WEBHOOK_URL;
  const secret = process.env.N8N_ENQUIRY_SECRET;
  if (!url || !secret || !usableUrl(url)) return { kind: "not-configured" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-WalkFlow-Secret": secret },
      body: JSON.stringify(data),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch {
    return { kind: "uncertain" };
  } finally {
    clearTimeout(timer);
  }

  let body: { success?: boolean; duplicate?: boolean; error?: { code?: string; details?: { field?: string; message?: string }[] } } = {};
  try {
    body = await res.json();
  } catch {
    body = {};
  }
  if (res.status === 200 && body.success === true) return { kind: "saved", duplicate: body.duplicate === true };
  if (res.status === 400 && body.error?.code === "INVALID_ENQUIRY") {
    const errors: FieldErrors = {};
    for (const d of body.error.details ?? []) {
      if (d.field && (ENQUIRY_FIELDS as readonly string[]).includes(d.field)) errors[d.field as Field] = d.message ?? "Please check this field.";
    }
    return { kind: "invalid", errors };
  }
  if ((res.status === 500 && body.error?.code === "ENQUIRY_NOT_SAVED") || (res.status === 503 && body.error?.code === "BUSY")) return { kind: "not-saved" };
  if (res.status === 401 || res.status === 403 || res.status === 404) return { kind: "not-configured" };
  // Anything else (gateway errors, unexpected answers): we cannot tell whether it was saved.
  return { kind: "uncertain" };
}
