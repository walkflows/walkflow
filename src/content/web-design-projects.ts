export type ProjectShot = { src: string; alt: string; caption?: string; width: number; height: number };

export type WebDesignProject = {
  slug: string;
  title: string;
  category: string;
  liveUrl: string;
  cardDescription: string;
  mockup: { src: string; alt: string; width: number; height: number };
  opening: string;
  overview: string;
  designFocus: string;
  whatThisMeans: { title: string; body: string }[];
  forBusiness: string;
  /** Section A — the large homepage screenshot directly under the intro. */
  heroScreenshot: ProjectShot;
  /** Section C — one large screenshot showing a meaningful homepage section. */
  showcaseLarge: ProjectShot;
  /** Section C — a balanced two-column pair of pages/sections. */
  showcasePair: [ProjectShot, ProjectShot];
  /** Section C — an optional extra full-width screenshot (only Youghall uses this, for its brand-story section). */
  showcaseExtra?: ProjectShot;
  /** Section C — a smaller mobile screenshot pair (or single shot, where the project only needed one). */
  showcaseMobile: ProjectShot[];
};

/**
 * Web Design portfolio — Session 27. Six real project pages replacing the
 * old ViewPoint/QuickServe-style placeholder set. Live sites are real demo
 * builds (formera-sigma.vercel.app etc.), each carrying their own explicit
 * "sample/illustrative/preview" labelling on simulated data (e.g. ZOOM's
 * "Illustrative listing" badges, FORMERA's "enquiry sending is not switched
 * on yet" notice, ROOFORA's "sample placeholder reviews" disclosure) — none
 * of that is WALKFLOW's claim to make, so no results, technologies or
 * client relationships are stated here beyond what each site's own on-page
 * copy already discloses. All screenshots are genuine captures of the live
 * sites (Playwright, 1440px desktop / 390px mobile), not the supplied
 * device-mockup images (those are used only for the gallery card below, per
 * the brief) and not AI-recreated interfaces.
 */
export const webDesignProjects: WebDesignProject[] = [
  {
    slug: "formera",
    title: "FORMERA",
    category: "Real Estate",
    liveUrl: "https://formera-sigma.vercel.app/",
    cardDescription: "A clearer property search, with useful details and an easier route to a shortlist.",
    mockup: { src: "/images/web-design/projects/formera/mockup.webp", alt: "FORMERA website shown across desktop and mobile screens", width: 1448, height: 1086 },
    opening: "A property website that helps people move from browsing to a more focused shortlist.",
    overview:
      "FORMERA brings property photography, search options and key home details into a clear browsing experience. Visitors can explore what matters to them and find a visible next step when a property catches their attention.",
    designFocus: "Property discovery · Listing clarity · Enquiry direction",
    whatThisMeans: [
      { title: "Find a starting point", body: "Search options help people focus on the homes that fit their priorities." },
      { title: "Compare useful details", body: "Price, bedrooms and property features are presented together for easier review." },
      { title: "Keep the next step in view", body: "Property pages place viewing and enquiry options close to the information visitors are considering." },
    ],
    forBusiness: "A property website structured this way can help visitors arrive with a clearer idea of the homes they want to discuss.",
    heroScreenshot: { src: "/images/web-design/projects/formera/home-hero.webp", alt: "FORMERA homepage hero with a search bar over a featured home", width: 1440, height: 900 },
    showcaseLarge: {
      src: "/images/web-design/projects/formera/home-listings.webp",
      alt: "Featured FORMERA property listings in a grid",
      caption: "Property details presented for comparison.",
      width: 1440,
      height: 900,
    },
    showcasePair: [
      {
        src: "/images/web-design/projects/formera/properties-list.webp",
        alt: "FORMERA property collection and filter view",
        caption: "A focused starting point for a home search.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/web-design/projects/formera/property-detail.webp",
        alt: "FORMERA property detail and gallery page",
        caption: "A clear path from interest to enquiry.",
        width: 1440,
        height: 900,
      },
    ],
    showcaseMobile: [
      { src: "/images/web-design/projects/formera/mobile-properties.webp", alt: "FORMERA property browsing on mobile", caption: "Property browsing on a smaller screen.", width: 390, height: 844 },
      { src: "/images/web-design/projects/formera/mobile-enquiry.webp", alt: "FORMERA enquiry form on mobile", caption: "An enquiry entry point close at hand.", width: 390, height: 844 },
    ],
  },
  {
    slug: "ques-consulting",
    title: "QUES Consulting",
    category: "Business Consulting",
    liveUrl: "https://ques-consulting.vercel.app/",
    cardDescription: "Consulting services organised around the decisions business owners need to make.",
    mockup: { src: "/images/web-design/projects/ques-consulting/mockup.webp", alt: "QUES Consulting website shown across desktop and mobile screens", width: 1448, height: 1086 },
    opening: "A consulting website that makes expertise easier to understand and the next conversation easier to start.",
    overview:
      "QUES Consulting presents business and financial support around the questions visitors are trying to answer. Service descriptions, benefits and engagement information work together to help prospects understand where the consultancy may fit their needs.",
    designFocus: "Service positioning · Engagement clarity · Consultation journey",
    whatThisMeans: [
      { title: "Understand the offer", body: "Distinct service areas help visitors identify relevant support." },
      { title: "See what comes next", body: "Engagement information gives the initial conversation more context." },
      { title: "Explore before enquiring", body: "Supporting content allows visitors to learn more at their own pace." },
    ],
    forBusiness: "Clear consulting pages can help prospects understand your expertise and start a more relevant conversation.",
    heroScreenshot: { src: "/images/web-design/projects/ques-consulting/home-hero.webp", alt: "QUES Consulting homepage hero", width: 1440, height: 900 },
    showcaseLarge: {
      src: "/images/web-design/projects/ques-consulting/services.webp",
      alt: "QUES Consulting service cards",
      caption: "Expertise organised around business needs.",
      width: 1440,
      height: 900,
    },
    showcasePair: [
      {
        src: "/images/web-design/projects/ques-consulting/engagement.webp",
        alt: "QUES Consulting booking expectations section",
        caption: "A clearer explanation of the engagement.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/web-design/projects/ques-consulting/booking.webp",
        alt: "QUES Consulting booking entry screen",
        caption: "An accessible starting point for a consultation.",
        width: 1440,
        height: 900,
      },
    ],
    showcaseMobile: [
      { src: "/images/web-design/projects/ques-consulting/mobile-home.webp", alt: "QUES Consulting homepage on mobile", caption: "The homepage story on a smaller screen.", width: 390, height: 844 },
      { src: "/images/web-design/projects/ques-consulting/mobile-services.webp", alt: "QUES Consulting services on mobile", caption: "Services stay easy to scan on mobile.", width: 390, height: 844 },
    ],
  },
  {
    slug: "happy-clinics",
    title: "Happy Clinics",
    category: "Healthcare",
    liveUrl: "https://happy-clinics.vercel.app/",
    cardDescription: "A welcoming healthcare website that helps visitors find their next step.",
    mockup: { src: "/images/web-design/projects/happy-clinics/mockup.webp", alt: "Happy Clinics website shown across desktop and mobile screens", width: 1448, height: 1086 },
    opening: "A welcoming healthcare website that makes finding information feel more manageable.",
    overview:
      "Happy Clinics uses calm presentation, approachable language and clearly organised services to help visitors understand where to begin. Appointment prompts and practical information provide a visible route to contacting the clinic.",
    designFocus: "Approachable content · Service navigation · Appointment enquiries",
    whatThisMeans: [
      { title: "Find relevant information", body: "Service areas give visitors a clearer place to start." },
      { title: "Understand the next step", body: "Plain-language guidance explains the appointment enquiry process." },
      { title: "Browse comfortably on a phone", body: "Readable content and visible contact options support smaller-screen visits." },
    ],
    forBusiness: "A thoughtfully organised clinic website can make it easier for visitors to understand your services and decide who to contact.",
    heroScreenshot: { src: "/images/web-design/projects/happy-clinics/home-hero.webp", alt: "Happy Clinics homepage hero", width: 1440, height: 900 },
    showcaseLarge: {
      src: "/images/web-design/projects/happy-clinics/care-areas.webp",
      alt: "Happy Clinics areas of care section",
      caption: "A welcoming introduction to the clinic.",
      width: 1440,
      height: 900,
    },
    showcasePair: [
      {
        src: "/images/web-design/projects/happy-clinics/approach.webp",
        alt: "Happy Clinics appointment steps section",
        caption: "Care options presented clearly.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/web-design/projects/happy-clinics/appointment.webp",
        alt: "Happy Clinics appointment enquiry page",
        caption: "Appointment information close to the next step.",
        width: 1440,
        height: 900,
      },
    ],
    showcaseMobile: [
      { src: "/images/web-design/projects/happy-clinics/mobile-home.webp", alt: "Happy Clinics homepage on mobile", caption: "A calm, readable homepage on mobile.", width: 390, height: 844 },
      { src: "/images/web-design/projects/happy-clinics/mobile-appointment.webp", alt: "Happy Clinics appointment form on mobile", caption: "Appointment details easy to reach on mobile.", width: 390, height: 844 },
    ],
  },
  {
    slug: "roofora",
    title: "ROOFORA",
    category: "Roofing & Home Services",
    liveUrl: "https://roofora-rose.vercel.app/",
    cardDescription: "Roofing services explained simply, with clear routes to an estimate enquiry.",
    mockup: { src: "/images/web-design/projects/roofora/mockup.webp", alt: "ROOFORA website shown across desktop and mobile screens", width: 1448, height: 1086 },
    opening: "A roofing website that helps homeowners understand their options before getting in touch.",
    overview:
      "ROOFORA organises roofing services, project imagery and the enquiry journey into a straightforward experience. Clear service descriptions help visitors recognise the support they need without working through unfamiliar trade language.",
    designFocus: "Service clarity · Project presentation · Estimate enquiries",
    whatThisMeans: [
      { title: "Recognise the right service", body: "Repairs, replacements and inspections are easy to distinguish." },
      { title: "Understand the process", body: "A simple step-by-step explanation helps visitors know what to expect." },
      { title: "Find a practical next step", body: "Estimate calls to action remain easy to locate as visitors explore." },
    ],
    forBusiness: "This structure can help turn a vague roofing concern into a more focused service enquiry.",
    heroScreenshot: { src: "/images/web-design/projects/roofora/home-hero.webp", alt: "ROOFORA homepage hero", width: 1440, height: 900 },
    showcaseLarge: {
      src: "/images/web-design/projects/roofora/services.webp",
      alt: "ROOFORA services grid",
      caption: "Services explained in everyday language.",
      width: 1440,
      height: 900,
    },
    showcasePair: [
      {
        src: "/images/web-design/projects/roofora/recent-work.webp",
        alt: "ROOFORA recent roofing projects gallery",
        caption: "Project imagery supports a closer look.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/web-design/projects/roofora/estimate.webp",
        alt: "ROOFORA estimate request form",
        caption: "An estimate enquiry within easy reach.",
        width: 1440,
        height: 900,
      },
    ],
    showcaseMobile: [
      { src: "/images/web-design/projects/roofora/mobile-home.webp", alt: "ROOFORA homepage on mobile", caption: "The homepage on a smaller screen.", width: 390, height: 844 },
      { src: "/images/web-design/projects/roofora/mobile-estimate.webp", alt: "ROOFORA estimate form on mobile", caption: "Requesting an estimate on mobile.", width: 390, height: 844 },
    ],
  },
  {
    slug: "zoom",
    title: "ZOOM",
    category: "Automotive",
    liveUrl: "https://zoom-11lr.vercel.app/",
    cardDescription: "A visual car collection that makes browsing and comparing easier.",
    mockup: { src: "/images/web-design/projects/zoom/mockup.webp", alt: "ZOOM website shown across desktop and mobile screens", width: 1448, height: 1086 },
    opening: "An automotive website that gives every car a clear place in the buying journey.",
    overview:
      "ZOOM combines prominent vehicle photography with an organised collection and readable listing information. The design helps visitors explore different options, review key details and find a route to a conversation about a car.",
    designFocus: "Visual discovery · Vehicle comparison · Contact journey",
    whatThisMeans: [
      { title: "Browse with purpose", body: "A structured collection helps visitors explore cars that catch their attention." },
      { title: "See the essentials", body: "Vehicle details are presented alongside imagery so visitors can assess more than appearance." },
      { title: "Ask a focused question", body: "Contact prompts help visitors move from browsing towards discussing their preferences." },
    ],
    forBusiness: "A clear vehicle showcase can help potential buyers prepare better questions before they contact your team.",
    heroScreenshot: { src: "/images/web-design/projects/zoom/home-hero.webp", alt: "ZOOM homepage hero with a featured vehicle", width: 1440, height: 900 },
    showcaseLarge: {
      src: "/images/web-design/projects/zoom/featured-cars.webp",
      alt: "ZOOM featured vehicle listings",
      caption: "Photography that invites a closer look.",
      width: 1440,
      height: 900,
    },
    showcasePair: [
      {
        src: "/images/web-design/projects/zoom/collections.webp",
        alt: "ZOOM vehicle collection page",
        caption: "A collection built for browsing across devices.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/web-design/projects/zoom/vehicle-detail.webp",
        alt: "ZOOM vehicle listing detail view",
        caption: "Key vehicle details in one place.",
        width: 1440,
        height: 900,
      },
    ],
    showcaseMobile: [
      { src: "/images/web-design/projects/zoom/mobile-collections.webp", alt: "ZOOM vehicle collection on mobile", caption: "Browsing the collection on mobile.", width: 390, height: 844 },
      { src: "/images/web-design/projects/zoom/mobile-contact.webp", alt: "ZOOM contact page on mobile", caption: "Starting a conversation on mobile.", width: 390, height: 844 },
    ],
  },
  {
    slug: "youghall-beach-co",
    title: "Youghall Beach Co.",
    category: "Ecommerce & Lifestyle",
    liveUrl: "https://youghall-beach-co.vercel.app/",
    cardDescription: "A coastal shopping experience that brings products and brand story together.",
    mockup: { src: "/images/web-design/projects/youghall-beach-co/mockup.webp", alt: "Youghall Beach Co. website shown across desktop and mobile screens", width: 1448, height: 1086 },
    opening: "A coastal storefront that connects the products with the places and story behind them.",
    overview:
      "This Youghall Beach Co. redesign combines product-led browsing with the brand's New Brunswick coastal identity. Collections, product imagery and story sections help visitors explore the range while understanding what gives the brand its character.",
    designFocus: "Product discovery · Brand storytelling · Shopping navigation",
    whatThisMeans: [
      { title: "Find their kind of product", body: "Clear collections provide practical starting points for browsing." },
      { title: "Get a closer look", body: "Product imagery and details support a more informed choice." },
      { title: "Connect with the brand", body: "Coastal storytelling gives the products a recognisable context." },
    ],
    forBusiness: "An ecommerce experience like this can make the range easier to explore while keeping the brand memorable.",
    heroScreenshot: { src: "/images/web-design/projects/youghall-beach-co/home-hero.webp", alt: "Youghall Beach Co. homepage hero", width: 1440, height: 900 },
    showcaseLarge: {
      src: "/images/web-design/projects/youghall-beach-co/featured-products.webp",
      alt: "Youghall Beach Co. featured products",
      caption: "Collections that guide the browsing journey.",
      width: 1440,
      height: 900,
    },
    showcasePair: [
      {
        src: "/images/web-design/projects/youghall-beach-co/shop.webp",
        alt: "Youghall Beach Co. shop collection page",
        caption: "Products and coastal identity presented together.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/web-design/projects/youghall-beach-co/product-detail.webp",
        alt: "Youghall Beach Co. product detail page",
        caption: "Product details ready for a closer look.",
        width: 1440,
        height: 900,
      },
    ],
    showcaseExtra: {
      src: "/images/web-design/projects/youghall-beach-co/brand-story.webp",
      alt: "Youghall Beach Co. brand story page",
      caption: "The coastal story behind the products.",
      width: 1440,
      height: 900,
    },
    showcaseMobile: [
      { src: "/images/web-design/projects/youghall-beach-co/mobile-shop.webp", alt: "Youghall Beach Co. shop page on mobile", caption: "Shopping the collection on mobile.", width: 390, height: 844 },
    ],
  },
];

export const webDesignGallery = {
  eyebrow: "Selected Websites",
  // Session 29: heading/intro replaced with the exact required copy — this is the real source the gallery renders from (servicePages["web-design"].projects.heading is unused dead data now that this gallery replaced <ServiceProjects>).
  heading: "Explore our website projects.",
  intro: "Explore websites designed to make each business clear, credible and easy to contact.",
};

export const webDesignClosingCta = {
  heading: "Want this kind of clarity for your business?",
  body: "Tell us what you offer and what you want visitors to do. We'll help shape the pages, content and next steps around that goal.",
  cta: { label: "Book a Consultation", href: "/contact?service=web-design" },
};
