export type EnquiryPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  role: string;
  website: string;
  method: "email" | "whatsapp";
};

/** Thrown when no real submission backend is configured yet — see submitEnquiry below. */
export class EnquiryNotConfiguredError extends Error {
  constructor() {
    super("Enquiry submission is not configured yet.");
    this.name = "EnquiryNotConfiguredError";
  }
}

/**
 * Sends an enquiry to WALKFLOW.
 *
 * UNCONFIGURED BY DEFAULT — no backend is wired up yet, so this always
 * throws EnquiryNotConfiguredError, and the form shows an honest "not
 * connected" state instead of a fake success. Per CLAUDE.md: a click,
 * timeout or unconfigured integration must never produce a fake success.
 *
 * TODO: wire a real submission handler here. Preferred approach (per
 * CLAUDE.md): POST to a validated server route (e.g. `src/app/api/enquiry/
 * route.ts`) that re-validates the payload server-side and inserts into
 * Supabase with RLS blocking public reads/updates/deletes — never insert
 * into Supabase directly from the browser with a privileged key. A
 * third-party form endpoint (Formspree or similar) is a reasonable
 * short-term alternative if Supabase isn't set up yet.
 *
 * Example once a server route exists:
 *
 *   const res = await fetch("/api/enquiry", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("Enquiry submission failed");
 *
 * Once real submission is wired, delete the throw below (and the
 * `unconfigured` status branch + copy in ContactForm.tsx / content/contact.ts
 * become dead code that can be removed too).
 */
export async function submitEnquiry(_payload: EnquiryPayload): Promise<void> {
  throw new EnquiryNotConfiguredError();
}
