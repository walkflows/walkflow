export type IndustrySlug = "real-estate" | "home-services" | "clinics" | "consulting";

/**
 * Industry Solutions directory page (`/industries`). Not linked directly
 * from the header — "Industry Solutions" is a dropdown-only trigger per
 * navigation.ts — but reachable directly and from the footer/industry pages.
 */
export const industriesDirectory = {
  seo: {
    title: "Industry Solutions",
    description:
      "Solutions shaped around the way your industry works. Explore how WALKFLOW helps real estate, home services, clinics and consulting firms respond faster and stay organised.",
  },
  eyebrow: "Industry Solutions",
  heading: "Solutions shaped around the way your industry works.",
  body: "Every business handles enquiries, customers and follow-ups differently. WALKFLOW combines clear web design with practical automation to help your team respond faster, stay organised and keep work moving.",
  cta: { label: "Request a Call", href: "/contact" },
  cards: [
    {
      slug: "real-estate" as const,
      title: "Real Estate",
      lead: "Turn property interest into organised enquiries.",
      body: "Help property seekers find relevant listings, share their requirements and request viewings while your team keeps every conversation in view.",
      ctaLabel: "Explore Real Estate",
      href: "/industries/real-estate",
      image: "/industries/real-estate.jpg",
    },
    {
      slug: "home-services" as const,
      title: "Home Services — HVAC & Plumbing",
      lead: "Get clearer job requests and fewer missed follow-ups.",
      body: "Make it easier for customers to request help and provide the details your team needs before an appointment, inspection or estimate.",
      ctaLabel: "Explore Home Services",
      href: "/industries/home-services",
      image: "/industries/home-services-hvac-plumbing.jpg",
    },
    {
      slug: "clinics" as const,
      title: "Clinics",
      lead: "Make it easier for patients to ask, book and return.",
      body: "Help prospective patients understand your services, request appointments and receive timely reminders without adding more admin to your team.",
      ctaLabel: "Explore Clinics",
      href: "/industries/clinics",
      image: "/industries/clinics.jpg",
    },
    {
      slug: "consulting" as const,
      title: "Consulting Firms",
      lead: "Turn interest in your expertise into qualified conversations.",
      body: "Give prospects a clear way to explain what they need and give your team a reliable process for discovery calls, proposals and onboarding.",
      ctaLabel: "Explore Consulting",
      href: "/industries/consulting",
    image: "/industries/consulting-firms.jpg",
    },
  ],
  final: {
    heading: "Start with the problem that is costing your team time.",
    body: "Tell us what is difficult today. We'll help you identify a practical first step, whether that is a clearer website, a better enquiry process or a connected workflow.",
    cta: { label: "Request a Call", href: "/contact" },
  },
};

export type IndustryServiceItem = {
  title: string;
  body: string;
  icon: "website" | "automation" | "mail" | "mobile";
  /** Same destinations as the header's Services dropdown (navigation.ts), so a card and its nav entry always agree. */
  href: string;
  optional?: boolean;
};

export type IndustryPageContent = {
  slug: IndustrySlug;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: { src: string; alt: string };
  };
  problem: { heading: string; body: string; points: string[] };
  /** Session 29: replaced the old long chip list (`areas: string[]`) with exactly three full cards per industry — see IndustrySolutions.tsx. */
  solutions: { heading: string; body: string; cards: { title: string; body: string }[] };
  workflow: { heading: string; steps: string[] };
  /** Clinics-only administrative-scope disclaimer, per explicit instruction. Omitted for every other industry. */
  safetyNote?: string;
  services: { heading: string; items: IndustryServiceItem[] };
  faqs: { question: string; answer: string }[];
  finalCta: {
    heading: string;
    body: string;
    cta: { label: string; href: string };
    /** "See How It Works" → this industry's `/demos/<slug>` concept demo. */
    secondaryCta: { label: string; href: string };
  };
};

/**
 * Four Industry Solutions pages (Session 20 rebuild), from a fully-specified
 * content brief that replaces the Session 18 version end to end: section
 * order Hero, Problems, Solutions, How It Works, Relevant Services, FAQs,
 * Final CTA (the brief's Reviews section, right after Relevant Services, was
 * removed again per an explicit follow-up instruction the same session —
 * see the removed `industrySharedSections.reviews` note below), no
 * Platforms & Tools / Track Record / Before & After sections, and a hero
 * photo per industry sourced from the `New image examples to use` folder
 * (copied into `public/industries/` as `<slug>-hero.jpg`; the original
 * directory-card images at `<slug>.jpg` are untouched, since /industries and
 * the homepage still reference them). All copy below is transcribed
 * verbatim from the brief; the FAQ answers are newly written per industry
 * (the brief supplied only the questions), kept deliberately non-promissory
 * — no guaranteed costs, timelines or results. Each service card's `href`
 * (added per a follow-up instruction) matches its corresponding entry under
 * Services in `mainNav` (navigation.ts), so the card and the nav item lead
 * to the same place.
 */
export const industryPages: Record<IndustrySlug, IndustryPageContent> = {
  "real-estate": {
    slug: "real-estate",
    seo: {
      title: "Real Estate Solutions",
      description:
        "Turn property interest into organised enquiries. WALKFLOW helps real estate teams capture requirements, route viewing requests and follow up without dropped conversations.",
    },
    hero: {
      eyebrow: "Real Estate",
      heading: "Turn property interest into organised enquiries.",
      body: "Property enquiries can arrive through listing sites, email, calls and social media. WALKFLOW helps bring those conversations together so your team can respond quickly, understand what each person needs and keep viewing requests moving.",
      primaryCta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Real Estate Demo", href: "/demos/real-estate" },
      image: { src: "/industries/real-estate-hero.jpg", alt: "A real-estate agent showing a property to prospective buyers" },
    },
    problem: {
      heading: "When every enquiry starts somewhere different, follow-up becomes difficult.",
      body: "Property seekers expect quick answers, but your team may be managing enquiries across listing platforms, inboxes, calls and messages. Important details get missed, viewing requests are handled manually and agents are left guessing which lead needs attention next.",
      points: [
        "Buyer and renter requirements are incomplete",
        "Enquiries sit in different inboxes",
        "Viewing requests are handled manually",
        "Agents forget to follow up",
        "Property information is difficult to organise",
        "Property seekers receive slow or unclear replies",
      ],
    },
    solutions: {
      heading: "A clearer path from property interest to viewing.",
      body: "We help real-estate teams capture better information, organise every enquiry and create a follow-up process that keeps serious property seekers moving forward.",
      cards: [
        {
          title: "Capture Enquiries",
          body: "Collect property interests, budgets and preferences through clear enquiry forms.",
        },
        {
          title: "Organise Leads",
          body: "Qualify enquiries, assign agents and track each opportunity in one place.",
        },
        {
          title: "Manage Viewings & Follow-up",
          body: "Simplify viewing requests, send reminders and follow up with interested property seekers.",
        },
      ],
    },
    workflow: {
      heading: "From a property question to a useful next step.",
      steps: [
        "A visitor views a property",
        "They submit an enquiry",
        "Their requirements are captured",
        "The right agent is notified",
        "Viewing details are followed up automatically",
      ],
    },
    services: {
      heading: "The WALKFLOW services behind this solution.",
      items: [
        {
          title: "Web Design",
          body: "Create a property website that makes listings easy to understand and enquiries easy to submit.",
          icon: "website",
          href: "/services/web-design",
        },
        {
          title: "Business Automation & CRM",
          body: "Organise buyer details, assign enquiries and keep viewing follow-ups visible.",
          icon: "automation",
          href: "/services/business-automation-crm",
        },
        {
          title: "Email Marketing",
          body: "Send useful property updates, viewing reminders and follow-up messages based on each person's interest.",
          icon: "mail",
          href: "/services/email-marketing",
        },
        {
          title: "Mobile App Development",
          body: "Build a mobile property-search or viewing-request experience when the business needs it.",
          icon: "mobile",
          href: "/services/mobile-app-development",
          optional: true,
        },
      ],
    },
    faqs: [
      {
        question: "Can you improve our existing property website?",
        answer:
          "Yes. We can add clearer enquiry forms, buyer and renter requirement capture and better organisation to your existing site, or design a new one if that's the more practical option.",
      },
      {
        question: "Can you connect enquiries from different listing platforms?",
        answer:
          "In many cases, yes. We look at where your enquiries currently come from during scoping and connect what's practical, so fewer of them get lost between inboxes.",
      },
      {
        question: "Can you organise buyer and renter requirements?",
        answer:
          "Yes — capturing what each buyer or renter actually needs, in one place, is one of the most common starting points for a real-estate project.",
      },
      {
        question: "Can we start with viewing requests and add more later?",
        answer:
          "Yes. Many real-estate projects start with a single workflow, like viewing requests, and expand into lead qualification or follow-up sequences once it's proven useful.",
      },
      {
        question: "Can you connect our existing CRM?",
        answer: "Where practical, yes. We review the CRM or pipeline tool you're already using during scoping and connect it rather than asking you to replace it.",
      },
      {
        question: "How much will a real-estate solution cost?",
        answer:
          "It depends on scope — a single enquiry form is priced differently to a connected CRM and follow-up system. We give you a clear quote after the discovery call.",
      },
    ],
    finalCta: {
      heading: "Make every serious property enquiry easier to manage.",
      body: "Tell us how your team currently handles listings, enquiries and viewing requests. We'll help you identify the first improvement worth making.",
      cta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Real Estate Demo", href: "/demos/real-estate" },
    },
  },

  "home-services": {
    slug: "home-services",
    seo: {
      title: "Home Services Solutions — HVAC & Plumbing",
      description:
        "Get clearer job requests and fewer missed follow-ups. WALKFLOW helps HVAC and plumbing businesses route requests, collect job details and keep estimates moving.",
    },
    hero: {
      eyebrow: "Home Services — HVAC & Plumbing",
      heading: "Get clearer job requests and fewer missed follow-ups.",
      body: "When a customer needs help, they want a quick response. WALKFLOW helps home-service businesses collect the right job details, route requests to the right person and keep estimates and appointments moving.",
      primaryCta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Home Services Demo", href: "/demos/home-services" },
      image: { src: "/industries/home-services-hero.jpg", alt: "A technician servicing a home heating system" },
    },
    problem: {
      heading: "A missed call can become a missed job.",
      body: "Customers often contact home-service businesses when something is urgent. If the request arrives without enough information, your team spends time asking basic questions, chasing estimates and trying to remember which jobs still need attention.",
      points: [
        "Customers do not provide enough job information",
        "Emergency and routine requests are mixed together",
        "Staff repeat the same questions",
        "Estimates are sent but not followed up",
        "Technicians lack useful job details",
        "Appointment reminders are handled manually",
      ],
    },
    solutions: {
      heading: "A better way to move each service request forward.",
      body: "We help your business collect clearer requests, respond with the right information and keep every job moving from enquiry to completed work.",
      cards: [
        {
          title: "Capture Service Requests",
          body: "Collect job details and locations, and route urgent enquiries to the right team.",
        },
        {
          title: "Organise Jobs & Bookings",
          body: "Manage appointment requests, track job progress and notify technicians.",
        },
        {
          title: "Keep Customers Updated",
          body: "Send appointment reminders, follow up on estimates and prompt maintenance bookings.",
        },
      ],
    },
    workflow: {
      heading: "From the first service request to the next job.",
      steps: [
        "A customer requests service",
        "Job details are collected",
        "The right team member is notified",
        "An appointment or estimate is arranged",
        "Follow-up reminders are sent automatically",
      ],
    },
    services: {
      heading: "The WALKFLOW services behind this solution.",
      items: [
        {
          title: "Web Design",
          body: "Make it easy for customers to explain the problem, request service and choose the next step.",
          icon: "website",
          href: "/services/web-design",
        },
        {
          title: "Business Automation & CRM",
          body: "Route requests, organise job details and keep estimates, appointments and follow-ups visible.",
          icon: "automation",
          href: "/services/business-automation-crm",
        },
        {
          title: "Email Marketing",
          body: "Send maintenance reminders, estimate follow-ups and useful customer updates.",
          icon: "mail",
          href: "/services/email-marketing",
        },
        {
          title: "Mobile App Development",
          body: "Give technicians or repeat customers a simpler way to manage jobs, bookings or service requests.",
          icon: "mobile",
          href: "/services/mobile-app-development",
          optional: true,
        },
      ],
    },
    faqs: [
      {
        question: "Can customers request emergency and routine services separately?",
        answer: "Yes. Separating urgent requests from routine ones is a common first step, so emergencies don't get stuck behind less time-sensitive enquiries.",
      },
      {
        question: "Can you collect photos or job details through the website?",
        answer: "Yes — a service request form can be built to collect photos and job details upfront, so your team has what it needs before calling back.",
      },
      {
        question: "Can you connect our existing booking or CRM system?",
        answer: "In most cases, yes. We review what you're using for scheduling or CRM during scoping and connect it where practical.",
      },
      {
        question: "Can we automate estimate follow-ups?",
        answer: "Yes. Automated estimate follow-ups are one of the most requested workflows for home-service businesses, and a common starting point.",
      },
      {
        question: "Can we start with one service workflow?",
        answer: "Yes. Many projects start with a single workflow, like emergency routing or estimate follow-ups, and grow from there.",
      },
      {
        question: "How much will the project cost?",
        answer: "It depends on scope — a request form is priced differently to a full booking and reminder system. We confirm cost after understanding your current setup.",
      },
    ],
    finalCta: {
      heading: "Turn more service requests into completed jobs.",
      body: "Tell us where requests, estimates or follow-ups are getting stuck. We'll help you create a clearer process for your customers and your team.",
      cta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Home Services Demo", href: "/demos/home-services" },
    },
  },

  clinics: {
    slug: "clinics",
    seo: {
      title: "Clinic Solutions",
      description:
        "Make it easier for patients to ask, book and return. WALKFLOW helps clinics collect appointment enquiries and keep patients informed, without adding admin.",
    },
    hero: {
      eyebrow: "Clinics",
      heading: "Make it easier for patients to ask, book and return.",
      body: "Patients want clear information and a simple next step. WALKFLOW helps clinics explain their services, collect appointment enquiries and keep patients informed before and after they make contact.",
      primaryCta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Clinics Demo", href: "/demos/clinics" },
      image: { src: "/industries/clinics-hero.jpg", alt: "A dental clinician treating a patient in a clinic chair" },
    },
    problem: {
      heading: "Patients should not have to work hard to reach your clinic.",
      body: "When service information is unclear or appointment requests are difficult to complete, prospective patients may leave without making contact. Your staff then spend time answering the same questions and manually managing reminders.",
      points: [
        "Visitors cannot find clear service information",
        "Appointment requests arrive through different channels",
        "Staff answer the same questions repeatedly",
        "Reminders are inconsistent",
        "Missed appointments are not followed up",
        "Prospective patients lose interest before booking",
      ],
    },
    solutions: {
      heading: "A smoother enquiry and appointment experience.",
      body: "We help clinics give prospective patients clearer information, simpler appointment requests and more consistent administrative communication.",
      cards: [
        {
          title: "Capture Appointment Enquiries",
          body: "Help visitors explore services and submit appointment requests with essential contact details.",
        },
        {
          title: "Organise Requests & Notify Staff",
          body: "Track enquiries and alert your team when a request needs attention.",
        },
        {
          title: "Support Patient Follow-up",
          body: "Send appointment reminders, share preparation information and follow up on missed appointments.",
        },
      ],
    },
    workflow: {
      heading: "From a patient question to a clearer appointment journey.",
      steps: [
        "A patient asks a question",
        "They select a service",
        "Their details are collected",
        "An appointment request is sent to the team",
        "A reminder is scheduled",
      ],
    },
    safetyNote:
      "WALKFLOW supports communication, enquiries and administration. It does not replace qualified medical advice or clinical decision-making.",
    services: {
      heading: "The WALKFLOW services behind this solution.",
      items: [
        {
          title: "Web Design",
          body: "Explain treatments clearly and help patients request appointments with confidence.",
          icon: "website",
          href: "/services/web-design",
        },
        {
          title: "Business Automation & CRM",
          body: "Organise enquiries, notify staff and keep appointment requests and follow-ups visible.",
          icon: "automation",
          href: "/services/business-automation-crm",
        },
        {
          title: "Email Marketing",
          body: "Send appointment reminders, helpful information and follow-up messages with the clinic's approval.",
          icon: "mail",
          href: "/services/email-marketing",
        },
        {
          title: "Mobile App Development",
          body: "Create a patient booking, reminder or communication app where it is appropriate for the clinic.",
          icon: "mobile",
          href: "/services/mobile-app-development",
          optional: true,
        },
      ],
    },
    faqs: [
      {
        question: "Can you improve our existing clinic website?",
        answer: "Yes. We can improve what you have — clearer service pages, a simpler appointment request — or design a new site if that's the better fit.",
      },
      {
        question: "Can patients request appointments online?",
        answer:
          "Yes. An appointment request form is one of the most common improvements we build for clinics, so patients don't have to call during business hours to get started.",
      },
      {
        question: "Can we separate different treatments or departments?",
        answer: "Yes — enquiry and appointment forms can be organised by treatment or department, so requests reach the right person.",
      },
      {
        question: "Can reminders be automated?",
        answer:
          "Yes. Automated appointment reminders are a common workflow, and can reduce the number of missed appointments your team has to chase manually.",
      },
      {
        question: "Can you connect our existing booking system?",
        answer: "Where practical, yes. We review your current booking system during scoping and connect it rather than replacing it outright.",
      },
      {
        question: "How do you handle patient information securely?",
        answer:
          "We collect only what's needed for enquiries and administration, store it securely and don't use it beyond what the clinic agrees to. We don't provide medical advice or store clinical records.",
      },
    ],
    finalCta: {
      heading: "Give every prospective patient a clearer next step.",
      body: "Tell us where patients get stuck—from finding information to requesting an appointment. We'll help you improve the experience without adding unnecessary complexity.",
      cta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Clinics Demo", href: "/demos/clinics" },
    },
  },

  consulting: {
    slug: "consulting",
    seo: {
      title: "Consulting Firm Solutions",
      description:
        "Turn interest in your expertise into qualified conversations. WALKFLOW helps consulting firms organise discovery calls, proposal follow-ups and onboarding.",
    },
    hero: {
      eyebrow: "Consulting Firms",
      heading: "Turn interest in your expertise into qualified conversations.",
      body: "The right prospects need a clear way to explain what they need. WALKFLOW helps consulting firms turn website interest into organised discovery calls, proposal follow-ups and smoother client onboarding.",
      primaryCta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Consulting Firms Demo", href: "/demos/consulting" },
      image: { src: "/industries/consulting-hero.jpg", alt: "A consultant presenting a project roadmap to a team in a meeting room" },
    },
    problem: {
      heading: "Good prospects should not disappear after the first conversation.",
      body: "Consulting firms often lose time between the first enquiry, discovery call, proposal and onboarding. When information is scattered across email, documents and spreadsheets, promising opportunities can lose momentum.",
      points: [
        "Enquiries do not contain enough useful information",
        "Discovery calls are arranged manually",
        "Proposals are sent without a follow-up process",
        "Client information is scattered across tools",
        "Onboarding tasks are easy to miss",
        "Teams spend too much time coordinating internally",
      ],
    },
    solutions: {
      heading: "A more reliable path from first enquiry to active client.",
      body: "We help consulting firms collect better information, qualify opportunities and create a clearer process from discovery call to client onboarding.",
      cards: [
        {
          title: "Capture Enquiries & Book Calls",
          body: "Collect project needs and help prospects schedule a discovery call.",
        },
        {
          title: "Qualify & Organise Opportunities",
          body: "Assess fit, track conversations and assign next steps in your CRM.",
        },
        {
          title: "Follow Up & Onboard Clients",
          body: "Keep proposals moving, collect documents and guide new clients through onboarding.",
        },
      ],
    },
    workflow: {
      heading: "From first interest to a confident next step.",
      steps: [
        "A prospect submits an enquiry",
        "Their needs are assessed",
        "A discovery call is booked",
        "A proposal is sent",
        "Follow-up and onboarding tasks are scheduled",
      ],
    },
    services: {
      heading: "The WALKFLOW services behind this solution.",
      items: [
        {
          title: "Web Design",
          body: "Present your expertise clearly and make it easier for the right prospects to start a conversation.",
          icon: "website",
          href: "/services/web-design",
        },
        {
          title: "Business Automation & CRM",
          body: "Organise opportunities, manage proposal follow-ups and keep onboarding tasks visible.",
          icon: "automation",
          href: "/services/business-automation-crm",
        },
        {
          title: "Email Marketing",
          body: "Nurture prospects, share useful insights and keep conversations moving after the first call.",
          icon: "mail",
          href: "/services/email-marketing",
        },
        {
          title: "Mobile App Development",
          body: "Create a client portal or mobile experience when clients need easier access to resources, updates or services.",
          icon: "mobile",
          href: "/services/mobile-app-development",
          optional: true,
        },
      ],
    },
    faqs: [
      {
        question: "Can you improve our existing consulting website?",
        answer: "Yes. We can add discovery-call forms and lead qualification to your current site, or design a new one built around how prospects reach you.",
      },
      {
        question: "Can you qualify prospects before they book a call?",
        answer: "Yes. A short qualification step before booking is a common way to make sure discovery calls go to the right prospects.",
      },
      {
        question: "Can you automate proposal follow-ups?",
        answer: "Yes. Automated follow-up after a proposal is sent is one of the most common workflows we build for consulting firms.",
      },
      {
        question: "Can you connect our existing CRM?",
        answer: "In most cases, yes. We review your existing tools during scoping and connect them where it makes sense, rather than starting from scratch.",
      },
      {
        question: "Can we start with one part of the onboarding process?",
        answer: "Yes. Consulting projects often start with a single workflow, like proposal follow-up or onboarding tasks, and expand from there.",
      },
      {
        question: "How much will the project cost?",
        answer: "It depends on scope — a booking form is priced differently to a full pipeline and onboarding system. We give a clear quote after the discovery call.",
      },
    ],
    finalCta: {
      heading: "Make it easier for the right prospects to move forward.",
      body: "Tell us where leads slow down between the first enquiry, discovery call and onboarding. We'll help you create a clearer path for your team and your clients.",
      cta: { label: "Request a Consultation", href: "/contact" },
      secondaryCta: { label: "Explore Consulting Firms Demo", href: "/demos/consulting" },
    },
  },
};
