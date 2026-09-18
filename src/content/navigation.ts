export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  /**
   * Only present on plain links (Home, About, Contact). Dropdown triggers
   * (Industry Solutions, Services, Demo Projects) omit this on purpose —
   * explicitly required to open a menu only, never navigate to a parent
   * page. "Active" highlighting for a dropdown trigger is instead computed
   * from whether the current path matches any child.
   */
  href?: string;
  children?: NavLink[];
};

/**
 * Order and "Demo Projects" naming corrected per explicit instruction
 * (previously: Home, Services, Industry Solutions, Demos Projects, About,
 * Contact). All four Services children now live under `/services/*`
 * (Session 21) — Business Automation & CRM and Web Design previously
 * pointed at `/ai-automation` and `/web-design`, neither of which was ever
 * built (both 404'd); moved to match the real, now-built pages at
 * `/services/business-automation-crm` and `/services/web-design`.
 * All four `/demos/*` destinations are now built (Session 10) — no longer
 * a gap, though the copy/content still needs your sign-off before launch.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Industry Solutions",
    children: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Home Services – HVAC & Plumbing", href: "/industries/home-services" },
      { label: "Clinics", href: "/industries/clinics" },
      { label: "Consulting Firms", href: "/industries/consulting" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Business Automation & CRM", href: "/services/business-automation-crm" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "Web Design", href: "/services/web-design" },
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
    ],
  },
  {
    label: "Demo Projects",
    children: [
      { label: "Real Estate", href: "/demos/real-estate" },
      { label: "Home Services – HVAC & Plumbing", href: "/demos/home-services" },
      { label: "Clinics", href: "/demos/clinics" },
      { label: "Consulting Firms", href: "/demos/consulting" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const requestCallCta = { label: "Request a Call", href: "/contact" };

/**
 * Header/hero-only CTA label, introduced for the header+hero redesign.
 * Same real action (/contact) as requestCallCta — only the visible label
 * differs. Not yet applied elsewhere on the site; see SESSION-NOTES.md.
 */
export const consultationCta = { label: "Book a Consultation", href: "/contact" };

/**
 * Now synced with mainNav's Industry Solutions and Services dropdown
 * children (Session 9) so the footer's submenu lists match the header
 * exactly — previously flagged as drifted/out of date. The old "Explore"
 * column (Demos, About WALKFLOW, Contact) was dropped when the footer
 * moved to its new three-column layout (Industries, Services, Connect with
 * Us); those destinations are still reachable from the main header nav.
 */
export const footerNav = {
  industries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Home Services – HVAC & Plumbing", href: "/industries/home-services" },
    { label: "Clinics", href: "/industries/clinics" },
    { label: "Consulting Firms", href: "/industries/consulting" },
  ],
  services: [
    { label: "Business Automation & CRM", href: "/services/business-automation-crm" },
    { label: "Email Marketing", href: "/services/email-marketing" },
    { label: "Web Design", href: "/services/web-design" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Website Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
