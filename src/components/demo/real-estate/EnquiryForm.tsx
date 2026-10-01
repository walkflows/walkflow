import type { FormEvent } from "react";
import {
  bedroomOptions,
  budgetOptions,
  neighbourhoods,
  propertyTypes,
  type ListingType,
  type PropertyType,
} from "@/content/real-estate-properties";
import { ButtonEl } from "@/components/ui/Button";
import { timelineOptions, type Requirements } from "./engine";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export type EnquiryFormValues = Requirements & { name: string; email: string };

const defaultName = "Jordan Ellis (fictional)";
const defaultEmail = "jordan@ashcombe-demo.example";

export function EnquiryForm({
  prefill,
  submitting,
  onSubmit,
}: {
  prefill: Partial<EnquiryFormValues> | null;
  submitting: boolean;
  onSubmit: (values: EnquiryFormValues) => void;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const maxBudgetRaw = data.get("maxBudget");
    onSubmit({
      listingType: (data.get("listingType") as ListingType) || "buy",
      neighbourhood: (data.get("neighbourhood") as string) || "any",
      maxBudget: maxBudgetRaw && maxBudgetRaw !== "any" ? Number(maxBudgetRaw) : null,
      minBedrooms: Number(data.get("minBedrooms") || 0),
      propertyType: (data.get("propertyType") as PropertyType | "any") || "any",
      timeline: (data.get("timeline") as Requirements["timeline"]) || "exploring",
      notes: (data.get("notes") as string) || "",
      name: (data.get("name") as string) || defaultName,
      email: (data.get("email") as string) || defaultEmail,
    });
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 1 — Enquiry</p>
      <h3 className="mt-2 text-xl text-white">Tell us what you&rsquo;re looking for</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        Prefilled with a fictional sample buyer so you can try the journey immediately — every field is editable.
      </p>
      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass} htmlFor="enq-listing-type">
            Buying or renting
          </label>
          <select
            id="enq-listing-type"
            name="listingType"
            defaultValue={prefill?.listingType ?? "buy"}
            className={`${selectClass} mt-1.5`}
          >
            <option value="buy" className={optionClass}>Buying</option>
            <option value="rent" className={optionClass}>Renting</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-neighbourhood">
            Preferred location
          </label>
          <select
            id="enq-neighbourhood"
            name="neighbourhood"
            defaultValue={prefill?.neighbourhood ?? "any"}
            className={`${selectClass} mt-1.5`}
          >
            <option value="any" className={optionClass}>No preference</option>
            {neighbourhoods.map((n) => (
              <option key={n} value={n} className={optionClass}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-budget">
            Maximum budget
          </label>
          <select
            id="enq-budget"
            name="maxBudget"
            defaultValue={prefill?.maxBudget ?? "any"}
            className={`${selectClass} mt-1.5`}
          >
            <option value="any" className={optionClass}>No maximum</option>
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value} className={optionClass}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-bedrooms">
            Minimum bedrooms
          </label>
          <select
            id="enq-bedrooms"
            name="minBedrooms"
            defaultValue={prefill?.minBedrooms ?? 0}
            className={`${selectClass} mt-1.5`}
          >
            <option value={0} className={optionClass}>Any</option>
            {bedroomOptions.map((n) => (
              <option key={n} value={n} className={optionClass}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-property-type">
            Property type
          </label>
          <select
            id="enq-property-type"
            name="propertyType"
            defaultValue={prefill?.propertyType ?? "any"}
            className={`${selectClass} mt-1.5`}
          >
            <option value="any" className={optionClass}>Any type</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t} className={optionClass}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-timeline">
            Moving timeline
          </label>
          <select
            id="enq-timeline"
            name="timeline"
            defaultValue={prefill?.timeline ?? "exploring"}
            className={`${selectClass} mt-1.5`}
          >
            {timelineOptions.map((t) => (
              <option key={t.value} value={t.value} className={optionClass}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="enq-notes">
            Additional requirements (optional)
          </label>
          <textarea
            id="enq-notes"
            name="notes"
            rows={3}
            defaultValue={prefill?.notes ?? ""}
            placeholder="e.g. Needs off-street parking"
            className={`${inputClass} mt-1.5 resize-y`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-name">
            Your name
          </label>
          <input
            id="enq-name"
            name="name"
            type="text"
            required
            defaultValue={prefill?.name ?? defaultName}
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-email">
            Your email
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            required
            defaultValue={prefill?.email ?? defaultEmail}
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div className="sm:col-span-2">
          <ButtonEl type="submit" disabled={submitting}>
            {submitting ? "Saving requirements…" : "Share My Requirements"}
          </ButtonEl>
        </div>
      </form>
    </div>
  );
}
