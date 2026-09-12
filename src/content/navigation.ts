export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Web Design",
    href: "/web-design",
    children: [
      { label: "Business Websites", href: "/web-design/business-websites" },
      { label: "E-commerce Websites", href: "/web-design/ecommerce" },
      { label: "Landing Pages", href: "/web-design/landing-pages" },
      { label: "Web Apps & Internal Tools", href: "/web-design/web-apps" },
      { label: "AI Automation", href: "/ai-automation" },
    ],
  },
  {
    label: "Industry Solutions",
    href: "/industries",
    children: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Home Services", href: "/industries/home-services" },
      { label: "Clinics", href: "/industries/clinics" },
      { label: "Consulting Firms", href: "/industries/consulting" },
      { label: "Demos", href: "/demos" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const requestCallCta = { label: "Request a Call", href: "/contact" };

export const footerNav = {
  services: [
    { label: "Web Design", href: "/web-design" },
    { label: "AI Automation", href: "/ai-automation" },
  ],
  industries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Home Services", href: "/industries/home-services" },
    { label: "Clinics", href: "/industries/clinics" },
    { label: "Consulting Firms", href: "/industries/consulting" },
  ],
  explore: [
    { label: "Demos", href: "/demos" },
    { label: "About WALKFLOW", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Website Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
