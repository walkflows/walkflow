"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { demoStrings } from "@/content/home-services-demo";
import type { Crew } from "@/content/home-services-roofing";
import {
  assignCrew,
  buildEstimate,
  checkServiceArea,
  nextStepForInspectionOutcome,
  reviseEstimate,
  type EstimateScenario,
  type InspectionOutcome,
  type Requirements,
} from "./engine";

/**
 * Client-only session state for the Home Services (roofing) journey.
 * Architecture mirrors src/components/demo/real-estate/session.ts (same
 * reducer + delayed-dispatch hook pattern) but is a wholly separate module
 * with its own state shape and rules, per explicit instruction to keep the
 * two demos' data and business rules separate while reusing the pattern.
 * "Session isolation" is simply that this is per-tab React state.
 */

export type Stage = "browse" | "request" | "assignment" | "inspection" | "estimate" | "job" | "completion";

export type ActivityEvent = { id: string; label: string; simulatedDay: number };
export type MessagePreview = { id: string; label: string; to: string; subject: string; body: string; simulatedDay: number };
export type Task = { id: string; label: string; detail: string; dueLabel: string };

export type RequestRecord = Requirements & { id: string; name: string; email: string; phone: string };

export type InspectionStatus = "requested" | "confirmed" | "cancelled" | "completed" | "missed";
export type InspectionRecord = { id: string; slotId: string; slotLabel: string; status: InspectionStatus };

export type EstimateStatus = "pending-approval" | "awaiting-customer" | "accepted" | "changes-requested" | "declined";
export type EstimateRecord = { scenario: EstimateScenario; status: EstimateStatus; revised: boolean };

export type JobStatus = "awaiting-scheduling" | "scheduled" | "in-progress" | "delayed" | "cancelled" | "completed";
export type JobRecord = { id: string; crewId: string; dateId: string; dateLabel: string; status: JobStatus };

export type InvoiceStatus = "unpaid" | "paid";
export type InvoiceRecord = { amount: number; currency: "USD"; status: InvoiceStatus };

export type DemoState = {
  stage: Stage;
  request: RequestRecord | null;
  crew: Crew | null;
  areaCovered: boolean | null;
  urgentFlagged: boolean;
  inspection: InspectionRecord | null;
  estimate: EstimateRecord | null;
  job: JobRecord | null;
  invoice: InvoiceRecord | null;
  tasks: Task[];
  events: ActivityEvent[];
  messages: MessagePreview[];
  simulatedDay: number;
  businessViewOpen: boolean;
  closed: boolean;
  prefill: Partial<RequestRecord> | null;
};

export const initialDemoState: DemoState = {
  stage: "browse",
  request: null,
  crew: null,
  areaCovered: null,
  urgentFlagged: false,
  inspection: null,
  estimate: null,
  job: null,
  invoice: null,
  tasks: [],
  events: [],
  messages: [],
  simulatedDay: 0,
  businessViewOpen: false,
  closed: false,
  prefill: null,
};

export type Action =
  | { type: "START_JOURNEY"; prefill: Partial<RequestRecord> | null }
  | { type: "SUBMIT_REQUEST"; values: Requirements & { name: string; email: string; phone: string } }
  | { type: "ADJUST_REQUEST" }
  | { type: "CONTINUE_TO_INSPECTION" }
  | { type: "REQUEST_INSPECTION"; slotId: string; slotLabel: string }
  | { type: "CONFIRM_INSPECTION" }
  | { type: "CANCEL_INSPECTION" }
  | { type: "RESCHEDULE_INSPECTION"; slotId: string; slotLabel: string }
  | { type: "MARK_INSPECTION_OUTCOME"; outcome: "completed" | "missed" | "cancelled" }
  | { type: "BACK_TO_INSPECTION" }
  | { type: "APPROVE_ESTIMATE" }
  | { type: "RECORD_ESTIMATE_DECISION"; decision: "accepted" | "declined" | "changes-requested" }
  | { type: "PREPARE_REVISED_ESTIMATE" }
  | { type: "CONTINUE_TO_JOB" }
  | { type: "REQUEST_JOB_DATE"; dateId: string; dateLabel: string }
  | { type: "START_JOB" }
  | { type: "MARK_JOB_DELAYED" }
  | { type: "RESCHEDULE_JOB"; dateId: string; dateLabel: string }
  | { type: "CANCEL_JOB" }
  | { type: "COMPLETE_JOB" }
  | { type: "SIMULATE_PAYMENT" }
  | { type: "PREVIEW_NEXT_DAY" }
  | { type: "TOGGLE_BUSINESS_VIEW" }
  | { type: "CLOSE_REQUEST" }
  | { type: "RESTART" };

function withEvents(state: DemoState, ...labels: string[]): ActivityEvent[] {
  const day = state.simulatedDay;
  return [...state.events, ...labels.map((label) => ({ id: crypto.randomUUID(), label, simulatedDay: day }))];
}

function withMessage(state: DemoState, subject: string, body: string): MessagePreview[] {
  return [
    ...state.messages,
    {
      id: crypto.randomUUID(),
      label: demoStrings.sampleMessageLabel,
      to: state.request?.email ?? "",
      subject,
      body,
      simulatedDay: state.simulatedDay,
    },
  ];
}

export function demoReducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "START_JOURNEY": {
      if (state.stage !== "browse") return state;
      return { ...state, stage: "request", prefill: action.prefill };
    }

    case "SUBMIT_REQUEST": {
      if (state.stage !== "request") return state;
      const { name, email, phone, ...requirements } = action.values;
      const request: RequestRecord = { id: crypto.randomUUID(), name, email, phone, ...requirements };
      const captured: DemoState = {
        ...state,
        stage: "assignment",
        request,
        events: withEvents(state, `Request captured (request #${request.id.slice(0, 8)})`),
        messages: withMessage(
          state,
          "We've received your request",
          "Thanks for reaching out — your request has been logged and a coordinator will review it shortly.",
        ),
      };
      // Stage 2 ("review and assign") happens in the same round trip as
      // capture, per the brief — not a separate visitor-facing step the
      // way Real Estate splits matching and assignment into two stages.
      return reviewAndAssign(captured);
    }

    case "ADJUST_REQUEST": {
      if (state.stage !== "assignment") return state;
      return { ...state, stage: "request", prefill: state.request };
    }

    case "CONTINUE_TO_INSPECTION": {
      if (state.stage !== "assignment" || !state.areaCovered) return state;
      return { ...state, stage: "inspection" };
    }

    case "REQUEST_INSPECTION": {
      if (state.stage !== "inspection" || state.inspection) return state;
      return {
        ...state,
        inspection: { id: crypto.randomUUID(), slotId: action.slotId, slotLabel: action.slotLabel, status: "requested" },
        events: withEvents(state, `Inspection request recorded — ${action.slotLabel}`),
      };
    }

    case "CONFIRM_INSPECTION": {
      if (!state.inspection || state.inspection.status !== "requested") return state;
      return {
        ...state,
        inspection: { ...state.inspection, status: "confirmed" },
        events: withEvents(state, "Demo inspection confirmed by coordinator"),
        messages: withMessage(
          state,
          "Your inspection is confirmed",
          `Your sample inspection is confirmed for ${state.inspection.slotLabel}. This is a demo confirmation — no real appointment has been booked.`,
        ),
      };
    }

    case "CANCEL_INSPECTION": {
      if (!state.inspection || (state.inspection.status !== "requested" && state.inspection.status !== "confirmed")) return state;
      if (state.inspection.status === "requested") {
        return { ...state, inspection: null, events: withEvents(state, "Inspection request cancelled before confirmation") };
      }
      return { ...state, inspection: { ...state.inspection, status: "cancelled" }, events: withEvents(state, "Confirmed inspection cancelled") };
    }

    case "RESCHEDULE_INSPECTION": {
      if (!state.inspection) return state;
      return {
        ...state,
        inspection: { ...state.inspection, slotId: action.slotId, slotLabel: action.slotLabel, status: "requested" },
        events: withEvents(state, `Inspection rescheduled to ${action.slotLabel}`),
      };
    }

    case "MARK_INSPECTION_OUTCOME": {
      if (!state.inspection || state.inspection.status !== "confirmed") return state;
      if (action.outcome === "completed") {
        if (!state.request) return state;
        const scenario = buildEstimate(state.request.serviceId);
        const task: Task = {
          id: crypto.randomUUID(),
          label: "Approve the prepared estimate",
          detail: "An estimate has been drafted from the inspection and needs staff approval before the customer sees it.",
          dueLabel: "Due today (simulated)",
        };
        return {
          ...state,
          stage: "estimate",
          inspection: { ...state.inspection, status: "completed" },
          estimate: { scenario, status: "pending-approval", revised: false },
          tasks: [...state.tasks, task],
          events: withEvents(state, "Inspection marked as completed (simulated)", "Estimate prepared — awaiting staff approval"),
        };
      }
      const step = nextStepForInspectionOutcome(action.outcome);
      const task: Task = { id: crypto.randomUUID(), label: step.taskLabel, detail: step.taskDetail, dueLabel: "Next business day (simulated)" };
      return {
        ...state,
        inspection: { ...state.inspection, status: action.outcome },
        tasks: [...state.tasks, task],
        events: withEvents(state, `Inspection marked as ${action.outcome} (simulated)`, `Next action updated — ${step.taskLabel}`),
        messages: withMessage(state, step.messageSubject, step.messageBody),
      };
    }

    case "BACK_TO_INSPECTION": {
      return { ...state, stage: "inspection", inspection: null, events: withEvents(state, "Returned to inspection options") };
    }

    case "APPROVE_ESTIMATE": {
      if (!state.estimate || state.estimate.status !== "pending-approval") return state;
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Awaiting customer decision on estimate",
        detail: "The approved estimate has been shared with the customer — awaiting accept, decline or change request.",
        dueLabel: "Follow up in 2 business days (simulated)",
      };
      return {
        ...state,
        estimate: { ...state.estimate, status: "awaiting-customer" },
        tasks: [...state.tasks, task],
        events: withEvents(state, "Estimate approved by staff — shared with customer"),
      };
    }

    case "RECORD_ESTIMATE_DECISION": {
      if (!state.estimate || state.estimate.status !== "awaiting-customer") return state;
      if (action.decision === "accepted") {
        if (!state.request || !state.crew) return state;
        const job: JobRecord = { id: crypto.randomUUID(), crewId: state.crew.id, dateId: "", dateLabel: "", status: "awaiting-scheduling" };
        return {
          ...state,
          stage: "job",
          estimate: { ...state.estimate, status: "accepted" },
          job,
          events: withEvents(state, "Estimate accepted by customer", `Job created — awaiting scheduling with ${state.crew.name}`),
        };
      }
      if (action.decision === "declined") {
        return {
          ...state,
          estimate: { ...state.estimate, status: "declined" },
          closed: true,
          events: withEvents(state, "Estimate declined by customer — request closed"),
        };
      }
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Prepare a revised estimate",
        detail: "The customer requested changes to the estimate. A revised version needs to be prepared and re-approved.",
        dueLabel: "Due today (simulated)",
      };
      return {
        ...state,
        estimate: { ...state.estimate, status: "changes-requested" },
        tasks: [...state.tasks, task],
        events: withEvents(state, "Customer requested changes to the estimate"),
      };
    }

    case "PREPARE_REVISED_ESTIMATE": {
      if (!state.estimate || state.estimate.status !== "changes-requested" || !state.request) return state;
      const scenario = reviseEstimate(state.request.serviceId);
      return {
        ...state,
        estimate: { scenario, status: "pending-approval", revised: true },
        events: withEvents(state, "Revised estimate prepared — awaiting staff approval"),
      };
    }

    case "REQUEST_JOB_DATE": {
      if (!state.job || state.job.status !== "awaiting-scheduling") return state;
      return {
        ...state,
        job: { ...state.job, dateId: action.dateId, dateLabel: action.dateLabel, status: "scheduled" },
        events: withEvents(state, `Job date set — ${action.dateLabel}`),
        messages: withMessage(state, "Your job is scheduled", `Your roofing job is scheduled for ${action.dateLabel}. This is a demo schedule — no real job has been booked.`),
      };
    }

    case "START_JOB": {
      if (!state.job || state.job.status !== "scheduled") return state;
      return { ...state, job: { ...state.job, status: "in-progress" }, events: withEvents(state, "Job marked as in progress (simulated)") };
    }

    case "MARK_JOB_DELAYED": {
      if (!state.job || state.job.status !== "in-progress") return state;
      return {
        ...state,
        job: { ...state.job, status: "delayed" },
        events: withEvents(state, "Job marked as delayed (simulated)"),
        messages: withMessage(state, "Your job has been delayed", "We've had to push back your job date slightly — a new date will follow shortly."),
      };
    }

    case "RESCHEDULE_JOB": {
      if (!state.job || state.job.status !== "delayed") return state;
      return {
        ...state,
        job: { ...state.job, dateId: action.dateId, dateLabel: action.dateLabel, status: "scheduled" },
        events: withEvents(state, `Job rescheduled to ${action.dateLabel}`),
        messages: withMessage(state, "Your job has a new date", `Your roofing job is now scheduled for ${action.dateLabel}.`),
      };
    }

    case "CANCEL_JOB": {
      if (!state.job || state.job.status === "completed" || state.job.status === "cancelled") return state;
      return { ...state, job: { ...state.job, status: "cancelled" }, closed: true, events: withEvents(state, "Job cancelled — request closed") };
    }

    case "COMPLETE_JOB": {
      if (!state.job || state.job.status !== "in-progress" || !state.estimate) return state;
      const invoice: InvoiceRecord = { amount: state.estimate.scenario.amount, currency: "USD", status: "unpaid" };
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Offer a maintenance follow-up",
        detail: "The job is complete. A coordinator would offer a future maintenance or inspection check-in.",
        dueLabel: "In 6 months (simulated)",
      };
      return {
        ...state,
        stage: "completion",
        job: { ...state.job, status: "completed" },
        invoice,
        tasks: [...state.tasks, task],
        events: withEvents(state, "Job marked as completed (simulated)", "Completion summary prepared", "Invoice preview generated"),
        messages: [
          ...withMessage(
            state,
            "Your invoice preview",
            `Here is a preview of your invoice for $${invoice.amount.toLocaleString("en-US")}. This is a demo invoice — no real invoice has been issued.`,
          ),
          {
            id: crypto.randomUUID(),
            label: demoStrings.sampleMessageLabel,
            to: state.request?.email ?? "",
            subject: "How did we do?",
            body: "We'd love your feedback on the job — a short review request would normally go out here.",
            simulatedDay: state.simulatedDay,
          },
        ],
      };
    }

    case "SIMULATE_PAYMENT": {
      if (!state.invoice || state.invoice.status !== "unpaid") return state;
      return { ...state, invoice: { ...state.invoice, status: "paid" }, events: withEvents(state, "Payment marked as received (simulated)") };
    }

    case "PREVIEW_NEXT_DAY": {
      if (state.closed || state.tasks.length === 0) return state;
      const day = state.simulatedDay + 1;
      const openTask = state.tasks[state.tasks.length - 1];
      const reminderLabel =
        state.invoice?.status === "unpaid" ? `Day ${day} (simulated): payment reminder sent for the open invoice` : `Day ${day} (simulated): automated reminder sent for "${openTask.label}"`;
      return {
        ...state,
        simulatedDay: day,
        events: [...state.events, { id: crypto.randomUUID(), label: reminderLabel, simulatedDay: day }],
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            label: demoStrings.sampleReminderLabel,
            to: state.request?.email ?? "",
            subject: state.invoice?.status === "unpaid" ? "Reminder: invoice outstanding" : `Reminder: ${openTask.label}`,
            body:
              state.invoice?.status === "unpaid"
                ? `This is a simulated Day ${day} reminder that the invoice preview is still unpaid.`
                : `This is a simulated Day ${day} reminder for the open task "${openTask.label}".`,
            simulatedDay: day,
          },
        ],
      };
    }

    case "TOGGLE_BUSINESS_VIEW":
      return { ...state, businessViewOpen: !state.businessViewOpen };

    case "CLOSE_REQUEST": {
      if (state.closed) return state;
      return { ...state, closed: true, events: withEvents(state, "Request closed — pending follow-ups stopped") };
    }

    case "RESTART":
      return { ...initialDemoState };

    default:
      return state;
  }
}

/**
 * This is called the moment a request is submitted (area check + crew
 * assignment both happen as part of Stage 2's "review and assign," per
 * the brief, rather than as two separate stages the way Real Estate split
 * matching and assignment). Kept out of the reducer switch above because
 * it needs to run synchronously right after SUBMIT_REQUEST produces the
 * new state, using data the reducer doesn't otherwise look up itself.
 */
export function reviewAndAssign(state: DemoState): DemoState {
  if (state.stage !== "assignment" || !state.request || state.crew) return state;
  const covered = checkServiceArea(state.request.location);
  if (!covered) {
    const task: Task = {
      id: crypto.randomUUID(),
      label: "Review out-of-area request manually",
      detail: `${state.request.location} is outside the sample service area — a coordinator would review this request manually before committing to it.`,
      dueLabel: "Due today (simulated)",
    };
    return {
      ...state,
      areaCovered: false,
      tasks: [...state.tasks, task],
      events: withEvents(state, "Service area checked — outside sample service area"),
    };
  }
  const crew = assignCrew(state.request.serviceId, state.request.location);
  const urgent = state.request.urgency === "urgent";
  const tasks: Task[] = [
    ...state.tasks,
    {
      id: crypto.randomUUID(),
      label: "Review request and confirm inspection details",
      detail: `Assigned to ${crew.name} (${crew.leadName}) for a ${state.request.propertyKind} ${state.request.serviceId.replace(/-/g, " ")} request in ${state.request.location}.`,
      dueLabel: "Due today (simulated)",
    },
  ];
  if (urgent) {
    tasks.push({
      id: crypto.randomUUID(),
      label: "Flagged for urgent review",
      detail: "The customer marked this request as urgent — a coordinator should review it ahead of routine requests.",
      dueLabel: "Immediate (simulated)",
    });
  }
  const labels = ["Service area checked — within sample service area", `Crew assigned — ${crew.name}`, "Inspection task created"];
  if (urgent) labels.push("Flagged for urgent staff review");
  return { ...state, areaCovered: true, crew, tasks, events: withEvents(state, ...labels) };
}

/**
 * Wraps the reducer with a brief, cancellable "processing" delay for
 * business-meaningful actions, mirroring the Real Estate demo's session
 * hook (src/components/demo/real-estate/session.ts).
 */
export function useHomeServicesDemoSession() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const [processing, setProcessing] = useState(false);
  const reduceMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function run(action: Action) {
    setProcessing(true);
    timeoutRef.current = setTimeout(
      () => {
        dispatch(action);
        setProcessing(false);
      },
      reduceMotion ? 0 : 500,
    );
  }

  return { state, processing, dispatch, run };
}
