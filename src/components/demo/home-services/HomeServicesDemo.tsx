"use client";

import { useState } from "react";
import { businessViewToggleLabels, conversionPrompt, demoStrings, previewModeBanner } from "@/content/home-services-demo";
import { allServiceOptions, type ServiceId } from "@/content/home-services-roofing";
import { Button, ButtonEl } from "@/components/ui/Button";
import { AssignmentPanel } from "./AssignmentPanel";
import { AutomationPanel } from "./AutomationPanel";
import { BusinessView } from "./BusinessView";
import { CompletionPanel } from "./CompletionPanel";
import { EstimatePanel } from "./EstimatePanel";
import { InspectionPanel } from "./InspectionPanel";
import { JobPanel } from "./JobPanel";
import { RequestForm, type RequestFormValues } from "./RequestForm";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceExplorer } from "./ServiceExplorer";
import { StageProgress } from "./StageProgress";
import { useHomeServicesDemoSession } from "./session";

const tabPanelClass = "mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8";

export function HomeServicesDemo() {
  const { state, processing, dispatch, run } = useHomeServicesDemoSession();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = selectedServiceId ? allServiceOptions.find((s) => s.id === selectedServiceId) ?? null : null;

  function startJourney(serviceId?: string) {
    setSelectedServiceId(null);
    dispatch({ type: "START_JOURNEY", prefill: serviceId ? { serviceId: serviceId as ServiceId } : null });
  }

  const showConversion = state.stage !== "browse" && state.stage !== "request";

  return (
    <div id="interactive-demo" className="scroll-mt-24">
      <span className="inline-flex items-center rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
        {previewModeBanner.pill}
      </span>
      <div className="mt-3 rounded-2xl border border-orange/25 bg-orange/[0.08] p-4 text-sm font-medium text-white/85">{previewModeBanner.notice}</div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {state.stage === "browse" && <ButtonEl onClick={() => startJourney()}>Start Sample Journey</ButtonEl>}
        <ButtonEl variant="secondary-on-dark" size="sm" onClick={() => dispatch({ type: "TOGGLE_BUSINESS_VIEW" })}>
          {state.businessViewOpen ? businessViewToggleLabels.close : businessViewToggleLabels.open}
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
          <ServiceExplorer onViewDetails={setSelectedServiceId} onRequestInspection={(id) => startJourney(id)} />
        </div>
      )}

      {state.stage === "request" && (
        <div className={tabPanelClass}>
          <RequestForm prefill={state.prefill} submitting={processing} onSubmit={(values: RequestFormValues) => run({ type: "SUBMIT_REQUEST", values })} />
        </div>
      )}

      {state.stage === "assignment" && (
        <div className={tabPanelClass}>
          <AssignmentPanel
            areaCovered={state.areaCovered}
            crew={state.crew}
            urgentFlagged={state.urgentFlagged}
            tasks={state.tasks}
            onAdjust={() => dispatch({ type: "ADJUST_REQUEST" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_INSPECTION" })}
          />
        </div>
      )}

      {state.stage === "inspection" && (
        <div className={tabPanelClass}>
          <InspectionPanel
            inspection={state.inspection}
            processing={processing}
            onRequest={(slotId, slotLabel) => run({ type: "REQUEST_INSPECTION", slotId, slotLabel })}
            onConfirm={() => run({ type: "CONFIRM_INSPECTION" })}
            onCancel={() => dispatch({ type: "CANCEL_INSPECTION" })}
            onMarkOutcome={(outcome) => run({ type: "MARK_INSPECTION_OUTCOME", outcome })}
            onReschedule={(slotId, slotLabel) => dispatch({ type: "RESCHEDULE_INSPECTION", slotId, slotLabel })}
            onBackToInspection={() => dispatch({ type: "BACK_TO_INSPECTION" })}
          />
        </div>
      )}

      {state.stage === "estimate" && state.estimate && (
        <div className={tabPanelClass}>
          <EstimatePanel
            estimate={state.estimate}
            processing={processing}
            onApprove={() => run({ type: "APPROVE_ESTIMATE" })}
            onDecision={(decision) => run({ type: "RECORD_ESTIMATE_DECISION", decision })}
            onPrepareRevised={() => run({ type: "PREPARE_REVISED_ESTIMATE" })}
          />
        </div>
      )}

      {state.stage === "job" && state.job && (
        <div className={tabPanelClass}>
          <JobPanel
            job={state.job}
            processing={processing}
            onRequestDate={(dateId, dateLabel) => run({ type: "REQUEST_JOB_DATE", dateId, dateLabel })}
            onStartJob={() => run({ type: "START_JOB" })}
            onMarkDelayed={() => dispatch({ type: "MARK_JOB_DELAYED" })}
            onReschedule={(dateId, dateLabel) => dispatch({ type: "RESCHEDULE_JOB", dateId, dateLabel })}
            onCancelJob={() => dispatch({ type: "CANCEL_JOB" })}
            onCompleteJob={() => run({ type: "COMPLETE_JOB" })}
          />
        </div>
      )}

      {state.stage === "completion" && state.invoice && (
        <div className={tabPanelClass}>
          <CompletionPanel invoice={state.invoice} processing={processing} onSimulatePayment={() => run({ type: "SIMULATE_PAYMENT" })} />
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
        {state.businessViewOpen && (
          <BusinessView
            request={state.request}
            crew={state.crew}
            stage={state.stage}
            inspection={state.inspection}
            estimate={state.estimate}
            job={state.job}
            invoice={state.invoice}
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

      <ServiceDetailsDialog service={selectedService} onClose={() => setSelectedServiceId(null)} onRequestInspection={(id) => startJourney(id)} />
    </div>
  );
}
