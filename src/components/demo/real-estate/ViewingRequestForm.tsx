import type { FormEvent } from "react";
import { properties } from "@/content/real-estate-properties";
import { demoStrings, realEstateDemoFinalCta } from "@/content/real-estate-demo";
import { Button, ButtonEl } from "@/components/ui/Button";

const selectClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-muted";

export const viewingSlots = ["Saturday 10:30", "Saturday 14:00", "Sunday 11:00", "Monday 16:30"];

export type ViewingValues = { propertyId: string; date: string; name: string; email: string };

export type ViewingResult = { propertyId: string; date: string };

export function ViewingRequestForm({
  initialPropertyId,
  onSubmit,
  result,
}: {
  initialPropertyId: string | null;
  onSubmit: (values: ViewingValues) => void;
  result: ViewingResult | null;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      propertyId: (data.get("propertyId") as string) || "",
      date: (data.get("date") as string) || viewingSlots[0],
      name: (data.get("name") as string) || "",
      email: (data.get("email") as string) || "",
    });
  }

  const resultProperty = result ? properties.find((p) => p.id === result.propertyId) : null;

  return (
    <div>
      <p className="max-w-xl text-muted">
        Choose a sample property and a time that suits — an agent would confirm access and the next step from here.
      </p>
      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="viewing-property">
            Property
          </label>
          <select
            id="viewing-property"
            name="propertyId"
            required
            defaultValue={initialPropertyId ?? ""}
            className={`${selectClass} mt-1.5`}
          >
            <option value="" disabled>
              Choose a property
            </option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.neighbourhood}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="viewing-date">
            Preferred time
          </label>
          <select id="viewing-date" name="date" defaultValue={viewingSlots[0]} className={`${selectClass} mt-1.5`}>
            {viewingSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="viewing-name">
            Your name
          </label>
          <input
            id="viewing-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Jordan Ellis (fictional)"
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="viewing-email">
            Your email
          </label>
          <input
            id="viewing-email"
            name="email"
            type="email"
            required
            placeholder="e.g. jordan@ashcombe-demo.example"
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div className="sm:col-span-2">
          <ButtonEl type="submit">Request This Viewing</ButtonEl>
        </div>
      </form>

      {result && resultProperty && (
        <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">{demoStrings.sampleAppointmentLabel}</p>
          <p className="mt-2 text-navy">
            Viewing requested for <strong>{resultProperty.name}</strong> · {result.date}.
          </p>

          <div className="mt-6 border-t border-navy/10 pt-6">
            <p className="font-semibold text-navy">{demoStrings.completionHeading}</p>
            <div className="mt-4">
              <Button href={realEstateDemoFinalCta.cta.href}>{demoStrings.requestACall}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
