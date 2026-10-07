import type { ChatLink } from "@/lib/chat/types";
import { passages, type Passage } from "@/lib/chat/knowledge";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "at", "be", "can", "could", "do", "does", "for", "from", "give", "has", "have", "help",
  "how", "i", "if", "in", "is", "it", "its", "me", "my", "of", "on", "or", "our", "please", "show", "tell", "that",
  "the", "their", "them", "there", "they", "this", "to", "us", "we", "what", "where", "which", "who", "will", "with",
  "you", "your", "about", "any", "get", "just", "know", "service", "services", "offer", "offers", "write", "build",
  "make", "create", "want", "need", "like", "think", "current", "work",
]);

/** Question words mapped to the words the website actually uses. Matched after stemming. */
const EXPANSIONS: Record<string, string[]> = {
  owner: ["founder"],
  own: ["founder"],
  run: ["founder"],
  behind: ["founder"],
  creator: ["founder"],
  create: ["founder"],
  start: ["founder"],
  found: ["founder"],
  design: ["web", "design"],
  redesign: ["web", "design"],
  website: ["web", "site"],
  site: ["web", "site"],
  automate: ["automation"],
  mobile: ["mobile", "app"],
  app: ["mobile", "app"],
  industry: ["industry"],
  sector: ["industry"],
  demo: ["demo"],
  example: ["demo", "portfolio"],
  sample: ["demo", "portfolio"],
  portfolio: ["portfolio", "demo"],
  project: ["project"],
  price: ["cost", "price", "depends", "scope"],
  cost: ["cost", "price", "depends", "scope"],
  pricing: ["cost", "price", "depends", "scope"],
  fee: ["cost", "price", "depends", "scope"],
  long: ["timeline", "depends"],
  timeline: ["timeline", "depends"],
  duration: ["timeline", "depends"],
  contact: ["contact"],
  reach: ["contact"],
  email: ["contact"],
  phone: ["contact"],
};

function stem(word: string): string {
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    .map(stem);
}

type Indexed = { passage: Passage; terms: Set<string>; headingTerms: Set<string> };

const index: Indexed[] = passages.map((passage) => ({
  passage,
  terms: new Set(tokenize(passage.text)),
  headingTerms: new Set(tokenize(passage.heading)),
}));

const documentFrequency = new Map<string, number>();
for (const entry of index) {
  for (const term of new Set([...entry.terms, ...entry.headingTerms])) {
    documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
  }
}

function weight(term: string): number {
  const df = documentFrequency.get(term) ?? 0;
  return Math.log((index.length + 1) / (df + 1)) + 1;
}

const MIN_SCORE = 2.5;
const MIN_DISTINCT_MATCHES = 2;

type Scored = { entry: Indexed; score: number };

function queryTerms(query: string) {
  const direct = tokenize(query);
  const expanded = direct.flatMap((term) => (EXPANSIONS[term] ?? []).map(stem));
  return { direct: new Set(direct), all: new Set([...direct, ...expanded]) };
}

const RARE_TERM_WEIGHT = 4;

function score(entry: Indexed, terms: ReturnType<typeof queryTerms>, minMatches: number): number {
  let total = 0;
  let matches = 0;
  let directHits = 0;
  let rareHeadingHit = false;
  for (const term of terms.all) {
    const inHeading = entry.headingTerms.has(term);
    if (!inHeading && !entry.terms.has(term)) continue;
    const termWeight = weight(term);
    total += termWeight * (inHeading ? 1.5 : 1);
    matches += 1;
    if (terms.direct.has(term)) {
      directHits += 1;
      if (inHeading && termWeight >= RARE_TERM_WEIGHT) rareHeadingHit = true;
    }
  }
  if (directHits === 0) return 0;
  const enoughMatches = matches >= minMatches || rareHeadingHit;
  if (!enoughMatches) return 0;
  const substantial = entry.passage.text.length >= 90 ? 1 : 0.7;
  return total * substantial;
}

function bestSentences(text: string, queryTermSet: Set<string>): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const fullSentences = sentences.filter((sentence) => sentence.length >= 40);
  const ranked = sentences
    .map((sentence, order) => ({
      sentence,
      order,
      hits: tokenize(sentence).filter((term) => queryTermSet.has(term)).length,
    }))
    .sort((a, b) => b.hits - a.hits || a.order - b.order);

  const chosen: typeof ranked = [];
  let length = 0;
  for (const candidate of ranked) {
    if (chosen.length === 2) break;
    if (chosen.length > 0 && candidate.hits === 0) break;
    if (length + candidate.sentence.length > 330 && chosen.length > 0) break;
    if (candidate.sentence.length < 40 && fullSentences.length > 0) continue;
    chosen.push(candidate);
    length += candidate.sentence.length;
  }
  if (chosen.length === 0) return sentences[0];
  return chosen
    .sort((a, b) => a.order - b.order)
    .map((item) => item.sentence)
    .join(" ");
}

export type WebsiteAnswer = { text: string; links: ChatLink[] };

/**
 * Finds the best-matching website passage and answers with one or two
 * sentences from it. Returns null when nothing matches well enough, so the
 * caller can fall back to the Contact route rather than guess.
 */
export function answerFromWebsite(query: string, restrictTo?: readonly string[]): WebsiteAnswer | null {
  const terms = queryTerms(query);
  const ranked: Scored[] = index
    .filter((entry) => !restrictTo || restrictTo.includes(entry.passage.href))
    .map((entry) => ({ entry, score: score(entry, terms, restrictTo ? 1 : MIN_DISTINCT_MATCHES) }))
    .filter((item) => item.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);
  if (ranked.length === 0) return null;

  const top = ranked[0].entry.passage;
  const links: ChatLink[] = [];
  for (const item of ranked) {
    if (links.length === 2) break;
    if (links.some((link) => link.href === item.entry.passage.href)) continue;
    links.push({ label: `${item.entry.passage.page} →`.toUpperCase(), href: item.entry.passage.href });
  }

  return { text: bestSentences(top.text, terms.all), links };
}
