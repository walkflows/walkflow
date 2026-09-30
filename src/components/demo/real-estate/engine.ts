import {
  demoAgents,
  properties,
  type DemoAgent,
  type ListingType,
  type Property,
  type PropertyType,
} from "@/content/real-estate-properties";

/**
 * Deterministic, rule-based demo logic — Stages 2, 3, 4 and 6 of the
 * six-stage journey. No paid AI service is used or required for the core
 * journey, per the automation brief: matching and agent assignment are
 * plain, explainable rules over the sample property/agent data, not model
 * calls. Kept framework-free (no React) so it's easy to unit-test and to
 * port into a real server/n8n implementation later without rewriting logic.
 */

export type Timeline = "asap" | "1-3-months" | "3-6-months" | "exploring";

export const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

export type Requirements = {
  listingType: ListingType;
  neighbourhood: string | "any";
  maxBudget: number | null;
  minBedrooms: number;
  propertyType: PropertyType | "any";
  timeline: Timeline;
  notes: string;
};

export type MatchedProperty = { property: Property; reasons: string[] };
export type AlternativeProperty = { property: Property; reasons: string[]; differs: string };

function passesBudget(p: Property, r: Requirements) {
  return r.maxBudget === null || p.price <= r.maxBudget;
}
function passesLocation(p: Property, r: Requirements) {
  return r.neighbourhood === "any" || p.neighbourhood === r.neighbourhood;
}
function passesBedrooms(p: Property, r: Requirements) {
  return r.minBedrooms === 0 || p.bedrooms >= r.minBedrooms;
}
function passesType(p: Property, r: Requirements) {
  return r.propertyType === "any" || p.propertyType === r.propertyType;
}

function reasonsFor(r: Requirements): string[] {
  const reasons: string[] = [];
  if (r.maxBudget !== null) reasons.push(`Within your $${r.maxBudget.toLocaleString("en-US")} budget`);
  if (r.neighbourhood !== "any") reasons.push(`In ${r.neighbourhood}`);
  if (r.minBedrooms > 0) reasons.push(`${r.minBedrooms}+ bedrooms`);
  if (r.propertyType !== "any") reasons.push(`Matches the ${r.propertyType.toLowerCase()} type you asked for`);
  if (reasons.length === 0) reasons.push("Available now and matches your open criteria");
  return reasons;
}

/**
 * Strict matches must satisfy listing type, availability and every
 * requirement the visitor actually specified — never a relaxed "close
 * enough" result. When there are no strict matches, up to three
 * alternatives are offered, each explicitly labelled with the one
 * requirement it fails to meet ("differs") rather than silently presented
 * as a full match. Requirements themselves are never changed by this
 * function — only the visitor's own edit to the form does that.
 */
export function matchProperties(requirements: Requirements): {
  matches: MatchedProperty[];
  alternatives: AlternativeProperty[];
} {
  const candidates = properties.filter((p) => p.listingType === requirements.listingType && p.status === "Available");

  const matches = candidates
    .filter(
      (p) =>
        passesBudget(p, requirements) &&
        passesLocation(p, requirements) &&
        passesBedrooms(p, requirements) &&
        passesType(p, requirements),
    )
    .map((p) => ({ property: p, reasons: reasonsFor(requirements) }));

  if (matches.length > 0) return { matches, alternatives: [] };

  const relaxations: Array<{ differs: string; passes: (p: Property) => boolean }> = [
    { differs: "Slightly above your stated budget", passes: (p) => passesLocation(p, requirements) && passesBedrooms(p, requirements) && passesType(p, requirements) },
    {
      differs: requirements.neighbourhood === "any" ? "Different location" : `In a different area (not ${requirements.neighbourhood})`,
      passes: (p) => passesBudget(p, requirements) && passesBedrooms(p, requirements) && passesType(p, requirements),
    },
    { differs: "Fewer bedrooms than requested", passes: (p) => passesBudget(p, requirements) && passesLocation(p, requirements) && passesType(p, requirements) },
    { differs: "A different property type", passes: (p) => passesBudget(p, requirements) && passesLocation(p, requirements) && passesBedrooms(p, requirements) },
  ];

  const alternatives: AlternativeProperty[] = [];
  const seen = new Set<string>();
  for (const relaxation of relaxations) {
    for (const p of candidates) {
      if (seen.has(p.id) || alternatives.length >= 3) continue;
      if (relaxation.passes(p)) {
        alternatives.push({ property: p, reasons: reasonsFor(requirements), differs: relaxation.differs });
        seen.add(p.id);
      }
    }
  }

  return { matches: [], alternatives };
}

/**
 * Assignment rule: match the enquiry's neighbourhood to an agent's coverage
 * list first, then fall back to buy/rent specialism, then to the last
 * agent in the roster (Elena Cruz — "both") as the default. Fully
 * deterministic so the same enquiry always resolves to the same agent.
 */
export function assignAgent(requirements: Requirements): DemoAgent {
  if (requirements.neighbourhood !== "any") {
    const byArea = demoAgents.find((a) => a.neighbourhoods.includes(requirements.neighbourhood));
    if (byArea) return byArea;
  }
  const bySpecialism = demoAgents.find((a) => a.specialism === requirements.listingType);
  if (bySpecialism) return bySpecialism;
  return demoAgents[demoAgents.length - 1];
}

export type ViewingSlot = { id: string; label: string; iso: string };

export const demoTimezoneLabel = "Times shown in your browser's local time (sample timezone, demo only)";

/** Always generates future slots relative to `from`, so there is never a stale or past slot to select. */
export function generateViewingSlots(from: Date = new Date()): ViewingSlot[] {
  const offsets: Array<{ days: number; hour: number }> = [
    { days: 2, hour: 10 },
    { days: 3, hour: 14 },
    { days: 5, hour: 16 },
  ];
  return offsets.map(({ days, hour }) => {
    const d = new Date(from);
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return {
      id: `slot-${days}-${hour}`,
      label: `${d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })} · ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`,
      iso: d.toISOString(),
    };
  });
}

export type ViewingOutcome = "attended" | "cancelled" | "missed";
export type InterestLevel = "interested" | "not-interested" | "needs-info";

export type NextStep = {
  taskLabel: string;
  taskDetail: string;
  messageSubject: string;
  messageBody: string;
};

/** Stage 6 branching — every case from the brief, never representing a task as an actual sale, signed agreement or payment. */
export function nextStepFor(input: { outcome: ViewingOutcome; interest?: InterestLevel; listingType: ListingType }): NextStep {
  const { outcome, interest, listingType } = input;

  if (outcome === "missed") {
    return {
      taskLabel: "Offer a rescheduled viewing",
      taskDetail: "The visitor missed the scheduled viewing. A demo agent would reach out to offer a new time.",
      messageSubject: "Sorry we missed you",
      messageBody: "We noticed you weren't able to make the viewing — happy to arrange another time whenever suits.",
    };
  }
  if (outcome === "cancelled") {
    return {
      taskLabel: "Offer another slot or close the enquiry",
      taskDetail: "The visitor cancelled the viewing. A demo agent would confirm whether to rebook or close the enquiry.",
      messageSubject: "Following up on your cancelled viewing",
      messageBody: "No problem at all — let us know if you'd like to pick another time, or if this one isn't the right fit any more.",
    };
  }

  // attended
  if (interest === "interested") {
    return listingType === "buy"
      ? {
          taskLabel: "Start an offer discussion",
          taskDetail: "The visitor is interested after viewing. A demo agent would open a discussion about next steps toward an offer — no offer is made by this demo.",
          messageSubject: "Great to hear you're interested",
          messageBody: "Thanks for the visit — an agent will be in touch shortly to talk through next steps.",
        }
      : {
          taskLabel: "Start an application discussion",
          taskDetail: "The visitor is interested after viewing. A demo agent would open a discussion about a rental application — no application is submitted by this demo.",
          messageSubject: "Great to hear you're interested",
          messageBody: "Thanks for the visit — an agent will be in touch shortly to talk through the application process.",
        };
  }
  if (interest === "needs-info") {
    return {
      taskLabel: "Send the requested information",
      taskDetail: "The visitor needs more information before deciding. A demo agent would follow up with specific answers.",
      messageSubject: "The details you asked about",
      messageBody: "Thanks for your questions after the viewing — an agent will follow up shortly with more information.",
    };
  }
  // not-interested (default)
  return {
    taskLabel: "Suggest alternative properties",
    taskDetail: "The visitor wasn't interested after viewing. A demo agent would follow up with other suitable listings.",
    messageSubject: "A few other properties you might like",
    messageBody: "Thanks for the feedback — we've noted a few other sample listings that might be a better fit.",
  };
}
