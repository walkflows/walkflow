/**
 * Contact page + enquiry form copy.
 *
 * NOTE ON SCOPE (2026-09-18): this replaces the field list, submit label and
 * success copy that CLAUDE.md previously documented under "Enquiries and
 * Supabase" (Name/Email/Business name/"What do you need help with?"/"Tell us
 * about your project", "Send My Enquiry", "Thanks for getting in touch...").
 * Joshua gave a new, detailed, explicit spec for this form — new explicit
 * decisions take precedence over older project notes, so this is the
 * current approved spec. CLAUDE.md's "Enquiries and Supabase" section has
 * been updated to match, annotated as Session 17, so the doc stays
 * authoritative rather than silently drifting from what's actually built.
 */

export const contactSeo = {
  title: "Contact",
  description:
    "Tell WALKFLOW what's slowing your business down. We'll get back to you within 24 hours to set up a discovery call.",
};

export const contactPage = {
  eyebrow: "Start the Conversation",
  heading: "Let's talk about what's slowing you down",
  intro: "Tell us what's going on — we'll get back to you within 24 hours to set up a discovery call.",
};

export const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const contactForm = {
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    email: { label: "Business email", placeholder: "you@yourcompany.com" },
    company: { label: "Company name", placeholder: "Your company" },
    message: {
      label: "Tell us what's slowing your business down",
      placeholder: "e.g. we're losing leads, our website isn't converting, too much manual follow-up...",
    },
    role: { label: "Role", placeholder: "e.g. CEO, Operations Manager" },
    website: { label: "Website URL", placeholder: "yourcompany.com" },
    method: { label: "Preferred contact method" },
  },
  submitLabel: "Start the Conversation",
  submittingLabel: "Sending...",
  successHeading: "Message sent",
  successBody: "Thanks — we'll be in touch within 24 hours.",
  errorBody: "Something went wrong sending that. Please try again, or reach out directly.",
  /**
   * Shown instead of a fake success state when no real submission backend is
   * wired yet (see src/lib/enquiry.ts). Honest, developer-facing — never
   * presented as if the enquiry was actually received. Remove the whole
   * `unconfigured` status branch in ContactForm.tsx once a real endpoint is
   * connected; this copy then becomes dead and can go too.
   */
  unconfiguredBody:
    "This form isn't connected to a backend yet, so nothing was sent. (Developer note: wire a real submission handler in src/lib/enquiry.ts.)",
};
