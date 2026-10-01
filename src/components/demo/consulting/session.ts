"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { demoStrings } from "@/content/consulting-demo";
import { customProjectProposal, followUpSequence, serviceById, type Consultant } from "@/content/consulting-services";
import { assignConsultant, type Requirements } from "./engine";

/**
 * Client-only session state for the Consulting journey. Architecture
 * mirrors the Real Estate, Home Services and Clinics demos' session.ts
 * (same reducer + delayed-dispatch hook pattern) but is a wholly separate
 * module with its own state shape and rules — including the two-path
 * branch (a standard paid session vs a larger scoped project) that none
 * of the other three demos need.
 */

export type Stage = "browse" | "request" | "assignment" | "scope" | "confirm" | "delivery" | "followup";

export type ActivityEvent = { id: string; label: string; simulatedDay: number };
export type MessagePreview = { id: string; label: string; to: string; subject: string; body: string; simulatedDay: number };
export type Task = { id: string; label: string; detail: string; dueLabel: string };

export type RequestRecord = Requirements & { id: string; name: string; email: string };

export type SessionStatus = "requested" | "confirmed" | "cancelled";
export type SessionRecord = { id: string; slotId: string; slotLabel: string; status: SessionStatus };

export type PaymentStatus = "unpaid" | "paid";
export type PaymentRecord = { amount: number; currency: "USD"; status: PaymentStatus };

export type AttendanceStatus = "checked-in" | "attended" | "missed";

export type ProposalStatus = "pending-approval" | "awaiting-client" | "accepted" | "declined" | "changes-requested";
export type ProposalRecord = {
  scopeOfWork: string;
  deliverables: string;
  feeRange: string;
  notes: string;
  status: ProposalStatus;
  revised: boolean;
};

export type KickoffStatus = "awaiting-scheduling" | "scheduled";
export type KickoffRecord = { dateId: string; dateLabel: string; status: KickoffStatus };

export type FollowUpOutcome = "accepted" | "declined" | "cancelled" | "opted-out" | null;

export type DemoState = {
  stage: Stage;
  request: RequestRecord | null;
  consultant: Consultant | null;
  session: SessionRecord | null;
  payment: PaymentRecord | null;
  attendance: AttendanceStatus | null;
  proposal: ProposalRecord | null;
  kickoff: KickoffRecord | null;
  followUpTouchesSent: number;
  followUpOutcome: FollowUpOutcome;
  tasks: Task[];
  events: ActivityEvent[];
  messages: MessagePreview[];
  simulatedDay: number;
  firmViewOpen: boolean;
  closed: boolean;
  prefill: Partial<RequestRecord> | null;
};

export const initialDemoState: DemoState = {
  stage: "browse",
  request: null,
  consultant: null,
  session: null,
  payment: null,
  attendance: null,
  proposal: null,
  kickoff: null,
  followUpTouchesSent: 0,
  followUpOutcome: null,
  tasks: [],
  events: [],
  messages: [],
  simulatedDay: 0,
  firmViewOpen: false,
  closed: false,
  prefill: null,
};

export type Action =
  | { type: "START_JOURNEY"; prefill: Partial<RequestRecord> | null }
  | { type: "SUBMIT_REQUEST"; values: Requirements & { name: string; email: string } }
  | { type: "ADJUST_REQUEST" }
  | { type: "CONTINUE_TO_SCOPE" }
  | { type: "REQUEST_SESSION"; slotId: string; slotLabel: string }
  | { type: "SIMULATE_PAYMENT" }
  | { type: "CLIENT_CONFIRM_ATTENDANCE_INTENT" }
  | { type: "RESCHEDULE_SESSION"; slotId: string; slotLabel: string }
  | { type: "CANCEL_SESSION" }
  | { type: "MARK_CHECKED_IN" }
  | { type: "MARK_ATTENDANCE"; status: "attended" | "missed" }
  | { type: "APPROVE_PROPOSAL" }
  | { type: "RECORD_PROPOSAL_DECISION"; decision: "accepted" | "declined" | "changes-requested" }
  | { type: "PREPARE_REVISED_PROPOSAL" }
  | { type: "REQUEST_KICKOFF_DATE"; dateId: string; dateLabel: string }
  | { type: "CONTINUE_TO_CONFIRM" }
  | { type: "CONTINUE_TO_DELIVERY" }
  | { type: "CONTINUE_TO_FOLLOWUP" }
  | { type: "PREVIEW_NEXT_TOUCH" }
  | { type: "RECORD_FOLLOWUP_OUTCOME"; outcome: "accepted" | "declined" | "cancelled" }
  | { type: "CLOSE_REQUEST" }
  | { type: "TOGGLE_FIRM_VIEW" }
  | { type: "RESTART" };

function withEvents(state: DemoState, ...labels: string[]): ActivityEvent[] {
  const day = state.simulatedDay;
  return [...state.events, ...labels.map((label) => ({ id: crypto.randomUUID(), label, simulatedDay: day }))];
}

function withMessage(state: DemoState, subject: string, body: string): MessagePreview[] {
  return [
    ...state.messages,
    { id: crypto.randomUUID(), label: demoStrings.sampleMessageLabel, to: state.request?.email ?? "", subject, body, simulatedDay: state.simulatedDay },
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
      const { name, email, ...requirements } = action.values;
      const request: RequestRecord = { id: crypto.randomUUID(), name, email, ...requirements };
      const consultant = assignConsultant(requirements.path, requirements.serviceId);
      const task: Task = {
        id: crypto.randomUUID(),
        label: requirements.path === "session" ? "Confirm session details with client" : "Review project enquiry and scope",
        detail: `Assigned to ${consultant.name} (${consultant.title}).`,
        dueLabel: "Due today (simulated)",
      };
      return {
        ...state,
        stage: "assignment",
        request,
        consultant,
        tasks: [...state.tasks, task],
        events: withEvents(state, `Enquiry recorded (request #${request.id.slice(0, 8)})`, `Consultant assigned — ${consultant.name}`),
        messages: withMessage(
          state,
          "We've received your enquiry",
          "Thanks for reaching out — your enquiry has been logged and a consultant will be in touch shortly. This is an acknowledgement only, not a confirmed booking.",
        ),
      };
    }

    case "ADJUST_REQUEST": {
      if (state.stage !== "assignment") return state;
      return { ...state, stage: "request", prefill: state.request };
    }

    case "CONTINUE_TO_SCOPE": {
      if (state.stage !== "assignment" || !state.request) return state;
      if (state.request.path === "project") {
        const proposal: ProposalRecord = {
          scopeOfWork: customProjectProposal.scopeOfWork,
          deliverables: customProjectProposal.deliverables,
          feeRange: customProjectProposal.sampleFeeRange,
          notes: customProjectProposal.notes,
          status: "pending-approval",
          revised: false,
        };
        const task: Task = {
          id: crypto.randomUUID(),
          label: "Approve the prepared proposal",
          detail: "A sample proposal has been drafted and needs internal approval before the client sees it.",
          dueLabel: "Due today (simulated)",
        };
        return { ...state, stage: "scope", proposal, tasks: [...state.tasks, task], events: withEvents(state, "Proposal drafted — awaiting firm approval") };
      }
      return { ...state, stage: "scope" };
    }

    // ---- Session path ------------------------------------------------

    case "REQUEST_SESSION": {
      if (state.stage !== "scope" || state.session || state.request?.path !== "session") return state;
      return {
        ...state,
        session: { id: crypto.randomUUID(), slotId: action.slotId, slotLabel: action.slotLabel, status: "requested" },
        payment: state.request.serviceId ? { amount: serviceById(state.request.serviceId).price, currency: "USD", status: "unpaid" } : null,
        events: withEvents(state, `Session requested — ${action.slotLabel}`),
      };
    }

    case "SIMULATE_PAYMENT": {
      if (!state.session || state.session.status !== "requested" || !state.payment || state.payment.status !== "unpaid") return state;
      return {
        ...state,
        session: { ...state.session, status: "confirmed" },
        payment: { ...state.payment, status: "paid" },
        events: withEvents(state, "Sample payment received (simulated)", "Demo session confirmed"),
        messages: withMessage(
          state,
          "Your session is confirmed",
          `Your sample session is confirmed for ${state.session.slotLabel}. This is a demo confirmation — no real payment has been processed.`,
        ),
      };
    }

    case "CLIENT_CONFIRM_ATTENDANCE_INTENT": {
      if (!state.session || state.session.status !== "confirmed") return state;
      return { ...state, events: withEvents(state, "Client confirmed intent to attend") };
    }

    case "RESCHEDULE_SESSION": {
      if (!state.session || state.session.status !== "confirmed") return state;
      return {
        ...state,
        session: { ...state.session, slotId: action.slotId, slotLabel: action.slotLabel },
        events: withEvents(state, `Session rescheduled to ${action.slotLabel}`),
      };
    }

    case "CANCEL_SESSION": {
      if (!state.session || state.session.status === "cancelled") return state;
      return {
        ...state,
        stage: "followup",
        session: { ...state.session, status: "cancelled" },
        followUpOutcome: "cancelled",
        closed: true,
        events: withEvents(state, "Session cancelled — follow-up sequence stopped"),
      };
    }

    case "MARK_CHECKED_IN": {
      if (state.attendance || !state.session || state.session.status !== "confirmed") return state;
      return { ...state, attendance: "checked-in", events: withEvents(state, "Client checked in (simulated)") };
    }

    case "MARK_ATTENDANCE": {
      if (!state.session || state.session.status !== "confirmed") return state;
      if (state.attendance === "attended" || state.attendance === "missed") return state;
      if (action.status === "attended" && state.attendance !== "checked-in") return state;

      if (action.status === "missed") {
        const task: Task = {
          id: crypto.randomUUID(),
          label: "Follow up on missed paid session",
          detail: "The client missed their paid session. The consultant would follow up to offer a reschedule or discuss a refund.",
          dueLabel: "Next business day (simulated)",
        };
        return {
          ...state,
          attendance: "missed",
          tasks: [...state.tasks, task],
          events: withEvents(state, "Session marked as missed (simulated)"),
          messages: withMessage(state, "Sorry we missed you", "We noticed you weren't able to make your session — happy to help arrange another time."),
        };
      }

      const task: Task = {
        id: crypto.randomUUID(),
        label: "Send written session summary",
        detail: "A written summary of priorities and next steps is due within two business days of the session (sample commitment).",
        dueLabel: "Within 2 business days (simulated)",
      };
      return {
        ...state,
        attendance: "attended",
        tasks: [...state.tasks, task],
        events: withEvents(state, "Session marked as attended (simulated)", "Written summary task created"),
        messages: withMessage(
          state,
          "Your session summary",
          "Thanks for joining — your written summary of priorities and next steps is being prepared and will follow shortly.",
        ),
      };
    }

    // ---- Project path --------------------------------------------------

    case "APPROVE_PROPOSAL": {
      if (!state.proposal || state.proposal.status !== "pending-approval") return state;
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Awaiting client decision on proposal",
        detail: "The approved proposal has been shared with the client — awaiting accept, decline or change request.",
        dueLabel: "Follow up in 3 business days (simulated)",
      };
      return {
        ...state,
        proposal: { ...state.proposal, status: "awaiting-client" },
        tasks: [...state.tasks, task],
        events: withEvents(state, "Proposal approved by firm — shared with client"),
        messages: withMessage(
          state,
          "Your proposal is ready",
          `Scope: ${state.proposal.scopeOfWork} Sample fee range: ${state.proposal.feeRange}.`,
        ),
      };
    }

    case "RECORD_PROPOSAL_DECISION": {
      if (!state.proposal || state.proposal.status !== "awaiting-client") return state;
      if (action.decision === "accepted") {
        if (!state.consultant) return state;
        const kickoff: KickoffRecord = { dateId: "", dateLabel: "", status: "awaiting-scheduling" };
        return {
          ...state,
          stage: "delivery",
          proposal: { ...state.proposal, status: "accepted" },
          kickoff,
          events: withEvents(state, "Proposal accepted by client", `Project created — awaiting kickoff scheduling with ${state.consultant.name}`),
        };
      }
      if (action.decision === "declined") {
        return {
          ...state,
          stage: "followup",
          proposal: { ...state.proposal, status: "declined" },
          followUpOutcome: "declined",
          closed: true,
          events: withEvents(state, "Proposal declined by client — follow-up sequence stopped"),
        };
      }
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Prepare a revised proposal",
        detail: "The client requested changes to the proposal. A revised version needs to be prepared and re-approved.",
        dueLabel: "Due today (simulated)",
      };
      return {
        ...state,
        proposal: { ...state.proposal, status: "changes-requested" },
        tasks: [...state.tasks, task],
        events: withEvents(state, "Client requested changes to the proposal"),
      };
    }

    case "PREPARE_REVISED_PROPOSAL": {
      if (!state.proposal || state.proposal.status !== "changes-requested") return state;
      return {
        ...state,
        proposal: { ...state.proposal, status: "pending-approval", revised: true, notes: `Revised per client request. ${customProjectProposal.notes}` },
        events: withEvents(state, "Revised proposal prepared — awaiting firm approval"),
      };
    }

    case "REQUEST_KICKOFF_DATE": {
      if (!state.kickoff || state.kickoff.status !== "awaiting-scheduling") return state;
      return {
        ...state,
        kickoff: { dateId: action.dateId, dateLabel: action.dateLabel, status: "scheduled" },
        events: withEvents(state, `Kickoff date set — ${action.dateLabel}`),
        messages: withMessage(state, "Your kickoff is scheduled", `Your project kickoff is scheduled for ${action.dateLabel}. This is a demo schedule — no real engagement has been booked.`),
      };
    }

    // ---- Shared ---------------------------------------------------------

    case "CONTINUE_TO_CONFIRM": {
      if (state.stage !== "scope" || !state.request) return state;
      if (state.request.path === "session" && (!state.session || state.session.status !== "requested")) return state;
      if (state.request.path === "project" && (!state.proposal || state.proposal.status !== "awaiting-client")) return state;
      return { ...state, stage: "confirm" };
    }

    case "CONTINUE_TO_DELIVERY": {
      if (state.stage !== "confirm") return state;
      if (state.request?.path === "session" && (!state.session || state.session.status !== "confirmed")) return state;
      if (state.request?.path === "project" && (!state.proposal || state.proposal.status !== "accepted")) return state;
      return { ...state, stage: "delivery" };
    }

    case "CONTINUE_TO_FOLLOWUP": {
      if (state.stage !== "delivery") return state;
      const optedOut = state.request ? !state.request.followUpOptIn : false;
      if (optedOut) {
        return { ...state, stage: "followup", followUpOutcome: "opted-out", closed: true, events: withEvents(state, "Follow-up skipped — client opted out") };
      }
      return { ...state, stage: "followup" };
    }

    case "PREVIEW_NEXT_TOUCH": {
      if (state.closed || state.followUpOutcome || state.followUpTouchesSent >= followUpSequence.length) return state;
      const day = state.simulatedDay + 1;
      const touch = followUpSequence[state.followUpTouchesSent];
      return {
        ...state,
        simulatedDay: day,
        followUpTouchesSent: state.followUpTouchesSent + 1,
        events: [...state.events, { id: crypto.randomUUID(), label: `Day ${day} (simulated): follow-up touch sent — "${touch.subject}"`, simulatedDay: day }],
        messages: [
          ...state.messages,
          { id: crypto.randomUUID(), label: demoStrings.sampleReminderLabel, to: state.request?.email ?? "", subject: touch.subject, body: touch.body, simulatedDay: day },
        ],
      };
    }

    case "RECORD_FOLLOWUP_OUTCOME": {
      if (state.closed || state.followUpOutcome) return state;
      return {
        ...state,
        followUpOutcome: action.outcome,
        closed: true,
        events: withEvents(state, `Client ${action.outcome} further work — follow-up sequence stopped`),
      };
    }

    case "CLOSE_REQUEST": {
      if (state.closed) return state;
      return { ...state, closed: true, events: withEvents(state, "Request closed — pending follow-ups stopped") };
    }

    case "TOGGLE_FIRM_VIEW":
      return { ...state, firmViewOpen: !state.firmViewOpen };

    case "RESTART":
      return { ...initialDemoState };

    default:
      return state;
  }
}

/**
 * Wraps the reducer with a brief, cancellable "processing" delay for
 * business-meaningful actions, mirroring the other three demos' session
 * hook.
 */
export function useConsultingDemoSession() {
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
