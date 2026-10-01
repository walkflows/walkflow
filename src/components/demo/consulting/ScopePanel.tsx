import type { FormEvent } from "react";
import { useMemo } from "react";
import { consultingTimezoneLabel, serviceById } from "@/content/consulting-services";
import { ButtonEl } from "@/components/ui/Button";
import { generateSessionSlots } from "./engine";
import type { ProposalRecord, RequestRecord, SessionRecord } from "./session";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export function ScopePanel({
  request,
  session,
  proposal,
  processing,
  onRequestSession,
  onApproveProposal,
  onContinue,
}: {
  request: RequestRecord;
  session: SessionRecord | null;
  proposal: ProposalRecord | null;
  processing: boolean;
  onRequestSession: (slotId: string, slotLabel: string) => void;
  onApproveProposal: () => void;
  onContinue: () => void;
}) {
  const slots = useMemo(() => generateSessionSlots(), []);

  if (request.path === "project") {
    if (!proposal) return null;
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 3 — Scope &amp; Schedule</p>
        <h3 className="mt-2 text-xl text-white">Sample proposal drafted</h3>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">
            {proposal.status === "pending-approval" ? "Awaiting firm approval" : "Approved — ready to share"}
          </p>
          <p className="mt-2 text-white">{proposal.scopeOfWork}</p>
          <p className="mt-2 text-sm text-white/60">{proposal.deliverables}</p>
          <p className="mt-2 text-sm font-semibold text-orange">Sample fee range: {proposal.feeRange}</p>
          <p className="mt-2 text-xs text-white/40">{proposal.notes}</p>
        </div>

        {proposal.status === "pending-approval" && (
          <div className="mt-5">
            <ButtonEl onClick={onApproveProposal} disabled={processing}>
              {processing ? "Approving…" : "Simulate: Firm Approves Proposal"}
            </ButtonEl>
          </div>
        )}

        {proposal.status === "awaiting-client" && (
          <div className="mt-5">
            <ButtonEl onClick={onContinue}>Continue — client decision</ButtonEl>
          </div>
        )}
      </div>
    );
  }

  const service = request.serviceId ? serviceById(request.serviceId) : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const slotId = data.get("slotId") as string;
    const slot = slots.find((s) => s.id === slotId) ?? slots[0];
    onRequestSession(slot.id, slot.label);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 3 — Scope &amp; Schedule</p>

      {!session && (
        <>
          <h3 className="mt-2 text-xl text-white">Pick a session time</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-white/60">
            {service?.name} · {service?.durationMinutes} minutes. {consultingTimezoneLabel}
          </p>
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="scope-slot">
                Session time
              </label>
              <select id="scope-slot" name="slotId" defaultValue={slots[0]?.id} className={`${selectClass} mt-1.5`}>
                {slots.map((s) => (
                  <option key={s.id} value={s.id} className={optionClass}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <ButtonEl type="submit" disabled={processing}>
                {processing ? "Recording request…" : "Request Session Time"}
              </ButtonEl>
            </div>
          </form>
        </>
      )}

      {session && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">Session time requested</p>
          <p className="mt-2 text-white">
            {service?.name} · {session.slotLabel} · US${service?.price}
          </p>
          <div className="mt-5">
            <ButtonEl onClick={onContinue}>Continue — confirm &amp; pay</ButtonEl>
          </div>
        </div>
      )}
    </div>
  );
}
