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
   * Social profile links for the footer "Follow us" group and the Contact
   * page card. Set `href` to the real https:// profile URL once it exists.
   * While `href` is null the footer shows that icon as a non-link "coming
   * soon" marker, so no visitor is sent to a placeholder profile. WhatsApp is
   * not listed here: it has its own floating button (NEXT_PUBLIC_WHATSAPP_URL).
   */
  social: [
    { id: "linkedin", label: "LinkedIn", href: null as string | null },
    { id: "tiktok", label: "TikTok", href: null as string | null },
    { id: "instagram", label: "Instagram", href: null as string | null },
  ],
};
