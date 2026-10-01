import { ButtonEl } from "@/components/ui/Button";
import { IconPeople } from "@/components/ui/icons";
import type { Provider, ReceptionStaff } from "@/content/clinics-services";
import type { Task } from "./session";

export function AssignmentPanel({
  categoryPending,
  receptionOwner,
  provider,
  tasks,
  onAdjust,
  onContinue,
}: {
  categoryPending: boolean;
  receptionOwner: ReceptionStaff | null;
  provider: Provider | null;
  tasks: Task[];
  onAdjust: () => void;
  onContinue: () => void;
}) {
  if (!receptionOwner) return null;

  if (categoryPending) {
    const task = tasks[tasks.length - 1];
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 2 — Staff Assignment and Review</p>
        <h3 className="mt-2 text-xl text-white">Pending reception review</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-white/60">
          Since the service category wasn&rsquo;t specified, this request needs reception review before an appointment can be arranged — it hasn&rsquo;t been
          matched to a provider automatically.
        </p>
        <div className="mt-4 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
            <IconPeople className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-white">{receptionOwner.name}</p>
            <p className="text-sm text-white/60">{receptionOwner.email} (fictional)</p>
          </div>
        </div>
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

  const appointmentTask = tasks.find((t) => t.label.startsWith("Confirm appointment"));
  const referralTask = tasks.find((t) => t.label.startsWith("Check referral"));

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 2 — Staff Assignment and Review</p>
      <h3 className="mt-2 text-xl text-white">Reception and provider assigned</h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
            <IconPeople className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Reception owner</p>
            <p className="mt-1 font-semibold text-white">{receptionOwner.name}</p>
            <p className="text-sm text-white/60">{receptionOwner.email} (fictional)</p>
          </div>
        </div>
        {provider && (
          <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
              <IconPeople className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Provider</p>
              <p className="mt-1 font-semibold text-white">{provider.name}</p>
              <p className="text-sm text-white/60">{provider.title} (fictional)</p>
            </div>
          </div>
        )}
      </div>

      {appointmentTask && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Task created</p>
          <p className="mt-2 font-semibold text-white">{appointmentTask.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{appointmentTask.detail}</p>
        </div>
      )}

      {referralTask && (
        <div className="mt-4 rounded-2xl border border-orange/25 bg-orange/[0.06] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-orange">{referralTask.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{referralTask.detail}</p>
        </div>
      )}

      <div className="mt-6">
        <ButtonEl onClick={onContinue}>Continue — confirm an appointment</ButtonEl>
      </div>
    </div>
  );
}
