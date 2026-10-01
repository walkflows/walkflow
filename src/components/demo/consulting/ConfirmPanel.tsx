import { serviceById } from "@/content/consulting-services";
import { ButtonEl } from "@/components/ui/Button";
import type { PaymentRecord, ProposalRecord, RequestRecord, SessionRecord } from "./session";

export function ConfirmPanel({
  request,
  session,
  payment,
  proposal,
  processing,
  onSimulatePayment,
  onCancelSession,
  onRecordDecision,
  onPrepareRevision,
  onApproveRevisedProposal,
  onContinue,
}: {
  request: RequestRecord;
  session: SessionRecord | null;
  payment: PaymentRecord | null;
  proposal: ProposalRecord | null;
  processing: boolean;
  onSimulatePayment: () => void;
  onCancelSession: () => void;
  onRecordDecision: (decision: "accepted" | "declined" | "changes-requested") => void;
  onPrepareRevision: () => void;
  onApproveRevisedProposal: () => void;
  onContinue: () => void;
}) {
  if (request.path === "project") {
    if (!proposal) return null;

    if (proposal.status === "pending-approval") {
      return (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Confirm</p>
          <h3 className="mt-2 text-xl text-white">Revised proposal awaiting firm approval</h3>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-white">{proposal.scopeOfWork}</p>
            <p className="mt-2 text-sm font-semibold text-orange">Sample fee range: {proposal.feeRange}</p>
          </div>
          <div className="mt-5">
            <ButtonEl onClick={onApproveRevisedProposal} disabled={processing}>
              {processing ? "Approving…" : "Simulate: Firm Approves Revised Proposal"}
            </ButtonEl>
          </div>
        </div>
      );
    }

    if (proposal.status === "changes-requested") {
      return (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Confirm</p>
          <h3 className="mt-2 text-xl text-white">Client requested changes</h3>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-white">{proposal.scopeOfWork}</p>
            <p className="mt-2 text-sm text-white/60">A revised proposal needs to be prepared before the client can decide again.</p>
          </div>
          <div className="mt-5">
            <ButtonEl onClick={onPrepareRevision} disabled={processing}>
              {processing ? "Preparing…" : "Prepare a Revised Proposal"}
            </ButtonEl>
          </div>
        </div>
      );
    }

    // awaiting-client or accepted
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Confirm</p>
        <h3 className="mt-2 text-xl text-white">{proposal.status === "accepted" ? "Proposal accepted" : "Client decision"}</h3>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          {proposal.revised && <p className="text-xs font-semibold uppercase tracking-wide text-orange">Revised proposal</p>}
          <p className="mt-1 text-white">{proposal.scopeOfWork}</p>
          <p className="mt-2 text-sm text-white/60">{proposal.deliverables}</p>
          <p className="mt-2 text-sm font-semibold text-orange">Sample fee range: {proposal.feeRange}</p>
        </div>

        {proposal.status === "awaiting-client" && (
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonEl onClick={() => onRecordDecision("accepted")} disabled={processing}>
              Simulate: Client Accepts
            </ButtonEl>
            <ButtonEl variant="secondary-on-dark" onClick={() => onRecordDecision("changes-requested")} disabled={processing}>
              Simulate: Request Changes
            </ButtonEl>
            <ButtonEl variant="ghost-on-dark" onClick={() => onRecordDecision("declined")} disabled={processing}>
              Simulate: Client Declines
            </ButtonEl>
          </div>
        )}

        {proposal.status === "accepted" && (
          <div className="mt-5">
            <ButtonEl onClick={onContinue}>Continue — schedule kickoff</ButtonEl>
          </div>
        )}
      </div>
    );
  }

  // session path
  if (!session || !payment) return null;
  const service = request.serviceId ? serviceById(request.serviceId) : null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 4 — Confirm</p>
      <h3 className="mt-2 text-xl text-white">{payment.status === "paid" ? "Session confirmed" : "Confirm with sample payment"}</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        {service?.name} · {session.slotLabel}
      </p>

      {payment.status === "unpaid" && (
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonEl onClick={onSimulatePayment} disabled={processing}>
            {processing ? "Processing…" : `Simulate Payment — US$${payment.amount}`}
          </ButtonEl>
          <ButtonEl variant="ghost-on-dark" onClick={onCancelSession} disabled={processing}>
            Simulate: Cancel Session
          </ButtonEl>
        </div>
      )}

      {payment.status === "paid" && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange">Sample payment received — no real payment was processed</p>
          <div className="mt-4">
            <ButtonEl onClick={onContinue}>Continue — delivery</ButtonEl>
          </div>
        </div>
      )}
    </div>
  );
}
