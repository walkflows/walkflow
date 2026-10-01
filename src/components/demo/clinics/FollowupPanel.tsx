import { ButtonEl } from "@/components/ui/Button";
import type { FollowUpRecord } from "./session";

export function FollowupPanel({ followUp, closed, onClose }: { followUp: FollowUpRecord; closed: boolean; onClose: () => void }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 6 — Administrative Follow-up</p>
      <h3 className="mt-2 text-xl text-white">The visit is complete</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        A neutral feedback preview has been prepared — see &ldquo;What happened automatically&rdquo; below.
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-white/50">Follow-up</p>
        {!followUp.instruction && <p className="mt-2 text-sm leading-relaxed text-white/70">No follow-up specified by staff for this visit.</p>}
        {followUp.instruction && followUp.skippedByOptOut && (
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            A follow-up was specified ({followUp.instruction}) but the patient opted out of optional follow-up communications, so it was skipped.
          </p>
        )}
        {followUp.instruction && !followUp.skippedByOptOut && <p className="mt-2 text-sm leading-relaxed text-white/70">{followUp.instruction}</p>}
      </div>

      {!closed && (
        <div className="mt-6">
          <ButtonEl variant="secondary-on-dark" onClick={onClose}>
            Close Request
          </ButtonEl>
        </div>
      )}
    </div>
  );
}
