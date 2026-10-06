import { chatCopy, chatLinks, chatReplies, chatTopics, industryTopics } from "@/content/chat-assistant";
import { services } from "@/content/home";
import type { ChatLink, ChatReply } from "@/lib/chat/types";

/**
 * Rule-based answers drawn only from the WALKFLOW website copy. Rules run in
 * priority order: safety first, then ordinary criticism and booking, then
 * anything the site cannot confirm, then navigation. Ordinary criticism
 * ("What if I don't like the website?") is answered normally, never treated
 * as abuse. Replace or extend this module when an AI provider is connected;
 * keep the `ChatReply` shape and run the safety checks first.
 */

const unsafePatterns = [
  /\b(fuck\w*|shit\w*|bitch\w*|asshole|bastard|cunt|idiot|moron\w*|retard\w*|dumbass)\b/,
  /\b(porn\w*|nudes?|naked|sex\w*|xxx|nsfw|onlyfans)\b/,
  /\b(kill|murder|shoot|stab|bomb|hurt|beat up)\s+(you|them|him|her|someone|everyone|people)\b/,
  /\b(hack into|hacking|ddos|phishing|malware|ransomware|steal (passwords?|credit cards?|card details|customer data))\b/,
  /ignore (all |any |the )?(previous|prior|above) (instructions|prompts?)|system prompt|developer (message|mode)|reveal (your|the) (prompt|instructions)|api keys?|environment variables?/,
];

const greetingPattern = /^(hi|hello|hey|hiya|good (morning|afternoon|evening))\b/;

const criticismRules: Array<{ pattern: RegExp; text: string }> = [
  {
    pattern:
      /(automation|automations|automated)\b.*\b(fail\w*|break\w*|go wrong|errors?)\b|\b(fail\w*|break\w*|go wrong)\b.*\b(automation|automations|automated)\b/,
    text: chatReplies.criticism.automationFailure,
  },
  {
    pattern: /\b(make|makes|made) (mistakes|errors)\b|\b(mistakes?|errors?)\b.*\bautomat\w*|\bautomat\w*\b.*\b(mistakes?|errors?)\b/,
    text: chatReplies.criticism.automationMistakes,
  },
  {
    pattern: /\bwhat if i (don'?t|do not) like\b|\b(don'?t|do not) (like|love)\b.*\b(website|design|site|work|result)s?\b/,
    text: chatReplies.criticism.dislikeWebsite,
  },
  {
    pattern: /\bwhy (should|would|do|did)? ?(i|we|you|people)?\s*(choose|pick|use|hire|go with)\b|\bwhy (choose|pick|use|hire) (walkflow|you|us)\b/,
    text: chatReplies.criticism.whyWalkflow,
  },
];

const bookingPattern =
  /\b(consultations?|discovery calls?|request a call|arrange a call|call me|book (a|an|my|me|us|one|in|with)|speak (to|with) (someone|a person|the team|joshua)|talk (to|with) (someone|a person|the team|joshua))\b/;
const pricingPattern = /\b(pric\w*|cost\w*|how much|quotes?|fees?|budgets?|afford\w*)\b/;
const processPattern =
  /\b(process|how (do|does) (you|projects?|it|this) work|how does (it|this) work|next steps?|how (do|does) (i|we) start|get started|start a project)\b/;
const demoPattern = /\b(demos?|demonstrations?|see (it|one|this) (in action|working)|walkthrough|sample)\b/;
const industryOverviewPattern = /\b(industr\w*|sectors?)\b/;
const companyPattern =
  /\b(what is walkflow|who is walkflow|who are you|what is this|about walkflow|about you|what does walkflow do|who do you work with|who (do|does) walkflow work with)\b/;
const whoWeWorkWithPattern = /\bwho (do|does)\b|\bwork with\b/;
const servicesListPattern = /\b(services?|offerings?|what do you (do|offer)|what can you do)\b/;
const vaguePattern =
  /^(can you )?(build|make|create|do) (this|it|that)\b|\bwhat exactly (do )?i need\b|\bwhat do i need\b|\bcan you (build|make|do) (this|it|that)\b/;
const businessHintPattern =
  /\b(business|company|services?|websites?|automations?|emails?|apps?|pricing|price|cost|projects?|customers?|enquir\w*|leads?|bookings?|appointments?|team|marketing|software|tools?|crm|sales|quotes?|walkflow|industr\w*|clinics?|firms?|estate|plumb\w*|roof\w*|hvac|seo|social media|branding|logo|hosting|domain)\b/;

function normalise(message: string): string {
  return message.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
}

function firstTopic(text: string) {
  return Object.values(chatTopics).find((topic) => topic.pattern.test(text)) ?? null;
}

function firstIndustry(text: string) {
  return industryTopics.find((topic) => topic.pattern.test(text)) ?? null;
}

function reply(text: string, links: ChatLink[] = [], suggestions: string[] = []): ChatReply {
  return { text, links, suggestions };
}

export function respond(message: string): ChatReply {
  const text = normalise(message);

  if (unsafePatterns.some((pattern) => pattern.test(text))) {
    return reply(chatReplies.scope, [chatLinks.viewServices, chatLinks.contactWalkflow]);
  }

  if (text.length <= 25 && greetingPattern.test(text)) {
    return reply(chatReplies.greeting, [], [...chatCopy.starters]);
  }

  const criticism = criticismRules.find((rule) => rule.pattern.test(text));
  if (criticism) return reply(criticism.text, [chatLinks.contactWalkflow]);

  if (bookingPattern.test(text)) return reply(chatReplies.booking, [chatLinks.contactUs]);

  if (pricingPattern.test(text)) {
    const topic = firstTopic(text);
    if (topic) return reply(chatReplies.pricing, [topic.link, chatLinks.contactWalkflow]);
    return reply(`${chatReplies.pricing} ${chatReplies.servicePrompt}`, [chatLinks.contactWalkflow], services.items.map((item) => item.title));
  }

  if (chatReplies.uncertainTopics.test(text)) return reply(chatReplies.uncertain, [chatLinks.contactUs]);

  if (processPattern.test(text)) return reply(chatReplies.process, [chatLinks.contactWalkflow]);

  const industry = firstIndustry(text);
  if (demoPattern.test(text)) {
    if (industry) {
      return reply(
        `Here is the ${industry.title} sample journey. It uses sample data and is not a live system.`,
        [
          { label: "VIEW DEMO →", href: industry.demoHref },
          { label: "EXPLORE SOLUTION →", href: industry.solutionHref },
        ],
      );
    }
    return reply(
      chatReplies.industries.demoOverview,
      industryTopics.map((topic) => ({ label: `${topic.title} demo →`, href: topic.demoHref })),
    );
  }

  if (industry) {
    return reply(
      `${industry.body} We can build this as a scoped solution for your business.`,
      [
        { label: "EXPLORE SOLUTION →", href: industry.solutionHref },
        { label: "VIEW DEMO →", href: industry.demoHref },
      ],
    );
  }

  if (industryOverviewPattern.test(text)) {
    return reply(
      chatReplies.industries.overview,
      industryTopics.map((topic) => ({ label: topic.title, href: topic.solutionHref })),
    );
  }

  const topic = firstTopic(text);
  if (topic) return reply(topic.reply, [topic.link]);

  if (companyPattern.test(text)) {
    return reply(
      whoWeWorkWithPattern.test(text) ? chatReplies.whoWeWorkWith : chatReplies.company,
      [chatLinks.about],
    );
  }

  if (servicesListPattern.test(text)) {
    return reply(
      chatReplies.services.list,
      services.items.map((item) => ({ label: item.title, href: item.cta.href })),
    );
  }

  if (vaguePattern.test(text)) return reply(chatReplies.vague, [chatLinks.contactWalkflow]);

  if (businessHintPattern.test(text)) return reply(chatReplies.uncertain, [chatLinks.contactUs]);

  return reply(chatReplies.offTopic, [chatLinks.viewServices, chatLinks.contactWalkflow]);
}
