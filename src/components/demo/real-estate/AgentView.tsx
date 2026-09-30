import { journeyStageLabels } from "@/content/real-estate-demo";
import { formatPrice } from "@/content/real-estate-properties";
import { MessagePreviewCard } from "./MessagePreviewCard";
import type { DemoAgent } from "@/content/real-estate-properties";
import type { ActivityEvent, EnquiryRecord, MessagePreview, Stage, Task } from "./session";
import type { MatchedProperty } from "./engine";

const stageOrder: Stage[] = ["enquiry", "matching", "assignment", "viewing", "post-viewing", "next-step"];

function stageLabel(stage: Stage): string {
  const i = stageOrder.indexOf(stage);
  return i === -1 ? "Not started" : journeyStageLabels[i];
}

export function AgentView({
  enquiry,
  matches,
  agent,
  stage,
  tasks,
  events,
  messages,
}: {
  enquiry: EnquiryRecord | null;
  matches: MatchedProperty[];
  agent: DemoAgent | null;
  stage: Stage;
  tasks: Task[];
  events: ActivityEvent[];
  messages: MessagePreview[];
}) {
  const lastTask = tasks[tasks.length - 1] ?? null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <p className="text-sm text-white/50">Fictional case record — for demonstration only.</p>

      {!enquiry ? (
        <p className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
          No demo enquiry yet. Start the sample journey to see how a case builds up here.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Enquiry</p>
            <p className="mt-1 font-semibold text-white">
              {enquiry.name} · {enquiry.email}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {enquiry.listingType === "buy" ? "Buying" : "Renting"} · {enquiry.neighbourhood === "any" ? "Any area" : enquiry.neighbourhood} ·{" "}
              {enquiry.maxBudget ? `up to $${enquiry.maxBudget.toLocaleString("en-US")}` : "no max budget"} ·{" "}
              {enquiry.minBedrooms > 0 ? `${enquiry.minBedrooms}+ beds` : "any beds"}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50">Matched properties</p>
            {matches.length === 0 ? (
              <p className="mt-1 text-sm text-white/60">None matched exactly.</p>
            ) : (
              <ul className="mt-2 flex flex-col gap-1.5">
                {matches.map((m) => (
                  <li key={m.property.id} className="text-sm text-white/70">
                    {m.property.name} — {formatPrice(m.property)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Assigned agent</p>
              <p className="mt-1 text-sm text-white/70">{agent ? agent.name : "Not yet assigned"}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">Current stage</p>
              <p className="mt-1 text-sm text-white/70">{stageLabel(stage)}</p>
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
