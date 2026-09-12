import type { ListingType, PropertyType } from "@/content/real-estate-properties";

export type Filters = {
  listingType: ListingType | "any";
  neighbourhood: string;
  maxBudget: number | null;
  minBedrooms: number;
  propertyType: PropertyType | "any";
};

export type LeadStage = "New Enquiry" | "Matched" | "Viewing Requested";

export type Lead = {
  id: string;
  name: string;
  email: string;
  stage: LeadStage;
  requirementsSummary: string;
  matchedPropertyIds: string[];
  viewing?: { propertyId: string; date: string };
  followUpReady: boolean;
};
