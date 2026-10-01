import type { FormEvent } from "react";
import { useMemo } from "react";
import { appointmentDurationMinutes, categoryById, clinicTimezoneLabel, type ServiceCategoryId } from "@/content/clinics-services";
import { ButtonEl } from "@/components/ui/Button";
import { generateAppointmentSlots } from "./engine";
import type { AppointmentRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

const statusCopy: Record<AppointmentRecord["status"], string> = {
  requested: "Appointment requested — pending staff confirmation",
  confirmed: "Demo appointment confirmed",
  cancelled: "Appointment cancelled",
};

export function ConfirmPanel({
  categoryId,
  providerName,
  appointment,
  processing,
  onRequest,
  onConfirm,
  onContinue,
}: {
  categoryId: ServiceCategoryId;
  providerName: string | null;
  appointment: AppointmentRecord | null;
  processing: boolean;
  onRequest: (slotId: string, slotLabel: string) => void;
  onConfirm: () => void;
  onContinue: () => void;
}) {
  const slots = useMemo(() => generateAppointmentSlots(), []);
  const category = categoryById(categoryId);
  const duration = appointmentDurationMinutes[categoryId];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    onRequest(slot.id, slot.label);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 3 — Confirm the Appointment</p>

      {!appointment && (
        <>
          <h3 className="mt-2 text-xl text-white">Request a sample appointment</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-white/60">
            {category.name}
            {providerName ? ` · ${providerName}` : ""} · {duration} minutes. {clinicTimezoneLabel}
          </p>
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="confirm-slot">
                Appointment time
              </label>
              <select id="confirm-slot" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
                {slots.map((s) => (
                  <option key={s.id} value={s.id} className={optionClass}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <ButtonEl type="submit" disabled={processing}>
                {processing ? "Recording request…" : "Request Appointment"}
              </ButtonEl>
            </div>
          </form>
        </>
      )}

      {appointment && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">{statusCopy[appointment.status]}</p>
          <p className="mt-2 text-white">
            {category.name}
            {providerName ? ` · ${providerName}` : ""} · {appointment.slotLabel} · {duration} min
          </p>

          {appointment.status === "requested" && (
            <div className="mt-5">
              <ButtonEl onClick={onConfirm} disabled={processing}>
                {processing ? "Confirming…" : "Simulate reception confirmation"}
              </ButtonEl>
            </div>
          )}

          {appointment.status === "confirmed" && (
            <div className="mt-5">
              <ButtonEl onClick={onContinue}>Continue — reminders &amp; changes</ButtonEl>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
