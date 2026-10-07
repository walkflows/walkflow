import { finalCta } from "@/content/home";

/**
 * Copy for the WALKFLOW Assistant. Factual answers come from the site's own
 * content modules (see src/lib/chat/knowledge.ts), so this file holds only
 * UI text, safety replies and the few answers that do not exist on the site
 * as written copy.
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
  founder: { label: "MEET THE FOUNDER →", href: "/about" },
};

export const chatReplies = {
  scope: "I can only help with questions related to WALKFLOW, our services and your business needs.",
  offTopic: "I’m here to help with WALKFLOW, our services, solutions and projects.",
  uncertain: "I’m not completely sure about that. Please contact the WALKFLOW team so we can give you the right answer.",
  vague: "That depends on your business and what you need. The best next step is to send us the details.",
  greeting: "Hi! Ask me about WALKFLOW’s services, industry solutions, demo projects or how to book a consultation.",
  booking: `${finalCta.note} This chat can’t confirm a call time, so the team will arrange it with you by email.`,
  demos: "Our demo projects show sample customer journeys for four industries, using sample data. They are not live systems.",
  work: "Our Web Design page shows example website builds, and each demo project shows a sample customer journey. These are examples of how we work, not client results.",
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
  /** Topics the website does not answer. Matched before any website search, so they are never guessed. */
  uncertainTopics:
    /\b(guarantee[ds]?|warrant(y|ies)|refunds?|contracts?|terms|polic(y|ies)|insurance|certif\w*|accredit\w*|integrat\w*|zapier|hubspot|salesforce|gohighlevel|go high level|calendar|availability|available (on|for|this|next)|scam|legit\w*|how many|years? of experience|reviews?|testimonials?|case stud\w*|track record|(clients?|customers?) do you have)\b/,
};
