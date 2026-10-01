import { journeyStageLabels } from "@/content/clinics-demo";
import { categoryById, type Provider, type ReceptionStaff } from "@/content/clinics-services";
import { MessagePreviewCard } from "./MessagePreviewCard";
import type {
  ActivityEvent,
  AppointmentRecord,
  AttendanceStatus,
  MessagePreview,
  RequestRecord,
  Stage,
  Task,
  WaitlistOffer,
} from "./session";

const stageOrder: Stage[] = ["request", "assignment", "confirm", "reminders", "attendance", "followup"];

function stageLabel(stage: Stage): string {
  const i = stageOrder.indexOf(stage);
  return i === -1 ? "Not started" : journeyStageLabels[i];
}

export function ClinicView({
  request,
  receptionOwner,
  provider,
  stage,
  appointment,
  attendance,
  waitlistOffer,
  tasks,
  events,
  messages,
}: {
  request: RequestRecord | null;
  receptionOwner: ReceptionStaff | null;
  provider: Provider | null;
  stage: Stage;
  appointment: AppointmentRecord | null;
  attendance: AttendanceStatus | null;
  waitlistOffer: WaitlistOffer | null;
  tasks: Task[];
  events: ActivityEvent[];
  messages: MessagePreview[];
}) {
  const lastTask = tasks[tasks.length - 1] ?? null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <p className="text-sm text-white/50">Fictional case record — for demonstration only.</p>

      {!request ? (
        <p className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
          No demo request yet. Start the sample journey to see how a case builds up here.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Request</p>
            <p className="mt-1 font-semibold text-white">
              {request.name} · {request.email}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {categoryById(request.categoryId).name} · {request.patientKind} patient
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Reception owner</p>
              <p className="mt-1 text-sm text-white/70">{receptionOwner ? receptionOwner.name : "Not yet assigned"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Provider</p>
              <p className="mt-1 text-sm text-white/70">{provider ? `${provider.name} (${provider.title})` : "Not yet assigned"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Current stage</p>
              <p className="mt-1 text-sm text-white/70">{stageLabel(stage)}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Appointment status</p>
              <p className="mt-1 text-sm text-white/70">{appointment ? `${appointment.status} — ${appointment.slotLabel}` : "Not requested"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Attendance status</p>
              <p className="mt-1 text-sm text-white/70">{attendance ?? "Not recorded"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Waiting-list offer</p>
              <p className="mt-1 text-sm text-white/70">{waitlistOffer ? `${waitlistOffer.candidateName} — ${waitlistOffer.status}` : "None"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Next action</p>
            {lastTask ? (
              <p className="mt-1 text-sm text-white/70">
                {lastTask.label} — <span className="text-white/45">{lastTask.dueLabel}</span>
              </p>
            ) : (
              <p className="mt-1 text-sm text-white/60">No pending task.</p>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Activity timeline</p>
            <ol className="mt-2 flex flex-col gap-1.5 border-l border-white/10 pl-4">
              {events.map((event) => (
                <li key={event.id} className="text-sm text-white/60">
                  {event.simulatedDay > 0 && <span className="mr-1.5 text-xs font-semibold text-orange">Day {event.simulatedDay}</span>}
                  {event.label}
                </li>
              ))}
            </ol>
          </div>

          {messages.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Message previews</p>
              <div className="mt-2 flex flex-col gap-2.5">
                {messages.map((m) => (
                  <MessagePreviewCard key={m.id} message={m} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
