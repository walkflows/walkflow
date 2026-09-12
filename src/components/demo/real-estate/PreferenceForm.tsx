import type { FormEvent } from "react";
import {
  bedroomOptions,
  budgetOptions,
  neighbourhoods,
  propertyTypes,
  properties as allProperties,
  formatPrice,
} from "@/content/real-estate-properties";
import { demoStrings } from "@/content/real-estate-demo";
import { ButtonEl } from "@/components/ui/Button";
import type { Filters } from "./types";

const selectClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-muted";

export type PreferenceValues = Omit<Filters, "listingType"> & { listingType: "buy" | "rent"; name: string; email: string };

export type PreferenceResult = { matchedPropertyIds: string[] };

export function PreferenceForm({
  onSubmit,
  result,
}: {
  onSubmit: (values: PreferenceValues) => void;
  result: PreferenceResult | null;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const maxBudgetRaw = data.get("maxBudget");
    onSubmit({
      listingType: (data.get("listingType") as "buy" | "rent") || "buy",
      neighbourhood: (data.get("neighbourhood") as string) || "any",
      maxBudget: maxBudgetRaw && maxBudgetRaw !== "any" ? Number(maxBudgetRaw) : null,
      minBedrooms: Number(data.get("minBedrooms") || 0),
      propertyType: (data.get("propertyType") as Filters["propertyType"]) || "any",
      name: (data.get("name") as string) || "",
      email: (data.get("email") as string) || "",
    });
  }

  const matches = result ? allProperties.filter((p) => result.matchedPropertyIds.includes(p.id)) : null;

  return (
    <div>
      <p className="max-w-xl text-muted">
        Tell us what you’re looking for and we’ll check it against the sample listings — just like a buyer would on a real
        WALKFLOW-built property site.
      </p>
      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass} htmlFor="pref-listing-type">
            Looking to
          </label>
          <select id="pref-listing-type" name="listingType" defaultValue="buy" className={`${selectClass} mt-1.5`}>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pref-neighbourhood">
            Preferred location
          </label>
          <select id="pref-neighbourhood" name="neighbourhood" defaultValue="any" className={`${selectClass} mt-1.5`}>
            <option value="any">No preference</option>
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pref-budget">
            Maximum budget
          </label>
          <select id="pref-budget" name="maxBudget" defaultValue="any" className={`${selectClass} mt-1.5`}>
            <option value="any">No maximum</option>
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pref-bedrooms">
            Minimum bedrooms
          </label>
          <select id="pref-bedrooms" name="minBedrooms" defaultValue={0} className={`${selectClass} mt-1.5`}>
            <option value={0}>Any</option>
            {bedroomOptions.map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="pref-property-type">
            Property type
          </label>
          <select id="pref-property-type" name="propertyType" defaultValue="any" className={`${selectClass} mt-1.5`}>
            <option value="any">Any type</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pref-name">
            Your name
          </label>
          <input
            id="pref-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Jordan Ellis (fictional)"
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="pref-email">
            Your email
          </label>
          <input
            id="pref-email"
            name="email"
            type="email"
            required
            placeholder="e.g. jordan@ashcombe-demo.example"
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div className="sm:col-span-2">
          <ButtonEl type="submit">Share My Requirements</ButtonEl>
        </div>
      </form>

      {result && (
        <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-6">
          <p className="text-sm leading-relaxed text-muted">
            {matches && matches.length > 0 ? demoStrings.propertyResult : demoStrings.noListingMatch}
          </p>
          {matches && matches.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {matches.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 text-sm">
                  <span className="font-semibold text-navy">{p.name}</span>
                  <span className="text-muted">{formatPrice(p)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
