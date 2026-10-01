/**
 * Consulting demo — Connected Mode action contract (PREPARED, NOT WIRED).
 * Same architecture as src/lib/real-estate-demo/contract.ts,
 * src/lib/home-services-demo/contract.ts and src/lib/clinics-demo/contract.ts:
 *   WALKFLOW browser -> POST /api/demo/consulting -> n8n webhook -> Supabase -> polled status -> results shown on WALKFLOW.
 *
 * Nothing in the current UI imports or calls this contract. The full
 * six-stage journey in src/components/demo/consulting/ runs entirely in
 * Preview Mode (local React state, see session.ts) and does not depend on
 * this file, the Supabase migration in supabase/migrations/, or the n8n
 * workflows in n8n-workflows/consulting/.
 *
 * Design notes (identical to the other three demos' contracts, repeated
 * here since this module is intentionally independent, not a shared
 * import):
 * - The browser never calls the n8n webhook directly — only this Next.js
 *   route, which holds the real webhook URL and shared secret
 *   server-side only (see .env.example) and re-validates everything.
 * - Every request carries a client-generated `requestId` (a UUID) for
 *   de-duplication — resubmitting the same requestId must not create a
 *   second request, session, proposal or kickoff.
 * - `sessionId` identifies a demo session server-side (a signed, httpOnly
 *   cookie) — never a value the browser can set or spoof.
 * - The server must enforce the same two-path and stage-order guards as
 *   the Preview Mode reducer (session.ts's demoReducer) — e.g. a
 *   "session" path record can never gain a proposal, and confirming a
 *   session that was never requested is rejected with "out_of_order", not
 *   applied.
 * - Even once connected, this remains a public portfolio demo: it must
 *   continue using fictional records and message previews. No real
 *   payment is ever processed, and no real proposal, booking or kickoff
 *   is ever created, regardless of Connected Mode status.
 */

export type DemoAction =
  | "submit_request"
  | "assign_consultant"
  | "request_session"
  | "simulate_payment"
  | "cancel_session"
  | "mark_checked_in"
  | "record_attendance"
  | "draft_proposal"
  | "approve_proposal"
  | "record_proposal_decision"
  | "prepare_revised_proposal"
  | "request_kickoff_date"
  | "preview_next_touch"
  | "record_followup_outcome"
  | "restart_demo";

export type DemoActionRequest<TInput = unknown> = {
  requestId: string;
  sessionId: string;
  industry: "consulting";
  action: DemoAction;
  input: TInput;
};

export type DemoActionStatus = "accepted" | "processing" | "completed" | "failed";

export type DemoActionResponse<TResult = unknown> = {
  requestId: string;
  status: DemoActionStatus;
  result?: TResult;
  error?: { code: DemoErrorCode; message: string };
};

export type DemoErrorCode =
  | "invalid_input"
  | "out_of_order"
  | "not_found"
  | "duplicate_request"
  | "rate_limited"
  | "session_expired"
  | "upstream_unavailable"
  | "unconfigured";

// ---- Action-specific input shapes -----------------------------------------

export type SubmitRequestInput = {
  name: string;
  email: string;
  path: "session" | "project";
  serviceId: string | null; // a ServiceId from content/consulting-services.ts, required when path is "session"
  projectOverview: string; // used only when path is "project"
  preferredSlotId: string;
  context: string;
  followUpOptIn: boolean;
};

export type SubmitRequestResult = {
  requestRecordId: string;
  consultantId: string;
  taskIds: string[];
};

export type RequestSessionInput = { requestRecordId: string; slotIso: string };
export type SimulatePaymentInput = { requestRecordId: string };
export type CancelSessionInput = { requestRecordId: string };
export type RecordAttendanceInput = { requestRecordId: string; status: "checked-in" | "attended" | "missed" };

export type DraftProposalInput = { requestRecordId: string };
export type ApproveProposalInput = { requestRecordId: string };
export type RecordProposalDecisionInput = { requestRecordId: string; decision: "accepted" | "declined" | "changes-requested" };
export type PrepareRevisedProposalInput = { requestRecordId: string };

export type RequestKickoffDateInput = { requestRecordId: string; dateIso: string };

export type PreviewNextTouchInput = { requestRecordId: string };
export type RecordFollowupOutcomeInput = { requestRecordId: string; outcome: "accepted" | "declined" | "cancelled" };

/**
 * Example payload (submit_request), for the setup docs:
 *
 * Request:
 * {
 *   "requestId": "c4a1f9de-...",
 *   "sessionId": "s_2b7e...",
 *   "industry": "consulting",
 *   "action": "submit_request",
 *   "input": {
 *     "name": "Morgan Reyes (fictional)",
 *     "email": "morgan@ques-demo.example",
 *     "path": "session",
 *     "serviceId": "strategy",
 *     "projectOverview": "",
 *     "preferredSlotId": "slot-1-10",
 *     "context": "Decisions are slower than they should be because our reporting is scattered across spreadsheets.",
 *     "followUpOptIn": true
 *   }
 * }
 *
 * Response (completed):
 * {
 *   "requestId": "c4a1f9de-...",
 *   "status": "completed",
 *   "result": {
 *     "requestRecordId": "req_5521",
 *     "consultantId": "cons-amara",
 *     "taskIds": ["t_1"]
 *   }
 * }
 */
