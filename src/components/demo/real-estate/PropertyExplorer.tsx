import {
  bedroomOptions,
  budgetOptions,
  neighbourhoods,
  properties,
  propertyTypes,
  sampleMarketLabel,
} from "@/content/real-estate-properties";
import { demoStrings } from "@/content/real-estate-demo";
import { ButtonEl } from "@/components/ui/Button";
import { PropertyCard } from "./PropertyCard";
import type { Filters } from "./types";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";

export const initialFilters: Filters = {
  listingType: "any",
  neighbourhood: "any",
  maxBudget: null,
  minBedrooms: 0,
  propertyType: "any",
};

export function matchesFilters(property: (typeof properties)[number], filters: Filters) {
  if (filters.listingType !== "any" && property.listingType !== filters.listingType) return false;
  if (filters.neighbourhood !== "any" && property.neighbourhood !== filters.neighbourhood) return false;
  if (filters.maxBudget !== null && property.price > filters.maxBudget) return false;
  if (filters.minBedrooms > 0 && property.bedrooms < filters.minBedrooms) return false;
  if (filters.propertyType !== "any" && property.propertyType !== filters.propertyType) return false;
  return true;
}

export function PropertyExplorer({
  filters,
  onFiltersChange,
  onViewDetails,
  onBookViewing,
}: {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onViewDetails: (id: string) => void;
  onBookViewing: (id: string) => void;
}) {
  const results = properties.filter((p) => matchesFilters(p, filters));

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div>
          <label className={labelClass} htmlFor="filter-listing-type">
            Buy or rent
          </label>
          <select
            id="filter-listing-type"
            className={`${selectClass} mt-1.5`}
            value={filters.listingType}
            onChange={(e) => update("listingType", e.target.value as Filters["listingType"])}
          >
            <option value="any">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="filter-neighbourhood">
            Location
          </label>
          <select
            id="filter-neighbourhood"
            className={`${selectClass} mt-1.5`}
            value={filters.neighbourhood}
            onChange={(e) => update("neighbourhood", e.target.value)}
          >
            <option value="any">All areas</option>
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="filter-budget">
            Max budget
          </label>
          <select
            id="filter-budget"
            className={`${selectClass} mt-1.5`}
            value={filters.maxBudget ?? "any"}
            onChange={(e) => update("maxBudget", e.target.value === "any" ? null : Number(e.target.value))}
          >
            <option value="any">No maximum</option>
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="filter-bedrooms">
            Min bedrooms
          </label>
          <select
            id="filter-bedrooms"
            className={`${selectClass} mt-1.5`}
            value={filters.minBedrooms}
            onChange={(e) => update("minBedrooms", Number(e.target.value))}
          >
            <option value={0}>Any</option>
            {bedroomOptions.map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="filter-property-type">
            Property type
          </label>
          <select
            id="filter-property-type"
            className={`${selectClass} mt-1.5`}
            value={filters.propertyType}
            onChange={(e) => update("propertyType", e.target.value as Filters["propertyType"])}
          >
            <option value="any">All types</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/50">
          {results.length} of {properties.length} sample listings · {sampleMarketLabel}
        </p>
        <ButtonEl variant="ghost-on-dark" size="sm" className="self-start sm:self-auto" onClick={() => onFiltersChange(initialFilters)}>
          {demoStrings.resetFilters}
        </ButtonEl>
      </div>

      {results.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
          {demoStrings.noListingMatch}
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <PropertyCard key={property.id} property={property} onViewDetails={onViewDetails} onBookViewing={onBookViewing} />
          ))}
        </ul>
      )}
    </div>
  );
}
