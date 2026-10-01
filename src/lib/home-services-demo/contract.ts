/**
 * Home Services (roofing) demo — Connected Mode action contract (PREPARED,
 * NOT WIRED). Same architecture as src/lib/real-estate-demo/contract.ts:
 *   WALKFLOW browser -> POST /api/demo/home-services -> n8n webhook -> Supabase -> polled status -> results shown on WALKFLOW.
 *
 * Nothing in the current UI imports or calls this contract. The full
 * six-stage journey in src/components/demo/home-services/ runs entirely in
 * Preview Mode (local React state, see session.ts) and does not depend on
 * this file, the Supabase migration in supabase/migrations/, or the n8n
 * workflows in n8n-workflows/home-services/.
 *
 * Design notes (identical to the Real Estate contract, repeated here since
 * this module is intentionally independent, not a shared import):
 * - The browser never calls the n8n webhook directly — only this Next.js
 *   route, which holds the real webhook URL and shared secret server-side
 *   only (see .env.example) and re-validates everything.
 * - Every request carries a client-generated `requestId` (a UUID) for
 *   de-duplication — resubmitting the same requestId must not create a
 *   second request, task, inspection or job.
 * - `sessionId` identifies a demo session server-side (a signed, httpOnly
 *   cookie) — never a value the browser can set or spoof.
 * - The server must enforce the same stage-order guards as the Preview
 *   Mode reducer (session.ts's demoReducer) — e.g. confirming an
 *   inspection that was never requested, or approving an estimate that
 *   was never prepared, is rejected with "out_of_order", not applied.
 */

export type DemoAction =
  | "submit_request"
  | "review_and_assign"
  | "request_inspection"
  | "confirm_inspection"
  | "cancel_inspection"
  | "reschedule_inspection"
  | "record_inspection_outcome"
  | "approve_estimate"
  | "record_estimate_decision"
  | "prepare_revised_estimate"
  | "request_job_date"
  | "update_job_status"
  | "reschedule_job"
  | "record_job_completion"
  | "simulate_payment"
  | "preview_followup"
  | "restart_demo";

export type DemoActionRequest<TInput = unknown> = {
  requestId: string;
  sessionId: string;
  industry: "home-services";
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
  phone: string;
  serviceId: string; // a ServiceId from content/home-services-roofing.ts, or "not-sure"
  propertyKind: "residential" | "commercial";
  location: string;
  issueDescription: string;
  urgency: "routine" | "soon" | "urgent";
  preferredSlotId: string;
  photoId: string;
};

export type SubmitRequestResult = {
  requestRecordId: string;
  areaCovered: boolean;
  assignedCrewId: string | null;
  urgentFlagged: boolean;
  taskIds: string[];
};

export type RequestInspectionInput = { requestRecordId: string; slotIso: string };
export type ConfirmInspectionInput = { inspectionId: string };
export type CancelInspectionInput = { inspectionId: string };
export type RescheduleInspectionInput = { inspectionId: string; slotIso: string };
export type RecordInspectionOutcomeInput = { inspectionId: string; outcome: "completed" | "missed" | "cancelled" };

export type ApproveEstimateInput = { estimateId: string };
export type RecordEstimateDecisionInput = { estimateId: string; decision: "accepted" | "declined" | "changes-requested" };
export type PrepareRevisedEstimateInput = { requestRecordId: string };

export type RequestJobDateInput = { jobId: string; dateIso: string };
export type UpdateJobStatusInput = { jobId: string; status: "in-progress" | "delayed" | "cancelled" };
export type RescheduleJobInput = { jobId: string; dateIso: string };
export type RecordJobCompletionInput = { jobId: string };
export type SimulatePaymentInput = { invoiceId: string };
export type PreviewFollowupInput = { requestRecordId: string };

/**
 * Example payload (submit_request), for the setup docs:
 *
 * Request:
 * {
 *   "requestId": "a1b2c3d4-...",
 *   "sessionId": "s_7f3e...",
 *   "industry": "home-services",
 *   "action": "submit_request",
 *   "input": {
 *     "name": "Jordan Ellis (fictional)",
 *     "email": "jordan@roofora-demo.example",
 *     "phone": "+1 (555) 234-5678 (fictional)",
 *     "serviceId": "roof-repair",
 *     "propertyKind": "residential",
 *     "location": "Cedar Ridge",
 *     "issueDescription": "A few shingles came loose after last week's storm",
 *     "urgency": "soon",
 *     "preferredSlotId": "slot-1-9",
 *     "photoId": "photo-none"
 *   }
 * }
 *
 * Response (completed):
 * {
 *   "requestId": "a1b2c3d4-...",
 *   "status": "completed",
 *   "result": {
 *     "requestRecordId": "r_9981",
 *     "areaCovered": true,
 *     "assignedCrewId": "crew-rapid",
 *     "urgentFlagged": false,
 *     "taskIds": ["t_1"]
 *   }
 * }
 */
