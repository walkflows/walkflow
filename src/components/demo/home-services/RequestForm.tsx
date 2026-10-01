import type { FormEvent } from "react";
import { allServiceLocations, allServiceOptions, samplePhotoOptions, urgencyOptions, type PropertyKind, type ServiceId } from "@/content/home-services-roofing";
import { ButtonEl } from "@/components/ui/Button";
import { generateInspectionSlots, type Requirements } from "./engine";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export type RequestFormValues = Requirements & { name: string; email: string; phone: string };

const defaultName = "Jordan Ellis (fictional)";
const defaultEmail = "jordan@roofora-demo.example";
const defaultPhone = "+1 (555) 234-5678 (fictional)";

export function RequestForm({
  prefill,
  submitting,
  onSubmit,
}: {
  prefill: Partial<RequestFormValues> | null;
  submitting: boolean;
  onSubmit: (values: RequestFormValues) => void;
}) {
  const slots = generateInspectionSlots();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      serviceId: (data.get("serviceId") as ServiceId) || "not-sure",
      propertyKind: (data.get("propertyKind") as PropertyKind) || "residential",
      location: (data.get("location") as string) || allServiceLocations[0],
      issueDescription: (data.get("issueDescription") as string) || "",
      urgency: (data.get("urgency") as Requirements["urgency"]) || "routine",
      preferredSlotId: (data.get("preferredSlotId") as string) || slots[0].id,
      photoId: (data.get("photoId") as string) || "photo-none",
      name: (data.get("name") as string) || defaultName,
      email: (data.get("email") as string) || defaultEmail,
      phone: (data.get("phone") as string) || defaultPhone,
    });
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 1 — Capture the Request</p>
      <h3 className="mt-2 text-xl text-white">Tell us what&rsquo;s going on with your roof</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        Prefilled with a fictional sample customer so you can try the journey immediately — every field is editable.
      </p>
      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass} htmlFor="req-service">
            Service needed
          </label>
          <select id="req-service" name="serviceId" defaultValue={prefill?.serviceId ?? "roof-inspections"} className={`${selectClass} mt-1.5`}>
            {allServiceOptions.map((s) => (
              <option key={s.id} value={s.id} className={optionClass}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-property-kind">
            Residential or commercial
          </label>
          <select id="req-property-kind" name="propertyKind" defaultValue={prefill?.propertyKind ?? "residential"} className={`${selectClass} mt-1.5`}>
            <option value="residential" className={optionClass}>
              Residential
            </option>
            <option value="commercial" className={optionClass}>
              Commercial
            </option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-location">
            Sample property location
          </label>
          <select id="req-location" name="location" defaultValue={prefill?.location ?? allServiceLocations[0]} className={`${selectClass} mt-1.5`}>
            {allServiceLocations.map((loc) => (
              <option key={loc} value={loc} className={optionClass}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-urgency">
            Urgency
          </label>
          <select id="req-urgency" name="urgency" defaultValue={prefill?.urgency ?? "routine"} className={`${selectClass} mt-1.5`}>
            {urgencyOptions.map((u) => (
              <option key={u.value} value={u.value} className={optionClass}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="req-issue">
            Describe the issue
          </label>
          <textarea
            id="req-issue"
            name="issueDescription"
            required
            rows={3}
            defaultValue={prefill?.issueDescription ?? "e.g. A few shingles came loose after last week's storm"}
            className={`${inputClass} mt-1.5 resize-y`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="req-slot">
            Preferred inspection date/time
          </label>
          <select id="req-slot" name="preferredSlotId" defaultValue={prefill?.preferredSlotId ?? slots[0].id} className={`${selectClass} mt-1.5`}>
            {slots.map((s) => (
              <option key={s.id} value={s.id} className={optionClass}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-photo">
            Sample photo (optional)
          </label>
          <select id="req-photo" name="photoId" defaultValue={prefill?.photoId ?? "photo-none"} className={`${selectClass} mt-1.5`}>
            {samplePhotoOptions.map((p) => (
              <option key={p.id} value={p.id} className={optionClass}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-name">
            Your name
          </label>
          <input id="req-name" name="name" type="text" required defaultValue={prefill?.name ?? defaultName} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="req-email">
            Your email
          </label>
          <input id="req-email" name="email" type="email" required defaultValue={prefill?.email ?? defaultEmail} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="req-phone">
            Your phone
          </label>
          <input id="req-phone" name="phone" type="tel" required defaultValue={prefill?.phone ?? defaultPhone} className={`${inputClass} mt-1.5`} />
        </div>
        <div className="sm:col-span-2">
          <ButtonEl type="submit" disabled={submitting}>
            {submitting ? "Saving request…" : "Submit Request"}
          </ButtonEl>
        </div>
      </form>
    </div>
  );
}
