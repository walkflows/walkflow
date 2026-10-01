import type { FormEvent } from "react";
import { allCategoryOptions, patientKindOptions, supportNeedsOptions, type PatientKind, type ServiceCategoryId } from "@/content/clinics-services";
import { ButtonEl } from "@/components/ui/Button";
import { generateAppointmentSlots, type Requirements } from "./engine";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export type RequestFormValues = Requirements & { name: string; email: string };

const defaultName = "Jordan Ellis (fictional)";
const defaultEmail = "jordan@happyclinics-demo.example";

export function RequestForm({
  prefill,
  submitting,
  onSubmit,
}: {
  prefill: Partial<RequestFormValues> | null;
  submitting: boolean;
  onSubmit: (values: RequestFormValues) => void;
}) {
  const slots = generateAppointmentSlots();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      categoryId: (data.get("categoryId") as ServiceCategoryId) || "not-sure",
      patientKind: (data.get("patientKind") as PatientKind) || "new",
      preferredSlotId: (data.get("preferredSlotId") as string) || slots[0].id,
      supportNeedsId: (data.get("supportNeedsId") as string) || "support-none",
      note: (data.get("note") as string) || "",
      followUpOptIn: data.get("followUpOptIn") === "on",
      name: (data.get("name") as string) || defaultName,
      email: (data.get("email") as string) || defaultEmail,
    });
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 1 — Appointment Request</p>
      <h3 className="mt-2 text-xl text-white">Tell us what you&rsquo;d like to see us about</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        Prefilled with a fictional sample patient so you can try the journey immediately — every field is editable. No real symptoms, medication lists, test
        results or medical documents are needed.
      </p>
      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass} htmlFor="req-category">
            Service category
          </label>
          <select id="req-category" name="categoryId" defaultValue={prefill?.categoryId ?? "general-care"} className={`${selectClass} mt-1.5`}>
            {allCategoryOptions.map((c) => (
              <option key={c.id} value={c.id} className={optionClass}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-patient-kind">
            New or returning patient
          </label>
          <select id="req-patient-kind" name="patientKind" defaultValue={prefill?.patientKind ?? "new"} className={`${selectClass} mt-1.5`}>
            {patientKindOptions.map((p) => (
              <option key={p.value} value={p.value} className={optionClass}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="req-slot">
            Preferred appointment date/time
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
          <label className={labelClass} htmlFor="req-support">
            Practical support needs (optional)
          </label>
          <select id="req-support" name="supportNeedsId" defaultValue={prefill?.supportNeedsId ?? "support-none"} className={`${selectClass} mt-1.5`}>
            {supportNeedsOptions.map((s) => (
              <option key={s.id} value={s.id} className={optionClass}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="req-note">
            Appointment note (optional, non-clinical)
          </label>
          <textarea
            id="req-note"
            name="note"
            rows={2}
            defaultValue={prefill?.note ?? "e.g. Prefer a morning appointment if possible"}
            placeholder="e.g. Prefer a morning appointment if possible"
            className={`${inputClass} mt-1.5 resize-y`}
          />
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
        <div className="sm:col-span-2 flex items-center gap-2.5">
          <input
            id="req-followup-optin"
            name="followUpOptIn"
            type="checkbox"
            defaultChecked={prefill?.followUpOptIn ?? true}
            className="h-4 w-4 flex-none accent-orange"
          />
          <label htmlFor="req-followup-optin" className="text-sm text-white/70">
            Receive optional follow-up communications after my appointment
          </label>
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
