import { ButtonEl } from "@/components/ui/Button";
import { IconPeople } from "@/components/ui/icons";
import type { Consultant } from "@/content/consulting-services";
import type { RequestRecord, Task } from "./session";

export function AssignmentPanel({
  request,
  consultant,
  tasks,
  onAdjust,
  onContinue,
}: {
  request: RequestRecord;
  consultant: Consultant;
  tasks: Task[];
  onAdjust: () => void;
  onContinue: () => void;
}) {
  const task = tasks[tasks.length - 1] ?? null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 2 — Assignment</p>
      <h3 className="mt-2 text-xl text-white">Consultant assigned</h3>
      <p className="mt-3 max-w-xl leading-relaxed text-white/60">
        {request.path === "session" ? "Your session request" : "Your project enquiry"} has been routed to a consultant based on the service or project type.
      </p>

      <div className="mt-4 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
          <IconPeople className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Consultant</p>
          <p className="mt-1 font-semibold text-white">{consultant.name}</p>
          <p className="text-sm text-white/60">{consultant.title} (fictional)</p>
        </div>
      </div>

      {task && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Task created</p>
          <p className="mt-2 font-semibold text-white">{task.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{task.detail}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonEl variant="secondary-on-dark" onClick={onAdjust}>
          Adjust request
        </ButtonEl>
        <ButtonEl onClick={onContinue}>{request.path === "session" ? "Continue — schedule session" : "Continue — scope the project"}</ButtonEl>
      </div>
    </div>
  );
}
