import { faq, industries, process as projectProcess, services } from "@/content/home";

/**
 * Copy for the site-wide WALKFLOW assistant. Every factual answer below is
 * taken from, or deliberately limited to, what the website already says.
 * Anything the site does not state (prices, timelines, guarantees, client
 * results, contract terms, integrations, availability) is routed to the
 * Contact page rather than answered. See src/lib/chat/respond.ts for matching.
 */
export const chatCopy = {
  title: "WALKFLOW Assistant",
  disclosure: "Automated answers from the WALKFLOW website, not a person.",
  launcherLabel: "Ask WALKFLOW",
  openLabel: "Chat with WALKFLOW",
  closeLabel: "Close chat",
  inputLabel: "Your question",
  inputPlaceholder: "Ask about services, industries or demos",
  sendLabel: "Send",
  thinking: "Checking the WALKFLOW website…",
  welcome: "Hi 👋 How can I help you with WALKFLOW’s services, industry solutions or demo projects?",
  starters: [
    "What services do you offer?",
    "Can you automate my business?",
    "Can you redesign my website?",
    "Show me your demo projects.",
    "How do I book a consultation?",
  ],
  networkError: "Sorry, the assistant couldn’t answer just now. Please contact the WALKFLOW team.",
  rateLimited: "You’re sending messages quickly. Please wait a minute and try again.",
  tooLong: "Please keep your question under 500 characters.",
};

export const chatLinks = {
  contactUs: { label: "CONTACT US →", href: "/contact" },
  contactWalkflow: { label: "CONTACT WALKFLOW →", href: "/contact" },
  viewServices: { label: "VIEW SERVICES →", href: "/#solutions" },
  about: { label: "ABOUT WALKFLOW →", href: "/about" },
};

export const chatReplies = {
  scope: "I can only help with questions related to WALKFLOW, our services and your business needs.",
  offTopic: "I’m here to help with WALKFLOW, our services, solutions and projects.",
  uncertain: "I’m not completely sure about that. Please contact the WALKFLOW team so we can give you the right answer.",
  vague: "That depends on your business and what you need. The best next step is to send us the details.",
  greeting: "Hi! Ask me about WALKFLOW’s services, industry solutions, demo projects or how to book a consultation.",
  company: faq.items[0].answer,
  whoWeWorkWith: faq.items[1].answer,
  booking:
    "Send a short enquiry, and we’ll contact you to arrange a conversation. No account needed. This chat can’t confirm a call time, so the team will do that by email.",
  pricing:
    "Pricing depends on scope. A single service is priced differently from a full connected system, and we give a clear quote after a discovery call.",
  servicePrompt: "Which service are you interested in?",
  process: `How a project usually runs: ${projectProcess.steps.map((step, i) => `${i + 1}. ${step.title}`).join(" ")}.`,
  criticism: {
    automationFailure:
      "Project updates happen by email or calls, and agreed features are tested together before launch. For how problems would be handled in your setup, please contact the team.",
    automationMistakes:
      "Automation can need checking when the tools or information it relies on change. We test the agreed features together before launch, so you can see how they behave. For the details of your setup, please contact the team.",
    dislikeWebsite:
      "You see the work as it takes shape and can share feedback, so you’re involved from the start. For how revisions are handled on your project, please contact the team.",
    whyWalkflow:
      "Our approach is to put your business first, give you a clear scope and price before work begins, and stay involved at every step. You can read more on our About page.",
  },
  uncertainTopics: /\b(guarantee[ds]?|warrant(y|ies)|refund|contract|terms|policy|policies|sla|results?|case stud\w*|testimonials?|reviews?|clients?|portfolio|availability|available (on|for|this|next)|timelines?|how long|turnaround|deadlines?|calendar|integrat\w*|zapier|hubspot|salesforce|gohighlevel|go high level|api|certif\w*|accredit\w*|insurance|scam|legit\w*)\b/,
  services: {
    automation:
      "We connect your tools, organise customer details and automate routine follow-ups. We can also add AI chatbots or voice agents to help capture enquiries while your team is busy. What’s possible depends on your tools and processes, so the best next step is to tell us where your team loses the most time.",
    web: "We build business websites, landing pages and online stores that explain your offer and make it easy to enquire, book or buy. If you're thinking about a redesign, tell us what isn't working on the current site.",
    email: services.items[1].body,
    mobile: services.items[3].body,
    list: `We offer ${services.items.map((item) => item.title).join(", ")}.`,
  },
  industries: {
    overview: "We have industry solutions for four types of business. Pick one to see how it works.",
    demoOverview: "Our demo projects show sample customer journeys for four industries. They use sample data and are not live systems.",
  },
};

export const chatTopics = {
  automation: {
    pattern: /\b(automat\w*|crm|chatbot|voice agent|follow[- ]?ups?|workflows?)\b/,
    reply: chatReplies.services.automation,
    link: { label: "BUSINESS AUTOMATION & CRM →", href: services.items[0].cta.href },
  },
  web: {
    pattern: /\b(web ?design|web ?site|redesign|landing pages?|online store|e-?commerce|shop)\b/,
    reply: chatReplies.services.web,
    link: { label: "WEB DESIGN →", href: services.items[2].cta.href },
  },
  email: {
    pattern: /\b(email|newsletters?|campaigns?|welcome emails?)\b/,
    reply: chatReplies.services.email,
    link: { label: "EMAIL MARKETING →", href: services.items[1].cta.href },
  },
  mobile: {
    pattern: /\b(mobile|apps?|ios|android)\b/,
    reply: chatReplies.services.mobile,
    link: { label: "MOBILE APP DEVELOPMENT →", href: services.items[3].cta.href },
  },
};

/** Keyword patterns per industry card title. Routes come from `industries`, never hardcoded here. */
export const industryPatterns: Record<string, RegExp> = {
  "Real Estate": /\b(real estate|property|properties|estate agents?|letting)\b/,
  "Home Services": /\b(home services?|hvac|plumb\w*|roof\w*|call-?outs?|tradespeople|tradesmen)\b/,
  Clinics: /\b(clinics?|dental|dentists?|medical|physio\w*|healthcare|health care)\b/,
  "Consulting Firms": /\b(consult\w*|advisory)\b/,
};

export const industryTopics = industries.cards.map((card) => ({
  title: card.title,
  pattern: industryPatterns[card.title],
  body: card.body,
  solutionHref: card.href,
  demoHref: card.demoHref,
}));
