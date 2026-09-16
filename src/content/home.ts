export const homeSeo = {
  title: "WALKFLOW | Web Design & AI Automation",
  description:
    "Make it easier for customers to choose you. Explore custom websites and practical automation for enquiries, appointments and everyday business tasks.",
};

export const hero = {
  /**
   * Session 7: replaced the CLAUDE.md-documented "Web Design & AI
   * Automation" hero service label with this longer eyebrow per explicit
   * instruction. Hero.tsx renders "#1" as a separate styled badge, so this
   * string is kept for reference/consistency, not rendered verbatim as one
   * plain text node. See SESSION-NOTES.md Session 7 re: the superlative
   * "#1 Choice" wording against CLAUDE.md's no-unsupported-claims rule.
   */
  eyebrow: "Your #1 Choice for Web Design & AI Automation",
  heading: "Make it easier for customers to choose you.",
  body: "We build websites that earn attention and automations that handle follow-ups, helping you turn more enquiries into customers.",
  primaryCta: { label: "Request a Call", href: "/contact" },
  secondaryCta: { label: "Explore Our Solutions", href: "#solutions" },
};

export const problem = {
  heading: "Getting an enquiry is only the beginning.",
  body: "Someone finds your business, visits your website and gets in touch. Then the details sit in an inbox, a follow-up gets forgotten or arranging a call takes days of back-and-forth.",
  resolution:
    "We help you improve those moments, so customers know what to do and your team knows what needs attention.",
};

/** Section 3: two equally-weighted service showcases. */
export const serviceShowcase = {
  id: "solutions",
  eyebrow: "What we build",
  heading: "Two services. Built to work together.",
  body: "A website with no follow-through leaves enquiries stuck in an inbox. Automation with no clear front door never gets used. WALKFLOW builds both, so they work as one system.",
  services: [
    {
      id: "web-design",
      title: "Web Design",
      body: "Help visitors understand your services, trust your business and enquire or buy with confidence. Build a new website or improve the one you already have.",
      tags: ["Business websites", "E-commerce", "Landing pages", "Web apps"],
      cta: { label: "Explore Web Design", href: "/web-design" },
    },
    {
      id: "ai-automation",
      title: "AI Automation",
      body: "Organise enquiry details, support follow-ups and reduce repeated admin. Start with one task that slows you down, then connect the steps around it.",
      tags: ["Enquiry handling", "Follow-up", "Appointment admin", "Internal handoffs"],
      cta: { label: "Explore AI Automation", href: "/ai-automation" },
    },
  ],
};

/** Platforms and tools strip. Logos are shown for reference only — not clients, partners or endorsements. */
export const platformsAndTools = {
  heading: "Platforms and tools",
  body: "Examples of the platforms and AI tools a WALKFLOW project might use or connect to, depending on scope — shown for reference, not as clients or partners.",
  pause: "Pause moving logos",
  resume: "Resume moving logos",
};

/** Section 5: equally-weighted industry cards. Add entries here to extend the grid. */
export const industries = {
  eyebrow: "Industry solutions",
  heading: "Start with the problem your business knows too well.",
  cards: [
    {
      title: "Real Estate",
      body: "Turn property interest into useful enquiries and organised viewing requests.",
      href: "/industries/real-estate",
    },
    {
      title: "Home Services",
      body: "Collect clearer job details and keep inspections, estimates and follow-ups in view.",
      href: "/industries/home-services",
    },
    {
      title: "Clinics",
      body: "Make consultation enquiries and appointment administration easier for reception.",
      href: "/industries/clinics",
    },
    {
      title: "Consulting Firms",
      body: "Bring discovery calls, proposal follow-ups and onboarding into a clearer process.",
      href: "/industries/consulting",
    },
  ],
  cta: { label: "Explore Industry Solutions", href: "/industries" },
};

/**
 * Section 4: interactive Attract → Capture → Follow-up → Serve journey.
 * Each stage illustrates a different industry so the section doesn't read
 * as real-estate-only. Concept illustrations, not live product screens.
 */
export const journey = {
  eyebrow: "How it works",
  heading: "One journey. Every industry runs it differently.",
  body: "The shape is the same everywhere: attract the right visitor, capture what they need, follow up without being chased, then keep the record straight as work moves forward.",
  stages: [
    {
      id: "attract",
      label: "Attract",
      industry: "Home Services",
      title: "A website that gets found and understood",
      body: "Clear service pages and an obvious way to get in touch, so visitors don’t have to work out what you do.",
    },
    {
      id: "capture",
      label: "Capture",
      industry: "Clinics",
      title: "Every enquiry captured in one place",
      body: "A short guided form collects what reception actually needs, instead of a one-line message that raises five more questions.",
    },
    {
      id: "follow-up",
      label: "Follow-up",
      industry: "Consulting Firms",
      title: "Follow-up that happens without being chased",
      body: "Agreed messages go out on a schedule your team controls, and stop the moment someone replies.",
    },
    {
      id: "serve",
      label: "Serve",
      industry: "Real Estate",
      title: "A record that stays true as work moves forward",
      body: "Stages, notes and requests update as things progress, so anyone on your team can see what’s happening.",
    },
  ],
} as const;

export type JourneyStageId = (typeof journey.stages)[number]["id"];

/** Section 6: compact demo showcase. Real estate is the only working demo so far. */
export const demoShowcase = {
  eyebrow: "Demos",
  heading: "See a concept in action",
  body: "Real Estate is our first working concept demo — sample listings, requirements matching and an agent view. The others are in development.",
  items: [
    {
      id: "real-estate",
      label: "Real Estate",
      body: "Browse sample listings, share requirements and request a viewing.",
      status: "simulated" as const,
      statusLabel: "Concept demonstration",
      href: "/demos/real-estate",
      cta: "Explore the Real Estate Demo",
    },
    {
      id: "home-services",
      label: "Home Services",
      body: "Job enquiry, assessment request and estimate follow-up.",
      status: "planned" as const,
      statusLabel: "Coming soon",
      href: "/industries/home-services",
      cta: "Explore Home Services",
    },
    {
      id: "clinics",
      label: "Clinics",
      body: "Administrative enquiry, reception review and reminders.",
      status: "planned" as const,
      statusLabel: "Coming soon",
      href: "/industries/clinics",
      cta: "Explore Clinics",
    },
    {
      id: "consulting",
      label: "Consulting Firms",
      body: "Project brief, discovery and organised onboarding.",
      status: "planned" as const,
      statusLabel: "Coming soon",
      href: "/industries/consulting",
      cta: "Explore Consulting",
    },
  ],
};

export const why = {
  heading: "Start with what matters. Build from there.",
  points: [
    {
      title: "Your priorities first",
      body: "We begin with your customers, your goals and the work taking up your day.",
    },
    {
      title: "A clear scope",
      body: "Understand the deliverables, costs and responsibilities before the build begins.",
    },
    {
      title: "Room to grow",
      body: "Start with a website or one useful automation. Add more when it makes sense.",
    },
  ],
};

export const process = {
  heading: "From “this needs fixing” to a clear next step.",
  steps: [
    {
      title: "Tell us what’s happening",
      body: "Share your goals and where customers or your team get stuck.",
    },
    {
      title: "Agree on the project",
      body: "We define the solution, scope, cost and timeline.",
    },
    {
      title: "Build and review",
      body: "Review the work as it takes shape, with updates by email or calls.",
    },
    {
      title: "Test and launch",
      body: "Check the agreed features together and learn how to use them.",
    },
  ],
};

export const faq = {
  heading: "Quick answers",
  items: [
    {
      question: "Can I start with just a website?",
      answer: "Yes. Web design is a standalone service. Automation can be a separate project later.",
    },
    {
      question: "Can you improve my existing website?",
      answer:
        "Yes. We’ll review what you have and discuss whether focused improvements or a rebuild would better suit your goals.",
    },
    {
      question: "Do I need to know which tools to use?",
      answer:
        "No. Explain what you want to achieve. We’ll recommend suitable tools and outline any subscription costs before you commit.",
    },
    {
      question: "How much will my project cost?",
      answer:
        "Your quote depends on the pages, features and integrations you need. We’ll agree on the scope and price before starting.",
    },
  ],
};

export const finalCta = {
  heading: "What would you like your business to do better?",
  body: "A clearer website? Easier enquiry handling? Less time spent on follow-ups? Tell us where things feel difficult. Let’s work out the next step.",
  cta: { label: "Request a Call", href: "/contact" },
  note: "Send a short enquiry, and we’ll contact you to arrange a conversation. No account needed.",
};
