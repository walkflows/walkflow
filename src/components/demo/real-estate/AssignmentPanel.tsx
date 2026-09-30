import { ButtonEl } from "@/components/ui/Button";
import { IconPeople } from "@/components/ui/icons";
import type { DemoAgent } from "@/content/real-estate-properties";
import type { Task } from "./session";

export function AssignmentPanel({ agent, task, onContinue }: { agent: DemoAgent; task: Task; onContinue: () => void }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 3 — Agent Assignment</p>
      <h3 className="mt-2 text-xl text-white">An agent has been assigned</h3>

      <div className="mt-5 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
          <IconPeople className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold text-white">{agent.name}</p>
          <p className="text-sm text-white/60">{agent.email} (fictional)</p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Assigned based on the enquiry&rsquo;s location and {agent.specialism === "both" ? "buy/rent" : agent.specialism} specialism — a
            documented rule, not an AI decision.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-white/50">Follow-up task created</p>
        <p className="mt-2 font-semibold text-white">{task.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-white/60">{task.detail}</p>
        <p className="mt-2 text-xs text-white/40">{task.dueLabel}</p>
      </div>

      <div className="mt-6">
        <ButtonEl onClick={onContinue}>Continue — request a viewing</ButtonEl>
      </div>
    </div>
  );
}
