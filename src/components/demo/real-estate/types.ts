import type { ListingType, PropertyType } from "@/content/real-estate-properties";

export type Filters = {
  listingType: ListingType | "any";
  neighbourhood: string;
  maxBudget: number | null;
  minBedrooms: number;
  propertyType: PropertyType | "any";
};
