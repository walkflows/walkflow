export const realEstateDemoSeo = {
  title: "Real Estate Website Demo & Enquiry Journey",
  description:
    "Explore a sample property website and the intended enquiry-to-viewing journey. A WALKFLOW concept demonstration, not a live estate agency.",
};

export const realEstateDemoHero = {
  eyebrow: "Concept Demonstration",
  heading: "Help a buyer move from browsing to a useful enquiry.",
  body: "Explore a property website prototype, then see how matching, agent handoff and viewing requests could connect around it.",
  primaryCta: { label: "Start Sample Journey", href: "#interactive-demo" },
  secondaryCta: { label: "Request a Call", href: "/contact" },
  notice:
    "Sample properties and demonstration content. This is not a live estate agency. No real purchase or viewing is arranged through this demo.",
};

export const realEstateDemoProblem = {
  heading: "The business problem",
  body: "Buyers often need help narrowing down listings. Agents need more than a name and “I’m interested” to respond usefully. The concept gives both sides a clearer starting point.",
};

export const realEstateDemoJourney = {
  heading: "The intended journey",
  steps: [
    { title: "Browse properties", body: "Explore listings with clear information and an obvious enquiry route." },
    { title: "Share requirements", body: "Choose location, budget, bedrooms and property type." },
    {
      title: "Review suitable options",
      body: "A connected workflow could check available listings against those requirements.",
    },
    { title: "Request a viewing", body: "An agent confirms property access and the next step." },
    { title: "Follow through", body: "An agreed workflow could send reminders and organise agent tasks." },
  ],
};

export const realEstateDemoExplainer = {
  heading: "What is being demonstrated",
  body: "This demonstration is a website prototype. Connected messages, listing matching and appointment handling are planned capabilities unless explicitly marked as tested live integrations. For a client build, the property data, matching rules, agent availability and communication process are configured and tested for that business.",
};

export const realEstateDemoFinalCta = {
  heading: "What would this journey look like for your agency?",
  cta: { label: "Request a Call", href: "/contact" },
};

/** Approved interface microcopy for demonstration states (site-wide, section 27 of the content pack). */
export const demoStrings = {
  persistentNotice: "Interactive concept. Use sample information only. No real messages, bookings or payments are created.",
  restartDemo: "Restart Demo",
  resetFilters: "Reset filters",
  noListingMatch: "No sample properties match these choices. In a connected client system, this enquiry would be sent to an agent for review.",
  propertyResult: "These sample listings meet the selected criteria. Availability and viewing access would be checked before a real confirmation.",
  sampleMessageLabel: "Example email — not sent",
  sampleAppointmentLabel: "Example viewing request — no appointment booked",
  completionHeading: "You’ve reached the end of this sample journey. Want to discuss a version for your business?",
  requestACall: "Request a Call",
};

export const demoTabs = [
  { id: "browse", label: "Browse Properties" },
  { id: "requirements", label: "Share Requirements" },
  { id: "viewing", label: "Request a Viewing" },
  { id: "agent", label: "Agent View" },
] as const;

export type DemoTabId = (typeof demoTabs)[number]["id"];
