import { journeyStageLabels } from "@/content/home-services-demo";
import { serviceById, type Crew } from "@/content/home-services-roofing";
import { MessagePreviewCard } from "./MessagePreviewCard";
import type {
  ActivityEvent,
  EstimateRecord,
  InspectionRecord,
  InvoiceRecord,
  JobRecord,
  MessagePreview,
  RequestRecord,
  Stage,
  Task,
} from "./session";

const stageOrder: Stage[] = ["request", "assignment", "inspection", "estimate", "job", "completion"];

function stageLabel(stage: Stage): string {
  const i = stageOrder.indexOf(stage);
  return i === -1 ? "Not started" : journeyStageLabels[i];
}

export function BusinessView({
  request,
  crew,
  stage,
  inspection,
  estimate,
  job,
  invoice,
  tasks,
  events,
  messages,
}: {
  request: RequestRecord | null;
  crew: Crew | null;
  stage: Stage;
  inspection: InspectionRecord | null;
  estimate: EstimateRecord | null;
  job: JobRecord | null;
  invoice: InvoiceRecord | null;
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
              {request.name} · {request.email} · {request.phone}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {serviceById(request.serviceId).name} · {request.propertyKind} · {request.location} · {request.urgency}
            </p>
            <p className="mt-1 text-sm text-white/60">&ldquo;{request.issueDescription}&rdquo;</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Assigned crew</p>
              <p className="mt-1 text-sm text-white/70">{crew ? `${crew.name} (${crew.leadName})` : "Not yet assigned"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Current stage</p>
              <p className="mt-1 text-sm text-white/70">{stageLabel(stage)}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Inspection status</p>
              <p className="mt-1 text-sm text-white/70">{inspection ? inspection.status : "Not requested"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Estimate status</p>
              <p className="mt-1 text-sm text-white/70">{estimate ? estimate.status.replace(/-/g, " ") : "Not prepared"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Job stage</p>
              <p className="mt-1 text-sm text-white/70">{job ? job.status.replace(/-/g, " ") : "Not scheduled"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Invoice / payment</p>
              <p className="mt-1 text-sm text-white/70">{invoice ? `$${invoice.amount.toLocaleString("en-US")} — ${invoice.status}` : "Not issued"}</p>
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
