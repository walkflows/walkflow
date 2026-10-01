"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ButtonEl } from "@/components/ui/Button";
import { demoTimezoneLabel, generateInspectionSlots } from "./engine";
import type { InspectionRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

const statusCopy: Record<InspectionRecord["status"], string> = {
  requested: "Inspection requested — awaiting coordinator confirmation",
  confirmed: "Demo inspection confirmed",
  cancelled: "Inspection cancelled",
  completed: "Inspection marked as completed",
  missed: "Inspection marked as missed",
};

export function InspectionPanel({
  inspection,
  processing,
  onRequest,
  onConfirm,
  onCancel,
  onMarkOutcome,
  onReschedule,
  onBackToInspection,
}: {
  inspection: InspectionRecord | null;
  processing: boolean;
  onRequest: (slotId: string, slotLabel: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onMarkOutcome: (outcome: "completed" | "missed" | "cancelled") => void;
  onReschedule: (slotId: string, slotLabel: string) => void;
  onBackToInspection: () => void;
}) {
  const slots = useMemo(() => generateInspectionSlots(), []);
  const [rescheduling, setRescheduling] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    onRequest(slot.id, slot.label);
  }

  function handleReschedule(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    onReschedule(slot.id, slot.label);
    setRescheduling(false);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 3 — Arrange an Inspection</p>

      {!inspection && (
        <>
          <h3 className="mt-2 text-xl text-white">Request a sample inspection</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-white/60">{demoTimezoneLabel}</p>
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="inspection-slot">
                Preferred time
              </label>
              <select id="inspection-slot" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
                {slots.map((s) => (
                  <option key={s.id} value={s.id} className={optionClass}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <ButtonEl type="submit" disabled={processing}>
                {processing ? "Recording request…" : "Request This Inspection"}
              </ButtonEl>
            </div>
          </form>
        </>
      )}

      {inspection && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">{statusCopy[inspection.status]}</p>
          <p className="mt-2 text-white">{inspection.slotLabel}</p>

          {inspection.status === "requested" && (
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonEl onClick={onConfirm} disabled={processing}>
                {processing ? "Confirming…" : "Simulate coordinator confirmation"}
              </ButtonEl>
              <ButtonEl variant="secondary-on-dark" onClick={onCancel}>
                Cancel request
              </ButtonEl>
            </div>
          )}

          {inspection.status === "confirmed" && !rescheduling && (
            <>
              <p className="mt-3 text-sm text-white/60">No real inspection has taken place. Use the controls below to simulate what happens on the day.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonEl onClick={() => onMarkOutcome("completed")} disabled={processing}>
                  Simulate: Completed
                </ButtonEl>
                <ButtonEl variant="secondary-on-dark" onClick={() => onMarkOutcome("missed")} disabled={processing}>
                  Simulate: Missed
                </ButtonEl>
                <ButtonEl variant="secondary-on-dark" onClick={() => setRescheduling(true)} disabled={processing}>
                  Simulate: Reschedule
                </ButtonEl>
                <ButtonEl variant="ghost-on-dark" onClick={() => onMarkOutcome("cancelled")} disabled={processing}>
                  Simulate: Cancelled
                </ButtonEl>
              </div>
            </>
          )}

          {inspection.status === "confirmed" && rescheduling && (
            <form className="mt-4 flex flex-wrap items-end gap-3" onSubmit={handleReschedule}>
              <div className="min-w-[220px]">
                <label className={labelClass} htmlFor="reschedule-slot">
                  New time
                </label>
                <select id="reschedule-slot" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
                  {slots.map((s) => (
                    <option key={s.id} value={s.id} className={optionClass}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <ButtonEl type="submit" size="sm">
                Confirm new time
              </ButtonEl>
              <ButtonEl type="button" variant="ghost-on-dark" size="sm" onClick={() => setRescheduling(false)}>
                Never mind
              </ButtonEl>
            </form>
          )}

          {(inspection.status === "missed" || inspection.status === "cancelled") && (
            <div className="mt-5">
              <ButtonEl onClick={onBackToInspection}>Try another inspection slot</ButtonEl>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
