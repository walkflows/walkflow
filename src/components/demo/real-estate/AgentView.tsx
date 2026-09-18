import { properties } from "@/content/real-estate-properties";
import { demoStrings } from "@/content/real-estate-demo";
import type { Lead, LeadStage } from "./types";

const stageStyles: Record<LeadStage, string> = {
  "New Enquiry": "bg-white/10 text-white/70",
  Matched: "bg-orange/15 text-orange",
  "Viewing Requested": "bg-orange text-navy-deep",
};

function propertyName(id: string) {
  return properties.find((p) => p.id === id)?.name ?? "Sample property";
}

export function AgentView({ leads }: { leads: Lead[] }) {
  const ordered = [...leads].reverse();

  return (
    <div>
      <p className="text-sm text-white/50">Fictional records for demonstration.</p>

      {ordered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
          No demo leads yet. Use “Share Requirements” or “Request a Viewing” to see how a record appears here.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-white/10 border-t border-white/10">
          {ordered.map((lead) => (
            <li key={lead.id} className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    <span className="font-semibold text-white">{lead.name}</span>
                    <span className="ml-2 text-sm text-white/60">{lead.requirementsSummary}</span>
                  </span>
                  <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[lead.stage]}`}>
                    {lead.stage}
                  </span>
                </summary>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
                  <p>Email: {lead.email}</p>
                  {lead.matchedPropertyIds.length > 0 && (
                    <p className="mt-2">Matched: {lead.matchedPropertyIds.map(propertyName).join(", ")}</p>
                  )}
                  {lead.viewing && (
                    <p className="mt-2">
                      Viewing requested: {propertyName(lead.viewing.propertyId)} · {lead.viewing.date}
                    </p>
                  )}
                  {lead.followUpReady && (
                    <p className="mt-2 text-white">Follow-up prepared — {demoStrings.sampleMessageLabel}</p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
