/**
 * Consulting demo — adapted to QUES CONSULTING's real supplied service
 * content per explicit instruction. Service names, descriptions, session
 * durations and proposed prices come from QUES-CONSULTING-Website-
 * Content.md's real "Service selection" section, not invented copy.
 * Consultants, clients and every date/time/payment are fictional. No real
 * engagement, payment or proposal is arranged through this demo (see the
 * hero notice in content/consulting-demo.ts).
 */

export type ServiceId = "strategy" | "finance" | "operations" | "performance";

export type SessionService = {
  id: ServiceId;
  name: string;
  description: string;
  sessionSummary: string;
  durationMinutes: number;
  price: number;
  currency: "USD";
  image: string;
};

/** Exact names/descriptions/durations/prices from QUES's supplied "Service selection" pricing table. */
export const sessionServices: SessionService[] = [
  {
    id: "strategy",
    name: "Business Strategy & Growth",
    description: "Clarify your direction and turn your goals into practical priorities.",
    sessionSummary: "Bring one strategic challenge or growth opportunity and work through a clearer direction.",
    durationMinutes: 60,
    price: 150,
    currency: "USD",
    image: "/consulting-demo/services/strategy.webp",
  },
  {
    id: "finance",
    name: "Financial Planning & Cash Flow",
    description: "Understand your numbers and the financial demands of your next move.",
    sessionSummary: "Explore one business budgeting or cash flow question using the information you already have.",
    durationMinutes: 90,
    price: 225,
    currency: "USD",
    image: "/consulting-demo/services/finance.webp",
  },
  {
    id: "operations",
    name: "Operations & Process Improvement",
    description: "Find recurring bottlenecks and build clearer ways to work.",
    sessionSummary: "Examine one workflow that causes delays, duplicated work, or unclear responsibilities.",
    durationMinutes: 90,
    price: 225,
    currency: "USD",
    image: "/consulting-demo/services/operations.webp",
  },
  {
    id: "performance",
    name: "Performance Reporting & Advisory",
    description: "Make your reports more useful and keep your priorities in view.",
    sessionSummary: "Review how you track progress and decide what your management reporting should help you see.",
    durationMinutes: 60,
    price: 175,
    currency: "USD",
    image: "/consulting-demo/services/performance.webp",
  },
];

export function serviceById(id: ServiceId): SessionService {
  return sessionServices.find((s) => s.id === id) ?? sessionServices[0];
}

/** QUES's real "Larger projects" offer — a distinct path, not a priced card. From the supplied content: "For broader strategy work, financial modelling, implementation, or ongoing advisory... We will discuss a scope and provide a proposal before requesting a project payment." */
export const customProjectCard = {
  id: "custom-project" as const,
  name: "Have a larger project?",
  description: "For broader strategy work, financial modelling, implementation, or ongoing advisory — tell us what you need and we'll scope a proposal.",
  image: "/consulting-demo/services/custom-project.webp",
};

export type EngagementPath = "session" | "project";

/** Fictional consultants — one per specialism, plus a generalist for custom projects. Assignment is a documented lookup (see engine.ts), not an AI decision. */
export type Consultant = { id: string; name: string; title: string; specialisms: ServiceId[]; handlesCustomProjects?: boolean };

export const consultants: Consultant[] = [
  { id: "cons-amara", name: "Amara Osei", title: "Strategy Partner", specialisms: ["strategy"] },
  { id: "cons-leo", name: "Leo Fontaine", title: "Financial Planning Lead", specialisms: ["finance"] },
  { id: "cons-priya", name: "Priya Nandan", title: "Operations Consultant", specialisms: ["operations"] },
  { id: "cons-ray", name: "Ray Whitfield", title: "Performance Advisory Lead", specialisms: ["performance"], handlesCustomProjects: true },
];

export function consultantForService(serviceId: ServiceId): Consultant {
  return consultants.find((c) => c.specialisms.includes(serviceId)) ?? consultants[consultants.length - 1];
}

export function consultantForCustomProject(): Consultant {
  return consultants.find((c) => c.handlesCustomProjects) ?? consultants[consultants.length - 1];
}

export const consultingTimezoneLabel = "Times shown in your browser's local time (sample firm timezone, demo only)";

/** A generic, illustrative proposal scenario for custom projects — QUES's real content says these are "quoted separately," so this is explicitly a sample range, never a firm quote. */
export const customProjectProposal = {
  scopeOfWork: "A scoped engagement covering the broader work discussed in your enquiry — defined in full once a consultant reviews your project.",
  deliverables: "A written proposal with scope, milestones and deliverables, agreed before any work begins.",
  sampleFeeRange: "US$2,500–US$8,000 (illustrative range only)",
  notes: "Custom projects are quoted separately from standard sessions. This is a sample range for demonstration — real pricing depends on scope.",
};

/** A short, finite nurture sequence — not an indefinite drip. Stops once the client accepts, declines, cancels or opts out (see session.ts). */
export const followUpSequence = [
  {
    subject: "Still thinking it over?",
    body: "Just checking in — let us know if you have questions before deciding on next steps.",
  },
  {
    subject: "One more thing that might help",
    body: "Here's a bit more context that other clients in a similar position have found useful.",
  },
] as const;
