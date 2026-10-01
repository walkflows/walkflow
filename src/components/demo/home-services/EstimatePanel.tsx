import type { FormEvent } from "react";
import { ButtonEl } from "@/components/ui/Button";
import type { EstimateRecord } from "./session";

export function EstimatePanel({
  estimate,
  processing,
  onApprove,
  onDecision,
  onPrepareRevised,
}: {
  estimate: EstimateRecord;
  processing: boolean;
  onApprove: () => void;
  onDecision: (decision: "accepted" | "declined" | "changes-requested") => void;
  onPrepareRevised: () => void;
}) {
  function handleDecision(e: FormEvent<HTMLFormElement>, decision: "accepted" | "declined" | "changes-requested") {
    e.preventDefault();
    onDecision(decision);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Prepare and Approve an Estimate</p>

      {estimate.status === "pending-approval" && (
        <>
          <h3 className="mt-2 text-xl text-white">{estimate.revised ? "Revised estimate prepared" : "Estimate drafted from the inspection"}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-white/60">
            A sample estimate has been drafted. Real roofing estimates require an inspection and staff approval before the customer sees pricing — use the
            control below to simulate that approval.
          </p>
          <div className="mt-6">
            <ButtonEl onClick={onApprove} disabled={processing}>
              {processing ? "Approving…" : "Simulate: Staff approves estimate"}
            </ButtonEl>
          </div>
        </>
      )}

      {estimate.status === "awaiting-customer" && (
        <>
          <h3 className="mt-2 text-xl text-white">Your sample estimate</h3>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Scope of work</p>
            <p className="mt-1 leading-relaxed text-white/80">{estimate.scenario.scopeOfWork}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-white/50">Materials</p>
            <p className="mt-1 leading-relaxed text-white/70">{estimate.scenario.materials}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-white/50">Labour</p>
            <p className="mt-1 leading-relaxed text-white/70">{estimate.scenario.labour}</p>
            <p className="mt-4 text-2xl font-heading font-medium text-white">
              ${estimate.scenario.amount.toLocaleString("en-US")} <span className="text-sm font-sans text-white/50">{estimate.scenario.currency} (fictional amount)</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{estimate.scenario.notes}</p>
          </div>

          <form className="mt-6 flex flex-wrap gap-3" onSubmit={(e) => handleDecision(e, "accepted")}>
            <ButtonEl type="submit" disabled={processing}>
              Accept Estimate
            </ButtonEl>
            <ButtonEl type="button" variant="secondary-on-dark" onClick={() => onDecision("changes-requested")} disabled={processing}>
              Request Changes
            </ButtonEl>
            <ButtonEl type="button" variant="ghost-on-dark" onClick={() => onDecision("declined")} disabled={processing}>
              Decline
            </ButtonEl>
          </form>
        </>
      )}

      {estimate.status === "changes-requested" && (
        <>
          <h3 className="mt-2 text-xl text-white">Changes requested</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-white/60">
            The customer asked for changes to this estimate. A revised version needs to be prepared and approved again before it&rsquo;s shared.
          </p>
          <div className="mt-6">
            <ButtonEl onClick={onPrepareRevised} disabled={processing}>
              Prepare a Revised Estimate
            </ButtonEl>
          </div>
        </>
      )}

      {estimate.status === "declined" && (
        <p className="mt-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/60">
          This estimate was declined. The request has been closed — no further automated follow-ups will run in this demo session.
        </p>
      )}
    </div>
  );
}
