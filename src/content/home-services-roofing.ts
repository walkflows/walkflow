/**
 * Home Services demo — adapted to a real roofing business (ROOFORA) per
 * explicit instruction. Service names, descriptions and images below come
 * from ROOFORA's own supplied landing-page copy and live site assets, not
 * invented copy. Crews, coordinators, service areas, customers and every
 * date/time in the interactive demo are fictional — no real inspection,
 * roofing work or payment is arranged through this demo (see the hero
 * notice in content/home-services-demo.ts).
 */

export type ServiceId =
  | "roof-installation"
  | "roof-repair"
  | "commercial-roofing"
  | "roof-replacement"
  | "storm-leak-response"
  | "roof-inspections"
  | "not-sure";

export type PropertyKind = "residential" | "commercial";

export type RoofingService = {
  id: ServiceId;
  name: string;
  description: string;
  image?: string;
};

/** Exact names/descriptions from ROOFORA's supplied landing-page copy (section 05 / Services). */
export const roofingServices: RoofingService[] = [
  {
    id: "roof-installation",
    name: "Roof Installation",
    description: "New roofing systems chosen for your building, your climate and the way you use the space.",
    image: "/home-services-demo/services/roof-installation.png",
  },
  {
    id: "roof-repair",
    name: "Roof Repair",
    description: "Targeted repairs that fix the cause of leaks and damage, not just the symptoms.",
    image: "/home-services-demo/services/roof-repair.jpg",
  },
  {
    id: "commercial-roofing",
    name: "Commercial Roofing",
    description: "Planned roofing work for offices, shops and warehouses, arranged around your operations.",
    image: "/home-services-demo/services/commercial-roofing.png",
  },
  {
    id: "roof-replacement",
    name: "Roof Replacement",
    description: "A complete renewal, planned step by step with a clear scope and suitable materials.",
    image: "/home-services-demo/services/roof-replacement.png",
  },
  {
    id: "storm-leak-response",
    name: "Storm & Leak Response",
    description: "Prompt help assessing and securing a roof after heavy rain, wind or sudden leaks.",
    image: "/home-services-demo/services/storm-leak-response.png",
  },
  {
    id: "roof-inspections",
    name: "Roof Inspections",
    description: "An honest look at your roof's condition, with straightforward recommendations.",
    image: "/home-services-demo/services/roof-inspections.png",
  },
];

/** The enquiry form's seventh option — not a browsable card, only a dropdown choice. */
export const notSureService: RoofingService = {
  id: "not-sure",
  name: "Not sure yet",
  description: "Tell us what you've noticed and we'll recommend the right service.",
};

export const allServiceOptions: RoofingService[] = [...roofingServices, notSureService];

export function serviceById(id: ServiceId): RoofingService {
  return allServiceOptions.find((s) => s.id === id) ?? notSureService;
}

/** A clearly fictional sample service area — no resemblance to a real place is intended. */
export const sampleServiceAreaLabel = "Ridgemont County (fictional sample service area)";

/** Crews cover these areas. Two additional areas exist in the location picker but are deliberately NOT covered, so the "outside the sample service area" path is reachable. */
export const coveredAreas = ["Mapleton", "Brookhaven", "Cedar Ridge", "Harborview", "Pinecrest", "Fairview"] as const;
export const uncoveredAreas = ["Outland County", "Faraway Hills"] as const;
export const allServiceLocations = [...coveredAreas, ...uncoveredAreas] as const;
export type ServiceLocation = (typeof allServiceLocations)[number];

export function isAreaCovered(location: string): boolean {
  return (coveredAreas as readonly string[]).includes(location);
}

export type Urgency = "routine" | "soon" | "urgent";

export const urgencyOptions: { value: Urgency; label: string }[] = [
  { value: "routine", label: "Routine — no rush" },
  { value: "soon", label: "Soon — within a week or two" },
  { value: "urgent", label: "Urgent — needs review soon" },
];

export type Crew = {
  id: string;
  name: string;
  leadName: string;
  email: string;
  specialisms: ServiceId[];
  areas: string[];
};

/** Deterministic, rule-based assignment (see engine.ts) — no AI call. The commercial/inspections crew acts as the generalist fallback. */
export const crews: Crew[] = [
  {
    id: "crew-north",
    name: "North Crew",
    leadName: "Marcus Lee",
    email: "marcus@roofora-demo.example",
    specialisms: ["roof-installation", "roof-replacement"],
    areas: ["Mapleton", "Brookhaven"],
  },
  {
    id: "crew-rapid",
    name: "Rapid Response Crew",
    leadName: "Priya Anand",
    email: "priya@roofora-demo.example",
    specialisms: ["roof-repair", "storm-leak-response"],
    areas: ["Cedar Ridge", "Harborview"],
  },
  {
    id: "crew-commercial",
    name: "Commercial & Inspections Crew",
    leadName: "Jordan Blake",
    email: "jordan@roofora-demo.example",
    specialisms: ["commercial-roofing", "roof-inspections", "not-sure"],
    areas: ["Pinecrest", "Fairview"],
  },
];

/** Sample fictional photo choices the visitor can optionally attach to a request — illustrative only, not uploaded anywhere. */
export const samplePhotoOptions = [
  { id: "photo-none", label: "No photo" },
  { id: "photo-shingle-damage", label: "Sample photo — damaged shingles" },
  { id: "photo-ceiling-stain", label: "Sample photo — ceiling water stain" },
  { id: "photo-roofline", label: "Sample photo — full roofline view" },
] as const;
