import { ButtonEl } from "@/components/ui/Button";
import type { AppointmentRecord, AttendanceStatus, WaitlistOffer } from "./session";

const waitlistStatusCopy: Record<WaitlistOffer["status"], string> = {
  offered: "Offer pending response",
  accepted: "Offer accepted — replacement booking confirmed (simulated)",
  declined: "Offer declined",
  expired: "Offer expired — no response in time",
};

export function AttendancePanel({
  appointment,
  attendance,
  waitlistOffer,
  processing,
  onCheckedIn,
  onMarkAttendance,
  onRespondWaitlist,
  onExpireWaitlist,
  onContinue,
  onClose,
}: {
  appointment: AppointmentRecord;
  attendance: AttendanceStatus | null;
  waitlistOffer: WaitlistOffer | null;
  processing: boolean;
  onCheckedIn: () => void;
  onMarkAttendance: (status: "attended" | "missed") => void;
  onRespondWaitlist: (response: "accepted" | "declined") => void;
  onExpireWaitlist: () => void;
  onContinue: () => void;
  onClose: () => void;
}) {
  if (appointment.status === "cancelled") {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 5 — Attendance and Waiting List</p>
        <h3 className="mt-2 text-xl text-white">Appointment cancelled — slot released</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-white/60">
          The confirmed slot ({appointment.slotLabel}) has been released. Here&rsquo;s what happens next for the sample waiting list.
        </p>

        {waitlistOffer ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange">{waitlistStatusCopy[waitlistOffer.status]}</p>
            <p className="mt-2 text-white">
              Offered to <strong>{waitlistOffer.candidateName}</strong> for {waitlistOffer.slotLabel}.
            </p>
            {waitlistOffer.status === "offered" && (
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonEl onClick={() => onRespondWaitlist("accepted")} disabled={processing}>
                  Simulate: Candidate Accepts
                </ButtonEl>
                <ButtonEl variant="secondary-on-dark" onClick={() => onRespondWaitlist("declined")} disabled={processing}>
                  Simulate: Candidate Declines
                </ButtonEl>
                <ButtonEl variant="ghost-on-dark" onClick={onExpireWaitlist} disabled={processing}>
                  Simulate: Offer Expires
                </ButtonEl>
              </div>
            )}
            {(waitlistOffer.status === "declined" || waitlistOffer.status === "expired") && (
              <p className="mt-3 text-sm leading-relaxed text-white/60">No further waiting-list candidates for this service in the sample data.</p>
            )}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/60">
            No waiting-list candidate was available for this service in the sample data.
          </p>
        )}

        <div className="mt-6">
          <ButtonEl variant="secondary-on-dark" onClick={onClose}>
            Close Request
          </ButtonEl>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 5 — Attendance and Waiting List</p>
      <h3 className="mt-2 text-xl text-white">Record what happened on the day</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">{appointment.slotLabel}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonEl onClick={onCheckedIn} disabled={processing || Boolean(attendance)}>
          {attendance === "checked-in" ? "Checked in" : "Simulate: Checked In"}
        </ButtonEl>
        <ButtonEl
          variant="secondary-on-dark"
          onClick={() => onMarkAttendance("attended")}
          disabled={processing || attendance !== "checked-in"}
        >
          Simulate: Attended
        </ButtonEl>
        <ButtonEl variant="ghost-on-dark" onClick={() => onMarkAttendance("missed")} disabled={processing || Boolean(attendance)}>
          Simulate: Missed
        </ButtonEl>
      </div>

      {attendance === "missed" && (
        <p className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/60">
          Marked as missed — a reception follow-up task and rebooking preview have been prepared below.
        </p>
      )}

      {attendance === "attended" && (
        <div className="mt-6">
          <ButtonEl onClick={onContinue}>Continue — follow-up</ButtonEl>
        </div>
      )}

      {attendance === "missed" && (
        <div className="mt-4">
          <ButtonEl variant="secondary-on-dark" onClick={onClose}>
            Close Request
          </ButtonEl>
        </div>
      )}
    </div>
  );
}
