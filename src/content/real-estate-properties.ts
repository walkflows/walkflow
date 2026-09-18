export type ListingType = "buy" | "rent";

export type PropertyType = "House" | "Apartment" | "Bungalow" | "Townhouse" | "Studio" | "Villa" | "Cottage" | "Duplex";

export type PropertyStatus = "Available" | "Under Offer";

export type Property = {
  id: string;
  name: string;
  neighbourhood: string;
  propertyType: PropertyType;
  listingType: ListingType;
  /** Whole currency units. Rent prices are per month. */
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: PropertyStatus;
  description: string;
  /**
   * Real sample photo from "Real estate demo images/" (Session 9), served
   * from public/real-estate-demo/. Optional: "Greenway Duplex" has no
   * matching photo in that folder, so it falls back to the illustrated
   * PropertyThumb placeholder in PropertyCard/PropertyDetailsDialog.
   */
  image?: string;
};

/** A clearly fictional sample market — no resemblance to a real place is intended. */
export const sampleMarketLabel = "Ashcombe (fictional sample market)";

export const neighbourhoods = [
  "Millbrook",
  "Northgate",
  "Old Ferry",
  "Cedar Row",
  "Thorn Hill",
  "Lakeside",
  "Harbor Row",
  "Greenway",
  "Southbank",
  "Fernwood",
] as const;

export const propertyTypes: PropertyType[] = [
  "House",
  "Apartment",
  "Bungalow",
  "Townhouse",
  "Studio",
  "Villa",
  "Cottage",
  "Duplex",
];

export const budgetOptions = [
  { value: 250000, label: "$250,000" },
  { value: 350000, label: "$350,000" },
  { value: 500000, label: "$500,000" },
  { value: 750000, label: "$750,000" },
  { value: 1250000, label: "$1,250,000" },
];

export const bedroomOptions = [1, 2, 3, 4, 5];

export const properties: Property[] = [
  {
    id: "wf-101",
    name: "Ashcombe Garden House",
    neighbourhood: "Millbrook",
    propertyType: "House",
    listingType: "buy",
    price: 465000,
    bedrooms: 4,
    bathrooms: 2,
    status: "Available",
    description: "A two-storey family home with a private garden, a converted loft study and off-street parking.",
    image: "/real-estate-demo/ashcombe-garden-house.jpg",
  },
  {
    id: "wf-102",
    name: "Skyline View Apartment",
    neighbourhood: "Northgate",
    propertyType: "Apartment",
    listingType: "rent",
    price: 1650,
    bedrooms: 2,
    bathrooms: 2,
    status: "Available",
    description: "A high-floor apartment with an open living area, floor-to-ceiling windows and a shared rooftop terrace.",
    image: "/real-estate-demo/skyline-view-apartment.jpg",
  },
  {
    id: "wf-103",
    name: "Riverside Loft",
    neighbourhood: "Old Ferry",
    propertyType: "Apartment",
    listingType: "buy",
    price: 289000,
    bedrooms: 2,
    bathrooms: 1,
    status: "Available",
    description: "A converted warehouse loft with exposed brick, factory-style windows and a mezzanine sleeping area.",
    image: "/real-estate-demo/riverside-loft.jpg",
  },
  {
    id: "wf-104",
    name: "Cedar Row Bungalow",
    neighbourhood: "Cedar Row",
    propertyType: "Bungalow",
    listingType: "buy",
    price: 340000,
    bedrooms: 3,
    bathrooms: 1,
    status: "Available",
    description: "A single-storey home with a wide driveway, a low-maintenance garden and step-free access throughout.",
    image: "/real-estate-demo/cedar-row-bungalow.jpg",
  },
  {
    id: "wf-105",
    name: "Thorn Hill Townhouse",
    neighbourhood: "Thorn Hill",
    propertyType: "Townhouse",
    listingType: "buy",
    price: 525000,
    bedrooms: 3,
    bathrooms: 2,
    status: "Under Offer",
    description: "A period townhouse on a quiet, tree-lined street, close to local shops and a short walk from the park.",
    image: "/real-estate-demo/thorn-hill-townhouse.jpg",
  },
  {
    id: "wf-106",
    name: "Lakeside Villa",
    neighbourhood: "Lakeside",
    propertyType: "Villa",
    listingType: "buy",
    price: 1150000,
    bedrooms: 5,
    bathrooms: 4,
    status: "Available",
    description: "A detached villa with a private pool, a landscaped garden and views across the lake from the upper floor.",
    image: "/real-estate-demo/lakeside-villa.jpg",
  },
  {
    id: "wf-107",
    name: "Harbor Row Studio",
    neighbourhood: "Harbor Row",
    propertyType: "Studio",
    listingType: "rent",
    price: 895,
    bedrooms: 1,
    bathrooms: 1,
    status: "Available",
    description: "A compact studio with a kitchenette and a fold-out desk, a short walk from the waterfront path.",
    image: "/real-estate-demo/harbor-row-studio.jpg",
  },
  {
    id: "wf-108",
    name: "Greenway Duplex",
    neighbourhood: "Greenway",
    propertyType: "Duplex",
    listingType: "rent",
    price: 1450,
    bedrooms: 3,
    bathrooms: 2,
    status: "Available",
    description: "A modern duplex with dark timber cladding, an open-plan kitchen and a small private yard.",
  },
  {
    id: "wf-109",
    name: "Southbank Penthouse",
    neighbourhood: "Southbank",
    propertyType: "Apartment",
    listingType: "rent",
    price: 2400,
    bedrooms: 3,
    bathrooms: 2,
    status: "Available",
    description: "A top-floor apartment with a wraparound terrace and an open view across the harbour at dusk.",
    image: "/real-estate-demo/southbank-penthouse.jpg",
  },
  {
    id: "wf-110",
    name: "Fernwood Cottage",
    neighbourhood: "Fernwood",
    propertyType: "Cottage",
    listingType: "buy",
    price: 615000,
    bedrooms: 3,
    bathrooms: 2,
    status: "Available",
    description: "A restored cottage with a mature garden, a wood-burning stove and a converted outbuilding studio.",
    image: "/real-estate-demo/fernwood-cottage.jpg",
  },
];

export function formatPrice(property: Pick<Property, "price" | "listingType">) {
  const amount = property.price.toLocaleString("en-US");
  return property.listingType === "rent" ? `$${amount} / month` : `$${amount}`;
}
