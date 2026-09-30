"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { DemoAgent, ListingType } from "@/content/real-estate-properties";
import { demoStrings } from "@/content/real-estate-demo";
import {
  assignAgent,
  matchProperties,
  nextStepFor,
  type AlternativeProperty,
  type InterestLevel,
  type MatchedProperty,
  type Requirements,
  type ViewingOutcome,
} from "./engine";

/**
 * Client-only session state for the six-stage journey (Preview Mode).
 * "Session isolation" here is simply that this is per-tab React state —
 * nothing is written anywhere shared, so two browser tabs (or two
 * visitors) can never see or affect each other's demo. Restarting always
 * produces a brand-new object graph (see RESTART below), so no state from
 * a previous run can leak into the next one. In Connected Mode this
 * reducer's shape is exactly what a real server session record would
 * mirror — see src/lib/real-estate-demo/contract.ts.
 */

export type Stage = "browse" | "enquiry" | "matching" | "assignment" | "viewing" | "post-viewing" | "next-step";

export type ActivityEvent = { id: string; label: string; simulatedDay: number };
export type MessagePreview = { id: string; label: string; to: string; subject: string; body: string; simulatedDay: number };
export type Task = { id: string; label: string; detail: string; dueLabel: string };
export type EnquiryRecord = Requirements & { id: string; name: string; email: string };
export type ViewingStatus = "requested" | "confirmed" | "cancelled" | "attended" | "missed";
export type ViewingRecord = { id: string; propertyId: string; slotId: string; slotLabel: string; status: ViewingStatus };
export type OutcomeRecord = { interest: InterestLevel; feedback: string };

export type DemoState = {
  stage: Stage;
  enquiry: EnquiryRecord | null;
  matches: MatchedProperty[];
  alternatives: AlternativeProperty[];
  agent: DemoAgent | null;
  viewing: ViewingRecord | null;
  outcome: OutcomeRecord | null;
  tasks: Task[];
  events: ActivityEvent[];
  messages: MessagePreview[];
  simulatedDay: number;
  agentViewOpen: boolean;
  closed: boolean;
  /** Optional prefill for EnquiryForm — either a partial set of fields derived from a browsed property (no name/email) or a full previous EnquiryRecord when looping back via ADJUST_REQUIREMENTS. */
  prefill: Partial<Requirements & { name: string; email: string }> | null;
};

export const initialDemoState: DemoState = {
  stage: "browse",
  enquiry: null,
  matches: [],
  alternatives: [],
  agent: null,
  viewing: null,
  outcome: null,
  tasks: [],
  events: [],
  messages: [],
  simulatedDay: 0,
  agentViewOpen: false,
  closed: false,
  prefill: null,
};

export type Action =
  | { type: "START_JOURNEY"; prefill: Partial<Requirements & { name: string; email: string }> | null }
  | { type: "SUBMIT_ENQUIRY"; values: Requirements & { name: string; email: string } }
  | { type: "ADJUST_REQUIREMENTS" }
  | { type: "CONTINUE_TO_ASSIGNMENT" }
  | { type: "CONTINUE_TO_VIEWING" }
  | { type: "REQUEST_VIEWING"; propertyId: string; slotId: string; slotLabel: string }
  | { type: "CONFIRM_VIEWING" }
  | { type: "CANCEL_VIEWING" }
  | { type: "MARK_VIEWING_OUTCOME"; outcome: ViewingOutcome }
  | { type: "RESCHEDULE_VIEWING"; slotId: string; slotLabel: string }
  | { type: "RECORD_INTEREST"; interest: InterestLevel; feedback: string }
  | { type: "BACK_TO_VIEWING" }
  | { type: "CLOSE_ENQUIRY" }
  | { type: "PREVIEW_NEXT_DAY" }
  | { type: "TOGGLE_AGENT_VIEW" }
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
      to: state.enquiry?.email ?? "",
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
      return { ...state, stage: "enquiry", prefill: action.prefill };
    }

    case "SUBMIT_ENQUIRY": {
      if (state.stage !== "enquiry") return state;
      const { name, email, ...requirements } = action.values;
      const enquiry: EnquiryRecord = { id: crypto.randomUUID(), name, email, ...requirements };
      const { matches, alternatives } = matchProperties(requirements);
      const matchLabel =
        matches.length > 0
          ? `Available properties checked — ${matches.length} match${matches.length === 1 ? "" : "es"} found`
          : "Available properties checked — no exact match, alternatives reviewed";
      return {
        ...state,
        stage: "matching",
        enquiry,
        matches,
        alternatives,
        events: withEvents(state, `Requirements saved (enquiry #${enquiry.id.slice(0, 8)})`, matchLabel),
      };
    }

    case "ADJUST_REQUIREMENTS": {
      if (state.stage !== "matching" && state.stage !== "next-step") return state;
      return { ...state, stage: "enquiry", prefill: state.enquiry };
    }

    case "CONTINUE_TO_ASSIGNMENT": {
      if (state.stage !== "matching" || !state.enquiry) return state;
      const agent = assignAgent(state.enquiry);
      const task: Task = {
        id: crypto.randomUUID(),
        label: "Review new enquiry and confirm best-fit properties",
        detail: `Assigned to ${agent.name} for a ${state.enquiry.listingType === "buy" ? "buying" : "renting"} enquiry ${
          state.enquiry.neighbourhood === "any" ? "with no area preference" : `in ${state.enquiry.neighbourhood}`
        }.`,
        dueLabel: "Due today (simulated)",
      };
      return {
        ...state,
        stage: "assignment",
        agent,
        tasks: [...state.tasks, task],
        events: withEvents(state, `Agent assigned — ${agent.name}`, `Follow-up task created — ${task.label}`),
      };
    }

    case "CONTINUE_TO_VIEWING": {
      if (state.stage !== "assignment") return state;
      return { ...state, stage: "viewing" };
    }

    case "REQUEST_VIEWING": {
      if (state.stage !== "viewing" || state.viewing) return state;
      const viewing: ViewingRecord = {
        id: crypto.randomUUID(),
        propertyId: action.propertyId,
        slotId: action.slotId,
        slotLabel: action.slotLabel,
        status: "requested",
      };
      return { ...state, viewing, events: withEvents(state, `Viewing request recorded — ${action.slotLabel}`) };
    }

    case "CONFIRM_VIEWING": {
      if (!state.viewing || state.viewing.status !== "requested") return state;
      return {
        ...state,
        viewing: { ...state.viewing, status: "confirmed" },
        events: withEvents(state, "Demo viewing confirmed by agent"),
        messages: withMessage(
          state,
          "Your viewing is confirmed",
          `Your sample viewing is confirmed for ${state.viewing.slotLabel}. This is a demo confirmation — no real appointment has been booked.`,
        ),
      };
    }

    case "CANCEL_VIEWING": {
      if (!state.viewing || (state.viewing.status !== "requested" && state.viewing.status !== "confirmed")) return state;
      if (state.viewing.status === "requested") {
        // Not yet confirmed — cancelling here simply clears it so a fresh request can be made.
        return { ...state, viewing: null, events: withEvents(state, "Viewing request cancelled before confirmation") };
      }
      return { ...state, viewing: { ...state.viewing, status: "cancelled" }, events: withEvents(state, "Confirmed viewing cancelled") };
    }

    case "MARK_VIEWING_OUTCOME": {
      if (!state.viewing || state.viewing.status !== "confirmed") return state;
      if (action.outcome === "attended") {
        return {
          ...state,
          stage: "post-viewing",
          viewing: { ...state.viewing, status: "attended" },
          events: withEvents(state, "Viewing marked as attended (simulated)"),
        };
      }
      const step = nextStepFor({ outcome: action.outcome, listingType: state.enquiry!.listingType });
      const task: Task = { id: crypto.randomUUID(), label: step.taskLabel, detail: step.taskDetail, dueLabel: "Next business day (simulated)" };
      return {
        ...state,
        stage: "next-step",
        viewing: { ...state.viewing, status: action.outcome },
        tasks: [...state.tasks, task],
        events: withEvents(state, `Viewing marked as ${action.outcome} (simulated)`, `Next action updated — ${step.taskLabel}`),
        messages: withMessage(state, step.messageSubject, step.messageBody),
      };
    }

    case "RESCHEDULE_VIEWING": {
      if (!state.viewing) return state;
      return {
        ...state,
        stage: "viewing",
        viewing: { ...state.viewing, slotId: action.slotId, slotLabel: action.slotLabel, status: "requested" },
        events: withEvents(state, `Viewing rescheduled to ${action.slotLabel}`),
      };
    }

    case "RECORD_INTEREST": {
      if (state.stage !== "post-viewing" || !state.viewing || state.viewing.status !== "attended") return state;
      const listingType: ListingType = state.enquiry!.listingType;
      const step = nextStepFor({ outcome: "attended", interest: action.interest, listingType });
      const task: Task = { id: crypto.randomUUID(), label: step.taskLabel, detail: step.taskDetail, dueLabel: "Next business day (simulated)" };
      return {
        ...state,
        stage: "next-step",
        outcome: { interest: action.interest, feedback: action.feedback },
        tasks: [...state.tasks, task],
        events: withEvents(state, `Feedback recorded — ${action.interest.replace("-", " ")}`, `Next action updated — ${step.taskLabel}`),
        messages: withMessage(state, step.messageSubject, step.messageBody),
      };
    }

    case "BACK_TO_VIEWING": {
      return { ...state, stage: "viewing", viewing: null, events: withEvents(state, "Returned to viewing options") };
    }

    case "CLOSE_ENQUIRY": {
      if (state.closed) return state;
      return { ...state, closed: true, events: withEvents(state, "Enquiry closed — pending follow-ups stopped") };
    }

    case "PREVIEW_NEXT_DAY": {
      if (state.closed || state.tasks.length === 0) return state;
      const day = state.simulatedDay + 1;
      const openTask = state.tasks[state.tasks.length - 1];
      return {
        ...state,
        simulatedDay: day,
        events: [
          ...state.events,
          { id: crypto.randomUUID(), label: `Day ${day} (simulated): automated reminder sent for "${openTask.label}"`, simulatedDay: day },
        ],
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            label: demoStrings.sampleReminderLabel,
            to: state.enquiry?.email ?? "",
            subject: `Reminder: ${openTask.label}`,
            body: `This is a simulated Day ${day} reminder for the open task "${openTask.label}".`,
            simulatedDay: day,
          },
        ],
      };
    }

    case "TOGGLE_AGENT_VIEW":
      return { ...state, agentViewOpen: !state.agentViewOpen };

    case "RESTART":
      return { ...initialDemoState };

    default:
      return state;
  }
}

/**
 * Wraps the reducer with a brief, cancellable "processing" delay for
 * business-meaningful actions (submitting requirements, confirming a
 * viewing, etc.) so the UI can show a real loading state — mirroring what
 * a "quick acknowledgement, then processing" server round-trip will feel
 * like once Connected Mode exists, without actually depending on one.
 * Skipped entirely under reduced motion (0ms), never more than ~500ms.
 */
export function useRealEstateDemoSession() {
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
