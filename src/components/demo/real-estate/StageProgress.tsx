import { journeyStageLabels } from "@/content/real-estate-demo";
import { IconCheck } from "@/components/ui/icons";
import { cx } from "@/lib/utils";
import type { Stage } from "./session";

const stageOrder: Stage[] = ["enquiry", "matching", "assignment", "viewing", "post-viewing", "next-step"];

export function StageProgress({ stage }: { stage: Stage }) {
  const currentIndex = stageOrder.indexOf(stage);
  if (currentIndex === -1) return null;

  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Demo journey progress">
      {journeyStageLabels.map((label, i) => {
        const isCurrent = i === currentIndex;
        const isDone = i < currentIndex;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              aria-current={isCurrent ? "step" : undefined}
              className={cx(
                "flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold",
                isCurrent && "bg-orange text-navy-deep",
                isDone && !isCurrent && "bg-orange/20 text-orange",
                !isCurrent && !isDone && "bg-white/10 text-white/50",
              )}
            >
              {isDone ? <IconCheck className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={cx("text-xs font-semibold uppercase tracking-wide", isCurrent ? "text-white" : "text-white/50")}>
              {label}
            </span>
            {i < journeyStageLabels.length - 1 && <span aria-hidden className="mx-1 h-px w-4 bg-white/15 sm:w-6" />}
          </li>
        );
      })}
    </ol>
  );
}
