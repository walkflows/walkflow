export const site = {
  name: "WALKFLOW",
  tagline: "Take the steps. Build the flow.",
  footerDescription:
    "Websites that help customers take the next step. Practical automation that helps your team follow through.",
  /**
   * Real WALKFLOW business details, confirmed by Joshua (updated for the
   * walkflow.tech launch). The phone number is temporary and will later be
   * replaced with a Twilio business number — update it here when that
   * happens; nothing else needs to change. No address is displayed on the
   * site (removed 8 Oct 2026, by explicit instruction) — the business
   * location still appears in the Privacy Policy's "Who we are" section
   * (src/content/privacy.ts), which is a separate, literal string, not
   * read from here. `hours` stays `null` — no opening-hours copy has been
   * supplied yet, so that card is still omitted (see ContactHero.tsx).
   */
  contact: {
    email: "hello@walkflow.tech",
    phone: "+234 816 780 8483",
    hours: null as string[] | null,
    confirmed: true,
  },
  /**
   * Social profile links for the footer "Follow us" group and the Contact
   * page card. Real profile URLs supplied 8 Oct 2026. WhatsApp is not
   * listed here: it has its own floating button (NEXT_PUBLIC_WHATSAPP_URL).
   */
  social: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/walkflow" as string | null },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@buildwithjo408" as string | null },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/buildwithjo408/" as string | null },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@buildwithjo-408" as string | null },
  ],
};
