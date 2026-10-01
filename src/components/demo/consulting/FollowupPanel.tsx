import { previewNextTouchLabel } from "@/content/consulting-demo";
import { followUpSequence } from "@/content/consulting-services";
import { ButtonEl } from "@/components/ui/Button";
import type { FollowUpOutcome } from "./session";

const outcomeCopy: Record<Exclude<FollowUpOutcome, null>, string> = {
  accepted: "Client accepted further work — follow-up sequence stopped.",
  declined: "Client declined further work — follow-up sequence stopped.",
  cancelled: "Engagement was cancelled — follow-up sequence stopped.",
  "opted-out": "Client opted out of follow-up communications — no touches were sent.",
};

export function FollowupPanel({
  touchesSent,
  outcome,
  processing,
  onPreviewNextTouch,
  onRecordOutcome,
  onClose,
}: {
  touchesSent: number;
  outcome: FollowUpOutcome;
  processing: boolean;
  onPreviewNextTouch: () => void;
  onRecordOutcome: (outcome: "accepted" | "declined" | "cancelled") => void;
  onClose: () => void;
}) {
  const exhausted = touchesSent >= followUpSequence.length;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 6 — Follow-up</p>
      <h3 className="mt-2 text-xl text-white">Limited follow-up sequence</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        A short, finite nurture sequence (max {followUpSequence.length} touches) runs here — it stops the moment the client responds, cancels, or opts out.
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        {outcome && <p className="text-sm leading-relaxed text-white/80">{outcomeCopy[outcome]}</p>}
        {!outcome && exhausted && <p className="text-sm leading-relaxed text-white/80">Sequence complete — no further automatic touches remain.</p>}
        {!outcome && !exhausted && (
          <p className="text-sm leading-relaxed text-white/60">
            {touchesSent} of {followUpSequence.length} sample touches sent.
          </p>
        )}
      </div>

      {!outcome && !exhausted && (
        <div className="mt-5">
          <ButtonEl onClick={onPreviewNextTouch} disabled={processing}>
            {processing ? "Sending…" : previewNextTouchLabel}
          </ButtonEl>
        </div>
      )}

      {!outcome && (
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonEl variant="secondary-on-dark" onClick={() => onRecordOutcome("accepted")} disabled={processing}>
            Simulate: Client Accepts Further Work
          </ButtonEl>
          <ButtonEl variant="ghost-on-dark" onClick={() => onRecordOutcome("declined")} disabled={processing}>
            Simulate: Client Declines
          </ButtonEl>
          <ButtonEl variant="ghost-on-dark" onClick={() => onRecordOutcome("cancelled")} disabled={processing}>
            Simulate: Client Cancels
          </ButtonEl>
        </div>
      )}

      <div className="mt-6">
        <ButtonEl variant="secondary-on-dark" onClick={onClose}>
          Close Request
        </ButtonEl>
      </div>
    </div>
  );
}
