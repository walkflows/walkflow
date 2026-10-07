export type EnquiryPayload = {
  /**
   * Stable reference for ONE submission: the same value is sent again on a
   * retry, so n8n saves it only once; a new value is created only after a
   * successful send (see ContactForm.tsx).
   */
  submissionId: string;
  name: string;
  email: string;
  company: string;
  /** One of `contactServiceOptions`' values (content/contact.ts) — always required. */
  service: string;
  /** One of `contactIndustryOptions`' values (Session 29) — always required. */
  industry: string;
  /**
   * Only present when `industry === "other"` (Session 29) — the form clears
   * and hides this field the moment a real industry is selected, so it
   * never lingers in the payload once it no longer applies.
   */
  otherIndustry?: string;
  /** One of `contactTimingOptions`' values (Session 29) — always required. */
  timing: string;
  message: string;
  role: string;
  website: string;
  method: "email" | "whatsapp";
  /**
   * Only ever populated when `method === "whatsapp"` (Session 22) — the form
   * clears and hides this field the moment another contact method is
   * selected, so an "email" submission never carries a stray number.
   */
  whatsappNumber?: string;
};

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

/** The server could not take enquiries (missing configuration, or n8n refused the connection). */
export class EnquiryNotConfiguredError extends Error {
  constructor() {
    super("Enquiry submission is not configured.");
    this.name = "EnquiryNotConfiguredError";
  }
}

/** The details were rejected; `fieldErrors` says which fields to fix. Nothing was saved. */
export class EnquiryInvalidError extends Error {
  constructor(public fieldErrors: EnquiryFieldErrors) {
    super("Enquiry details were rejected.");
    this.name = "EnquiryInvalidError";
  }
}

/**
 * The enquiry was not confirmed as saved. `uncertain` = no clear answer (it may
 * have been saved); retrying with the same submissionId is safe either way.
 */
export class EnquirySendError extends Error {
  constructor(public reason: "not_saved" | "uncertain" | "rate_limited") {
    super("Enquiry was not confirmed as saved.");
    this.name = "EnquirySendError";
  }
}

/**
 * Sends an enquiry through the site's own server route (/api/enquiry), which
 * forwards it to n8n. Resolves only when the enquiry is confirmed as saved;
 * `duplicate` = this exact submission had already been saved by an earlier try.
 */
export async function submitEnquiry(payload: EnquiryPayload, timeoutMs = 30_000): Promise<{ duplicate: boolean }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch {
    throw new EnquirySendError("uncertain");
  } finally {
    clearTimeout(timer);
  }

  let body: { ok?: boolean; duplicate?: boolean; code?: string; fieldErrors?: EnquiryFieldErrors } = {};
  try {
    body = await res.json();
  } catch {
    body = {};
  }
  if (res.ok && body.ok === true) return { duplicate: body.duplicate === true };
  if (body.code === "invalid") throw new EnquiryInvalidError(body.fieldErrors ?? {});
  if (body.code === "not_configured") throw new EnquiryNotConfiguredError();
  if (body.code === "not_saved" || body.code === "rate_limited") throw new EnquirySendError(body.code);
  throw new EnquirySendError("uncertain");
}

/** A fresh submission reference (URL-safe, 16–64 characters as n8n requires). */
export function newSubmissionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `web-${crypto.randomUUID()}`;
  return `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
}
