import { crews, isAreaCovered, type Crew, type ServiceId } from "@/content/home-services-roofing";

/**
 * Deterministic, rule-based demo logic — mirrors the architecture used by
 * the Real Estate demo (src/components/demo/real-estate/engine.ts) but
 * kept as an entirely separate module with its own data and rules, per
 * explicit instruction to keep the two demos' business rules separate.
 * No paid AI service is used or required for any of this.
 */

export type PropertyKind = "residential" | "commercial";
export type Urgency = "routine" | "soon" | "urgent";

export type Requirements = {
  serviceId: ServiceId;
  propertyKind: PropertyKind;
  location: string;
  issueDescription: string;
  urgency: Urgency;
  preferredSlotId: string;
  photoId: string;
};

export function checkServiceArea(location: string): boolean {
  return isAreaCovered(location);
}

/** Specialism + area match first, then specialism alone, then the generalist (last) crew in the roster. */
export function assignCrew(serviceId: ServiceId, location: string): Crew {
  const byBoth = crews.find((c) => c.specialisms.includes(serviceId) && c.areas.includes(location));
  if (byBoth) return byBoth;
  const bySpecialism = crews.find((c) => c.specialisms.includes(serviceId));
  if (bySpecialism) return bySpecialism;
  return crews[crews.length - 1];
}

export type ServiceSlot = { id: string; label: string; iso: string };

export const demoTimezoneLabel = "Times shown in your browser's local time (sample timezone, demo only)";

function buildSlots(from: Date, offsets: Array<{ days: number; hour: number }>): ServiceSlot[] {
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

/** Future inspection slots — Stage 1's "preferred date/time" and Stage 3's actual request both draw from this same generator. */
export function generateInspectionSlots(from: Date = new Date()): ServiceSlot[] {
  return buildSlots(from, [
    { days: 1, hour: 9 },
    { days: 2, hour: 13 },
    { days: 3, hour: 15 },
  ]);
}

/** Job dates sit further out than inspection slots, reflecting the real sequence (inspect, then estimate, then schedule the job). */
export function generateJobDateSlots(from: Date = new Date()): ServiceSlot[] {
  return buildSlots(from, [
    { days: 7, hour: 8 },
    { days: 9, hour: 8 },
    { days: 12, hour: 8 },
  ]);
}

export type EstimateScenario = {
  scopeOfWork: string;
  materials: string;
  labour: string;
  amount: number;
  currency: "USD";
  notes: string;
};

/** Predefined, deterministic sample pricing per service — never invented on the fly, so the same service always produces the same demo estimate. */
export const estimateScenarios: Record<ServiceId, EstimateScenario> = {
  "roof-installation": {
    scopeOfWork: "Install a new roofing system on the inspected structure, including underlayment and flashing.",
    materials: "Architectural asphalt shingles, synthetic underlayment, step and drip-edge flashing.",
    labour: "3-person crew, estimated 3 working days.",
    amount: 14500,
    currency: "USD",
    notes: "Final scope depends on roof size and deck condition confirmed at inspection.",
  },
  "roof-repair": {
    scopeOfWork: "Repair the identified leak area and replace damaged shingles and flashing around it.",
    materials: "Matching shingles, roofing cement, replacement flashing.",
    labour: "2-person crew, estimated half a day.",
    amount: 850,
    currency: "USD",
    notes: "Priced for a single, localised repair area.",
  },
  "commercial-roofing": {
    scopeOfWork: "Planned roofing work for the commercial structure, scheduled around business operating hours.",
    materials: "Commercial-grade membrane roofing, insulation board, edge trim.",
    labour: "4-person crew, estimated 5–7 working days.",
    amount: 38000,
    currency: "USD",
    notes: "Scheduled in phases to minimise disruption to business operations.",
  },
  "roof-replacement": {
    scopeOfWork: "Full tear-off and replacement of the existing roof, including deck repairs where needed.",
    materials: "New shingles or chosen roofing system, synthetic underlayment, ventilation components.",
    labour: "4-person crew, estimated 4 working days.",
    amount: 19500,
    currency: "USD",
    notes: "Includes removal and disposal of the existing roof covering.",
  },
  "storm-leak-response": {
    scopeOfWork: "Make the roof safe, tarp any exposed areas and repair storm-related damage.",
    materials: "Temporary tarping, matching shingles, sealant, replacement flashing.",
    labour: "2-person crew, estimated same-day to 1 working day.",
    amount: 1200,
    currency: "USD",
    notes: "Emergency tarping is a temporary measure — a full repair is scoped separately if needed.",
  },
  "roof-inspections": {
    scopeOfWork: "Full roof inspection with a written condition report and recommendations.",
    materials: "No materials used — assessment only.",
    labour: "1 inspector, estimated 1–2 hours.",
    amount: 0,
    currency: "USD",
    notes: "Free, no-pressure assessment. Any recommended follow-up work is quoted separately.",
  },
  "not-sure": {
    scopeOfWork: "Scope to be confirmed once the inspection identifies the actual issue.",
    materials: "To be determined after inspection.",
    labour: "To be determined after inspection.",
    amount: 0,
    currency: "USD",
    notes: "An estimate will be prepared once the specific service needed is identified.",
  },
};

export function buildEstimate(serviceId: ServiceId): EstimateScenario {
  return estimateScenarios[serviceId];
}

/** A revised estimate after "changes requested" — same base scenario, flagged as revised, no invented new numbers. */
export function reviseEstimate(serviceId: ServiceId): EstimateScenario {
  const base = estimateScenarios[serviceId];
  return { ...base, notes: `Revised per customer request. ${base.notes}` };
}

export type InspectionOutcome = "missed" | "cancelled";
export type InspectionNextStep = { taskLabel: string; taskDetail: string; messageSubject: string; messageBody: string };

export function nextStepForInspectionOutcome(outcome: InspectionOutcome): InspectionNextStep {
  if (outcome === "missed") {
    return {
      taskLabel: "Offer a rescheduled inspection",
      taskDetail: "The customer missed the scheduled inspection. A coordinator would reach out to offer a new time.",
      messageSubject: "Sorry we missed you",
      messageBody: "We noticed you weren't able to make the inspection — happy to arrange another time whenever suits.",
    };
  }
  return {
    taskLabel: "Offer another slot or close the request",
    taskDetail: "The customer cancelled the inspection. A coordinator would confirm whether to rebook or close the request.",
    messageSubject: "Following up on your cancelled inspection",
    messageBody: "No problem at all — let us know if you'd like to pick another time, or if this isn't needed any more.",
  };
}
