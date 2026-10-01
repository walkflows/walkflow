"use client";

import { useMemo, type FormEvent } from "react";
import { ButtonEl } from "@/components/ui/Button";
import { demoTimezoneLabel, generateJobDateSlots } from "./engine";
import type { JobRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

const statusCopy: Record<JobRecord["status"], string> = {
  "awaiting-scheduling": "Awaiting scheduling",
  scheduled: "Job scheduled",
  "in-progress": "Job in progress",
  delayed: "Job delayed",
  cancelled: "Job cancelled",
  completed: "Job completed",
};

export function JobPanel({
  job,
  processing,
  onRequestDate,
  onStartJob,
  onMarkDelayed,
  onReschedule,
  onCancelJob,
  onCompleteJob,
}: {
  job: JobRecord;
  processing: boolean;
  onRequestDate: (dateId: string, dateLabel: string) => void;
  onStartJob: () => void;
  onMarkDelayed: () => void;
  onReschedule: (dateId: string, dateLabel: string) => void;
  onCancelJob: () => void;
  onCompleteJob: () => void;
}) {
  const dates = useMemo(() => generateJobDateSlots(), []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const dateId = data.get("dateId") as string;
    const date = dates.find((d) => d.id === dateId) ?? dates[0];
    onRequestDate(date.id, date.label);
  }

  function handleRescheduleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const dateId = data.get("dateId") as string;
    const date = dates.find((d) => d.id === dateId) ?? dates[0];
    onReschedule(date.id, date.label);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 5 — Schedule and Manage the Job</p>

      {job.status === "awaiting-scheduling" && (
        <>
          <h3 className="mt-2 text-xl text-white">Set a job date</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-white/60">{demoTimezoneLabel}</p>
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="job-date">
                Job date
              </label>
              <select id="job-date" name="dateId" defaultValue={dates[0]?.id} className={`${selectClass} mt-1.5`}>
                {dates.map((d) => (
                  <option key={d.id} value={d.id} className={optionClass}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <ButtonEl type="submit" disabled={processing}>
                {processing ? "Scheduling…" : "Set Job Date"}
              </ButtonEl>
            </div>
          </form>
        </>
      )}

      {job.status !== "awaiting-scheduling" && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">{statusCopy[job.status]}</p>
          <p className="mt-2 text-white">{job.dateLabel}</p>

          {job.status === "scheduled" && (
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonEl onClick={onStartJob} disabled={processing}>
                Simulate: Start Job
              </ButtonEl>
              <ButtonEl variant="ghost-on-dark" onClick={onCancelJob} disabled={processing}>
                Cancel Job
              </ButtonEl>
            </div>
          )}

          {job.status === "in-progress" && (
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonEl onClick={onCompleteJob} disabled={processing}>
                Simulate: Mark Completed
              </ButtonEl>
              <ButtonEl variant="secondary-on-dark" onClick={onMarkDelayed} disabled={processing}>
                Simulate: Mark Delayed
              </ButtonEl>
              <ButtonEl variant="ghost-on-dark" onClick={onCancelJob} disabled={processing}>
                Cancel Job
              </ButtonEl>
            </div>
          )}

          {job.status === "delayed" && (
            <form className="mt-4 flex flex-wrap items-end gap-3" onSubmit={handleRescheduleSubmit}>
              <div className="min-w-[220px]">
                <label className={labelClass} htmlFor="job-reschedule">
                  New job date
                </label>
                <select id="job-reschedule" name="dateId" defaultValue={dates[0]?.id} className={`${selectClass} mt-1.5`}>
                  {dates.map((d) => (
                    <option key={d.id} value={d.id} className={optionClass}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <ButtonEl type="submit" size="sm">
                Confirm new date
              </ButtonEl>
              <ButtonEl type="button" variant="ghost-on-dark" size="sm" onClick={onCancelJob}>
                Cancel Job Instead
              </ButtonEl>
            </form>
          )}

          {job.status === "cancelled" && (
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              This job was cancelled. The request has been closed — no further automated follow-ups will run in this demo session.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
