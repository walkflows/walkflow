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
 * Contact). Every child link reuses an existing/approved route name where
 * one exists; two service destinations don't have an approved route
 * anywhere in CLAUDE.md's route list, so a new `/services/*` path was
 * introduced for them — flagged in SESSION-NOTES.md as needing sign-off,
 * same as the `/demos/*` industry sub-pages (only `/demos/real-estate` is an
 * approved, built route; the other three are extrapolated from that
 * pattern, not yet built or approved).
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
      { label: "Business Automation & CRM", href: "/ai-automation" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "Web Design", href: "/web-design" },
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
    { label: "Business Automation & CRM", href: "/ai-automation" },
    { label: "Email Marketing", href: "/services/email-marketing" },
    { label: "Web Design", href: "/web-design" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Website Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
