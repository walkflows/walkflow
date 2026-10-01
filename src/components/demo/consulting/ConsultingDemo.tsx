"use client";

import { useState } from "react";
import { conversionPrompt, demoStrings, firmViewToggleLabels, previewModeBanner } from "@/content/consulting-demo";
import { sessionServices, type ServiceId } from "@/content/consulting-services";
import { Button, ButtonEl } from "@/components/ui/Button";
import { AssignmentPanel } from "./AssignmentPanel";
import { AutomationPanel } from "./AutomationPanel";
import { ConfirmPanel } from "./ConfirmPanel";
import { DeliveryPanel } from "./DeliveryPanel";
import { FirmView } from "./FirmView";
import { FollowupPanel } from "./FollowupPanel";
import { RequestForm, type RequestFormValues } from "./RequestForm";
import { ScopePanel } from "./ScopePanel";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceExplorer } from "./ServiceExplorer";
import { StageProgress } from "./StageProgress";
import { useConsultingDemoSession } from "./session";

const tabPanelClass = "mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8";

export function ConsultingDemo() {
  const { state, processing, dispatch, run } = useConsultingDemoSession();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = selectedServiceId ? sessionServices.find((s) => s.id === selectedServiceId) ?? null : null;

  function startJourney(path: "session" | "project", serviceId?: ServiceId) {
    setSelectedServiceId(null);
    dispatch({ type: "START_JOURNEY", prefill: { path, serviceId: path === "session" ? serviceId ?? sessionServices[0].id : null } });
  }

  const showConversion = state.stage !== "browse" && state.stage !== "request";

  return (
    <div id="interactive-demo" className="scroll-mt-24">
      <span className="inline-flex items-center rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
        {previewModeBanner.pill}
      </span>
      <div className="mt-3 rounded-2xl border border-orange/25 bg-orange/[0.08] p-4 text-sm font-medium text-white/85">{previewModeBanner.notice}</div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {state.stage === "browse" && <ButtonEl onClick={() => startJourney("session")}>Start Sample Journey</ButtonEl>}
        <ButtonEl variant="secondary-on-dark" size="sm" onClick={() => dispatch({ type: "TOGGLE_FIRM_VIEW" })}>
          {state.firmViewOpen ? firmViewToggleLabels.close : firmViewToggleLabels.open}
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
          <ServiceExplorer
            onViewDetails={setSelectedServiceId}
            onArrangeSession={(id) => startJourney("session", id as ServiceId)}
            onDiscussProject={() => startJourney("project")}
          />
        </div>
      )}

      {state.stage === "request" && (
        <div className={tabPanelClass}>
          <RequestForm prefill={state.prefill} submitting={processing} onSubmit={(values: RequestFormValues) => run({ type: "SUBMIT_REQUEST", values })} />
        </div>
      )}

      {state.stage === "assignment" && state.request && state.consultant && (
        <div className={tabPanelClass}>
          <AssignmentPanel
            request={state.request}
            consultant={state.consultant}
            tasks={state.tasks}
            onAdjust={() => dispatch({ type: "ADJUST_REQUEST" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_SCOPE" })}
          />
        </div>
      )}

      {state.stage === "scope" && state.request && (
        <div className={tabPanelClass}>
          <ScopePanel
            request={state.request}
            session={state.session}
            proposal={state.proposal}
            processing={processing}
            onRequestSession={(slotId, slotLabel) => run({ type: "REQUEST_SESSION", slotId, slotLabel })}
            onApproveProposal={() => run({ type: "APPROVE_PROPOSAL" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_CONFIRM" })}
          />
        </div>
      )}

      {state.stage === "confirm" && state.request && (
        <div className={tabPanelClass}>
          <ConfirmPanel
            request={state.request}
            session={state.session}
            payment={state.payment}
            proposal={state.proposal}
            processing={processing}
            onSimulatePayment={() => run({ type: "SIMULATE_PAYMENT" })}
            onCancelSession={() => run({ type: "CANCEL_SESSION" })}
            onRecordDecision={(decision) => run({ type: "RECORD_PROPOSAL_DECISION", decision })}
            onPrepareRevision={() => run({ type: "PREPARE_REVISED_PROPOSAL" })}
            onApproveRevisedProposal={() => run({ type: "APPROVE_PROPOSAL" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_DELIVERY" })}
          />
        </div>
      )}

      {state.stage === "delivery" && state.request && (
        <div className={tabPanelClass}>
          <DeliveryPanel
            request={state.request}
            session={state.session}
            attendance={state.attendance}
            kickoff={state.kickoff}
            processing={processing}
            onCancelSession={() => run({ type: "CANCEL_SESSION" })}
            onCheckedIn={() => dispatch({ type: "MARK_CHECKED_IN" })}
            onMarkAttendance={(status) => run({ type: "MARK_ATTENDANCE", status })}
            onRequestKickoff={(dateId, dateLabel) => run({ type: "REQUEST_KICKOFF_DATE", dateId, dateLabel })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_FOLLOWUP" })}
          />
        </div>
      )}

      {state.stage === "followup" && (
        <div className={tabPanelClass}>
          <FollowupPanel
            touchesSent={state.followUpTouchesSent}
            outcome={state.followUpOutcome}
            processing={processing}
            onPreviewNextTouch={() => dispatch({ type: "PREVIEW_NEXT_TOUCH" })}
            onRecordOutcome={(outcome) => run({ type: "RECORD_FOLLOWUP_OUTCOME", outcome })}
            onClose={() => dispatch({ type: "CLOSE_REQUEST" })}
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AutomationPanel events={state.events} />
        {state.firmViewOpen && (
          <FirmView
            request={state.request}
            consultant={state.consultant}
            stage={state.stage}
            session={state.session}
            payment={state.payment}
            attendance={state.attendance}
            proposal={state.proposal}
            kickoff={state.kickoff}
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

      <ServiceDetailsDialog
        service={selectedService}
        onClose={() => setSelectedServiceId(null)}
        onArrangeSession={(id) => startJourney("session", id as ServiceId)}
      />
    </div>
  );
}
