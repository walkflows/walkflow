export const site = {
  name: "WALKFLOW",
  tagline: "Take the steps. Build the flow.",
  footerDescription:
    "Websites that help customers take the next step. Practical automation that helps your team follow through.",
  /**
   * `confirmed: true` (Session 22) — Joshua explicitly confirmed these
   * exact email/phone/address values for display on the Contact page hero
   * (ContactHero.tsx gates its phone/address/email cards on this flag).
   * Originally added as unverified placeholder dummy data for the footer
   * layout only; now approved for real use by explicit instruction. `hours`
   * stays `null` — no opening-hours copy has been supplied yet, so that
   * card is still omitted (see ContactHero.tsx).
   */
  contact: {
    email: "hello@walkflow.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, Springfield, ST 00000",
    hours: null as string[] | null,
    confirmed: true,
  },
  /**
   * Placeholder destinations — real profile URLs aren't set up yet. Kept as
   * "#" (rather than omitted) so the footer icons are ready to become real
   * links the moment accounts exist, per explicit instruction.
   */
  social: [
    { id: "whatsapp", label: "WhatsApp", href: "#" },
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "instagram", label: "Instagram", href: "#" },
  ],
};
