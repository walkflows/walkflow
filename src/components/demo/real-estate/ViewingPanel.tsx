"use client";

import { useMemo, useState, type FormEvent } from "react";
import { formatPrice } from "@/content/real-estate-properties";
import { ButtonEl } from "@/components/ui/Button";
import { demoTimezoneLabel, generateViewingSlots } from "./engine";
import type { AlternativeProperty, MatchedProperty, ViewingOutcome } from "./engine";
import type { ViewingRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";

const statusCopy: Record<ViewingRecord["status"], string> = {
  requested: "Viewing requested — awaiting demo agent confirmation",
  confirmed: "Demo viewing confirmed",
  cancelled: "Viewing cancelled",
  attended: "Viewing marked as attended",
  missed: "Viewing marked as missed",
};

export function ViewingPanel({
  matches,
  alternatives,
  viewing,
  processing,
  onRequest,
  onConfirm,
  onCancel,
  onMarkOutcome,
  onReschedule,
}: {
  matches: MatchedProperty[];
  alternatives: AlternativeProperty[];
  viewing: ViewingRecord | null;
  processing: boolean;
  onRequest: (propertyId: string, slotId: string, slotLabel: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onMarkOutcome: (outcome: ViewingOutcome) => void;
  onReschedule: (slotId: string, slotLabel: string) => void;
}) {
  const options = useMemo(
    () => [...matches.map((m) => m.property), ...alternatives.map((a) => a.property)],
    [matches, alternatives],
  );
  const slots = useMemo(() => generateViewingSlots(), []);
  const [rescheduling, setRescheduling] = useState(false);

  const viewingProperty = viewing ? options.find((p) => p.id === viewing.propertyId) : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const propertyId = data.get("propertyId") as string;
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    if (!propertyId) return;
    onRequest(propertyId, slot.id, slot.label);
  }

  function handleReschedule(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    onReschedule(slot.id, slot.label);
    setRescheduling(false);
  }

  if (options.length === 0) {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Viewing Request</p>
        <p className="mt-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/60">
          No sample properties are available to view for this enquiry.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Viewing Request</p>

      {!viewing && (
        <>
          <h3 className="mt-2 text-xl text-white">Request a sample viewing</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-white/60">{demoTimezoneLabel}</p>
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="viewing-property">
                Property
              </label>
              <select id="viewing-property" name="propertyId" required defaultValue="" className={`${selectClass} mt-1.5`}>
                <option value="" disabled>
                  Choose a property
                </option>
                {options.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.neighbourhood} · {formatPrice(p)}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="viewing-slot">
                Preferred time
              </label>
              <select id="viewing-slot" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
                {slots.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <ButtonEl type="submit" disabled={processing}>
                {processing ? "Recording request…" : "Request This Viewing"}
              </ButtonEl>
            </div>
          </form>
        </>
      )}

      {viewing && viewingProperty && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">{statusCopy[viewing.status]}</p>
          <p className="mt-2 text-white">
            <strong>{viewingProperty.name}</strong> · {viewing.slotLabel}
          </p>

          {viewing.status === "requested" && (
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonEl onClick={onConfirm} disabled={processing}>
                {processing ? "Confirming…" : "Simulate agent confirmation"}
              </ButtonEl>
              <ButtonEl variant="secondary-on-dark" onClick={onCancel}>
                Cancel request
              </ButtonEl>
            </div>
          )}

          {viewing.status === "confirmed" && !rescheduling && (
            <>
              <p className="mt-3 text-sm text-white/60">
                No real viewing has taken place. Use the controls below to simulate what happens on the day.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonEl onClick={() => onMarkOutcome("attended")} disabled={processing}>
                  Simulate: Attended
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

          {viewing.status === "confirmed" && rescheduling && (
            <form className="mt-4 flex flex-wrap items-end gap-3" onSubmit={handleReschedule}>
              <div className="min-w-[220px]">
                <label className={labelClass} htmlFor="reschedule-slot">
                  New time
                </label>
                <select id="reschedule-slot" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
                  {slots.map((s) => (
                    <option key={s.id} value={s.id}>
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
        </div>
      )}
    </div>
  );
}
