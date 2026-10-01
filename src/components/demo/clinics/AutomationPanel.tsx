import { automationPanelHeading, previewReminderLabel } from "@/content/clinics-demo";
import { ButtonEl } from "@/components/ui/Button";
import { IconPulse } from "@/components/ui/icons";
import type { ActivityEvent, Task } from "./session";

export function AutomationPanel({
  events,
  tasks,
  simulatedDay,
  closed,
  onPreviewReminder,
}: {
  events: ActivityEvent[];
  tasks: Task[];
  simulatedDay: number;
  closed: boolean;
  onPreviewReminder: () => void;
}) {
  const ordered = [...events].reverse();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <IconPulse className="h-4 w-4 text-orange" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">{automationPanelHeading}</h3>
      </div>

      {ordered.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-white/50">Nothing has happened yet — share your appointment request to see this fill up.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5 text-sm">
          {ordered.map((event) => (
            <li key={event.id} className="flex items-start gap-2 leading-relaxed text-white/70">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
              <span>
                {event.simulatedDay > 0 && <span className="mr-1.5 text-xs font-semibold text-orange">Day {event.simulatedDay}</span>}
                {event.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && !closed && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <ButtonEl variant="secondary-on-dark" size="sm" onClick={onPreviewReminder}>
            {previewReminderLabel}
          </ButtonEl>
          <p className="mt-2 text-xs text-white/40">Advances the demo clock — currently Day {simulatedDay} (simulated).</p>
        </div>
      )}
    </div>
  );
}
