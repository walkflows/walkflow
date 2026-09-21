export type ServiceSlug = "business-automation-crm" | "email-marketing" | "web-design" | "mobile-app-development";

export type TitleBody = { title: string; body: string };

/** `width`/`height` are the image's real pixel dimensions (not display size) — used to reserve layout space and avoid a jump while each tall design image loads. */
export type EmailDesign = { src: string; alt: string; title: string; description: string; width: number; height: number };

export type ProjectItem = {
  slug: string;
  title: string;
  industry: string;
  description: string;
  tags: string[];
  image: { src: string; alt: string } | null;
  features: string[];
  videoSrc: string | null;
  videoPoster: { src: string; alt: string } | null;
  externalHref: string | null;
  devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING";
  /**
   * Overrides the card/detail badge that otherwise defaults to "Concept
   * Project" (Session 24) — e.g. "Independent design concept" for the Email
   * Marketing gallery's real brand work, which isn't a fictional concept
   * placeholder in the same sense as the other services' example projects,
   * but also isn't a paid client commission as far as this project's
   * records show. Never invent a classification not supplied.
   */
  classification?: string;
  /**
   * Full, uncropped design images for a project that has more than one
   * real deliverable to show (Session 24 — used by the Email Marketing
   * gallery). When present, ProjectDetail.tsx shows these instead of the
   * single `image` + `features` block used by every other service's
   * concept projects, so this is fully backward-compatible — projects
   * without `designs` render exactly as before.
   */
  designs?: EmailDesign[];
  /**
   * Longer detail-page introduction, shown only when present (Session 24).
   * Separate from the short `description` used on the gallery card, since
   * the Email Marketing gallery's cards should show just a project name —
   * see ServiceProjectCard.tsx's `showSummary` prop.
   */
  intro?: string;
};

export type ReviewItem = { quote: string; name: string; role: string };

export type ServicePageContent = {
  slug: ServiceSlug;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    /** Optional (Session 24) — Email Marketing's hero has no image, per explicit instruction; every other service still supplies one. */
    image?: { src: string; alt: string };
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  benefits: { heading: string; body: string; items: TitleBody[] };
  whatWeDo: { heading: string; body: string; items: TitleBody[] };
  whyWalkflow: { heading: string; items: TitleBody[] };
  projects: { heading: string; body: string; items: ProjectItem[] };
  process: { heading: string; steps: TitleBody[] };
  /** Empty on every page for now — no verified reviews exist yet. ServiceReviews.tsx renders nothing when this is empty, per explicit instruction to hide (not fake-fill) the section until real reviews exist. */
  reviews: ReviewItem[];
  faqs: { question: string; answer: string }[];
  finalCta: { heading: string; body: string; cta: { label: string; href: string } };
};

/**
 * Four Services pages (Session 23 rebuild), replacing Session 21's version
 * end to end from a fully-specified content file
 * (`WALKFLOW-services-content.md`, kept in the repo root as the copy source
 * of record) and two layout reference screenshots. New section order: Hero,
 * Benefits, What We Do, Why WALKFLOW, Projects, Four-Step Process, Reviews,
 * FAQs, Final CTA — the Session 21 structure's "The Problem" and "Project
 * Video" sections are gone; "Benefits" and "Why WALKFLOW" are new. All hero/
 * benefits/what-we-do/why-WALKFLOW/projects/process/FAQ copy is transcribed
 * verbatim from that file. `reviews` is empty on every page — the source
 * file's own reviews sections are editorial placeholders ("[Insert genuine
 * reviews relevant to ...]"), and per explicit instruction those must never
 * be displayed as if they were real testimonials; the section is built and
 * ready (ServiceReviews.tsx) but renders nothing until real reviews exist.
 *
 * Hero and project images are real photos from the `New image examples to
 * use` folder (the same source used for the Industry Solutions pages).
 * Project imagery mostly reuses the Session 21 selections, since this brief
 * keeps nearly the same project roster; only Email Marketing's fourth
 * project changed (was "ClinicConnect Patient Emails", now "NextStep —
 * Consulting Firms"), so that one has a newly-copied image. Hero images
 * are new choices — the source folder is organised by industry, not by
 * service, so each was picked for a reasonable thematic fit (e.g. an
 * electrical/control-panel photo for Business Automation & CRM) rather than
 * a literal match; flagged in the session notes as a reasonable judgement
 * call, not a verified brief.
 */
export const servicePages: Record<ServiceSlug, ServicePageContent> = {
  "business-automation-crm": {
    slug: "business-automation-crm",
    seo: {
      title: "Business Automation & CRM",
      description: "Less chasing. More getting things done. WALKFLOW connects your forms, customer records and follow-ups so your team can keep work moving.",
    },
    hero: {
      eyebrow: "Business Automation & CRM",
      heading: "Less chasing. More getting things done.",
      body: "An enquiry comes in. Who picks it up? What happens next? We connect your forms, customer records and follow-ups so your team can keep work moving without checking five different places.",
      image: { src: "/images/projects/hero-business-automation-crm.jpg", alt: "A technician connecting wiring inside a control panel" },
      primaryCta: { label: "Request a Call", href: "/contact?service=business-automation-crm" },
      secondaryCta: { label: "View Projects", href: "#projects" },
    },
    benefits: {
      heading: "Your team shouldn't have to remember everything.",
      body: "Copying customer details, checking who replied and chasing the next step all take time. A clear system gives those tasks a place to go—and your team fewer things to keep in their heads.",
      items: [
        { title: "Keep enquiries together", body: "Bring new requests into one organised system, with the details your team needs to respond." },
        { title: "Know who handles what", body: "Assign enquiries and tasks so the next person knows when it's their turn." },
        { title: "Follow up without starting over", body: "Set up reminders and agreed messages for enquiries, estimates and proposals that need another conversation." },
        { title: "Enter information once", body: "Connect supported tools so your team spends less time copying the same details between them." },
        { title: "See what needs attention", body: "Keep track of new leads, open conversations and work waiting on a decision." },
        { title: "Give customers a clearer response", body: "Acknowledge requests, explain the next step and pass questions to your team when personal help is needed." },
      ],
    },
    whatWeDo: {
      heading: "Connect the tasks that keep your business moving.",
      body: "Start with one process that causes delays. We'll work out which steps can run automatically and where your team should stay involved.",
      items: [
        { title: "CRM setup", body: "Organise contacts, conversation history, deal stages and responsibilities." },
        { title: "Enquiry capture", body: "Collect useful information from your website and other supported channels." },
        { title: "Follow-up workflows", body: "Set up reminders, message sequences and stopping rules when a customer replies." },
        { title: "Bookings and reminders", body: "Connect appointment requests, calendars and staff notifications." },
        { title: "Tool integrations", body: "Move information between the systems your business uses." },
        { title: "AI assistants", body: "Help answer approved questions, collect details and hand conversations to a person." },
      ],
    },
    whyWalkflow: {
      heading: "Built around how your team actually works.",
      items: [
        { title: "Start with the real bottleneck", body: "We look at where work stalls before deciding what to automate." },
        { title: "Know what you're paying for", body: "Your scope includes the agreed workflows, integrations and any ongoing platform costs." },
        { title: "Keep people in control", body: "Approvals and handoffs stay in place where a task needs human judgement." },
        { title: "Test the awkward situations", body: "Missing details, duplicate enquiries and failed connections are part of the review." },
        { title: "Learn how to use it", body: "We walk your team through the system and the tasks they'll manage." },
        { title: "Add more when it makes sense", body: "Begin with a useful workflow and expand around the way your business develops." },
      ],
    },
    projects: {
      heading: "See what a better process could look like.",
      body: "Explore these concept projects to see how everyday requests can become organised, manageable work.",
      items: [
        {
          slug: "leadflow",
          title: "LeadFlow",
          industry: "Real Estate",
          description: "Property enquiries collected with buyer requirements, assigned to an agent and tracked through viewing follow-up.",
          tags: ["CRM", "Enquiry Routing"],
          image: { src: "/images/projects/leadflow-crm-setup.jpg", alt: "Real-estate agents reviewing a property enquiry" },
          features: ["Buyer requirement capture", "Automatic agent assignment", "Viewing follow-up reminders"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "servicedesk",
          title: "ServiceDesk",
          industry: "Home Services",
          description: "Job requests organised by service type, with staff notifications and reminders to follow up on estimates.",
          tags: ["Service Requests", "Follow-Up"],
          image: { src: "/images/projects/servicedesk-request-workflow.jpg", alt: "A technician working on a plumbing repair" },
          features: ["Requests sorted by service type", "Staff notifications", "Estimate follow-up reminders"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "clinicconnect",
          title: "ClinicConnect",
          industry: "Clinics",
          description: "Appointment requests passed to reception with the details needed to respond and confirm the next step.",
          tags: ["Appointment Requests", "Staff Notifications"],
          image: { src: "/images/projects/clinicconnect-enquiry-system.jpg", alt: "A clinic reception and administrative area" },
          features: ["Structured appointment requests", "Reception notifications", "Confirmation follow-up"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "consulttrack",
          title: "ConsultTrack",
          industry: "Consulting Firms",
          description: "Discovery enquiries, proposals and onboarding tasks brought into one pipeline.",
          tags: ["Sales Pipeline", "Onboarding"],
          image: { src: "/images/projects/consulttrack-pipeline.jpg", alt: "A consulting team reviewing a pipeline of opportunities" },
          features: ["Discovery enquiry intake", "Proposal tracking", "Onboarding task checklist"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    process: {
      heading: "From a repeated task to a working system.",
      steps: [
        { title: "Show us the process", body: "Walk us through what happens today, which tools you use and where your team gets stuck." },
        { title: "Agree on the workflow", body: "We map the steps, responsibilities and exceptions, then confirm the scope and cost." },
        { title: "Build and test", body: "We connect the agreed tools and test typical requests alongside situations that could go wrong." },
        { title: "Put it to work", body: "We help your team get started and explain how to monitor the workflow and handle exceptions." },
      ],
    },
    reviews: [],
    faqs: [
      {
        question: "Can you work with the tools we already use?",
        answer: "We'll check their integration options first. If a connection needs a paid plan or a different approach, we'll explain that before work begins.",
      },
      {
        question: "Do we need to automate everything?",
        answer: "No. You can start with one task, such as organising new enquiries or following up on estimates.",
      },
      {
        question: "What happens if an automation fails?",
        answer: "We agree on suitable alerts, checks and recovery steps as part of the project. Ongoing monitoring and maintenance can be scoped separately.",
      },
    ],
    finalCta: {
      heading: "Which task would you like to stop chasing?",
      body: "Tell us what your team keeps copying, checking or following up. We'll help you work out a useful place to start.",
      cta: { label: "Request a Call", href: "/contact?service=business-automation-crm" },
    },
  },

  "email-marketing": {
    slug: "email-marketing",
    seo: {
      title: "Email Marketing",
      description: "Give interested customers a reason to come back. WALKFLOW writes, designs and sets up emails that answer questions and keep your business in mind.",
    },
    hero: {
      eyebrow: "Email Marketing",
      heading: "Give interested customers a reason to come back.",
      body: "Some people need more time before they buy. We write, design and set up emails that answer their questions, explain your offer and keep your business in mind.",
      // Session 24: the hero image (a composite of the four brand designs) was tried, then explicitly removed per Joshua's feedback — no replacement image, by request. `image` is optional on ServiceHero.tsx precisely for this case.
      primaryCta: { label: "Request a Call", href: "/contact?service=email-marketing" },
      secondaryCta: { label: "View Projects", href: "#projects" },
    },
    benefits: {
      heading: "The first visit doesn't have to be the last conversation.",
      body: "Someone joins your list, asks about a service or buys from you once. A useful email gives you a way to continue that relationship without writing every message from scratch.",
      items: [
        { title: "Welcome new subscribers", body: "Introduce your business and help people find the information they signed up for." },
        { title: "Answer questions before they become doubts", body: "Explain your services, process and next steps while someone is considering their options." },
        { title: "Stay in touch consistently", body: "Plan a realistic email schedule that your business can maintain." },
        { title: "Make messages more relevant", body: "Group contacts by their interests or actions so everyone doesn't receive the same email." },
        { title: "Invite customers back", body: "Share useful updates, relevant offers and reminders with people who have agreed to hear from you." },
        { title: "Understand what gets a response", body: "Review clicks, enquiries and purchases where tracking is available, then use those findings to improve." },
      ],
    },
    whatWeDo: {
      heading: "The message, the design and the setup.",
      body: "Whether you need your first welcome email or a complete campaign, we help turn a contact list into a planned conversation.",
      items: [
        { title: "Email planning", body: "Define the audience, purpose and action for each message." },
        { title: "Copywriting and design", body: "Create readable emails with a clear reason to click." },
        { title: "Welcome sequences", body: "Introduce your business when someone subscribes." },
        { title: "Lead follow-up sequences", body: "Share answers and useful information with interested prospects." },
        { title: "Newsletters and promotions", body: "Keep subscribers informed about updates and relevant offers." },
        { title: "Campaign setup and reporting", body: "Configure audiences, timing, links and tracking within your chosen platform." },
      ],
    },
    whyWalkflow: {
      heading: "Emails your customers can understand and act on.",
      items: [
        { title: "One clear purpose", body: "Each email has a specific job, whether that's explaining a service or inviting a booking." },
        { title: "Your voice comes through", body: "We use your offer, examples and language to make the messages sound like your business." },
        { title: "Readable on a phone", body: "Copy and layouts are designed for people checking their inbox on the move." },
        { title: "Timing with a reason", body: "Sequences follow the customer's situation, with agreed rules for when messages start and stop." },
        { title: "Care with your contact list", body: "We account for permission, unsubscribes and duplicate contacts during setup." },
        { title: "Useful reporting", body: "We focus on the actions that matter to your campaign and explain what the available data shows." },
      ],
    },
    /**
     * Session 24: replaced the four fictional concept projects with four
     * real email design projects, per an explicit content update. The
     * source file this brief pointed to ("email marketing content.txt")
     * exists but is empty — no per-project introduction copy, and no new
     * FAQs, were supplied. `intro` and each design's `description` below
     * are kept strictly factual (only what's visibly true from the artwork
     * itself — subject, and what the email promotes), never a marketing
     * claim, result or client relationship that wasn't supplied. Every
     * project's `devNote` still flags PLACEHOLDER — REPLACE BEFORE
     * PUBLISHING since a richer written introduction from Joshua is still
     * pending; `description` (the short gallery-card line) is left empty on
     * purpose — this gallery's cards show just a project name, per explicit
     * instruction. `industry` holds each brand's actual category (visibly
     * true from the artwork), not one of WALKFLOW's four target industries
     * — these are real consumer brands, not industry-solution concept
     * pieces.
     */
    projects: {
      heading: "Explore our email designs.",
      body: "A selection of email designs that put the product, offer and next step front and centre.",
      items: [
        {
          slug: "suku-vitamins",
          title: "SUKU Vitamins",
          industry: "Wellness & Supplements",
          description: "",
          intro: "Two email designs for SUKU Vitamins, a gummy-vitamins and wellness brand: a welcome email for new subscribers and a product-focused routine email.",
          tags: [],
          image: { src: "/images/email-marketing/suku-vitamins-mockup.png", alt: "SUKU Vitamins email design showcase" },
          features: [],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "Independent design concept",
          designs: [
            {
              src: "/images/email-marketing/suku-vitamins-welcome.png",
              alt: "SUKU Vitamins welcome email design",
              title: "Welcome to SUKU",
              description: "A welcome email introducing new subscribers to SUKU's gummy vitamins, with a first-order discount.",
              width: 724,
              height: 2172,
            },
            {
              src: "/images/email-marketing/suku-vitamins-feel-good-routine.png",
              alt: "SUKU Vitamins “Find Your Daily Feel-Good Routine” email design",
              title: "Find Your Daily Feel-Good Routine",
              description: "A product email highlighting SUKU's bestselling gummies and the brand's wellness benefits.",
              width: 724,
              height: 2172,
            },
          ],
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "skipjak",
          title: "SKIPJAK",
          industry: "Outdoor & Watersports",
          description: "",
          intro: "Two email designs for SKIPJAK, an outdoor kayaking and watersports gear brand: a product showcase and a follow-up adventure-gear email.",
          tags: [],
          image: { src: "/images/email-marketing/skipjak-mockup.png", alt: "SKIPJAK email design showcase" },
          features: [],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "Independent design concept",
          designs: [
            {
              src: "/images/email-marketing/skipjak-pack-light-paddle-far.png",
              alt: "SKIPJAK “Pack Light. Paddle Far.” email design",
              title: "Pack Light. Paddle Far.",
              description: "A product email showcasing SKIPJAK's kayaking and watersports gear for outdoor adventures.",
              width: 887,
              height: 1774,
            },
            {
              src: "/images/email-marketing/skipjak-ready-for-next-adventure.png",
              alt: "SKIPJAK “Ready for Your Next Water Adventure?” email design",
              title: "Ready for Your Next Water Adventure?",
              description: "A follow-up email highlighting SKIPJAK's outdoor essentials and adventure-ready gear.",
              width: 724,
              height: 2172,
            },
          ],
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "basoni-kaffee",
          title: "Basoni Kaffee",
          industry: "Coffee & Beverage",
          description: "",
          intro: "Two email designs for Basoni Kaffee, a coffee brand: a home-brewing product email and a coffee-school promotion email.",
          tags: [],
          image: { src: "/images/email-marketing/basoni-kaffee-mockup.png", alt: "Basoni Kaffee email design showcase" },
          features: [],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "Independent design concept",
          designs: [
            {
              src: "/images/email-marketing/basoni-espresso-genuss.png",
              alt: "Basoni Kaffee “Espressogenuss für Zuhause” email design",
              title: "Espressogenuss für Zuhause",
              description: "An email introducing Basoni's coffee range for home espresso brewing.",
              width: 935,
              height: 1683,
            },
            {
              src: "/images/email-marketing/basoni-kaffee-erleben.png",
              alt: "Basoni Kaffee “Kaffee erleben. Wissen verschenken.” email design",
              title: "Kaffee erleben. Wissen verschenken.",
              description: "An email promoting Basoni's in-person coffee school and barista knowledge.",
              width: 935,
              height: 1683,
            },
          ],
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "psc",
          title: "PSC",
          industry: "Fashion & Accessories",
          description: "",
          intro: "Two email designs for PSC, a fashion and accessories brand: a men's essentials collection email and a women's handbag collection email.",
          tags: [],
          image: { src: "/images/email-marketing/psc-mockup.png", alt: "PSC email design showcase" },
          features: [],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "Independent design concept",
          designs: [
            {
              src: "/images/email-marketing/psc-men-new-essentials.png",
              alt: "PSC “Men's New Essentials” email design",
              title: "Men's New Essentials",
              description: "A men's apparel email featuring PSC's new-season essentials collection.",
              width: 724,
              height: 2172,
            },
            {
              src: "/images/email-marketing/psc-women-bag-collection.png",
              alt: "PSC “The Bag Edit” email design",
              title: "The Bag Edit",
              description: "A women's accessories email featuring PSC's handbag collection.",
              width: 724,
              height: 2172,
            },
          ],
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    process: {
      heading: "From “we should send an email” to a clear plan.",
      steps: [
        { title: "Get to know your audience", body: "We review your offer, your contact list and what people need to know before taking action." },
        { title: "Plan the conversation", body: "We agree on the emails, their timing and where each link should take the reader." },
        { title: "Write, design and test", body: "You review the content before we check layouts, links, personalisation and sequence settings." },
        { title: "Launch and review", body: "We launch the agreed campaign and review the available results. Continuing campaign management can be arranged separately." },
      ],
    },
    reviews: [],
    // Session 25: replaced with the real FAQ content Joshua supplied, superseding the 3-question placeholder set (the "email marketing content.txt" file referenced in Session 24 was still empty when this was sent, so this arrived as a direct message instead).
    faqs: [
      {
        question: "Can you help if I'm new to email marketing?",
        answer:
          "Yes. WALKFLOW can help you choose an email platform, set up your account and create your first emails. We'll start with what your business needs and build from there.",
      },
      {
        question: "What types of businesses do you work with?",
        answer:
          "We work with online stores and service businesses, including real estate businesses, home service providers, clinics and consulting firms. The emails we create depend on your audience and what you want them to do next.",
      },
      {
        question: "Do you write and design the emails?",
        answer:
          "Yes. We can handle the copy, design and setup, keeping everything consistent with your brand. You'll review and approve the emails before they go live.",
      },
      {
        question: "Can you work with the email platform I already use?",
        answer:
          "Usually, yes. Tell us which platform you use, and we'll check what's possible with your setup. If you haven't chosen one, we can help you find an option that fits your needs and budget.",
      },
      {
        question: "What's the difference between an email campaign and an automated email?",
        answer:
          "A campaign is a one-off message, such as a promotion, newsletter or announcement. Automated emails are triggered by an action, such as joining your list, making an enquiry or completing a purchase.",
      },
      {
        question: "Can you set up welcome emails and automatic follow-ups?",
        answer:
          "Yes. Depending on your platform, we can set up welcome sequences, enquiry follow-ups, abandoned checkout reminders and emails that encourage previous customers to return. We'll recommend the sequences that make sense for your business.",
      },
      {
        question: "What if I don't have an email list yet?",
        answer:
          "We can help you set up signup forms and give visitors a clear reason to subscribe. We focus on building a list of people who choose to hear from you, rather than using purchased contacts.",
      },
      {
        question: "What do you need from me to get started?",
        answer:
          "We usually need access to your email platform, your brand assets and some information about your audience, offers and goals. If you already send emails, examples and past results will help us understand what to improve.",
      },
      {
        question: "How much does it cost, and how long does it take?",
        answer:
          "That depends on the number of emails, the design work and the automation involved. WALKFLOW will confirm the scope, price and timeline before work begins, including any separate platform subscription costs.",
      },
      {
        question: "How will I know whether my emails are working?",
        answer:
          "We agree on what success means for your business, then track relevant actions such as clicks, enquiries, bookings or purchases where tracking is available. Results help us identify what to improve; we don't promise a fixed number of sales.",
      },
    ],
    finalCta: {
      heading: "What should customers hear from you next?",
      body: "Share your offer and what you want people to do. We'll help you plan the emails that move the conversation forward.",
      cta: { label: "Request a Call", href: "/contact?service=email-marketing" },
    },
  },

  "web-design": {
    slug: "web-design",
    seo: {
      title: "Web Design",
      description: "Make your website a reason to choose you. WALKFLOW builds websites that show the value of your work and make it easy to enquire, book or buy.",
    },
    hero: {
      eyebrow: "Web Design",
      heading: "Make your website a reason to choose you.",
      body: "People should understand what you offer without having to piece it together. We build websites that show the value of your work and make it easy to enquire, book or buy.",
      image: { src: "/images/projects/hero-web-design.jpg", alt: "Hands working on a laptop beside project documents" },
      primaryCta: { label: "Request a Call", href: "/contact?service=web-design" },
      secondaryCta: { label: "View Projects", href: "#projects" },
    },
    benefits: {
      heading: "You've worked hard on your business. Your website should show it.",
      body: "If your site feels outdated, hides important details or is difficult to use on a phone, visitors may leave with the wrong impression. We help you give them a clearer picture.",
      items: [
        { title: "Explain your offer quickly", body: "Help visitors understand what you do, who it's for and why it matters to them." },
        { title: "Show the quality of your work", body: "Give your projects, photographs and genuine customer feedback the space they deserve." },
        { title: "Make mobile visits easier", body: "Keep text readable, navigation simple and forms practical on smaller screens." },
        { title: "Guide the next step", body: "Place enquiry, booking and purchase options where visitors need them." },
        { title: "Help customers find answers", body: "Organise services, pricing information and common questions into a sensible page structure." },
        { title: "Put enquiries to work", body: "Connect forms to an agreed destination so your team can respond with the right information." },
      ],
    },
    whatWeDo: {
      heading: "Everything your website needs to tell the right story.",
      body: "We plan the pages around your customers, then bring the content, visuals and functionality together.",
      items: [
        { title: "Business websites", body: "Present your services, experience and contact options clearly." },
        { title: "Website redesigns", body: "Improve the structure and experience of an existing site." },
        { title: "Landing pages", body: "Build a focused destination for an offer or advertising campaign." },
        { title: "Online stores", body: "Organise products, product information and the buying journey." },
        { title: "Forms and integrations", body: "Connect enquiries, bookings and other agreed actions." },
        { title: "Launch essentials", body: "Check mobile layouts, page titles, links, forms and performance before launch." },
      ],
    },
    whyWalkflow: {
      heading: "A website you can feel confident sending people to.",
      items: [
        { title: "Built around your customers", body: "We plan what visitors need to know and what they should be able to do." },
        { title: "Your work takes centre stage", body: "Real projects, images and examples help people understand what makes your business worth considering." },
        { title: "A clear scope", body: "You know the agreed pages, features, cost and responsibilities before the build starts." },
        { title: "Room for your feedback", body: "You review the design and content at agreed stages as the website takes shape." },
        { title: "Care beyond the desktop", body: "We check how the layout and key actions work across screen sizes." },
        { title: "A practical handover", body: "We explain the updates you can make and the options for future support." },
      ],
    },
    projects: {
      heading: "Explore the details behind each design.",
      body: "Browse these concept websites to see how different businesses can present their work and guide their customers.",
      items: [
        {
          slug: "northline",
          title: "Northline Property Group",
          industry: "Real Estate",
          description: "A property website with clear listing information and a straightforward way to request a viewing.",
          tags: ["Property Website", "Viewing Enquiries"],
          image: { src: "/images/projects/northline-property-group.jpg", alt: "An agent showing a property to prospective buyers" },
          features: ["Clear listing pages", "Viewing request form", "Mobile-friendly browsing"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "clearair",
          title: "ClearAir Mechanical",
          industry: "HVAC",
          description: "A service website that explains installation and maintenance options and guides customers towards an estimate request.",
          tags: ["Service Website", "Estimate Requests"],
          image: { src: "/images/projects/clearair-mechanical.jpg", alt: "A technician servicing a home heating system" },
          features: ["Service explainer pages", "Estimate request form", "Maintenance plan overview"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "flowfix",
          title: "FlowFix Plumbing",
          industry: "Plumbing",
          description: "A website designed for customers on their phones, with visible contact options and a simple job enquiry form.",
          tags: ["Mobile Design", "Job Enquiries"],
          image: { src: "/images/projects/flowfix-plumbing.jpg", alt: "A plumber assembling fittings in a bathroom" },
          features: ["Mobile-first layout", "Simple job enquiry form", "Visible contact options"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "harbour-dental",
          title: "Harbour Dental Clinic",
          industry: "Clinics",
          description: "A clinic website that explains services, introduces the team and makes appointment requests easy to find.",
          tags: ["Clinic Website", "Appointment Requests"],
          image: { src: "/images/projects/harbour-dental-clinic.jpg", alt: "A dental clinician treating a patient" },
          features: ["Treatment explainer pages", "Team introduction", "Appointment request form"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "meridian",
          title: "Meridian Advisory",
          industry: "Consulting Firms",
          description: "A consulting website that presents expertise, explains engagements and invites prospects to discuss their needs.",
          tags: ["Consulting Website", "Discovery Calls"],
          image: { src: "/images/projects/meridian-advisory.jpg", alt: "A consultant reviewing a proposal document with a client" },
          features: ["Expertise-led pages", "Engagement overview", "Discovery-call booking link"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "oak-field",
          title: "Oak & Field",
          industry: "Online Retail",
          description: "An online store with organised collections, informative product pages and clear shopping navigation.",
          tags: ["E-commerce", "Product Pages"],
          // No matching real photo in the supplied image folder — left null rather than substituting an unrelated picture.
          image: null,
          features: ["Organised collections", "Informative product pages", "Clear checkout navigation"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    process: {
      heading: "A clear route from your ideas to launch.",
      steps: [
        { title: "Understand the business", body: "We discuss your customers, your current website and what the new site needs to achieve." },
        { title: "Plan and design", body: "We organise the pages and content, then create a visual direction for you to review." },
        { title: "Build and refine", body: "We build the agreed pages, add your content and work through feedback at planned review stages." },
        { title: "Test and launch", body: "We check the important journeys, launch when approved and show you how to manage agreed updates." },
      ],
    },
    reviews: [],
    faqs: [
      {
        question: "Can you improve my existing website?",
        answer: "Yes. We'll review it and explain whether focused changes or a rebuild would better suit your needs.",
      },
      {
        question: "Can I supply my own images and copy?",
        answer: "Yes. Your own work and photographs help make the site personal to your business. We can also help organise or refine the content.",
      },
      {
        question: "Can I update the website after launch?",
        answer: "Yes. The editing process depends on the platform. We'll explain how updates work and agree on any handover or support you need.",
      },
    ],
    finalCta: {
      heading: "Ready for a website that reflects your business?",
      body: "Send us your current website or tell us what you're planning. We'll help you work out the pages and features you need.",
      cta: { label: "Request a Call", href: "/contact?service=web-design" },
    },
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    seo: {
      title: "Mobile App Development",
      description: "Turn your app idea into something people can use. WALKFLOW plans and builds mobile apps around the tasks people need to complete.",
    },
    hero: {
      eyebrow: "Mobile App Development",
      heading: "Turn your app idea into something people can use.",
      body: "Give customers a simpler way to book, order or stay updated—or help your team get work done away from a desk. We plan and build mobile apps around the tasks people need to complete.",
      image: { src: "/images/projects/hero-mobile-app-development.jpg", alt: "A tradesperson working on-site away from an office" },
      primaryCta: { label: "Request a Call", href: "/contact?service=mobile-app-development" },
      secondaryCta: { label: "View Projects", href: "#projects" },
    },
    benefits: {
      heading: "Make the tasks people repeat easier to complete.",
      body: "An app earns its place on someone's phone by being useful. We help you identify the actions worth building around and keep the first version focused on them.",
      items: [
        { title: "Make repeat visits simpler", body: "Let customers return to their account, saved items or requests without starting again." },
        { title: "Keep useful information close", body: "Give people access to the details they need while they're away from a computer." },
        { title: "Reduce back-and-forth", body: "Bring requests, updates and agreed information into one accessible place." },
        { title: "Keep users informed", body: "Use relevant notifications to let people know when something needs their attention." },
        { title: "Support work on the move", body: "Help staff view assignments, submit updates or collect information from their phones." },
        { title: "Start with the essentials", body: "Build a focused first version so you can learn from use before investing in more features." },
      ],
    },
    whatWeDo: {
      heading: "From the first screens to the working app.",
      body: "We help define what your app should do, design the experience and build the features agreed for your first release.",
      items: [
        { title: "App planning", body: "Clarify the audience, main tasks and essential features." },
        { title: "Screen design", body: "Map the journey and create layouts you can review before development." },
        { title: "Customer apps", body: "Support actions such as booking, browsing, ordering and checking updates." },
        { title: "Team apps", body: "Help staff manage agreed tasks and information on the move." },
        { title: "Connected features", body: "Add accounts, notifications and integrations where the project requires them." },
        { title: "Testing and release support", body: "Test the agreed devices and help prepare for the chosen distribution route." },
      ],
    },
    whyWalkflow: {
      heading: "Keep the idea clear as the build gets bigger.",
      items: [
        { title: "A useful first version", body: "We help separate essential features from ideas that can wait." },
        { title: "Review the journey early", body: "See how users move through the screens before the full build." },
        { title: "Choose the right approach", body: "We discuss the platform, integrations and maintenance needs before committing." },
        { title: "Know the ongoing costs", body: "Hosting, third-party services and app-store fees are outlined where applicable." },
        { title: "Test real tasks", body: "We check whether users can complete the actions the app was built for." },
        { title: "Plan beyond release", body: "We explain what future updates and support will involve." },
      ],
    },
    projects: {
      heading: "Explore the app experiences we're planning around.",
      body: "These concept projects show how a focused mobile app could help customers and teams complete everyday tasks.",
      items: [
        {
          slug: "viewpoint",
          title: "ViewPoint",
          industry: "Real Estate",
          description: "A property app for browsing listings, saving favourites and sending viewing requests.",
          tags: ["Property Search", "Saved Listings"],
          image: { src: "/images/projects/viewpoint-property-app.jpg", alt: "An aerial view of a residential neighbourhood" },
          features: ["Listing search and filters", "Saved favourites", "Viewing request flow"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "quickserve",
          title: "QuickServe",
          industry: "Home Services",
          description: "A service app for sharing job details, requesting appointments and checking request updates.",
          tags: ["Service Requests", "Customer Updates"],
          image: { src: "/images/projects/quickserve-home-app.jpg", alt: "A technician carrying out a home repair" },
          features: ["Job-detail submission", "Appointment requests", "Status updates"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "bookwell",
          title: "BookWell",
          industry: "Clinics",
          description: "An appointment app for browsing services, submitting booking requests and viewing confirmed appointment details.",
          tags: ["Appointment Requests", "Reminders"],
          image: { src: "/images/projects/bookwell-clinic-app.jpg", alt: "A patient during a clinic appointment" },
          features: ["Service browsing", "Booking requests", "Appointment reminders"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
        {
          slug: "clientdesk",
          title: "ClientDesk",
          industry: "Consulting Firms",
          description: "A client app that brings project updates, shared resources and onboarding tasks together.",
          tags: ["Client Access", "Project Updates"],
          image: { src: "/images/projects/clientdesk-consulting-app.jpg", alt: "Consultants reviewing project data together" },
          features: ["Project update feed", "Shared resource library", "Onboarding checklist"],
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          devNote: "PLACEHOLDER — REPLACE BEFORE PUBLISHING",
        },
      ],
    },
    process: {
      heading: "Build the first version with a clear purpose.",
      steps: [
        { title: "Define the main task", body: "We discuss who will use the app and what they need to accomplish." },
        { title: "Plan the screens", body: "We map the user journey, agree on the first-release features and design the key screens." },
        { title: "Build and test", body: "We develop the app and integrations, then test the agreed journeys and devices." },
        { title: "Prepare for release", body: "We help with the agreed release process and outline the next steps for maintenance and improvements." },
      ],
    },
    reviews: [],
    faqs: [
      {
        question: "How do I know whether I need an app?",
        answer: "Tell us what users need to do and how often. We'll help you assess whether an app or an improved website is the better fit.",
      },
      {
        question: "Can the app work on iPhone and Android?",
        answer: "We can scope a project for both. The approach depends on the features, budget and device requirements.",
      },
      {
        question: "Are app-store fees and maintenance included?",
        answer: "We'll list what the quote covers. Store accounts, external subscriptions and ongoing maintenance are explained separately, and store approval remains with Apple or Google.",
      },
    ],
    finalCta: {
      heading: "What would your app help someone do?",
      body: "Tell us the idea, who it's for and the task it should make easier. We'll help you define a sensible first version.",
      cta: { label: "Request a Call", href: "/contact?service=mobile-app-development" },
    },
  },
};
