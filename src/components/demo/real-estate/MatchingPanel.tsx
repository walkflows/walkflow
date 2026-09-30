import { formatPrice } from "@/content/real-estate-properties";
import { ButtonEl } from "@/components/ui/Button";
import type { AlternativeProperty, MatchedProperty } from "./engine";

function PropertyRow({ property, reasons, differs }: MatchedProperty & { differs?: string }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold text-white">{property.name}</span>
        <span className="text-white/60">{formatPrice(property)}</span>
      </div>
      <p className="mt-1 text-sm text-white/50">{property.neighbourhood}</p>
      {differs && <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-orange">{differs}</p>}
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {reasons.map((reason) => (
          <li key={reason} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-white/70">
            {reason}
          </li>
        ))}
      </ul>
    </li>
  );
}

export function MatchingPanel({
  matches,
  alternatives,
  processing,
  onAdjust,
  onContinue,
}: {
  matches: MatchedProperty[];
  alternatives: AlternativeProperty[];
  processing: boolean;
  onAdjust: () => void;
  onContinue: () => void;
}) {
  const hasMatches = matches.length > 0;
  const hasAlternatives = alternatives.length > 0;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 2 — Matching</p>
      <h3 className="mt-2 text-xl text-white">
        {hasMatches ? `${matches.length} sample listing${matches.length === 1 ? "" : "s"} match your requirements` : "No exact match in the sample listings"}
      </h3>

      {hasMatches ? (
        <ul className="mt-5 flex flex-col gap-3">
          {matches.map((m) => (
            <PropertyRow key={m.property.id} {...m} />
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-white/60">
            None of the sample listings meet every requirement exactly. In a connected system, this enquiry would still be sent to
            an agent for review — your requirements haven&rsquo;t been changed.
          </p>
          {hasAlternatives && (
            <>
              <p className="mt-4 text-sm font-semibold text-white">Closest alternatives</p>
              <ul className="mt-3 flex flex-col gap-3">
                {alternatives.map((a) => (
                  <PropertyRow key={a.property.id} {...a} />
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonEl variant="secondary-on-dark" onClick={onAdjust} disabled={processing}>
          Adjust requirements
        </ButtonEl>
        <ButtonEl onClick={onContinue} disabled={processing}>
          {processing ? "Assigning an agent…" : "Continue — assign an agent"}
        </ButtonEl>
      </div>
    </div>
  );
}
