"use client";

import { useState } from "react";
import { properties, type Property } from "@/content/real-estate-properties";
import { agentViewToggleLabels, conversionPrompt, demoStrings, previewModeBanner } from "@/content/real-estate-demo";
import { Button, ButtonEl } from "@/components/ui/Button";
import { AgentView } from "./AgentView";
import { AssignmentPanel } from "./AssignmentPanel";
import { AutomationPanel } from "./AutomationPanel";
import { EnquiryForm, type EnquiryFormValues } from "./EnquiryForm";
import type { Requirements } from "./engine";
import { MatchingPanel } from "./MatchingPanel";
import { NextStepPanel } from "./NextStepPanel";
import { PostViewingPanel } from "./PostViewingPanel";
import { PropertyDetailsDialog } from "./PropertyDetailsDialog";
import { initialFilters, PropertyExplorer } from "./PropertyExplorer";
import { StageProgress } from "./StageProgress";
import type { Filters } from "./types";
import { ViewingPanel } from "./ViewingPanel";
import { useRealEstateDemoSession } from "./session";

const tabPanelClass = "mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8";

function prefillFromProperty(p: Property): Partial<Requirements> {
  return {
    listingType: p.listingType,
    neighbourhood: p.neighbourhood,
    propertyType: p.propertyType,
    minBedrooms: p.bedrooms,
    maxBudget: p.price,
  };
}

export function RealEstateDemo() {
  const { state, processing, dispatch, run } = useRealEstateDemoSession();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) ?? null;

  function startJourney(propertyId?: string) {
    const property = propertyId ? (properties.find((p) => p.id === propertyId) ?? null) : null;
    setSelectedPropertyId(null);
    dispatch({ type: "START_JOURNEY", prefill: property ? prefillFromProperty(property) : null });
  }

  const showConversion = state.stage === "assignment" || state.stage === "viewing" || state.stage === "post-viewing" || state.stage === "next-step";

  return (
    <div id="interactive-demo" className="scroll-mt-24">
      <span className="inline-flex items-center rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
        {previewModeBanner.pill}
      </span>
      <div className="mt-3 rounded-2xl border border-orange/25 bg-orange/[0.08] p-4 text-sm font-medium text-white/85">
        {previewModeBanner.notice}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {state.stage === "browse" && <ButtonEl onClick={() => startJourney()}>Start Sample Journey</ButtonEl>}
        <ButtonEl variant="secondary-on-dark" size="sm" onClick={() => dispatch({ type: "TOGGLE_AGENT_VIEW" })}>
          {state.agentViewOpen ? agentViewToggleLabels.close : agentViewToggleLabels.open}
        </ButtonEl>
        <ButtonEl variant="ghost-on-dark" size="sm" onClick={() => dispatch({ type: "RESTART" })}>
          {demoStrings.restartDemo}
        </ButtonEl>
      </div>

      {state.stage !== "browse" && (
        <div className="mt-6">
          <StageProgress stage={state.stage} />
        </div>
      )}

      {state.stage === "browse" && (
        <div className={tabPanelClass}>
          <PropertyExplorer
            filters={filters}
            onFiltersChange={setFilters}
            onViewDetails={setSelectedPropertyId}
            onRequestViewing={(id) => startJourney(id)}
          />
        </div>
      )}

      {state.stage === "enquiry" && (
        <div className={tabPanelClass}>
          <EnquiryForm
            prefill={state.prefill}
            submitting={processing}
            onSubmit={(values: EnquiryFormValues) => run({ type: "SUBMIT_ENQUIRY", values })}
          />
        </div>
      )}

      {state.stage === "matching" && (
        <div className={tabPanelClass}>
          <MatchingPanel
            matches={state.matches}
            alternatives={state.alternatives}
            processing={processing}
            onAdjust={() => dispatch({ type: "ADJUST_REQUIREMENTS" })}
            onContinue={() => run({ type: "CONTINUE_TO_ASSIGNMENT" })}
          />
        </div>
      )}

      {state.stage === "assignment" && state.agent && (
        <div className={tabPanelClass}>
          <AssignmentPanel
            agent={state.agent}
            task={state.tasks[state.tasks.length - 1]}
            onContinue={() => dispatch({ type: "CONTINUE_TO_VIEWING" })}
          />
        </div>
      )}

      {state.stage === "viewing" && (
        <div className={tabPanelClass}>
          <ViewingPanel
            matches={state.matches}
            alternatives={state.alternatives}
            viewing={state.viewing}
            processing={processing}
            onRequest={(propertyId, slotId, slotLabel) => run({ type: "REQUEST_VIEWING", propertyId, slotId, slotLabel })}
            onConfirm={() => run({ type: "CONFIRM_VIEWING" })}
            onCancel={() => dispatch({ type: "CANCEL_VIEWING" })}
            onMarkOutcome={(outcome) => run({ type: "MARK_VIEWING_OUTCOME", outcome })}
            onReschedule={(slotId, slotLabel) => dispatch({ type: "RESCHEDULE_VIEWING", slotId, slotLabel })}
          />
        </div>
      )}

      {state.stage === "post-viewing" && (
        <div className={tabPanelClass}>
          <PostViewingPanel processing={processing} onSubmit={(interest, feedback) => run({ type: "RECORD_INTEREST", interest, feedback })} />
        </div>
      )}

      {state.stage === "next-step" && state.viewing && (
        <div className={tabPanelClass}>
          <NextStepPanel
            task={state.tasks[state.tasks.length - 1] ?? null}
            viewing={state.viewing}
            outcome={state.outcome}
            closed={state.closed}
            onAdjustRequirements={() => dispatch({ type: "ADJUST_REQUIREMENTS" })}
            onBrowseAgain={() => dispatch({ type: "BACK_TO_VIEWING" })}
            onClose={() => dispatch({ type: "CLOSE_ENQUIRY" })}
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AutomationPanel
          events={state.events}
          tasks={state.tasks}
          simulatedDay={state.simulatedDay}
          closed={state.closed}
          onPreviewNextDay={() => dispatch({ type: "PREVIEW_NEXT_DAY" })}
        />
        {state.agentViewOpen && (
          <AgentView
            enquiry={state.enquiry}
            matches={state.matches}
            agent={state.agent}
            stage={state.stage}
            tasks={state.tasks}
            events={state.events}
            messages={state.messages}
          />
        )}
      </div>

      {showConversion && (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-white">{conversionPrompt.heading}</p>
          <Button href={conversionPrompt.cta.href}>{conversionPrompt.cta.label}</Button>
        </div>
      )}

      <PropertyDetailsDialog property={selectedProperty} onClose={() => setSelectedPropertyId(null)} onRequestViewing={(id) => startJourney(id)} />
    </div>
  );
}
