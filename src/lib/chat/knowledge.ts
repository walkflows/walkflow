import { aboutAccordion, aboutHero, aboutIntro, aboutSeo, aboutTeam } from "@/content/about";
import { contactHero, contactPage } from "@/content/contact";
import { finalCta, faq, hero, journey, platformsAndTools, process, services, whyWalkflow } from "@/content/home";
import { industriesDirectory, industryPages, type IndustrySlug } from "@/content/industries";
import { realEstateDemoHero, realEstateDemoSeo } from "@/content/real-estate-demo";
import { homeServicesDemoHero, homeServicesDemoSeo } from "@/content/home-services-demo";
import { clinicsDemoHero, clinicsDemoSeo } from "@/content/clinics-demo";
import { consultingDemoHero, consultingDemoSeo } from "@/content/consulting-demo";
import { servicePages, type ServiceSlug } from "@/content/services";
import { webDesignProjects } from "@/content/web-design-projects";
import type { ChatLink } from "@/lib/chat/types";

/**
 * Searchable website knowledge, generated from the same content modules the
 * pages render from, so a copy change on a page reaches the chat without a
 * second edit. Only an explicit allow-list of sources is read, and only body
 * text fields are kept (not titles, labels or questions as answers). Left out
 * on purpose: unverified homepage statistics, client-review placeholders,
 * service project tiles marked PLACEHOLDER, and the sample-business catalogues
 * behind the demos (fictional listings, clinic staff, QUES session prices).
 */

export type Passage = {
  href: string;
  page: string;
  heading: string;
  text: string;
};

const BODY_KEYS = new Set([
  "body",
  "answer",
  "description",
  "intro",
  "overview",
  "opening",
  "designFocus",
  "forBusiness",
  "cardDescription",
  "note",
  "notice",
  "highlight",
  "highlightNote",
  "paragraphs",
]);

const EXCLUDED_KEYS = new Set([
  "stats",
  "statsCaption",
  "reviews",
  "projects",
  "devNote",
  "linkedinUrl",
  "photo",
  "image",
  "mockup",
  "heroScreenshot",
  "showcaseLarge",
  "showcasePair",
  "showcaseExtra",
  "showcaseMobile",
]);

const HEADING_KEYS = ["question", "heading", "title", "role", "name"] as const;
const MIN_TEXT_LENGTH = 40;

type Context = { href: string; page: string; heading: string };

function collect(node: unknown, context: Context, out: Passage[]): void {
  if (Array.isArray(node)) {
    for (const child of node) collect(child, context, out);
    return;
  }
  if (!node || typeof node !== "object") return;

  const record = node as Record<string, unknown>;
  const ownHeading = HEADING_KEYS.map((key) => record[key]).find((value) => typeof value === "string");
  const childContext = typeof ownHeading === "string" ? { ...context, heading: ownHeading } : context;

  for (const [key, value] of Object.entries(record)) {
    if (EXCLUDED_KEYS.has(key)) continue;
    if (BODY_KEYS.has(key)) {
      const texts = typeof value === "string" ? [value] : Array.isArray(value) && value.every((v) => typeof v === "string") ? value : null;
      if (texts) {
        for (const text of texts) {
          const trimmed = text.trim();
          if (trimmed.length >= MIN_TEXT_LENGTH && !/^https?:|^\//.test(trimmed)) {
            out.push({ ...childContext, text: trimmed });
          }
        }
        continue;
      }
    }
    collect(value, childContext, out);
  }
}

function industryTitle(slug: IndustrySlug): string {
  return industriesDirectory.cards.find((card) => card.slug === slug)?.title ?? slug;
}

const industrySlugs = Object.keys(industryPages) as IndustrySlug[];
const serviceSlugs = Object.keys(servicePages) as ServiceSlug[];

type Source = { href: string; page: string; data: unknown };

const sources: Source[] = [
  {
    href: "/about",
    page: "About WALKFLOW",
    data: { seo: aboutSeo, intro: aboutIntro, founder: aboutHero, history: aboutAccordion, team: aboutTeam },
  },
  {
    href: "/",
    page: "Home",
    data: {
      hero,
      services,
      whyWalkflow: { features: whyWalkflow.features },
      journey,
      process,
      platforms: platformsAndTools,
      faq,
      finalCta,
    },
  },
  { href: "/industries", page: "Industry Solutions", data: industriesDirectory },
  ...industrySlugs.map((slug) => ({
    href: `/industries/${slug}`,
    page: industryTitle(slug),
    data: industryPages[slug],
  })),
  ...serviceSlugs.map((slug) => ({
    href: `/services/${slug}`,
    page: servicePages[slug].seo.title,
    data: servicePages[slug],
  })),
  {
    href: "/demos/real-estate",
    page: `${industryTitle("real-estate")} demo`,
    data: { seo: realEstateDemoSeo, hero: realEstateDemoHero },
  },
  {
    href: "/demos/home-services",
    page: `${industryTitle("home-services")} demo`,
    data: { seo: homeServicesDemoSeo, hero: homeServicesDemoHero },
  },
  {
    href: "/demos/clinics",
    page: `${industryTitle("clinics")} demo`,
    data: { seo: clinicsDemoSeo, hero: clinicsDemoHero },
  },
  {
    href: "/demos/consulting",
    page: `${industryTitle("consulting")} demo`,
    data: { seo: consultingDemoSeo, hero: consultingDemoHero },
  },
  {
    href: "/contact",
    page: "Contact",
    data: { page: contactPage, hero: contactHero },
  },
  ...webDesignProjects.map((project) => ({
    href: `/services/web-design/projects/${project.slug}`,
    page: project.title,
    data: {
      cardDescription: project.cardDescription,
      opening: project.opening,
      overview: project.overview,
      designFocus: project.designFocus,
      whatThisMeans: project.whatThisMeans,
      forBusiness: project.forBusiness,
    },
  })),
];

function buildPassages(): Passage[] {
  const out: Passage[] = [];
  for (const source of sources) {
    collect(source.data, { href: source.href, page: source.page, heading: "" }, out);
  }
  return out;
}

export const passages: Passage[] = buildPassages();

function serviceHref(id: string): string {
  const item = services.items.find((service) => service.id === id);
  if (!item) throw new Error(`Unknown service id: ${id}`);
  return item.cta.href;
}

/** Route groups for topic words, so a question about one service only searches that service's pages. */
export const topicRoutes = {
  automation: [serviceHref("automation")],
  email: [serviceHref("email-marketing")],
  web: [serviceHref("web-design")],
  mobile: [serviceHref("mobile-apps")],
  "real-estate": ["/industries/real-estate", "/demos/real-estate"],
  "home-services": ["/industries/home-services", "/demos/home-services"],
  clinics: ["/industries/clinics", "/demos/clinics"],
  consulting: ["/industries/consulting", "/demos/consulting"],
} as const;

export type TopicId = keyof typeof topicRoutes;

export const founderName: string = aboutHero.name;
export const founderRoles: string[] = aboutHero.tags;
export const companyDescription: string =
  faq.items.find((item) => item.question === "What is WALKFLOW?")?.answer ?? aboutIntro.paragraphs[0];
export const costAnswer: string | null = faq.items.find((item) => /cost/i.test(item.question))?.answer ?? null;
export const contactIntro: string = contactPage.intro;
export const realEstateDemoNotice: string = realEstateDemoHero.notice;
export const demoIntros: Record<string, string> = {
  "/demos/real-estate": realEstateDemoHero.body,
  "/demos/home-services": homeServicesDemoHero.body,
  "/demos/clinics": clinicsDemoHero.body,
  "/demos/consulting": consultingDemoHero.body,
};
export const processSteps: string[] = process.steps.map((step) => step.title);
export const workWithAnswer: string | null =
  faq.items.find((item) => /work with/i.test(item.question))?.answer ?? null;
export const serviceTitles: string[] = services.items.map((item) => item.title);
export const industryTitles: string[] = industriesDirectory.cards.map((card) => card.title);
export const industryLinks = industriesDirectory.cards.map((card) => ({
  label: `${card.title} demo`,
  href: `/demos/${card.slug}`,
}));

/** Drops short slogan-style lead sentences (for example "Less chasing.") so a summary opens with the description. */
function withoutSloganLead(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let start = 0;
  while (start < sentences.length - 1 && sentences[start].length < 40) start += 1;
  return sentences.slice(start).join(" ");
}

/** One-paragraph page summaries, used for broad questions so they get the main description rather than a single FAQ line. */
const rawSummaries: Record<string, string> = {
  ...Object.fromEntries(serviceSlugs.map((slug) => [`/services/${slug}`, servicePages[slug].seo.description])),
  ...Object.fromEntries(industrySlugs.map((slug) => [`/industries/${slug}`, industryPages[slug].seo.description])),
  "/demos/real-estate": realEstateDemoSeo.description,
  "/demos/home-services": homeServicesDemoSeo.description,
  "/demos/clinics": clinicsDemoSeo.description,
  "/demos/consulting": consultingDemoSeo.description,
};

export const summaries: Record<string, string> = Object.fromEntries(
  Object.entries(rawSummaries).map(([href, text]) => [href, withoutSloganLead(text)]),
);

export function pageLink(href: string): ChatLink {
  const page = sources.find((source) => source.href === href)?.page ?? href;
  return { label: `${page} →`.toUpperCase(), href };
}

const webFaqs = servicePages["web-design"].faqs;
export const redesignAnswer: string | null =
  webFaqs.find((item) => /improve my existing website/i.test(item.question))?.answer ?? null;
export const genericTimelineAnswer: string | null =
  webFaqs.find((item) => /timeline depends/i.test(item.answer))?.answer ?? null;
