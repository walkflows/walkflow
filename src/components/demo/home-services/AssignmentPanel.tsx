import { ButtonEl } from "@/components/ui/Button";
import { IconPeople } from "@/components/ui/icons";
import type { Crew } from "@/content/home-services-roofing";
import type { Task } from "./session";

export function AssignmentPanel({
  areaCovered,
  crew,
  urgentFlagged,
  tasks,
  onAdjust,
  onContinue,
}: {
  areaCovered: boolean | null;
  crew: Crew | null;
  urgentFlagged: boolean;
  tasks: Task[];
  onAdjust: () => void;
  onContinue: () => void;
}) {
  if (areaCovered === false) {
    const task = tasks[tasks.length - 1];
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 2 — Review and Assign</p>
        <h3 className="mt-2 text-xl text-white">Outside the sample service area</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-white/60">
          This location isn&rsquo;t covered by the sample crews, so it hasn&rsquo;t been automatically assigned. In a connected system, a coordinator
          would still review it manually.
        </p>
        {task && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Task created</p>
            <p className="mt-2 font-semibold text-white">{task.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{task.detail}</p>
          </div>
        )}
        <div className="mt-6">
          <ButtonEl onClick={onAdjust}>Adjust request</ButtonEl>
        </div>
      </div>
    );
  }

  if (!crew) return null;
  const inspectionTask = tasks.find((t) => t.label.startsWith("Review request"));
  const urgentTask = tasks.find((t) => t.label.startsWith("Flagged"));

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 2 — Review and Assign</p>
      <h3 className="mt-2 text-xl text-white">A crew has been assigned</h3>

      {urgentFlagged && (
        <span className="mt-3 inline-flex items-center rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
          Flagged for urgent review
        </span>
      )}

      <div className="mt-4 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
          <IconPeople className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold text-white">{crew.name}</p>
          <p className="text-sm text-white/60">
            {crew.leadName} · {crew.email} (fictional)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Assigned based on the request&rsquo;s service type and location — a documented rule, not an AI decision.
          </p>
        </div>
      </div>

      {inspectionTask && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Inspection task created</p>
          <p className="mt-2 font-semibold text-white">{inspectionTask.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{inspectionTask.detail}</p>
        </div>
      )}

      {urgentTask && (
        <div className="mt-4 rounded-2xl border border-orange/25 bg-orange/[0.06] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-orange">{urgentTask.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{urgentTask.detail}</p>
        </div>
      )}

      <div className="mt-6">
        <ButtonEl onClick={onContinue}>Continue — arrange an inspection</ButtonEl>
      </div>
    </div>
  );
}
