import { chatCopy, chatLinks, chatReplies } from "@/content/chat-assistant";
import type { ChatLink, ChatReply } from "@/lib/chat/types";
import {
  companyDescription,
  contactIntro,
  costAnswer,
  demoIntros,
  founderName,
  founderRoles,
  genericTimelineAnswer,
  industryLinks,
  industryTitles,
  pageLink,
  processSteps,
  realEstateDemoNotice,
  redesignAnswer,
  serviceTitles,
  summaries,
  topicRoutes,
  workWithAnswer,
  type TopicId,
} from "@/lib/chat/knowledge";
import { answerFromWebsite } from "@/lib/chat/retrieve";

/**
 * Answers visitor questions from the website's own content (see
 * src/lib/chat/knowledge.ts). Rules run in priority order:
 *  1. safety (abuse, explicit, threats, malicious, prompt injection)
 *  2. ordinary criticism, booking and contact
 *  3. topics the site does not answer (guarantees, refunds, integrations)
 *  4. structured answers from named content fields (founder, cost, timeline,
 *     process, service and industry lists, redesign, demos)
 *  5. broad topic questions, answered with the page's own summary
 *  6. a search of the website text, limited to a topic where one was named
 * Anything not found falls back to the Contact route rather than a guess.
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
const contactPattern = /\b(contact|reach (you|us|walkflow)|get in touch)\b/;
const founderPattern =
  /\b(founders?|co-?founder|founded|owners?|who (owns|runs|started|created|founded)|who'?s? behind|behind (walkflow|the business|the company|this company|this business)|(runs|run) (walkflow|this company|the company|this business|the business))\b/;
const teamPattern = /\b(team|members?|staff|people)\b/;
const costPattern = /\b(pric\w*|cost\w*|how much|quotes?|fees?|budgets?|afford\w*)\b/;
const timelinePattern = /\b(how long|timelines?|duration|turnaround)\b/;
const listingsPattern = /\b(show|see|sample|example)\b.*\b(listings?|properties)\b|\bproperty listings?\b/;
const demoPattern = /\b(demos?|demonstrations?|walkthroughs?|see (it|one|this) (in action|working)|examples?|samples?)\b/;
const demoLookPattern = /\b(see|show|look|example)\b/;
const workPattern = /\b(see (your|some|any) work|your work|portfolio|past work|examples? of (your )?(work|websites?|sites?|designs?)|show me (your )?work)\b/;
const workWithPattern = /\bwho (do|does) (you|walkflow) (work|serve|help)\b/;
const processPattern =
  /\b(process|how (do|does) (you|projects?|it|this) work|how does (it|this) work|next steps?|how (do|does) (i|we) start|get started|start a project)\b/;
const industryPattern = /\b(industr\w*|sectors?|what kind of (businesses|clients)|which (businesses|sectors)|what businesses)\b/;
const companyPattern = /\b(what is walkflow|what does walkflow do|who are you|about walkflow|what is this company|what do you do|what does this company do)\b/;
const servicesPattern = /\b(services?|offerings?|what do you (offer|sell)|what can you do)\b/;
const redesignPattern = /\b(redesign\w*|rebuild\w*|revamp\w*|improve\w*|existing|old (websites?|sites?)|refresh\w*)\b/;
const vaguePattern =
  /^(can you )?(build|make|create|do) (this|it|that)\b|\bwhat exactly (do )?i need\b|\bwhat do i need\b|\bcan you (build|make|do) (this|it|that)\b/;
const businessHintPattern =
  /\b(business|company|services?|websites?|automations?|emails?|apps?|pricing|price|cost|projects?|customers?|enquir\w*|leads?|bookings?|appointments?|team|marketing|software|tools?|crm|sales|quotes?|walkflow|industr\w*|clinics?|firms?|estate|plumb\w*|roof\w*|hvac|seo|social media|branding|logo|hosting|domain)\b/;

const topicPatterns: Array<{ topic: TopicId; pattern: RegExp }> = [
  { topic: "automation", pattern: /\b(automat\w*|crm|chatbots?|follow[- ]?ups?)\b/ },
  { topic: "email", pattern: /\b(emails?|newsletters?|campaigns?)\b/ },
  { topic: "web", pattern: /\b(web ?design\w*|designs?|websites?|web ?sites?|redesign\w*|landing pages?|online stores?|e-?commerce)\b/ },
  { topic: "mobile", pattern: /\b(mobile|apps?|ios|android)\b/ },
  { topic: "real-estate", pattern: /\b(real estate|property|properties|estate agents?)\b/ },
  { topic: "home-services", pattern: /\b(home services?|hvac|plumb\w*|roof\w*|tradespeople)\b/ },
  { topic: "clinics", pattern: /\b(clinics?|dental|dentists?|physio\w*|healthcare)\b/ },
  { topic: "consulting", pattern: /\b(consult\w*|advisory)\b/ },
];

const serviceTopicIds: TopicId[] = ["automation", "email", "web", "mobile"];
const industryTopicIds: TopicId[] = ["real-estate", "home-services", "clinics", "consulting"];

function normalise(message: string): string {
  return message.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
}

function reply(text: string, links: ChatLink[] = [], suggestions: string[] = []): ChatReply {
  return { text, links, suggestions };
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function namedTopics(text: string): TopicId[] {
  return topicPatterns.filter((entry) => entry.pattern.test(text)).map((entry) => entry.topic);
}

function routeFor(topic: TopicId, prefix: "/demos/" | "/industries/" | "/services/"): string | undefined {
  return (topicRoutes[topic] as readonly string[]).find((href) => href.startsWith(prefix));
}

function uniqueHrefs(topics: TopicId[]): string[] {
  return [...new Set(topics.flatMap((topic) => topicRoutes[topic]))];
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

  if (founderPattern.test(text) && !teamPattern.test(text)) {
    return reply(
      `${founderName} is the founder of WALKFLOW. The About page describes the founder’s focus as ${joinList(founderRoles)}.`,
      [chatLinks.founder],
    );
  }

  if (contactPattern.test(text)) {
    return reply(`You can reach the WALKFLOW team through the Contact page. ${contactIntro}`, [chatLinks.contactUs]);
  }

  if (chatReplies.uncertainTopics.test(text)) return reply(chatReplies.uncertain, [chatLinks.contactUs]);

  const topics = namedTopics(text);
  const serviceTopics = topics.filter((topic) => serviceTopicIds.includes(topic));
  const industryTopics = topics.filter((topic) => industryTopicIds.includes(topic));
  const topicHrefs = uniqueHrefs(topics);

  if (costPattern.test(text)) {
    if (!costAnswer) return reply(chatReplies.vague, [chatLinks.contactWalkflow]);
    return reply(costAnswer, [chatLinks.contactWalkflow]);
  }

  if (timelinePattern.test(text)) {
    const found = topicHrefs.length > 0 ? answerFromWebsite("timeline", topicHrefs) : null;
    if (found) return reply(found.text, [...found.links, chatLinks.contactWalkflow]);
    if (genericTimelineAnswer) return reply(genericTimelineAnswer, [chatLinks.contactWalkflow]);
    return reply(chatReplies.vague, [chatLinks.contactWalkflow]);
  }

  if (listingsPattern.test(text)) {
    return reply(realEstateDemoNotice, [{ label: "REAL ESTATE DEMO →", href: "/demos/real-estate" }]);
  }

  const demoRequested = demoPattern.test(text) || (industryTopics.length > 0 && demoLookPattern.test(text));
  if (demoRequested && !workPattern.test(text)) {
    const demo = industryTopics.map((topic) => routeFor(topic, "/demos/")).find(Boolean);
    if (demo && demoIntros[demo]) {
      return reply(`${demoIntros[demo]} This is a sample journey, not a live system.`, [pageLink(demo)]);
    }
    return reply(chatReplies.demos, industryLinks);
  }

  if (workPattern.test(text)) return reply(chatReplies.work, industryLinks);

  if (processPattern.test(text)) {
    return reply(`How a project usually runs: ${processSteps.map((step, i) => `${i + 1}. ${step}`).join(" ")}`, [
      chatLinks.contactWalkflow,
    ]);
  }

  if (workWithPattern.test(text) && workWithAnswer) {
    return reply(workWithAnswer, [chatLinks.about]);
  }

  if (industryPattern.test(text)) {
    return reply(`We have industry solutions for ${joinList(industryTitles)}.`, [
      { label: "INDUSTRY SOLUTIONS →", href: "/industries" },
    ]);
  }

  if (companyPattern.test(text)) {
    return reply(companyDescription, [chatLinks.about]);
  }

  if (redesignPattern.test(text) && (serviceTopics.includes("web") || /\bwebsites?|sites?\b/.test(text))) {
    const summary = summaries["/services/web-design"];
    const answer = redesignAnswer ? `${summary} ${redesignAnswer}` : summary;
    return reply(answer, [pageLink("/services/web-design")]);
  }

  if (serviceTopics.length > 0 && industryTopics.length === 0) {
    const href = topicRoutes[serviceTopics[0]][0];
    return reply(summaries[href], [pageLink(href)]);
  }

  if (industryTopics.length > 0) {
    const href = routeFor(industryTopics[0], "/industries/") ?? topicRoutes[industryTopics[0]][0];
    const demo = routeFor(industryTopics[0], "/demos/");
    return reply(summaries[href], demo ? [pageLink(href), pageLink(demo)] : [pageLink(href)]);
  }

  if (servicesPattern.test(text)) {
    return reply(`We offer ${joinList(serviceTitles)}.`, [chatLinks.viewServices]);
  }

  const found = answerFromWebsite(text, topicHrefs.length > 0 ? topicHrefs : undefined) ?? answerFromWebsite(text);
  if (found) return reply(found.text, found.links);

  if (vaguePattern.test(text)) return reply(chatReplies.vague, [chatLinks.contactWalkflow]);

  if (businessHintPattern.test(text)) return reply(chatReplies.uncertain, [chatLinks.contactUs]);

  return reply(chatReplies.offTopic, [chatLinks.viewServices, chatLinks.contactWalkflow]);
}
