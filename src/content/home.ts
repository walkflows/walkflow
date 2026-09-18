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

/**
 * Section 3: the single homepage services section (replaces the old
 * "Getting an enquiry is only the beginning." problem statement and the
 * two-service showcase below it — this is now the only services
 * presentation on the homepage). `id: "solutions"` is preserved from the
 * old serviceShowcase export so Hero's "Explore Our Solutions" (#solutions)
 * link keeps working. Each item's `icon` key is looked up against the icon
 * map in Services.tsx; each `cta.href` matches the corresponding entry
 * under Services in `mainNav` (src/content/navigation.ts) so the card link
 * and the nav dropdown item lead to the same place.
 */
export const services = {
  id: "solutions",
  eyebrow: "OUR SERVICES",
  headingLines: ["Get more enquiries.", "Make the next steps easier."],
  cta: { label: "Request a Call", href: "/contact" },
  items: [
    {
      id: "automation",
      icon: "automation" as const,
      title: "Business Automation & CRM",
      body: "Tired of chasing enquiries across emails, spreadsheets and messages? We connect your tools, organise customer details and automate routine follow-ups. Add AI chatbots or voice agents to help answer questions and capture enquiries while your team is busy.",
      cta: { label: "Explore Business Automation", href: "/ai-automation" },
    },
    {
      id: "email-marketing",
      icon: "mail" as const,
      title: "Email Marketing",
      body: "Give customers a reason to come back. We create welcome emails, follow-up sequences and campaigns that speak to what they need—whether they're considering their first purchase, booking a service or ready to buy again.",
      cta: { label: "Explore Email Marketing", href: "/services/email-marketing" },
    },
    {
      id: "web-design",
      icon: "website" as const,
      title: "Web Design",
      body: "Your website should make customers feel confident about choosing you. We build business websites, landing pages and online stores that explain your offer, work smoothly on every screen and make it easy to enquire, book or buy.",
      cta: { label: "Explore Web Design", href: "/web-design" },
    },
    {
      id: "mobile-apps",
      icon: "mobile" as const,
      title: "Mobile App Development",
      body: "Make booking, shopping or accessing your services easier for your customers. We turn your app idea into a practical mobile experience, built around the tasks people need to complete and the reasons they'll return.",
      cta: { label: "Explore Mobile Apps", href: "/services/mobile-app-development" },
    },
  ],
};

/** Platforms and tools strip. Logos are shown for reference only — not clients, partners or endorsements. */
export const platformsAndTools = {
  eyebrow: "PLATFORMS & TOOLS",
  heading: "Platforms and tools",
  body: "Examples of the platforms and AI tools a WALKFLOW project might use or connect to, depending on scope — shown for reference, not as clients or partners.",
  pause: "Pause moving logos",
  resume: "Resume moving logos",
  /**
   * UNVERIFIED PLACEHOLDER CONTENT — added for the cinematic motion pass on
   * this section, using the reference screenshot's own numbers/copy exactly
   * as instructed, pending your sign-off. None of these figures (years,
   * project/client/review counts) are confirmed real WALKFLOW numbers yet;
   * CLAUDE.md prohibits invented metrics as approved marketing claims, so
   * treat this block as a layout placeholder, not launch-ready copy. See
   * SESSION-NOTES.md.
   */
  stats: [
    { id: "years", value: "7 Years", label: "Hands-on Experience" },
    { id: "projects", value: "200+", label: "Successful Projects" },
    { id: "clients", value: "100+", label: "Happy Clients" },
    { id: "reviews", value: "150+", label: "Client Reviews" },
  ],
  statsCaption: "Experience and results across our founder's and team members' work.",
  features: [
    {
      id: "priorities",
      icon: "people" as const,
      title: "Your business comes first",
      body: "Tell us where enquiries get missed or work slows down. We help you choose a practical starting point and build around what your business needs.",
    },
    {
      id: "scope",
      icon: "document" as const,
      title: "Know what you're paying for",
      body: "Get a clear scope, price and timeline before work begins. Understand what's included, what happens next and which ongoing costs to expect.",
    },
    {
      id: "involved",
      icon: "chat" as const,
      title: "Stay involved at every step",
      body: "See the work as it takes shape, share feedback and get clear updates. Before launch, we test the agreed features together and show you how to use them.",
    },
  ],
  pills: [
    { id: "clear-scope", icon: "document" as const, label: "Clear Scope" },
    { id: "practical", icon: "gear" as const, label: "Practical Solutions" },
    { id: "updates", icon: "refresh" as const, label: "Regular Updates" },
    { id: "handover", icon: "swap" as const, label: "Guided Handover" },
  ],
};

/** Section 5: equally-weighted industry cards. Add entries here to extend the grid. */
export const industries = {
  eyebrow: "Industry solutions",
  headingLines: ["Start with the problem your business", "knows too well."],
  cards: [
    {
      title: "Real Estate",
      body: "Turn property interest into useful enquiries and organised viewing requests.",
      href: "/industries/real-estate",
      image: "/industries/real-estate.jpg",
    },
    {
      title: "Home Services",
      body: "Collect clearer job details and keep inspections, estimates and follow-ups in view.",
      href: "/industries/home-services",
      image: "/industries/home-services-hvac-plumbing.jpg",
    },
    {
      title: "Clinics",
      body: "Make consultation enquiries and appointment administration easier for reception.",
      href: "/industries/clinics",
      image: "/industries/clinics.jpg",
    },
    {
      title: "Consulting Firms",
      body: "Bring discovery calls, proposal follow-ups and onboarding into a clearer process.",
      href: "/industries/consulting",
      image: "/industries/consulting-firms.jpg",
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
  body: "Four working concept demos — sample data, an interactive customer flow and a business-side view for each industry.",
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
      body: "Request a callout as a customer, then see the same request from the business side.",
      status: "simulated" as const,
      statusLabel: "Concept demonstration",
      href: "/demos/home-services",
      cta: "Explore Home Services",
    },
    {
      id: "clinics",
      label: "Clinics",
      body: "Book a sample appointment, then see the same booking from the clinic side.",
      status: "simulated" as const,
      statusLabel: "Concept demonstration",
      href: "/demos/clinics",
      cta: "Explore Clinics",
    },
    {
      id: "consulting",
      label: "Consulting Firms",
      body: "Request a discovery call, then see the same enquiry from the firm side.",
      status: "simulated" as const,
      statusLabel: "Concept demonstration",
      href: "/demos/consulting",
      cta: "Explore Consulting",
    },
  ],
};

export const process = {
  eyebrow: "OUR PROCESS",
  headingLines: ["From “this needs fixing”", "to a clear next step."],
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
  eyebrow: "FAQ",
  heading: "Quick answers",
  items: [
    {
      question: "What is WALKFLOW?",
      answer:
        "WALKFLOW is an agency that builds websites, apps, and automation systems for high-value service businesses — designed to capture leads, convert them, and eliminate repetitive manual work.",
    },
    {
      question: "Who do you work with?",
      answer:
        "We work directly with decision-makers — CEOs, MDs, COOs, CFOs, CTOs, CIOs, CMOs, CCOs, VPs, Presidents, Directors General, and General Managers — at service-based businesses that already have demand but are losing time or leads to manual processes.",
    },
    {
      question: "What services do you offer?",
      answer: "Web design, app development, email marketing, and business automation — as standalone projects or combined into one connected system.",
    },
    {
      question: "What makes WALKFLOW different from a regular agency?",
      answer:
        "We don't just deliver a design and walk away. Every project connects to a system — lead capture, follow-up, booking, or automation — so what we build actually works for your business, not just looks good.",
    },
    {
      question: "How does a project usually start?",
      answer:
        "With a short discovery call to understand your business, current bottlenecks, and goals. From there, we scope the right combination of services for you.",
    },
    {
      question: "How much does it cost?",
      answer:
        "It depends on scope — a single service is priced differently than a full connected system. We give you a clear quote after understanding your needs on the discovery call.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer:
        "Yes — we offer maintenance and optimization plans so your systems keep running and improving after launch, plus the option of a one-off build if that's what you prefer.",
    },
    {
      question: "Will this replace my team, or support them?",
      answer:
        "It supports them. Automation handles the repetitive parts (follow-ups, reminders, data entry) so your team can focus on higher-value work.",
    },
  ],
};

export const finalCta = {
  heading: "What would you like your business to do better?",
  body: "A clearer website? Easier enquiry handling? Less time spent on follow-ups? Tell us where things feel difficult. Let’s work out the next step.",
  cta: { label: "Request a Call", href: "/contact" },
  note: "Send a short enquiry, and we’ll contact you to arrange a conversation. No account needed.",
};
