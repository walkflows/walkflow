export type ServiceSlug = "business-automation-crm" | "email-marketing" | "web-design" | "mobile-app-development";

export type TitleBody = { title: string; body: string };

/** `width`/`height` are the image's real pixel dimensions (not display size) — used to reserve layout space and avoid a jump while each tall design image loads. */
export type EmailDesign = { src: string; alt: string; title: string; description: string; width: number; height: number };

/** A single case-study/screenshot image for the App Development gallery (Session 26) — no per-image title/description, since none were supplied; order is the explicit array order, not filesystem order. */
export type AppScreen = { src: string; alt: string; width: number; height: number };

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
  /** Optional (Session 26) — only the temporary/concept-placeholder projects need this marker; real projects (e.g. the App Development gallery) omit it. */
  devNote?: "PLACEHOLDER — REPLACE BEFORE PUBLISHING";
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
  /**
   * App Development gallery additions (Session 26). `screens` is the
   * ordered set of inner case-study/screenshot images shown on the detail
   * page via `AppScreenGallery.tsx` — when present, this replaces the
   * single `image` + `features` block, the same way `designs` does for
   * Email Marketing, so every other page's projects are unaffected.
   * `technology`/`technologyLabel` render a labelled line (the brief uses
   * different labels per project — "Technology" vs "Project scope" — hence
   * the label being data, not hardcoded). `videoLabel` is the custom
   * scroll-to-video button text (e.g. "Watch App Walkthrough"); only
   * rendered when a real `videoSrc` also exists. `featuresHeading`
   * overrides the default "What this concept covers" heading — these are
   * real projects, not fictional concept placeholders, so it reads "Key
   * Features" instead.
   */
  screens?: AppScreen[];
  technology?: string;
  technologyLabel?: string;
  videoLabel?: string;
  featuresHeading?: string;
  /** Short tagline shown on the gallery card beneath the title, and again on the detail page (Session 26) — distinct from the longer `intro` paragraph. */
  headline?: string;
  /** Full detail-page H1 text (e.g. "GEVITI — TELEHEALTH APP"), overriding the plain `title` used everywhere else (gallery card, back-link, nav). Falls back to `title` when absent. */
  detailTitle?: string;
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
    /** Optional (Session 29) — every service page now omits this; the showcase sits directly below the hero and no longer needs a "jump to it" button. */
    secondaryCta?: { label: string; href: string };
  };
  whatWeDo: { heading: string; body: string; items: TitleBody[] };
  /** Session 29: merged with the old separate "Benefits" section into this one "Why WALKFLOW" section, per explicit instruction — every page's `items` below now combines what used to be two lists into one, reusing existing copy rather than inventing new lines. */
  whyWalkflow: { heading: string; items: TitleBody[] };
  projects: { eyebrow?: string; heading: string; body: string; items: ProjectItem[] };
  process: { heading: string; steps: TitleBody[] };
  /** Empty on every page for now — no verified reviews exist yet. ServiceReviews.tsx renders nothing when this is empty, per explicit instruction to hide (not fake-fill) the section until real reviews exist. */
  reviews: ReviewItem[];
  faqs: { question: string; answer: string }[];
  finalCta: { heading: string; body: string; cta: { label: string; href: string } };
  /**
   * Overrides every project-detail page's plain default closing CTA
   * (Session 26 — used by the App Development gallery, where all four
   * projects share one closing message rather than each getting a unique
   * one). Every other service's project pages fall back to the existing
   * bare "Request a Call" button.
   */
  projectClosingCta?: { heading: string; body: string; cta: { label: string; href: string } };
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
      // Session 29: hero image removed per explicit instruction — no replacement image.
      primaryCta: { label: "Book a Consultation", href: "/contact?service=business-automation-crm" },
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
    // Session 29: merged with the old separate "Benefits" section (six more items) into this one "Why WALKFLOW" section — kept to six items covering the brief's named themes (clearer lead ownership, fewer repeated tasks, consistent follow-up, visibility into enquiries) plus two of the strongest remaining trust points, all reusing existing approved copy verbatim rather than inventing anything new.
    whyWalkflow: {
      heading: "Built around how your team actually works.",
      items: [
        { title: "Know who handles what", body: "Assign enquiries and tasks so the next person knows when it's their turn." },
        { title: "Enter information once", body: "Connect supported tools so your team spends less time copying the same details between them." },
        { title: "Follow up without starting over", body: "Set up reminders and agreed messages for enquiries, estimates and proposals that need another conversation." },
        { title: "See what needs attention", body: "Keep track of new leads, open conversations and work waiting on a decision." },
        { title: "Know what you're paying for", body: "Your scope includes the agreed workflows, integrations and any ongoing platform costs." },
        { title: "Keep people in control", body: "Approvals and handoffs stay in place where a task needs human judgement." },
      ],
    },
    projects: {
      heading: "See business automation in action.",
      body: "Explore how everyday enquiries and tasks can move through a clearer, connected process.",
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
        { title: "Map the process", body: "Walk us through what happens today, which tools you use and where your team gets stuck." },
        { title: "Design the workflow", body: "We map the steps, responsibilities and exceptions, then confirm the scope and cost." },
        { title: "Build and test", body: "We connect the agreed tools and test typical requests alongside situations that could go wrong." },
        { title: "Launch and hand over", body: "We help your team get started and explain how to monitor the workflow and handle exceptions." },
      ],
    },
    reviews: [],
    // Session 29: replaced with the exact 10 approved Business Automation & CRM FAQs, verbatim and in order, superseding the old 3-question set.
    faqs: [
      {
        question: "What parts of my business can you automate?",
        answer:
          "Common starting points include capturing enquiries, assigning leads, sending reminders, following up with prospects and creating internal tasks. We'll help identify repetitive work where automation could make a practical difference.",
      },
      {
        question: "Can you work with the tools we already use?",
        answer: "We'll check their integration options first. If a connection requires a paid plan, custom development or a different approach, we'll explain that before work begins.",
      },
      {
        question: "Do we need a CRM before getting started?",
        answer: "No. We can help you choose and set up a CRM, improve an existing one or assess whether a simpler setup is enough for your current needs.",
      },
      {
        question: "Do we need to automate everything?",
        answer: "No. Starting with one useful workflow is often the most manageable approach. Decisions that need personal judgement or approval can stay with your team.",
      },
      {
        question: "How much does automation and CRM setup cost?",
        answer:
          "The cost depends on the workflows, tools and level of customisation involved. We'll outline the setup fee and any expected software subscriptions or usage charges before you commit.",
      },
      {
        question: "How long does it take to set up?",
        answer:
          "Timing depends on the number of connections, the condition of your existing data and the testing required. We'll agree on a timeline after reviewing your process and account access requirements.",
      },
      {
        question: "Can you move our existing contacts into a new CRM?",
        answer:
          "We can assess your current data and plan an import where the platforms support it. We'll agree on which records to transfer and how to handle duplicates, missing information and backups before making changes.",
      },
      {
        question: "How will you protect our business and customer information?",
        answer:
          "We'll review the data each workflow needs, who should have access and how connected tools handle it. Any sensitive information or industry-specific requirements should be discussed before choosing the setup.",
      },
      {
        question: "What happens if an automation fails?",
        answer:
          "We'll plan how failures should be flagged and handled, using alerts, retries or manual fallback steps where appropriate. Your support agreement will define who monitors the workflows and handles fixes.",
      },
      {
        question: "Will our team be able to use and manage the system?",
        answer:
          "We'll agree on the guidance and handover your team needs, including everyday tasks and when to ask for help. Ongoing support and workflow improvements can also be included in the project scope.",
      },
    ],
    finalCta: {
      heading: "Which task would you like to stop chasing?",
      body: "Tell us what your team keeps copying, checking or following up. We'll help you work out a useful place to start.",
      cta: { label: "Book a Consultation", href: "/contact?service=business-automation-crm" },
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
      primaryCta: { label: "Book a Consultation", href: "/contact?service=email-marketing" },
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
    // Session 29: merged with the old separate "Benefits" section into this one "Why WALKFLOW" section — kept to six items covering the brief's named themes (readable layouts, consistent brand presentation, relevant messaging, a clear next action) plus two more strong points, all reusing existing approved copy verbatim.
    whyWalkflow: {
      heading: "Emails your customers can understand and act on.",
      items: [
        { title: "Readable on a phone", body: "Copy and layouts are designed for people checking their inbox on the move." },
        { title: "Your voice comes through", body: "We use your offer, examples and language to make the messages sound like your business." },
        { title: "Make messages more relevant", body: "Group contacts by their interests or actions so everyone doesn't receive the same email." },
        { title: "One clear purpose", body: "Each email has a specific job, whether that's explaining a service or inviting a booking." },
        { title: "Stay in touch consistently", body: "Plan a realistic email schedule that your business can maintain." },
        { title: "Care with your contact list", body: "We account for permission, unsubscribes and duplicate contacts during setup." },
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
      heading: "Explore our email designs and campaigns.",
      body: "See how layout, messaging and clear calls to action come together in our email work.",
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
        { title: "Understand the audience", body: "We review your offer, your contact list and what people need to know before taking action." },
        { title: "Plan and design", body: "We agree on the emails, their timing and where each link should take the reader." },
        { title: "Set up and test", body: "You review the content before we check layouts, links, personalisation and sequence settings." },
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
      cta: { label: "Book a Consultation", href: "/contact?service=email-marketing" },
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
      // Session 29: hero image removed per explicit instruction — no replacement image.
      primaryCta: { label: "Book a Consultation", href: "/contact?service=web-design" },
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
    /**
     * Session 29: combined the old separate "You've worked hard on your
     * business..." (Benefits) and "A website you can feel confident sending
     * people to" (Why WALKFLOW) sections into this one section, per explicit
     * instruction — exactly the five named themes (clear messaging and
     * navigation, mobile usability, practical enquiry and booking paths,
     * collaborative review stages, useful handover and agreed support),
     * each reusing an existing approved line rather than new copy. "Show the
     * quality of your work"/"Your work takes centre stage" were dropped
     * rather than kept as a sixth item, since the showcase directly above
     * this section already does that job — avoiding the repetition the
     * brief explicitly asked to avoid.
     */
    whyWalkflow: {
      heading: "A website you can feel confident sending people to.",
      items: [
        { title: "Clear messaging and navigation", body: "Help visitors understand what you do, who it's for and why it matters to them." },
        { title: "Mobile usability", body: "Keep text readable, navigation simple and forms practical on smaller screens." },
        { title: "Practical enquiry and booking paths", body: "Place enquiry, booking and purchase options where visitors need them." },
        { title: "Collaborative review stages", body: "You review the design and content at agreed stages as the website takes shape." },
        { title: "Useful handover and agreed support", body: "We explain the updates you can make and the options for future support." },
      ],
    },
    /**
     * Session 27: the six fictional placeholder projects that used to live
     * here were replaced by six real project pages (FORMERA, QUES
     * Consulting, Happy Clinics, ROOFORA, ZOOM, Youghall Beach Co.). That
     * gallery now has its own data shape (`WebDesignProject`, with real
     * screenshots, live URLs and per-project design copy that doesn't fit
     * the generic cross-service `ProjectItem` type) in
     * `src/content/web-design-projects.ts`, rendered by
     * `WebDesignProjectGallery`/`WebDesignProjectDetail` at
     * `/services/web-design` and `/services/web-design/projects/<slug>`
     * instead of `ServiceProjects`/the generic `[slug]/projects/[project]`
     * route. `items` stays empty here only to satisfy `ServicePageContent`'s
     * required `projects` field — nothing reads it any more.
     */
    projects: {
      heading: "Explore our website projects.",
      body: "Explore websites designed to make each business clear, credible and easy to contact.",
      items: [],
    },
    process: {
      heading: "A clear route from your ideas to launch.",
      steps: [
        { title: "Understand the business", body: "We discuss your customers, your current website and what the new site needs to achieve." },
        { title: "Plan the structure and design", body: "We organise the pages and content, then create a visual direction for you to review." },
        { title: "Build and refine", body: "We build the agreed pages, add your content and work through feedback at planned review stages." },
        { title: "Test and launch", body: "We check the important journeys, launch when approved and show you how to manage agreed updates." },
      ],
    },
    reviews: [],
    // Session 29: replaced with the exact 10 approved Web Design FAQs, verbatim and in order, superseding the old 3-question set.
    faqs: [
      {
        question: "Can you improve my existing website, or do I need a new one?",
        answer: "We can help with either. We'll review your current website, identify what's holding it back and recommend focused improvements or a rebuild based on your goals.",
      },
      {
        question: "How much will my website cost?",
        answer: "Pricing depends on the number of pages, design requirements and features you need. Book a consultation so we can understand your project and provide a clear quote.",
      },
      {
        question: "How long will it take to build my website?",
        answer: "The timeline depends on the project's size, features and how quickly content and feedback are available. We'll agree on a schedule before work begins and explain what we need from you.",
      },
      {
        question: "Will my website work properly on mobile phones?",
        answer: "Yes. We design for mobile, tablet and desktop, with layouts, navigation and forms that are easy to use across screen sizes.",
      },
      {
        question: "Can I supply my own images and copy?",
        answer: "Yes. You can provide your logo, brand assets, images and written content. If you need help preparing them, we'll discuss the available options and include any additional work in your quote.",
      },
      {
        question: "Will my website be set up for SEO?",
        answer: "We include foundational SEO setup appropriate to your platform, such as page titles, descriptions and heading structure. Ongoing SEO and content work can be discussed separately; search rankings aren't guaranteed.",
      },
      {
        question: "Can you connect booking systems, payments, forms or my CRM?",
        answer: "Yes, where your chosen platform and tools support the connection. We'll check compatibility and explain any subscription costs or custom development requirements before proceeding.",
      },
      {
        question: "Can I update the website myself after launch?",
        answer: "That depends on how the website is built. If you want to edit text, images or listings yourself, tell us early so we can plan a suitable content management setup and explain how to use it.",
      },
      {
        question: "Will I own my website, and are hosting and a domain included?",
        answer: "We'll explain ownership, account access and handover arrangements in your proposal. Domain names, hosting and third-party subscriptions will be clearly listed, including any ongoing costs and asset licensing restrictions.",
      },
      {
        question: "What happens after launch if I need help or changes?",
        answer: "We'll agree on post-launch support before the project starts. Your proposal will explain what's covered, while ongoing maintenance, new pages and additional features can be arranged separately.",
      },
    ],
    finalCta: {
      heading: "Ready for a website that reflects your business?",
      body: "Send us your current website or tell us what you're planning. We'll help you work out the pages and features you need.",
      cta: { label: "Book a Consultation", href: "/contact?service=web-design" },
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
      // Session 26: hero image removed per explicit instruction (matches the same request on Email Marketing in Session 24) — no replacement image.
      primaryCta: { label: "Book a Consultation", href: "/contact?service=mobile-app-development" },
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
    // Session 29: merged with the old separate "Benefits" section into this one "Why WALKFLOW" section — kept to six items covering the brief's named themes (clear user journeys, prioritised features, feedback, practical handover) plus two more strong points, all reusing existing approved copy verbatim.
    whyWalkflow: {
      heading: "Keep the idea clear as the build gets bigger.",
      items: [
        { title: "Review the journey early", body: "See how users move through the screens before the full build." },
        { title: "A useful first version", body: "We help separate essential features from ideas that can wait." },
        { title: "Test real tasks", body: "We check whether users can complete the actions the app was built for." },
        { title: "Plan beyond release", body: "We explain what future updates and support will involve." },
        { title: "Keep users informed", body: "Use relevant notifications to let people know when something needs their attention." },
        { title: "Know the ongoing costs", body: "Hosting, third-party services and app-store fees are outlined where applicable." },
      ],
    },
    /**
     * Session 26: replaced the four fictional concept projects with four
     * real app projects — Geviti, Nuborrow, Wrkout, Request IT — using real
     * assets from a new "App Development/" folder (one showcase image, one
     * or more ordered inner case-study images, and — Geviti only — a
     * walkthrough video, all copied into `public/images/app-development/`
     * and `public/videos/`). `classification: "App Development Project"`
     * is used for all four rather than "Concept Project" or "Independent
     * design concept" — it's lifted directly from a label already printed
     * on the Geviti asset itself, and stays accurate without over- or
     * under-stating WALKFLOW's role. Attribution varies by project: Geviti
     * and Nuborrow's own supplied artwork explicitly credits WALKFLOW
     * ("Built by WALKFLOW" / "WALKFLOW APP DEVELOPMENT" / "Our
     * Capabilities"); Wrkout's case-study slides carry a WALKFLOW logo on
     * every page; Request IT's supplied assets carry no WALKFLOW mark at
     * all — flagged in the session's completion report rather than
     * asserting a contribution the files don't confirm.
     */
    projects: {
      eyebrow: "App Projects",
      heading: "Explore what these apps make possible.",
      body: "From keeping health information together to finding the right freelancer, explore four different ways an app can make everyday tasks easier.",
      items: [
        {
          slug: "geviti",
          title: "Geviti",
          detailTitle: "GEVITI — TELEHEALTH APP",
          headline: "Keep your care team close and your health information together.",
          industry: "Telehealth",
          description: "",
          intro:
            "Keeping up with your health shouldn't mean switching between messages, reports and appointments. Geviti brings wellness-team support, doctor-monitored care and health tracking into one app, with at-home health panels twice a year to help inform ongoing care.",
          tags: [],
          image: { src: "/images/app-development/geviti-showcase.png", alt: "Geviti telehealth app showcase" },
          features: [
            "Connect with your care team.",
            "View health results and track changes over time.",
            "Bring connected-device data into one place.",
            "Keep track of your personalised care plan.",
          ],
          featuresHeading: "Key Features",
          technology: "Flutter for the mobile app · Node.js for the backend.",
          technologyLabel: "Technology",
          videoSrc: "/videos/geviti-walkthrough.mp4",
          videoPoster: { src: "/images/app-development/geviti-showcase.png", alt: "Geviti app walkthrough preview" },
          videoLabel: "Watch App Walkthrough",
          externalHref: null,
          classification: "App Development Project",
          screens: [
            { src: "/images/app-development/geviti-inner-1.png", alt: "Geviti app screens — overview and highlights", width: 941, height: 1672 },
            { src: "/images/app-development/geviti-inner-2.png", alt: "Geviti app case study — process and core features", width: 941, height: 1672 },
          ],
        },
        {
          slug: "nuborrow",
          title: "Nuborrow",
          detailTitle: "NUBORROW — MORTGAGE PLATFORM & COMPANION APP",
          headline: "Keep your mortgage details close and your next step clear.",
          industry: "Mortgage & Finance",
          description: "",
          intro:
            "Mortgage financing comes with plenty to keep track of. Nuborrow's companion app brings your application, mortgage information and credit profile together on your iPhone or iPad, helping you stay informed and connected to the team supporting your financing.",
          tags: [],
          image: { src: "/images/app-development/nuborrow-showcase.png", alt: "Nuborrow mortgage platform app showcase" },
          features: [
            "Sync your mortgage application with the mobile app.",
            "Access your mortgage information and credit profile in one place.",
            "Stay connected to support when considering your mortgage and home equity options.",
          ],
          featuresHeading: "Key Features",
          technology: "Platform and mobile app development · CRM development · Digital marketing funnels · Google Ads landing pages.",
          technologyLabel: "Project Scope",
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "App Development Project",
          screens: [
            { src: "/images/app-development/nuborrow-inner-1.png", alt: "Nuborrow app case study — overview and capabilities", width: 941, height: 1672 },
          ],
        },
        {
          slug: "wrkout",
          title: "Wrkout",
          detailTitle: "WRKOUT — FITNESS & WELLNESS PLATFORM",
          headline: "Turn trusted recommendations into new opportunities.",
          industry: "Fitness & Wellness",
          description: "",
          intro:
            "Clients often ask their trainers which products to buy. Wrkout brings those recommendations into one place, helping fitness professionals share relevant products and earn commissions. Clients can discover products through someone who understands their goals, while brands reach customers through trusted fitness relationships.",
          tags: [],
          image: { src: "/images/app-development/wrkout-showcase.png", alt: "Wrkout fitness and wellness app showcase" },
          features: [
            "Personalised product recommendations from trainers and coaches.",
            "Commission opportunities for fitness professionals.",
            "Access to fitness and wellness products in one platform.",
            "Connected web and mobile experiences for professionals and clients.",
          ],
          featuresHeading: "Key Features",
          technology: "Next.js for the web app · Flutter for mobile · Firebase, NestJS and Neon for backend services and data · Vercel for deployment.",
          technologyLabel: "Technology",
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "App Development Project",
          screens: [
            { src: "/images/app-development/wrkout-inner-1.png", alt: "Wrkout case study — overview and process", width: 941, height: 1672 },
            { src: "/images/app-development/wrkout-inner-2.png", alt: "Wrkout case study — search and discover user flow", width: 941, height: 1672 },
            { src: "/images/app-development/wrkout-inner-3.png", alt: "Wrkout case study — onboarding and home user flow", width: 941, height: 1672 },
            { src: "/images/app-development/wrkout-inner-4.png", alt: "Wrkout case study — account and orders user flow", width: 941, height: 1672 },
            { src: "/images/app-development/wrkout-inner-5.png", alt: "Wrkout case study — browse and library user flow", width: 941, height: 1672 },
            { src: "/images/app-development/wrkout-inner-6.png", alt: "Wrkout case study — design outcome and key highlights", width: 941, height: 1672 },
          ],
        },
        {
          slug: "request-it",
          title: "Request IT",
          detailTitle: "REQUEST IT — DIGITAL SERVICES MARKETPLACE",
          headline: "Find the right help. Get your next project moving.",
          industry: "Digital Services Marketplace",
          description: "",
          intro:
            "Need a logo, a digital card or an app built? Request IT brings freelancers and customers together in one place. Browse services, explore profiles and discuss what you need directly through the app, making it easier to move from “who can help?” to getting started.",
          tags: [],
          image: { src: "/images/app-development/requestit-showcase.png", alt: "Request IT digital services marketplace app showcase" },
          features: [
            "Browse digital services and freelancer profiles.",
            "Send requests with your project requirements.",
            "Message freelancers to discuss the details.",
            "Explore offers and hire through the app.",
            "Follow professionals and discover their work through the community feed.",
          ],
          featuresHeading: "Key Features",
          videoSrc: null,
          videoPoster: null,
          externalHref: null,
          classification: "App Development Project",
          screens: [
            { src: "/images/app-development/requestit-inner-1.png", alt: "Request IT app case study — key screens", width: 1122, height: 1402 },
          ],
        },
      ],
    },
    process: {
      heading: "Build the first version with a clear purpose.",
      steps: [
        { title: "Define the requirements", body: "We discuss who will use the app and what they need to accomplish." },
        { title: "Design the experience", body: "We map the user journey, agree on the first-release features and design the key screens." },
        { title: "Build and test", body: "We develop the app and integrations, then test the agreed journeys and devices." },
        { title: "Release and hand over", body: "We help with the agreed release process and outline the next steps for maintenance and improvements." },
      ],
    },
    reviews: [],
    // Session 26: replaced the 3-question placeholder set with 10 mobile-app-specific questions Joshua supplied directly in chat (superseding an earlier general-business set he supplied moments before, which was never published — this is the set actually shown on the page).
    faqs: [
      {
        question: "Can you help me turn my app idea into a clear plan?",
        answer:
          "Yes. You don't need a finished brief to get started. Tell us who the app is for and what it should help them do. We'll help you define the main features, user journey and scope.",
      },
      {
        question: "Can you build an app for both iPhone and Android?",
        answer:
          "Yes. We can build for both platforms and help you decide whether to launch on both at once or start with one, based on your audience, budget and priorities.",
      },
      {
        question: "Can we start with a smaller version and add features later?",
        answer:
          "Absolutely. We can start with the essential features your users need. This gives you a working first version to launch, gather feedback on and improve before investing in more features.",
      },
      {
        question: "Can you improve or finish an existing app?",
        answer:
          "We'll review the current app, source code and any known issues first. From there, we can recommend whether to continue development, improve specific areas or rebuild parts that are holding it back.",
      },
      {
        question: "Can my app connect to my website, CRM or payment system?",
        answer:
          "Yes, where those systems support integration. We'll check compatibility and any subscription or usage fees before including the connections in your project scope.",
      },
      {
        question: "How much does app development cost?",
        answer:
          "The cost depends on the features, screens, integrations and platforms involved. Once we understand what you need, we'll provide a clear scope and quote, including any separate running costs.",
      },
      {
        question: "How long will it take to build my app?",
        answer:
          "The timeline depends on how much the app needs to do. We'll agree on a schedule covering design, development, testing and launch preparation, with opportunities for you to review the work along the way.",
      },
      {
        question: "Will you help publish the app on the App Store and Google Play?",
        answer:
          "We can include submission support in your project. You'll need developer accounts for the relevant stores, and we'll explain what's required. Each store reviews submissions and makes the final approval decision.",
      },
      {
        question: "Will I own the app and receive the source code?",
        answer:
          "Ownership, source-code handover and account access will be clearly set out in your project agreement. We'll also explain any third-party software or licences your app depends on before work begins.",
      },
      {
        question: "What happens after the app launches?",
        answer:
          "We'll walk you through managing the app and agree on any support you need. Ongoing maintenance, updates and new features can be scoped separately, so you know what's included and how future work will be handled.",
      },
    ],
    finalCta: {
      heading: "What would your app help someone do?",
      body: "Tell us the idea, who it's for and the task it should make easier. We'll help you define a sensible first version.",
      cta: { label: "Book a Consultation", href: "/contact?service=mobile-app-development" },
    },
    projectClosingCta: {
      heading: "Have an app idea of your own?",
      body: "Tell us who it's for and what it needs to make easier. We'll help you work out the features, scope and next step.",
      cta: { label: "Book a Consultation", href: "/contact?service=mobile-app-development" },
    },
  },
};
