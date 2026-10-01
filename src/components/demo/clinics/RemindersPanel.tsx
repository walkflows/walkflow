"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ButtonEl } from "@/components/ui/Button";
import { generateAppointmentSlots } from "./engine";
import type { AppointmentRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export function RemindersPanel({
  appointment,
  remindersValid,
  attendanceIntentConfirmed,
  questionAsked,
  processing,
  onConfirmAttendanceIntent,
  onReschedule,
  onConfirm,
  onCancel,
  onAskQuestion,
  onContinue,
}: {
  appointment: AppointmentRecord;
  remindersValid: boolean;
  attendanceIntentConfirmed: boolean;
  questionAsked: boolean;
  processing: boolean;
  onConfirmAttendanceIntent: () => void;
  onReschedule: (slotId: string, slotLabel: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onAskQuestion: (question: string) => void;
  onContinue: () => void;
}) {
  const slots = useMemo(() => generateAppointmentSlots(), []);
  const [rescheduling, setRescheduling] = useState(false);
  const [asking, setAsking] = useState(false);

  function handleReschedule(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    onReschedule(slot.id, slot.label);
    setRescheduling(false);
  }

  function handleAsk(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const question = (data.get("question") as string) || "When should I arrive?";
    onAskQuestion(question);
    setAsking(false);
  }

  if (appointment.status === "requested") {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Reminders and Appointment Changes</p>
        <h3 className="mt-2 text-xl text-white">Awaiting reception re-confirmation</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-white/60">
          The appointment was rescheduled to {appointment.slotLabel} and needs reception to confirm it again before reminders are valid.
        </p>
        <div className="mt-5">
          <ButtonEl onClick={onConfirm} disabled={processing}>
            {processing ? "Confirming…" : "Simulate reception re-confirmation"}
          </ButtonEl>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Reminders and Appointment Changes</p>
      <h3 className="mt-2 text-xl text-white">Reminder prepared</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        {remindersValid ? "A confirmation and reminder preview are ready — see “What happened automatically” below." : "Reminders were invalidated by a recent change — a fresh one will be prepared below."}
        {" "}Reminders help reduce missed visits but don&rsquo;t guarantee attendance.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonEl onClick={onConfirmAttendanceIntent} disabled={attendanceIntentConfirmed}>
          {attendanceIntentConfirmed ? "Attendance confirmed" : "Confirm Attendance"}
        </ButtonEl>
        <ButtonEl variant="secondary-on-dark" onClick={() => setRescheduling((v) => !v)}>
          Request Another Time
        </ButtonEl>
        <ButtonEl variant="secondary-on-dark" onClick={() => setAsking((v) => !v)} disabled={questionAsked}>
          {questionAsked ? "Question sent" : "Ask Reception a Question"}
        </ButtonEl>
        <ButtonEl variant="ghost-on-dark" onClick={onCancel}>
          Cancel Appointment
        </ButtonEl>
      </div>

      {rescheduling && (
        <form className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" onSubmit={handleReschedule}>
          <div className="min-w-[220px]">
            <label className={labelClass} htmlFor="reminders-reschedule">
              New time
            </label>
            <select id="reminders-reschedule" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
              {slots.map((s) => (
                <option key={s.id} value={s.id} className={optionClass}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <ButtonEl type="submit" size="sm">
            Request new time
          </ButtonEl>
          <ButtonEl type="button" variant="ghost-on-dark" size="sm" onClick={() => setRescheduling(false)}>
            Never mind
          </ButtonEl>
        </form>
      )}

      {asking && (
        <form className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" onSubmit={handleAsk}>
          <div>
            <label className={labelClass} htmlFor="reminders-question">
              Your question
            </label>
            <textarea
              id="reminders-question"
              name="question"
              rows={2}
              defaultValue="e.g. Is there parking at the clinic?"
              className={`${selectClass} mt-1.5 resize-y`}
            />
          </div>
          <div className="flex gap-3">
            <ButtonEl type="submit" size="sm">
              Send question
            </ButtonEl>
            <ButtonEl type="button" variant="ghost-on-dark" size="sm" onClick={() => setAsking(false)}>
              Never mind
            </ButtonEl>
          </div>
        </form>
      )}

      <div className="mt-6 border-t border-white/10 pt-6">
        <ButtonEl onClick={onContinue}>Continue — attendance</ButtonEl>
      </div>
    </div>
  );
}
