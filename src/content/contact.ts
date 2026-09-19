/**
 * Contact page + enquiry form copy.
 *
 * NOTE ON SCOPE (2026-09-18, Session 17): the field list, submit label and
 * success copy here replaced CLAUDE.md's older documented spec
 * (Name/Email address/Business name/"What do you need help with?"/"Tell us
 * about your project", "Send My Enquiry", "Thanks for getting in touch...").
 * CLAUDE.md's "Enquiries and Supabase" section was updated to match.
 *
 * SESSION 22 (2026-09-19) additions, also reflected in CLAUDE.md:
 *  - A required "Which service are you interested in?" dropdown, placed
 *    immediately before the message field.
 *  - Required/optional labelling made explicit ("*" + a "Fields marked *
 *    are required" note + "(optional)" suffixes), matched to the real
 *    validation rules in ContactForm.tsx.
 *  - A conditional "WhatsApp number" field, shown and required only when
 *    "WhatsApp" is the selected contact method.
 *  - "Business email" renamed to "Email address" with copy clarifying
 *    personal addresses are welcome. The email regex never had a
 *    business-domain restriction — Gmail/Outlook/etc. already validated
 *    fine — so this was a copy/placeholder fix, not a validation fix.
 */

export const contactSeo = {
  title: "Contact",
  description:
    "Tell WALKFLOW what's slowing your business down. We'll get back to you within 24 hours to set up a discovery call.",
};

export const contactPage = {
  eyebrow: "Start the Conversation",
  intro: "Tell us what's going on — we'll get back to you within 24 hours to set up a discovery call.",
  requiredNote: "Fields marked * are required.",
};

/**
 * New hero section (Session 22), built from a supplied reference layout.
 * `cards` is intentionally empty — see ContactHero.tsx and the Session 22
 * SESSION-NOTES.md entry: none of WALKFLOW's phone/address/email/opening
 * hours/social details are confirmed real yet (site.ts's `contact` block is
 * explicitly documented placeholder dummy data, and every `social` entry is
 * a "#" stub) — so no card is shown rather than publishing invented or
 * personal-inbox details. Add real entries here once Joshua confirms them;
 * ContactHero.tsx already renders whatever subset is present in the right
 * reference layout (phone/address/email across row one, hours + social
 * beneath) and falls back to a plain notice when the list is empty.
 */
export const contactHero = {
  heading: "Let's Work Together",
};

export const contactServiceOptions = [
  { value: "business-automation-crm", label: "Business Automation & CRM" },
  { value: "email-marketing", label: "Email Marketing" },
  { value: "web-design", label: "Web Design" },
  { value: "mobile-app-development", label: "Mobile App Development" },
  { value: "all", label: "All" },
] as const;

export const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const contactForm = {
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    email: {
      label: "Email address",
      placeholder: "you@example.com",
      helperText: "Business or personal email is welcome.",
    },
    company: { label: "Company name", placeholder: "Your company" },
    service: { label: "Which service are you interested in?", placeholder: "Select a service" },
    message: {
      label: "Tell us what's slowing your business down",
      placeholder: "e.g. we're losing leads, our website isn't converting, too much manual follow-up...",
    },
    role: { label: "Role (optional)", placeholder: "e.g. CEO, Operations Manager" },
    website: { label: "Website URL (optional)", placeholder: "yourcompany.com" },
    method: { label: "Preferred contact method" },
    whatsappNumber: {
      label: "WhatsApp number",
      placeholder: "+1 555 123 4567",
      helperText: "Include your country code.",
    },
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
