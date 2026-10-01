"use client";

import { useState } from "react";
import { clinicViewToggleLabels, conversionPrompt, demoStrings, previewModeBanner } from "@/content/clinics-demo";
import { allCategoryOptions, type ServiceCategoryId } from "@/content/clinics-services";
import { Button, ButtonEl } from "@/components/ui/Button";
import { AssignmentPanel } from "./AssignmentPanel";
import { AttendancePanel } from "./AttendancePanel";
import { AutomationPanel } from "./AutomationPanel";
import { ClinicView } from "./ClinicView";
import { ConfirmPanel } from "./ConfirmPanel";
import { FollowupPanel } from "./FollowupPanel";
import { RemindersPanel } from "./RemindersPanel";
import { RequestForm, type RequestFormValues } from "./RequestForm";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceExplorer } from "./ServiceExplorer";
import { StageProgress } from "./StageProgress";
import { useClinicsDemoSession } from "./session";

const tabPanelClass = "mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8";

export function ClinicsDemo() {
  const { state, processing, dispatch, run } = useClinicsDemoSession();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = selectedServiceId ? allCategoryOptions.find((s) => s.id === selectedServiceId) ?? null : null;

  function startJourney(categoryId?: string) {
    setSelectedServiceId(null);
    dispatch({ type: "START_JOURNEY", prefill: categoryId ? { categoryId: categoryId as ServiceCategoryId } : null });
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
        <ButtonEl variant="secondary-on-dark" size="sm" onClick={() => dispatch({ type: "TOGGLE_CLINIC_VIEW" })}>
          {state.clinicViewOpen ? clinicViewToggleLabels.close : clinicViewToggleLabels.open}
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
          <ServiceExplorer onViewDetails={setSelectedServiceId} onRequestAppointment={(id) => startJourney(id)} />
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
            categoryPending={state.categoryPending}
            receptionOwner={state.receptionOwner}
            provider={state.provider}
            tasks={state.tasks}
            onAdjust={() => dispatch({ type: "ADJUST_REQUEST" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_CONFIRM" })}
          />
        </div>
      )}

      {state.stage === "confirm" && state.request && (
        <div className={tabPanelClass}>
          <ConfirmPanel
            categoryId={state.request.categoryId}
            providerName={state.provider?.name ?? null}
            appointment={state.appointment}
            processing={processing}
            onRequest={(slotId, slotLabel) => run({ type: "REQUEST_APPOINTMENT", slotId, slotLabel })}
            onConfirm={() => run({ type: "CONFIRM_APPOINTMENT" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_REMINDERS" })}
          />
        </div>
      )}

      {state.stage === "reminders" && state.appointment && (
        <div className={tabPanelClass}>
          <RemindersPanel
            appointment={state.appointment}
            remindersValid={state.remindersValid}
            attendanceIntentConfirmed={state.attendanceIntentConfirmed}
            questionAsked={state.questionAsked}
            processing={processing}
            onConfirmAttendanceIntent={() => dispatch({ type: "PATIENT_CONFIRM_ATTENDANCE_INTENT" })}
            onReschedule={(slotId, slotLabel) => dispatch({ type: "RESCHEDULE_APPOINTMENT", slotId, slotLabel })}
            onConfirm={() => run({ type: "CONFIRM_APPOINTMENT" })}
            onCancel={() => run({ type: "CANCEL_APPOINTMENT" })}
            onAskQuestion={(question) => dispatch({ type: "ASK_BOOKING_QUESTION", question })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_ATTENDANCE" })}
          />
        </div>
      )}

      {state.stage === "attendance" && state.appointment && (
        <div className={tabPanelClass}>
          <AttendancePanel
            appointment={state.appointment}
            attendance={state.attendance}
            waitlistOffer={state.waitlistOffer}
            processing={processing}
            onCheckedIn={() => dispatch({ type: "MARK_CHECKED_IN" })}
            onMarkAttendance={(status) => run({ type: "MARK_ATTENDANCE", status })}
            onRespondWaitlist={(response) => dispatch({ type: "RESPOND_WAITLIST_OFFER", response })}
            onExpireWaitlist={() => dispatch({ type: "EXPIRE_WAITLIST_OFFER" })}
            onContinue={() => dispatch({ type: "CONTINUE_TO_FOLLOWUP" })}
            onClose={() => dispatch({ type: "CLOSE_REQUEST" })}
          />
        </div>
      )}

      {state.stage === "followup" && state.followUp && (
        <div className={tabPanelClass}>
          <FollowupPanel followUp={state.followUp} closed={state.closed} onClose={() => dispatch({ type: "CLOSE_REQUEST" })} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AutomationPanel
          events={state.events}
          tasks={state.tasks}
          simulatedDay={state.simulatedDay}
          closed={state.closed}
          onPreviewReminder={() => dispatch({ type: "PREVIEW_REMINDER" })}
        />
        {state.clinicViewOpen && (
          <ClinicView
            request={state.request}
            receptionOwner={state.receptionOwner}
            provider={state.provider}
            stage={state.stage}
            appointment={state.appointment}
            attendance={state.attendance}
            waitlistOffer={state.waitlistOffer}
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

      <ServiceDetailsDialog service={selectedService} onClose={() => setSelectedServiceId(null)} onRequestAppointment={(id) => startJourney(id)} />
    </div>
  );
}
