"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { demoStrings } from "@/content/clinics-demo";
import type { Provider, ReceptionStaff } from "@/content/clinics-services";
import {
  assignProvider,
  assignReceptionOwner,
  followUpInstructionFor,
  hasConflict,
  waitlistCandidateFor,
  type Requirements,
} from "./engine";

/**
 * Client-only session state for the Clinics journey. Architecture mirrors
 * the Real Estate and Home Services demos' session.ts (same reducer +
 * delayed-dispatch hook pattern) but is a wholly separate module with its
 * own state shape and rules. "Session isolation" is simply that this is
 * per-tab React state, including the waiting-list thread.
 */

export type Stage = "browse" | "request" | "assignment" | "confirm" | "reminders" | "attendance" | "followup";

export type ActivityEvent = { id: string; label: string; simulatedDay: number };
export type MessagePreview = { id: string; label: string; to: string; subject: string; body: string; simulatedDay: number };
export type Task = { id: string; label: string; detail: string; dueLabel: string };

export type RequestRecord = Requirements & { id: string; name: string; email: string };

export type AppointmentStatus = "requested" | "confirmed" | "cancelled";
export type AppointmentRecord = { id: string; slotId: string; slotLabel: string; status: AppointmentStatus };

export type AttendanceStatus = "checked-in" | "attended" | "missed";

export type WaitlistOfferStatus = "offered" | "accepted" | "declined" | "expired";
export type WaitlistOffer = { candidateName: string; slotLabel: string; status: WaitlistOfferStatus };

export type FollowUpRecord = { instruction: string | null; skippedByOptOut: boolean };

export type DemoState = {
  stage: Stage;
  request: RequestRecord | null;
  receptionOwner: ReceptionStaff | null;
  provider: Provider | null;
  categoryPending: boolean;
  appointment: AppointmentRecord | null;
  remindersValid: boolean;
  attendanceIntentConfirmed: boolean;
  questionAsked: boolean;
  attendance: AttendanceStatus | null;
  waitlistOffer: WaitlistOffer | null;
  followUp: FollowUpRecord | null;
  tasks: Task[];
  events: ActivityEvent[];
  messages: MessagePreview[];
  simulatedDay: number;
  clinicViewOpen: boolean;
  closed: boolean;
  prefill: Partial<RequestRecord> | null;
};

export const initialDemoState: DemoState = {
  stage: "browse",
  request: null,
  receptionOwner: null,
  provider: null,
  categoryPending: false,
  appointment: null,
  remindersValid: true,
  attendanceIntentConfirmed: false,
  questionAsked: false,
  attendance: null,
  waitlistOffer: null,
  followUp: null,
  tasks: [],
  events: [],
  messages: [],
  simulatedDay: 0,
  clinicViewOpen: false,
  closed: false,
  prefill: null,
};

export type Action =
  | { type: "START_JOURNEY"; prefill: Partial<RequestRecord> | null }
  | { type: "SUBMIT_REQUEST"; values: Requirements & { name: string; email: string } }
  | { type: "ADJUST_REQUEST" }
  | { type: "CONTINUE_TO_CONFIRM" }
  | { type: "REQUEST_APPOINTMENT"; slotId: string; slotLabel: string }
  | { type: "CONFIRM_APPOINTMENT" }
  | { type: "CONTINUE_TO_REMINDERS" }
  | { type: "PATIENT_CONFIRM_ATTENDANCE_INTENT" }
  | { type: "RESCHEDULE_APPOINTMENT"; slotId: string; slotLabel: string }
  | { type: "CANCEL_APPOINTMENT" }
  | { type: "ASK_BOOKING_QUESTION"; question: string }
  | { type: "PREVIEW_REMINDER" }
  | { type: "CONTINUE_TO_ATTENDANCE" }
  | { type: "MARK_CHECKED_IN" }
  | { type: "MARK_ATTENDANCE"; status: "attended" | "missed" }
  | { type: "RESPOND_WAITLIST_OFFER"; response: "accepted" | "declined" }
  | { type: "EXPIRE_WAITLIST_OFFER" }
  | { type: "CONTINUE_TO_FOLLOWUP" }
  | { type: "CLOSE_REQUEST" }
  | { type: "TOGGLE_CLINIC_VIEW" }
  | { type: "RESTART" };

function withEvents(state: DemoState, ...labels: string[]): ActivityEvent[] {
  const day = state.simulatedDay;
  return [...state.events, ...labels.map((label) => ({ id: crypto.randomUUID(), label, simulatedDay: day }))];
}

function withMessage(state: DemoState, label: string, subject: string, body: string): MessagePreview[] {
  return [...state.messages, { id: crypto.randomUUID(), label, to: state.request?.email ?? "", subject, body, simulatedDay: state.simulatedDay }];
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
      const owner = assignReceptionOwner(requirements.categoryId);
      const provider = assignProvider(requirements.categoryId);
      const pending = requirements.categoryId === "not-sure";

      const tasks: Task[] = [...state.tasks];
      if (pending) {
        tasks.push({
          id: crypto.randomUUID(),
          label: "Review request and confirm suitable service category",
          detail: `${owner.name} will review this request and confirm which service category fits before an appointment can be arranged.`,
          dueLabel: "Due today (simulated)",
        });
      } else {
        tasks.push({
          id: crypto.randomUUID(),
          label: "Confirm appointment details with patient",
          detail: `Assigned to ${owner.name} (reception) with ${provider?.name ?? "a provider"} for a ${requirements.patientKind} patient.`,
          dueLabel: "Due today (simulated)",
        });
        if (requirements.categoryId === "diagnostics") {
          tasks.push({
            id: crypto.randomUUID(),
            label: "Check referral/preparation requirements",
            detail: "Diagnostic requests are flagged so staff can confirm any referral or preparation needed before the appointment.",
            dueLabel: "Before appointment (simulated)",
          });
        }
      }

      const eventLabels = [
        `Request recorded (request #${request.id.slice(0, 8)})`,
        pending ? `Reception owner assigned — ${owner.name} (pending category review)` : `Reception owner assigned — ${owner.name}`,
      ];
      if (!pending && provider) eventLabels.push(`Provider assigned — ${provider.name}`);
      if (!pending && requirements.categoryId === "diagnostics") eventLabels.push("Flagged for referral/preparation check");

      return {
        ...state,
        stage: "assignment",
        request,
        receptionOwner: owner,
        provider,
        categoryPending: pending,
        tasks,
        events: withEvents(state, ...eventLabels),
        messages: withMessage(
          state,
          demoStrings.sampleMessageLabel,
          "We've received your request",
          "Thanks for getting in touch — your request has been logged and reception will be in touch to confirm your appointment. This is an acknowledgement only, not a confirmed appointment.",
        ),
      };
    }

    case "ADJUST_REQUEST": {
      if (state.stage !== "assignment") return state;
      return { ...state, stage: "request", prefill: state.request };
    }

    case "CONTINUE_TO_CONFIRM": {
      if (state.stage !== "assignment" || state.categoryPending) return state;
      return { ...state, stage: "confirm" };
    }

    case "REQUEST_APPOINTMENT": {
      if (state.stage !== "confirm" || state.appointment) return state;
      if (hasConflict(null, action.slotId)) return state;
      return {
        ...state,
        appointment: { id: crypto.randomUUID(), slotId: action.slotId, slotLabel: action.slotLabel, status: "requested" },
        events: withEvents(state, `Appointment requested — ${action.slotLabel}`),
      };
    }

    case "CONFIRM_APPOINTMENT": {
      if (!state.appointment || state.appointment.status !== "requested") return state;
      return {
        ...state,
        appointment: { ...state.appointment, status: "confirmed" },
        remindersValid: true,
        events: withEvents(state, "Demo appointment confirmed by reception"),
        messages: withMessage(
          state,
          demoStrings.sampleMessageLabel,
          "Your appointment is confirmed",
          `Your sample appointment is confirmed for ${state.appointment.slotLabel}. This is a demo confirmation — no real appointment has been booked.`,
        ),
      };
    }

    case "CONTINUE_TO_REMINDERS": {
      if (state.stage !== "confirm" || !state.appointment || state.appointment.status !== "confirmed") return state;
      return {
        ...state,
        stage: "reminders",
        events: withEvents(state, "Reminder preview prepared"),
        messages: withMessage(
          state,
          demoStrings.sampleReminderLabel,
          "Reminder: your upcoming appointment",
          `This is a reminder preview for your appointment on ${state.appointment.slotLabel}.`,
        ),
      };
    }

    case "PATIENT_CONFIRM_ATTENDANCE_INTENT": {
      if (state.attendanceIntentConfirmed || !state.appointment || state.appointment.status !== "confirmed") return state;
      return { ...state, attendanceIntentConfirmed: true, events: withEvents(state, "Patient confirmed intent to attend") };
    }

    case "RESCHEDULE_APPOINTMENT": {
      if (!state.appointment || state.appointment.status !== "confirmed") return state;
      return {
        ...state,
        appointment: { ...state.appointment, slotId: action.slotId, slotLabel: action.slotLabel, status: "requested" },
        remindersValid: false,
        attendanceIntentConfirmed: false,
        events: withEvents(state, `Appointment rescheduled to ${action.slotLabel} — previous reminders invalidated`),
      };
    }

    case "CANCEL_APPOINTMENT": {
      if (!state.appointment || state.appointment.status === "cancelled") return state;
      const candidate = state.request ? waitlistCandidateFor(state.request.categoryId) : null;
      const events = [`Appointment cancelled`, `Confirmed slot released — ${state.appointment.slotLabel}`];
      let waitlistOffer: WaitlistOffer | null = null;
      if (candidate) {
        waitlistOffer = { candidateName: candidate.name, slotLabel: state.appointment.slotLabel, status: "offered" };
        events.push(`Waiting-list offer created — ${candidate.name}`);
      }
      return {
        ...state,
        stage: "attendance",
        appointment: { ...state.appointment, status: "cancelled" },
        remindersValid: false,
        waitlistOffer,
        events: withEvents(state, ...events),
      };
    }

    case "ASK_BOOKING_QUESTION": {
      if (state.questionAsked) return state;
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Answer patient's booking question",
        detail: `The patient asked: "${action.question}"`,
        dueLabel: "Next business day (simulated)",
      };
      return {
        ...state,
        questionAsked: true,
        tasks: [...state.tasks, task],
        events: withEvents(state, "Patient asked reception a booking question"),
        messages: withMessage(
          state,
          demoStrings.sampleMessageLabel,
          "We've received your question",
          "Thanks for your question — reception will get back to you with an answer shortly.",
        ),
      };
    }

    case "PREVIEW_REMINDER": {
      if (state.closed || state.tasks.length === 0) return state;
      const day = state.simulatedDay + 1;
      const openTask = state.tasks[state.tasks.length - 1];
      return {
        ...state,
        simulatedDay: day,
        events: [...state.events, { id: crypto.randomUUID(), label: `Day ${day} (simulated): reminder prepared for "${openTask.label}"`, simulatedDay: day }],
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            label: demoStrings.sampleReminderLabel,
            to: state.request?.email ?? "",
            subject: `Reminder: ${openTask.label}`,
            body: `This is a simulated Day ${day} reminder for the open task "${openTask.label}".`,
            simulatedDay: day,
          },
        ],
      };
    }

    case "CONTINUE_TO_ATTENDANCE": {
      if (state.stage !== "reminders" || !state.appointment || state.appointment.status !== "confirmed") return state;
      return { ...state, stage: "attendance" };
    }

    case "MARK_CHECKED_IN": {
      if (state.attendance || !state.appointment || state.appointment.status !== "confirmed") return state;
      return { ...state, attendance: "checked-in", events: withEvents(state, "Patient checked in (simulated)") };
    }

    case "MARK_ATTENDANCE": {
      if (!state.appointment || state.appointment.status !== "confirmed") return state;
      if (state.attendance === "attended" || state.attendance === "missed") return state;
      if (action.status === "attended" && state.attendance !== "checked-in") return state;

      if (action.status === "missed") {
        const task: Task = {
          id: crypto.randomUUID(),
          label: "Reception follow-up for missed appointment",
          detail: "The patient missed their appointment. Reception would follow up to offer a rebooking.",
          dueLabel: "Next business day (simulated)",
        };
        return {
          ...state,
          attendance: "missed",
          tasks: [...state.tasks, task],
          events: withEvents(state, "Appointment marked as missed (simulated)"),
          messages: withMessage(
            state,
            demoStrings.sampleMessageLabel,
            "Sorry we missed you",
            "We noticed you weren't able to make your appointment — happy to help arrange another time whenever suits.",
          ),
        };
      }

      return { ...state, attendance: "attended", events: withEvents(state, "Appointment marked as attended (simulated)") };
    }

    case "RESPOND_WAITLIST_OFFER": {
      if (!state.waitlistOffer || state.waitlistOffer.status !== "offered") return state;
      const status = action.response === "accepted" ? "accepted" : "declined";
      return {
        ...state,
        waitlistOffer: { ...state.waitlistOffer, status },
        events: withEvents(
          state,
          status === "accepted"
            ? `Waiting-list offer accepted by ${state.waitlistOffer.candidateName}`
            : `Waiting-list offer declined by ${state.waitlistOffer.candidateName}`,
        ),
      };
    }

    case "EXPIRE_WAITLIST_OFFER": {
      if (!state.waitlistOffer || state.waitlistOffer.status !== "offered") return state;
      return {
        ...state,
        waitlistOffer: { ...state.waitlistOffer, status: "expired" },
        events: withEvents(state, `Waiting-list offer expired — ${state.waitlistOffer.candidateName} did not respond in time`),
      };
    }

    case "CONTINUE_TO_FOLLOWUP": {
      if (state.stage !== "attendance" || state.attendance !== "attended") return state;
      const instruction = state.request ? followUpInstructionFor(state.request.categoryId) : null;
      const optedOut = state.request ? !state.request.followUpOptIn : false;
      const skippedByOptOut = Boolean(instruction) && optedOut;

      const eventLabels = ["Neutral feedback preview prepared"];
      let tasks = state.tasks;

      if (instruction && skippedByOptOut) {
        eventLabels.push("Follow-up skipped — patient opted out");
      } else if (instruction) {
        tasks = [
          ...tasks,
          { id: crypto.randomUUID(), label: `Follow-up: ${instruction}`, detail: instruction, dueLabel: "Per staff instruction (simulated)" },
        ];
        eventLabels.push(`Follow-up task added — ${instruction}`);
      }

      let messages = withMessage(
        state,
        demoStrings.sampleMessageLabel,
        "How did we do?",
        "We'd love your feedback on your recent visit — a short, neutral feedback request would normally go out here.",
      );
      if (instruction && !skippedByOptOut) {
        messages = [
          ...messages,
          { id: crypto.randomUUID(), label: demoStrings.sampleMessageLabel, to: state.request?.email ?? "", subject: "Your next step", body: instruction, simulatedDay: state.simulatedDay },
        ];
      }

      return {
        ...state,
        stage: "followup",
        followUp: { instruction, skippedByOptOut },
        tasks,
        events: withEvents(state, ...eventLabels),
        messages,
      };
    }

    case "CLOSE_REQUEST": {
      if (state.closed) return state;
      return { ...state, closed: true, events: withEvents(state, "Request closed — pending follow-ups stopped") };
    }

    case "TOGGLE_CLINIC_VIEW":
      return { ...state, clinicViewOpen: !state.clinicViewOpen };

    case "RESTART":
      return { ...initialDemoState };

    default:
      return state;
  }
}

/**
 * Wraps the reducer with a brief, cancellable "processing" delay for
 * business-meaningful actions, mirroring the Real Estate and Home Services
 * demos' session hook.
 */
export function useClinicsDemoSession() {
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
