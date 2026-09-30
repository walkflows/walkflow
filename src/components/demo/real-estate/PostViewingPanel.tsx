import type { FormEvent } from "react";
import { ButtonEl } from "@/components/ui/Button";
import type { InterestLevel } from "./engine";

const options: { value: InterestLevel; label: string }[] = [
  { value: "interested", label: "Interested" },
  { value: "not-interested", label: "Not interested" },
  { value: "needs-info", label: "Needs more information" },
];

export function PostViewingPanel({
  processing,
  onSubmit,
}: {
  processing: boolean;
  onSubmit: (interest: InterestLevel, feedback: string) => void;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const interest = (data.get("interest") as InterestLevel) || "interested";
    const feedback = (data.get("feedback") as string) || "";
    onSubmit(interest, feedback);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 5 — After the Viewing</p>
      <h3 className="mt-2 text-xl text-white">How did the sample viewing go?</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">This feeds directly into what happens next.</p>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <fieldset className="flex flex-wrap gap-3">
          <legend className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50">Outcome</legend>
          {options.map((opt, i) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/80 has-checked:border-orange has-checked:bg-orange/15 has-checked:text-orange"
            >
              <input type="radio" name="interest" value={opt.value} defaultChecked={i === 0} className="accent-orange" />
              {opt.label}
            </label>
          ))}
        </fieldset>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-white/50" htmlFor="post-viewing-feedback">
            Feedback (optional)
          </label>
          <textarea
            id="post-viewing-feedback"
            name="feedback"
            rows={3}
            placeholder="e.g. Loved the kitchen, would like to see the garden again"
            className="mt-1.5 w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
        </div>

        <div>
          <ButtonEl type="submit" disabled={processing}>
            {processing ? "Recording feedback…" : "Submit Feedback"}
          </ButtonEl>
        </div>
      </form>
    </div>
  );
}
