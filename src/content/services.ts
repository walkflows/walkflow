export type ServiceSlug = "business-automation-crm" | "email-marketing" | "web-design" | "mobile-app-development";

/**
 * PLACEHOLDER — REPLACE BEFORE PUBLISHING.
 *
 * Every `ProjectCard` below is temporary, concept-only project data, not
 * real client work — per explicit instruction. `devNote` carries the
 * required literal marker for anyone editing this file; the visible
 * "Concept Project" badge (rendered by ServiceProjectCard.tsx) is what
 * keeps visitors from mistaking these for real client projects, reusing
 * the same honesty convention already used for `demoShowcase` on the
 * homepage ("Concept demonstration"). `projectHref`/`videoHref` are `null`
 * until real links exist — ServiceProjectCard.tsx renders a disabled
 * "View Project" state instead of a dead or fake link.
 */
export type ProjectCard = {
  title: string;
  industry: string;
  description: string;
  tags: string[];
  image: { src: string; alt: string } | null;
  projectHref: string | null;
  videoHref: string | null;
  devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING";
};

export type ServicePageContent = {
  slug: ServiceSlug;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  problem: { heading: string; body?: string; points: string[] };
  deliver: { heading: string; items: string[] };
  projects: { heading: string; items: ProjectCard[] };
  video: {
    heading: string;
    body: string;
    poster: { src: string; alt: string };
    /** No real footage exists yet for any service page — kept `null` on purpose rather than pointing at a file that doesn't exist. See ServiceVideo.tsx for the coming-soon state this renders instead. */
    videoSrc: string | null;
  };
  workflow: { heading: string; steps: string[] };
  faqs: { question: string; answer: string }[];
  finalCta: { heading: string; body: string; cta: { label: string; href: string } };
};

/**
 * Four Services pages (Session 21), built from a fully-specified content
 * brief. Section order: Hero, The Problem, What We Deliver, Selected
 * Projects, Project Video, How It Works, Reviews, FAQs, Final CTA. All
 * hero/problem/deliver/workflow/FAQ-question/CTA copy is transcribed
 * verbatim from the brief; FAQ answers are newly written (the brief
 * supplied only the questions), kept non-promissory — no guaranteed costs,
 * timelines or results. Project images are real photos chosen from the
 * `New image examples to use` folder, matched to each project's stated
 * industry — the same source folder used for the Industry Solutions hero
 * photos, picking different, previously-unused images from each industry's
 * set. One project (Oak & Field Store, e-commerce) has no matching photo in
 * that folder — its `image` is `null` rather than substituting an unrelated
 * picture, and ServiceProjectCard.tsx renders a plain placeholder panel
 * instead of leaving a broken image.
 */
export const servicePages: Record<ServiceSlug, ServicePageContent> = {
  "business-automation-crm": {
    slug: "business-automation-crm",
    seo: {
      title: "Business Automation & CRM",
      description:
        "Stop losing enquiries between messages, spreadsheets and follow-ups. WALKFLOW connects your customer journey so nothing gets missed.",
    },
    hero: {
      eyebrow: "Business Automation & CRM",
      heading: "Stop losing enquiries between messages, spreadsheets and follow-ups.",
      body: "WALKFLOW connects the important parts of your customer journey so enquiries are captured, organised and followed up without your team manually chasing every detail.",
      primaryCta: { label: "Explore Business Automation", href: "#deliver" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
    },
    problem: {
      heading: "When your tools do not work together, your team carries the work.",
      body: "Customer details can arrive through forms, email, social media, calls and spreadsheets. Without a clear process, useful information gets lost, follow-ups are forgotten and staff spend valuable time moving details from one place to another.",
      points: [
        "Enquiries arrive from too many places",
        "Customer information is incomplete",
        "Follow-ups are forgotten",
        "Staff repeat the same admin",
        "Internal handoffs are unclear",
        "Teams cannot see what needs attention next",
      ],
    },
    deliver: {
      heading: "A clearer system for the work that keeps repeating.",
      items: [
        "CRM setup and organisation",
        "Enquiry capture systems",
        "Lead qualification",
        "Automated follow-ups",
        "Appointment workflows",
        "Internal notifications",
        "AI chat assistants",
        "Voice agents",
        "Team handoff systems",
        "Pipeline visibility",
      ],
    },
    projects: {
      heading: "Automation built around real business tasks.",
      items: [
        {
          title: "LeadFlow CRM Setup",
          industry: "Real Estate",
          description:
            "A concept CRM workflow for capturing property enquiries, assigning leads and organising viewing follow-ups.",
          tags: ["CRM", "Lead Capture", "Follow-Up"],
          image: { src: "/images/projects/leadflow-crm-setup.jpg", alt: "Real-estate agents reviewing a property enquiry" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "ServiceDesk Request Workflow",
          industry: "Home Services",
          description:
            "A concept workflow for collecting job details, routing service requests and keeping estimate follow-ups visible.",
          tags: ["Enquiry Routing", "Notifications", "CRM"],
          image: { src: "/images/projects/servicedesk-request-workflow.jpg", alt: "A technician working on a plumbing repair" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "ClinicConnect Enquiry System",
          industry: "Clinics",
          description: "A concept enquiry and appointment workflow for organising service requests and staff notifications.",
          tags: ["Appointment Requests", "CRM", "Reminders"],
          image: { src: "/images/projects/clinicconnect-enquiry-system.jpg", alt: "A clinic reception and administrative area" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "ConsultTrack Pipeline",
          industry: "Consulting",
          description: "A concept pipeline for organising discovery calls, proposal follow-ups and client onboarding tasks.",
          tags: ["Lead Qualification", "Pipeline", "Onboarding"],
          image: { src: "/images/projects/consulttrack-pipeline.jpg", alt: "A consulting team reviewing a pipeline of opportunities" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    video: {
      heading: "See how an enquiry moves through the system.",
      body: "Watch a short walkthrough of how information can be captured, organised and passed to the right person.",
      poster: { src: "/images/projects/leadflow-crm-setup.jpg", alt: "A preview of the enquiry-to-CRM workflow walkthrough" },
      videoSrc: null,
    },
    workflow: {
      heading: "Start with one task that slows your team down.",
      steps: [
        "Map the current process",
        "Choose the first useful improvement",
        "Build the workflow",
        "Test it with the team",
        "Improve it as the business grows",
      ],
    },
    faqs: [
      {
        question: "Can you connect the tools we already use?",
        answer: "In most cases, yes. We review what you're already using during scoping and connect it where practical, rather than asking you to replace tools that work.",
      },
      {
        question: "Can we start with one workflow?",
        answer: "Yes. Most automation projects start with a single workflow — the one causing the most friction — and expand once it's proven useful.",
      },
      {
        question: "Can you set up a CRM from the beginning?",
        answer: "Yes. If you don't have a CRM yet, we can help you choose and set one up as part of the project, scoped to what your team actually needs.",
      },
      {
        question: "Can we add AI chat or voice assistants later?",
        answer: "Yes. These are commonly added once the core enquiry and follow-up workflow is working, not required from day one.",
      },
      {
        question: "Will our team receive training?",
        answer: "Yes. We walk your team through any new system before launch, and are available to answer questions as you start using it.",
      },
      {
        question: "How much will the automation project cost?",
        answer: "It depends on scope — a single automated workflow is priced differently to a full CRM and notification system. We give a clear quote after the discovery call.",
      },
    ],
    finalCta: {
      heading: "Make the work behind every enquiry easier to manage.",
      body: "Tell us where customer information gets lost or where your team spends too much time repeating the same task.",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },

  "email-marketing": {
    slug: "email-marketing",
    seo: {
      title: "Email Marketing",
      description: "Stay useful after the first enquiry. WALKFLOW builds timely email sequences that keep conversations moving.",
    },
    hero: {
      eyebrow: "Email Marketing",
      heading: "Stay useful after the first enquiry.",
      body: "WALKFLOW helps businesses send timely emails that welcome new contacts, answer common questions, support buying decisions and bring customers back when they are ready.",
      primaryCta: { label: "Explore Email Marketing", href: "#deliver" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
    },
    problem: {
      heading: "A customer who hears nothing may assume you are no longer interested.",
      body: "When follow-up depends on memory, new enquiries go cold, past customers are forgotten and every campaign becomes another manual task for your team.",
      points: [
        "New enquiries receive no follow-up",
        "Customers forget about the business",
        "Every email is sent manually",
        "Past customers are not re-engaged",
        "Campaigns are inconsistent",
        "Messages are not tailored to customer needs",
      ],
    },
    deliver: {
      heading: "Email that keeps the right conversation moving.",
      items: [
        "Welcome email sequences",
        "Lead-nurture campaigns",
        "Appointment reminders",
        "Estimate and proposal follow-ups",
        "Customer reactivation campaigns",
        "Promotional campaigns",
        "Newsletters",
        "Audience segmentation",
        "Email templates",
        "Campaign reporting",
      ],
    },
    projects: {
      heading: "Email sequences built around real customer moments.",
      items: [
        {
          title: "WelcomeFlow Campaign",
          industry: "Professional Services",
          description:
            "A concept welcome sequence for introducing a business and guiding new enquiries towards a consultation.",
          tags: ["Welcome Sequence", "Lead Nurture"],
          image: { src: "/images/projects/welcomeflow-campaign.jpg", alt: "Two professionals discussing a new client engagement" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "RepeatCare Email System",
          industry: "Home Services",
          description: "A concept maintenance reminder and follow-up campaign for reconnecting with previous customers.",
          tags: ["Customer Retention", "Reminders"],
          image: { src: "/images/projects/repeatcare-email-system.jpg", alt: "A technician performing routine home maintenance" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "PropertyAlert Campaign",
          industry: "Real Estate",
          description: "A concept email system for sharing property updates and following up with interested buyers.",
          tags: ["Property Updates", "Segmentation"],
          image: { src: "/images/projects/propertyalert-campaign.jpg", alt: "An agent walking buyers through a property" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "ClinicConnect Patient Emails",
          industry: "Clinics",
          description: "A concept communication sequence for appointment reminders and approved patient information.",
          tags: ["Reminders", "Email Sequence"],
          image: { src: "/images/projects/clinicconnect-patient-emails.jpg", alt: "A clinician preparing patient communication" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    video: {
      heading: "See how a simple email sequence keeps working.",
      body: "Watch a short walkthrough of how a new contact can receive the right message at the right stage.",
      poster: { src: "/images/projects/welcomeflow-campaign.jpg", alt: "A preview of the welcome-sequence walkthrough" },
      videoSrc: null,
    },
    workflow: {
      heading: "From a new contact to a consistent follow-up.",
      steps: [
        "Understand the audience",
        "Plan the message sequence",
        "Write and design the emails",
        "Test the links and timing",
        "Track and improve the campaign",
      ],
    },
    faqs: [
      {
        question: "Can you work with our existing email platform?",
        answer: "In most cases, yes. We review the platform you're using during scoping and build within it where practical.",
      },
      {
        question: "Can you write the emails as well as build the campaigns?",
        answer: "Yes. We can write the email copy, design the sequence and set up the automation, or work from copy your team already has.",
      },
      {
        question: "Can you create welcome and follow-up sequences?",
        answer: "Yes — welcome sequences and follow-up campaigns are among the most common projects we build.",
      },
      {
        question: "Can emails be connected to our website or CRM?",
        answer: "Where practical, yes. We review your website and CRM setup during scoping and connect them so emails trigger from real activity, not manual lists.",
      },
      {
        question: "How often should we send campaigns?",
        answer: "It depends on your audience and offer — we'll recommend a realistic sending cadence during scoping rather than a generic one-size-fits-all schedule.",
      },
      {
        question: "How much will the email marketing setup cost?",
        answer: "It depends on scope — a single welcome sequence is priced differently to a full nurture and reactivation system. We give a clear quote after the discovery call.",
      },
    ],
    finalCta: {
      heading: "Give every enquiry a reason to keep moving.",
      body: "Tell us what happens after someone joins your list, requests information or makes a purchase. We'll help you create a clearer follow-up path.",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },

  "web-design": {
    slug: "web-design",
    seo: {
      title: "Web Design",
      description: "Build a website that makes the next step obvious. WALKFLOW designs sites that explain your offer and build trust quickly.",
    },
    hero: {
      eyebrow: "Web Design",
      heading: "Build a website that makes the next step obvious.",
      body: "WALKFLOW creates websites that explain your offer clearly, build trust quickly and help visitors enquire, book or buy with confidence.",
      primaryCta: { label: "Explore Web Design", href: "#deliver" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
    },
    problem: {
      heading: "A website should not make customers work to understand you.",
      points: [
        "Visitors do not understand the offer",
        "The website looks outdated",
        "Important information is difficult to find",
        "Mobile users struggle to take action",
        "Enquiry forms are unclear",
        "The website is disconnected from the rest of the business",
      ],
    },
    deliver: {
      heading: "A website built around what your customers need to do.",
      items: [
        "Business websites",
        "Landing pages",
        "Service websites",
        "E-commerce websites",
        "Website redesigns",
        "Conversion-focused page layouts",
        "Responsive mobile design",
        "Enquiry and booking forms",
        "CRM and automation connections",
        "Content structure and calls to action",
      ],
    },
    projects: {
      heading: "Websites built around real customer journeys.",
      items: [
        {
          title: "Northline Property Group",
          industry: "Real Estate",
          description: "A concept property website designed to make listings easier to browse and viewing enquiries easier to submit.",
          tags: ["Business Website", "Property", "Enquiry Flow"],
          image: { src: "/images/projects/northline-property-group.jpg", alt: "An agent showing a property to prospective buyers" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "ClearAir Mechanical",
          industry: "HVAC",
          description: "A concept service website helping customers understand HVAC services and request an estimate.",
          tags: ["Service Website", "Lead Generation"],
          image: { src: "/images/projects/clearair-mechanical.jpg", alt: "A technician servicing a home heating system" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "FlowFix Plumbing",
          industry: "Plumbing",
          description: "A concept mobile-first website for collecting clearer plumbing requests and emergency enquiries.",
          tags: ["Mobile Design", "Service Website"],
          image: { src: "/images/projects/flowfix-plumbing.jpg", alt: "A plumber assembling fittings in a bathroom" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "Harbour Dental Clinic",
          industry: "Clinic",
          description: "A concept clinic website designed to explain treatments and guide visitors towards appointment requests.",
          tags: ["Clinic Website", "Booking Flow"],
          image: { src: "/images/projects/harbour-dental-clinic.jpg", alt: "A dental clinician treating a patient" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "Meridian Advisory",
          industry: "Consulting",
          description:
            "A concept consulting website that presents expertise clearly and encourages qualified prospects to book a discovery call.",
          tags: ["Consulting Website", "Lead Generation"],
          image: { src: "/images/projects/meridian-advisory.jpg", alt: "A consultant reviewing a proposal document with a client" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "Oak & Field Store",
          industry: "E-commerce",
          description: "A concept online store focused on clear product pages, simple navigation and a smoother checkout journey.",
          tags: ["E-commerce", "Product Pages"],
          // No matching real photo in the supplied image folder for this one — left null
          // rather than substituting an unrelated picture. ServiceProjectCard.tsx renders
          // a plain placeholder panel here instead of a broken or misleading image.
          image: null,
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    video: {
      heading: "See how a clearer website changes the customer journey.",
      body: "Watch a short walkthrough of a website experience designed to help visitors understand, trust and take action.",
      poster: { src: "/images/projects/northline-property-group.jpg", alt: "A preview of the website-experience walkthrough" },
      videoSrc: null,
    },
    workflow: {
      heading: "From a business to a customer-ready website.",
      steps: [
        "Understand the business and audience",
        "Plan the page structure",
        "Design the customer experience",
        "Build and review the website",
        "Test on real devices",
        "Launch and hand over the project",
      ],
    },
    faqs: [
      {
        question: "Can you improve our existing website?",
        answer: "Yes. We can redesign or improve specific pages on your current site, or build a new one if that's the more practical option.",
      },
      {
        question: "Can you build an online store?",
        answer: "Yes. We build e-commerce websites focused on clear product pages and a simpler checkout journey.",
      },
      {
        question: "Will the website work on mobile?",
        answer: "Yes — every website we build is designed and tested for mobile, tablet and desktop before launch.",
      },
      {
        question: "Can you connect forms to our CRM?",
        answer: "Where practical, yes. We review your CRM during scoping and connect enquiry or booking forms to it directly.",
      },
      {
        question: "Can we provide our own images and content?",
        answer: "Yes. We're happy to work with content and images you already have, or help you source what's missing.",
      },
      {
        question: "How much will the website cost?",
        answer:
          "It depends on scope — a single landing page is priced differently to a full multi-page business website or online store. We give a clear quote after the discovery call.",
      },
    ],
    finalCta: {
      heading: "Make your website easier to understand and easier to act on.",
      body: "Tell us what your current website is missing or what you want customers to do next.",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    seo: {
      title: "Mobile App Development",
      description: "Give customers and teams an easier way to get things done. WALKFLOW builds practical mobile experiences for booking, service and access.",
    },
    hero: {
      eyebrow: "Mobile App Development",
      heading: "Give customers and teams an easier way to get things done.",
      body: "WALKFLOW helps turn useful app ideas into practical mobile experiences for booking, shopping, communication, customer access and internal operations.",
      primaryCta: { label: "Explore Mobile App Development", href: "#deliver" },
      secondaryCta: { label: "Request a Call", href: "/contact" },
    },
    problem: {
      heading: "Some customer journeys need more than a website.",
      points: [
        "Customers repeat the same actions manually",
        "Teams need access to information away from the office",
        "Important tasks are difficult to complete",
        "Frequent users need a faster experience",
        "The business has an app idea but no clear starting point",
      ],
    },
    deliver: {
      heading: "Mobile experiences built around useful actions.",
      items: [
        "Customer booking apps",
        "Property-search apps",
        "Service-request apps",
        "Client portals",
        "E-commerce mobile apps",
        "Appointment and reminder apps",
        "Internal team apps",
        "Push notifications",
        "Account and profile features",
        "App store preparation and launch support",
      ],
    },
    projects: {
      heading: "Mobile experiences built around real use cases.",
      items: [
        {
          title: "ViewPoint Property App",
          industry: "Real Estate",
          description: "A concept mobile experience for browsing properties, saving favourites and requesting viewings.",
          tags: ["Mobile App", "Property Search"],
          image: { src: "/images/projects/viewpoint-property-app.jpg", alt: "An aerial view of a residential neighbourhood" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "QuickServe Home App",
          industry: "Home Services",
          description: "A concept app for requesting service, sharing job details and tracking appointment updates.",
          tags: ["Mobile App", "Service Requests"],
          image: { src: "/images/projects/quickserve-home-app.jpg", alt: "A technician carrying out a home repair" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "BookWell Clinic App",
          industry: "Clinics",
          description: "A concept patient app for viewing services, requesting appointments and receiving reminders.",
          tags: ["Mobile App", "Booking"],
          image: { src: "/images/projects/bookwell-clinic-app.jpg", alt: "A patient during a clinic appointment" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          title: "ClientDesk Consulting App",
          industry: "Consulting",
          description: "A concept client app for accessing project updates, resources and onboarding tasks.",
          tags: ["Mobile App", "Client Access"],
          image: { src: "/images/projects/clientdesk-consulting-app.jpg", alt: "Consultants reviewing project data together" },
          projectHref: null,
          videoHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    video: {
      heading: "See how the app experience could work.",
      body: "Watch a short walkthrough of a mobile experience designed around the actions customers or teams repeat most often.",
      poster: { src: "/images/projects/viewpoint-property-app.jpg", alt: "A preview of the mobile app experience walkthrough" },
      videoSrc: null,
    },
    workflow: {
      heading: "From an app idea to a working first version.",
      steps: [
        "Define the main use case",
        "Plan the essential screens",
        "Build the first version",
        "Test the experience",
        "Prepare for launch",
        "Improve based on real use",
      ],
    },
    faqs: [
      {
        question: "Can you help us decide whether we need an app?",
        answer:
          "Yes. On the discovery call, we'll look at what you're trying to solve and tell you honestly whether an app is the right fit, or whether a website feature would do the job.",
      },
      {
        question: "Can the app connect to our website or CRM?",
        answer: "Where practical, yes. We review your existing tools during scoping and connect the app to them rather than duplicating data.",
      },
      {
        question: "Can you build for iPhone and Android?",
        answer: "Yes. Depending on scope, we build for both platforms from a single codebase where practical.",
      },
      {
        question: "Can we start with a smaller first version?",
        answer: "Yes. Most app projects start with one core use case and add features once the first version is in use.",
      },
      {
        question: "Who handles app-store submission?",
        answer: "We prepare and support the app-store submission process as part of the project.",
      },
      {
        question: "How much will the app project cost?",
        answer: "It depends on scope — a simple booking app is priced differently to a full client portal. We give a clear quote after the discovery call.",
      },
    ],
    finalCta: {
      heading: "Have an app idea that should be easier to use?",
      body: "Tell us what customers or staff need to do repeatedly. We'll help you decide whether a mobile app is the right next step.",
      cta: { label: "Request a Call", href: "/contact" },
    },
  },
};

/**
 * REVIEWS PLACEHOLDER — REPLACE BEFORE PUBLISHING.
 *
 * There are no verified client reviews anywhere in this project yet
 * (checked every content file and brand_assets/website-content.md, which
 * explicitly rules out invented testimonials). Shown as an honest
 * not-yet-available notice instead of fabricated quotes — see
 * ServiceReviews.tsx. Replace with real, permissioned reviews as soon as
 * they exist.
 */
export const serviceReviewsNotice = {
  heading: "What clients say about working with WALKFLOW.",
  notice:
    "We don't have published client reviews to share on this page yet. We'll add real feedback here as soon as we have it to share — we don't invent testimonials.",
};
