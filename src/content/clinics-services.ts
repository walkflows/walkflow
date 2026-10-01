/**
 * Clinics demo — adapted to Happy Clinics' real supplied service content
 * per explicit instruction. Service names and descriptions come from
 * HAPPY-CLINICS-WEBSITE-CONTENT.md's card copy, not invented text. Staff,
 * providers, waiting-list patients and every appointment time are
 * fictional. Kept strictly administrative — no diagnosis, treatment
 * advice, clinical decision-making or real medical-record collection (see
 * the hero notice in content/clinics-demo.ts).
 */

export type ServiceCategoryId = "general-care" | "childrens-health" | "dental-care" | "diagnostics" | "skin-aesthetics" | "not-sure";

export type ServiceCategory = {
  id: ServiceCategoryId;
  name: string;
  description: string;
  image?: string;
};

/** Exact card names/descriptions from Happy Clinics' supplied content (section on service cards). */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "general-care",
    name: "General & Family Care",
    description: "A starting point for everyday concerns, routine reviews and conversations about your health.",
    image: "/clinics-demo/services/general-care.webp",
  },
  {
    id: "childrens-health",
    name: "Children's Health",
    description: "Appointments that make room for a child's needs and the questions parents and carers bring.",
    image: "/clinics-demo/services/childrens-health.webp",
  },
  {
    id: "dental-care",
    name: "Dental Care",
    description: "Discuss your teeth, gums and oral health with a dental professional.",
    image: "/clinics-demo/services/dental-care.webp",
  },
  {
    id: "diagnostics",
    name: "Diagnostic Services",
    description: "Find out about available tests, preparation and how your results will be explained.",
    image: "/clinics-demo/services/diagnostics.webp",
  },
  {
    id: "skin-aesthetics",
    name: "Skin & Aesthetic Consultations",
    description: "Talk through skin concerns and personal goals, with space to understand your options.",
    image: "/clinics-demo/services/skin-aesthetics.webp",
  },
];

/** The request form's sixth option — not a browsable card, only a dropdown choice. Routes straight to reception review (see engine.ts). */
export const notSureCategory: ServiceCategory = {
  id: "not-sure",
  name: "I'm not sure yet",
  description: "Tell us what's on your mind and reception will point you to the right service.",
};

export const allCategoryOptions: ServiceCategory[] = [...serviceCategories, notSureCategory];

export function categoryById(id: ServiceCategoryId): ServiceCategory {
  return allCategoryOptions.find((c) => c.id === id) ?? notSureCategory;
}

export type PatientKind = "new" | "returning";

export const patientKindOptions: { value: PatientKind; label: string }[] = [
  { value: "new", label: "New sample patient" },
  { value: "returning", label: "Returning sample patient" },
];

/** Fictional reception staff — assignment rule (see engine.ts): category match first, then the "not-sure"/reception-review owner as the default fallback. */
export type ReceptionStaff = { id: string; name: string; email: string; categories: ServiceCategoryId[] };

export const receptionStaff: ReceptionStaff[] = [
  { id: "recep-dana", name: "Dana Kim", email: "dana@happyclinics-demo.example", categories: ["general-care", "diagnostics"] },
  { id: "recep-priya", name: "Priya Shah", email: "priya@happyclinics-demo.example", categories: ["childrens-health", "dental-care"] },
  { id: "recep-jordan", name: "Jordan Blake", email: "jordan@happyclinics-demo.example", categories: ["skin-aesthetics", "not-sure"] },
];

/** One fictional provider per category — a documented, not AI, lookup. */
export type Provider = { id: string; name: string; title: string; categoryId: ServiceCategoryId };

export const providers: Provider[] = [
  { id: "prov-general", name: "Dr. Alex Rivera", title: "General Practitioner", categoryId: "general-care" },
  { id: "prov-childrens", name: "Jamie Cole", title: "Paediatric Nurse", categoryId: "childrens-health" },
  { id: "prov-dental", name: "Dr. Morgan Lee", title: "Dentist", categoryId: "dental-care" },
  { id: "prov-diagnostics", name: "Sam Patel", title: "Diagnostic Technician", categoryId: "diagnostics" },
  { id: "prov-skin", name: "Dr. Taylor Nguyen", title: "Dermatology Consultant", categoryId: "skin-aesthetics" },
];

export function providerForCategory(categoryId: ServiceCategoryId): Provider | null {
  return providers.find((p) => p.categoryId === categoryId) ?? null;
}

/** Fixed appointment duration per category — shown alongside slots, never invented per booking. */
export const appointmentDurationMinutes: Record<ServiceCategoryId, number> = {
  "general-care": 20,
  "childrens-health": 20,
  "dental-care": 30,
  diagnostics: 30,
  "skin-aesthetics": 25,
  "not-sure": 20,
};

export const clinicTimezoneLabel = "Times shown in your browser's local time (sample clinic timezone, demo only)";

/** Optional predefined practical-support needs — never free-text clinical information. */
export const supportNeedsOptions = [
  { id: "support-none", label: "No additional support needed" },
  { id: "support-wheelchair", label: "Wheelchair access" },
  { id: "support-interpreter", label: "Interpreter requested" },
  { id: "support-quiet-room", label: "Quiet waiting area" },
] as const;

/** Predefined staff follow-up instructions per category — Stage 6 only offers a follow-up when one of these exists, never an AI judgment. */
export const followUpInstructions: Record<ServiceCategoryId, string | null> = {
  "general-care": null,
  "childrens-health": null,
  "dental-care": "Recommend a routine 6-month check-up.",
  diagnostics: "Offer a follow-up call once results are ready.",
  "skin-aesthetics": "Offer a follow-up consultation in 4 weeks.",
  "not-sure": null,
};

/** One fictional waiting-list candidate per category, for Stage 5's cancelled-slot offer demonstration. Exactly one, so "no further candidates" is an honest, reachable state rather than an infinite fictional queue. */
export type WaitlistCandidate = { id: string; name: string; categoryId: ServiceCategoryId };

export const waitlistCandidates: WaitlistCandidate[] = [
  { id: "wait-general", name: "Riley Chen (fictional)", categoryId: "general-care" },
  { id: "wait-childrens", name: "Avery Morgan (fictional, parent/carer)", categoryId: "childrens-health" },
  { id: "wait-dental", name: "Morgan Diaz (fictional)", categoryId: "dental-care" },
  { id: "wait-diagnostics", name: "Casey Nolan (fictional)", categoryId: "diagnostics" },
  { id: "wait-skin", name: "Jules Bennett (fictional)", categoryId: "skin-aesthetics" },
];

export function waitlistCandidateForCategory(categoryId: ServiceCategoryId): WaitlistCandidate | null {
  return waitlistCandidates.find((w) => w.categoryId === categoryId) ?? null;
}
