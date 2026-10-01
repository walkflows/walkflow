export type IndustryDemoStep = { title: string; body: string };

export type IndustryDemoContent = {
  slug: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    notice: string;
  };
  problem: { heading: string; points: string[] };
  solution: { heading: string; body: string; components: string[] };
  steps: { heading: string; items: IndustryDemoStep[] };
  visual: { heading: string; body: string };
  results: { heading: string; body: string; outcomes: string[] };
  interactiveDemo: {
    customerTabLabel: string;
    businessTabLabel: string;
    introText: string;
    disclaimer: string;
    slotLabel: string;
    slots: string[];
    issueLabel: string;
    issuePlaceholder: string;
    submitLabel: string;
    confirmationHeading: string;
    businessSteps: IndustryDemoStep[];
    emptyStateBody: string;
  };
  finalCta: { heading: string; cta: { label: string; href: string } };
};

/**
 * One remaining concept demonstration (Consulting) built to this shared,
 * generic pattern — same section order, styling and interactive-demo
 * mechanism (a customer-facing form + a business-side view of the
 * resulting record). All "results" figures are outcome descriptions, not
 * invented metrics — no numbers are stated.
 *
 * Home Services (Session 35) and Clinics (Session 36) used to be entries
 * here but were each rebuilt into their own bespoke, multi-stage demo —
 * see src/content/home-services-demo.ts / clinics-demo.ts and
 * src/components/demo/home-services/ / clinics/ — following the same
 * richer architecture as the Real Estate demo rather than this shared
 * template. Removed from this Record rather than kept stale alongside the
 * unused new builds.
 */
export const industryDemos: Record<"consulting", IndustryDemoContent> = {
  consulting: {
    slug: "consulting",
    seo: {
      title: "Consulting Firm Website Demo & Enquiry Journey",
      description:
        "Explore a sample consulting website and the intended enquiry-to-call journey. A WALKFLOW concept demonstration, not a live firm.",
    },
    hero: {
      eyebrow: "Concept Demonstration",
      heading: "Consulting Firms",
      subheading: "High-value leads go cold while manual follow-up slows deals down.",
      primaryCta: { label: "Start Sample Journey", href: "#interactive-demo" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
      notice:
        "Sample enquiries and demonstration content. This is not a live consulting firm. No real proposal or engagement is arranged through this demo.",
    },
    problem: {
      heading: "The business problem",
      points: [
        "High-value leads go cold due to slow response times.",
        "Manual proposal and follow-up processes lose deals that a timely nudge could have saved.",
        "There's no system for nurturing the long sales cycles consulting engagements often need.",
      ],
    },
    solution: {
      heading: "What WALKFLOW builds",
      body: "A website with lead qualification forms, automated nurture sequences and a booking system for discovery calls — keeping prospects engaged until they're ready to convert.",
      components: ["Lead qualification forms", "Automated nurture sequences", "Discovery call booking"],
    },
    steps: {
      heading: "The intended journey",
      items: [
        { title: "Prospect fills a qualification form", body: "Project needs and budget signals are captured upfront." },
        { title: "Automated scoring and routing", body: "Enquiries are routed to the right person based on fit." },
        { title: "Discovery call auto-scheduled", body: "A call slot is booked without an email back-and-forth." },
        { title: "Nurture sequence during decision period", body: "Useful, timed messages keep the firm top of mind." },
        { title: "Proposal follow-up automated", body: "Follow-up continues until the prospect responds." },
      ],
    },
    visual: {
      heading: "What the live site could look like",
      body: "Screenshots of the actual enquiry flow and firm pages go here once supplied — shown as a placeholder for now.",
    },
    results: {
      heading: "What this solves",
      body: "Faster response to high-value leads, fewer deals lost to slow follow-up, and consistent nurture through long sales cycles.",
      outcomes: ["Faster response to new enquiries", "Fewer deals lost to slow follow-up", "Consistent nurture through long sales cycles"],
    },
    interactiveDemo: {
      customerTabLabel: "Request a Discovery Call",
      businessTabLabel: "Firm View",
      introText:
        "Browse service offerings, share your project needs as a prospective client would, request a discovery call, then switch to Firm View to see how the same request would appear to the consulting team.",
      disclaimer:
        "This demonstration is a website prototype. Lead scoring, scheduling and nurture sequences are planned capabilities unless explicitly marked as tested live integrations. For a client build, the qualification criteria, team availability and communication process are configured and tested for that firm.",
      slotLabel: "Preferred call time",
      slots: ["Tomorrow 10:00", "Tomorrow 15:00", "Thursday 11:30", "Friday 09:00"],
      issueLabel: "Tell us about your project",
      issuePlaceholder: "e.g. We need help streamlining our onboarding process",
      submitLabel: "Request Discovery Call",
      confirmationHeading: "Want a version of this for your firm?",
      businessSteps: [
        { title: "Incoming inquiry received", body: "The project details and contact are captured in one place." },
        { title: "Automated qualification and scoring", body: "The enquiry is scored and routed based on fit." },
        { title: "Discovery call scheduled", body: "A call slot is booked against real availability." },
        { title: "Nurture sequence triggered", body: "Follow-up messages are queued for the decision period." },
      ],
      emptyStateBody: "No demo enquiries yet. Use “Request a Discovery Call” to see how a record appears here.",
    },
    finalCta: {
      heading: "What would this journey look like for your firm?",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },
};
