import type { FormEvent } from "react";
import { useMemo } from "react";
import { ButtonEl } from "@/components/ui/Button";
import { generateKickoffSlots } from "./engine";
import type { AttendanceStatus, KickoffRecord, RequestRecord, SessionRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export function DeliveryPanel({
  request,
  session,
  attendance,
  kickoff,
  processing,
  onCancelSession,
  onCheckedIn,
  onMarkAttendance,
  onRequestKickoff,
  onContinue,
}: {
  request: RequestRecord;
  session: SessionRecord | null;
  attendance: AttendanceStatus | null;
  kickoff: KickoffRecord | null;
  processing: boolean;
  onCancelSession: () => void;
  onCheckedIn: () => void;
  onMarkAttendance: (status: "attended" | "missed") => void;
  onRequestKickoff: (dateId: string, dateLabel: string) => void;
  onContinue: () => void;
}) {
  const kickoffSlots = useMemo(() => generateKickoffSlots(), []);

  if (request.path === "project") {
    if (!kickoff) return null;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const dateId = data.get("dateId") as string;
      const date = kickoffSlots.find((s) => s.id === dateId) ?? kickoffSlots[0];
      onRequestKickoff(date.id, date.label);
    }

    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 5 — Delivery</p>

        {kickoff.status === "awaiting-scheduling" && (
          <>
            <h3 className="mt-2 text-xl text-white">Schedule the project kickoff</h3>
            <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="kickoff-date">
                  Kickoff date
                </label>
                <select id="kickoff-date" name="dateId" defaultValue={kickoffSlots[0]?.id} className={`${selectClass} mt-1.5`}>
                  {kickoffSlots.map((s) => (
                    <option key={s.id} value={s.id} className={optionClass}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <ButtonEl type="submit" disabled={processing}>
                  {processing ? "Scheduling…" : "Schedule Kickoff"}
                </ButtonEl>
              </div>
            </form>
          </>
        )}

        {kickoff.status === "scheduled" && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange">Kickoff scheduled (demo schedule only)</p>
            <p className="mt-2 text-white">{kickoff.dateLabel}</p>
            <div className="mt-4">
              <ButtonEl onClick={onContinue}>Continue — follow-up</ButtonEl>
            </div>
          </div>
        )}
      </div>
    );
  }

  // session path
  if (!session) return null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 5 — Delivery</p>
      <h3 className="mt-2 text-xl text-white">Manage and record the session</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">{session.slotLabel}</p>

      {!attendance && (
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonEl variant="ghost-on-dark" onClick={onCancelSession} disabled={processing}>
            Simulate: Cancel Session
          </ButtonEl>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-white/50">Record attendance</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <ButtonEl onClick={onCheckedIn} disabled={processing || Boolean(attendance)}>
            {attendance === "checked-in" ? "Checked in" : "Simulate: Checked In"}
          </ButtonEl>
          <ButtonEl variant="secondary-on-dark" onClick={() => onMarkAttendance("attended")} disabled={processing || attendance !== "checked-in"}>
            Simulate: Attended
          </ButtonEl>
          <ButtonEl variant="ghost-on-dark" onClick={() => onMarkAttendance("missed")} disabled={processing || Boolean(attendance)}>
            Simulate: Missed
          </ButtonEl>
        </div>
      </div>

      {attendance === "missed" && (
        <p className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/60">
          Marked as missed — a follow-up task has been prepared below.
        </p>
      )}

      {(attendance === "attended" || attendance === "missed") && (
        <div className="mt-6">
          <ButtonEl onClick={onContinue}>Continue — follow-up</ButtonEl>
        </div>
      )}
    </div>
  );
}
