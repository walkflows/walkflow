import { ButtonEl } from "@/components/ui/Button";
import type { Task, ViewingRecord, OutcomeRecord } from "./session";

export function NextStepPanel({
  task,
  viewing,
  outcome,
  closed,
  onAdjustRequirements,
  onBrowseAgain,
  onClose,
}: {
  task: Task | null;
  viewing: ViewingRecord;
  outcome: OutcomeRecord | null;
  closed: boolean;
  onAdjustRequirements: () => void;
  onBrowseAgain: () => void;
  onClose: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 6 — Next Step</p>
      <h3 className="mt-2 text-xl text-white">
        You&rsquo;ve reached the end of this sample journey
      </h3>

      {task && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Next action</p>
          <p className="mt-2 font-semibold text-white">{task.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{task.detail}</p>
          <p className="mt-2 text-xs text-white/40">{task.dueLabel}</p>
        </div>
      )}

      {closed ? (
        <p className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/60">
          This enquiry has been closed — no further automated follow-ups will run in this demo session.
        </p>
      ) : (
        <div className="mt-5 flex flex-wrap gap-3">
          {viewing.status === "missed" && <ButtonEl onClick={onBrowseAgain}>Offer a rescheduled viewing</ButtonEl>}
          {viewing.status === "cancelled" && (
            <>
              <ButtonEl onClick={onBrowseAgain}>Offer another slot</ButtonEl>
              <ButtonEl variant="secondary-on-dark" onClick={onClose}>
                Close enquiry
              </ButtonEl>
            </>
          )}
          {viewing.status === "attended" && outcome?.interest === "not-interested" && (
            <>
              <ButtonEl onClick={onBrowseAgain}>Browse other sample properties</ButtonEl>
              <ButtonEl variant="secondary-on-dark" onClick={onAdjustRequirements}>
                Adjust requirements
              </ButtonEl>
            </>
          )}
          {viewing.status === "attended" && outcome?.interest !== "not-interested" && (
            <ButtonEl variant="secondary-on-dark" onClick={onClose}>
              Close enquiry
            </ButtonEl>
          )}
        </div>
      )}
    </div>
  );
}
