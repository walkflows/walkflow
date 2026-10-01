import { journeyStageLabels } from "@/content/consulting-demo";
import type { Consultant } from "@/content/consulting-services";
import { MessagePreviewCard } from "./MessagePreviewCard";
import type {
  ActivityEvent,
  AttendanceStatus,
  KickoffRecord,
  MessagePreview,
  PaymentRecord,
  ProposalRecord,
  RequestRecord,
  SessionRecord,
  Stage,
  Task,
} from "./session";

const stageOrder: Stage[] = ["request", "assignment", "scope", "confirm", "delivery", "followup"];

function stageLabel(stage: Stage): string {
  const i = stageOrder.indexOf(stage);
  return i === -1 ? "Not started" : journeyStageLabels[i];
}

export function FirmView({
  request,
  consultant,
  stage,
  session,
  payment,
  attendance,
  proposal,
  kickoff,
  tasks,
  events,
  messages,
}: {
  request: RequestRecord | null;
  consultant: Consultant | null;
  stage: Stage;
  session: SessionRecord | null;
  payment: PaymentRecord | null;
  attendance: AttendanceStatus | null;
  proposal: ProposalRecord | null;
  kickoff: KickoffRecord | null;
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
            <p className="mt-1 text-sm text-white/60">{request.path === "session" ? "Standard session" : "Custom project"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Consultant</p>
              <p className="mt-1 text-sm text-white/70">{consultant ? `${consultant.name} (${consultant.title})` : "Not yet assigned"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Current status</p>
              <p className="mt-1 text-sm text-white/70">{stageLabel(stage)}</p>
            </div>
            {request.path === "session" ? (
              <>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Session</p>
                  <p className="mt-1 text-sm text-white/70">{session ? `${session.status} — ${session.slotLabel}` : "Not requested"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Payment</p>
                  <p className="mt-1 text-sm text-white/70">{payment ? `US$${payment.amount} — ${payment.status}` : "Not due yet"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Attendance</p>
                  <p className="mt-1 text-sm text-white/70">{attendance ?? "Not recorded"}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Proposal</p>
                  <p className="mt-1 text-sm text-white/70">{proposal ? proposal.status : "Not drafted"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Kickoff</p>
                  <p className="mt-1 text-sm text-white/70">{kickoff ? `${kickoff.status}${kickoff.dateLabel ? ` — ${kickoff.dateLabel}` : ""}` : "Not scheduled"}</p>
                </div>
              </>
            )}
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
