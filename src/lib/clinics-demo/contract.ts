/**
 * Clinics demo — Connected Mode action contract (PREPARED, NOT WIRED).
 * Same architecture as src/lib/real-estate-demo/contract.ts and
 * src/lib/home-services-demo/contract.ts:
 *   WALKFLOW browser -> POST /api/demo/clinics -> n8n webhook -> Supabase -> polled status -> results shown on WALKFLOW.
 *
 * Nothing in the current UI imports or calls this contract. The full
 * six-stage journey in src/components/demo/clinics/ runs entirely in
 * Preview Mode (local React state, see session.ts) and does not depend on
 * this file, the Supabase migration in supabase/migrations/, or the n8n
 * workflows in n8n-workflows/clinics/.
 *
 * Design notes (identical to the other two demos' contracts, repeated
 * here since this module is intentionally independent, not a shared
 * import):
 * - The browser never calls the n8n webhook directly — only this Next.js
 *   route, which holds the real webhook URL and shared secret
 *   server-side only (see .env.example) and re-validates everything.
 * - Every request carries a client-generated `requestId` (a UUID) for
 *   de-duplication — resubmitting the same requestId must not create a
 *   second request, appointment, or waiting-list offer.
 * - `sessionId` identifies a demo session server-side (a signed, httpOnly
 *   cookie) — never a value the browser can set or spoof.
 * - The server must enforce the same stage-order guards as the Preview
 *   Mode reducer (session.ts's demoReducer) — e.g. confirming an
 *   appointment that was never requested, or accepting a waiting-list
 *   offer that was never made, is rejected with "out_of_order", not
 *   applied.
 * - Even once connected, this remains a public portfolio demo: it must
 *   continue using fictional records and message previews. No real
 *   message is ever sent and no real appointment is ever created,
 *   regardless of Connected Mode status.
 */

export type DemoAction =
  | "submit_request"
  | "assign_staff"
  | "request_appointment"
  | "confirm_appointment"
  | "cancel_appointment"
  | "reschedule_appointment"
  | "preview_reminder"
  | "record_attendance"
  | "offer_waitlist_slot"
  | "respond_waitlist_offer"
  | "expire_waitlist_offer"
  | "record_followup"
  | "restart_demo";

export type DemoActionRequest<TInput = unknown> = {
  requestId: string;
  sessionId: string;
  industry: "clinics";
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
  categoryId: string; // a ServiceCategoryId from content/clinics-services.ts, or "not-sure"
  patientKind: "new" | "returning";
  preferredSlotId: string;
  supportNeedsId: string;
  note: string;
  followUpOptIn: boolean;
};

export type SubmitRequestResult = {
  requestRecordId: string;
  categoryPending: boolean;
  receptionOwnerId: string;
  providerId: string | null;
  taskIds: string[];
};

export type RequestAppointmentInput = { requestRecordId: string; slotIso: string };
export type ConfirmAppointmentInput = { appointmentId: string };
export type CancelAppointmentInput = { appointmentId: string };
export type RescheduleAppointmentInput = { appointmentId: string; slotIso: string };
export type PreviewReminderInput = { requestRecordId: string };
export type RecordAttendanceInput = { appointmentId: string; status: "checked-in" | "attended" | "missed" };

export type OfferWaitlistSlotInput = { appointmentId: string };
export type RespondWaitlistOfferInput = { offerId: string; response: "accepted" | "declined" };
export type ExpireWaitlistOfferInput = { offerId: string };

export type RecordFollowupInput = { requestRecordId: string };

/**
 * Example payload (submit_request), for the setup docs:
 *
 * Request:
 * {
 *   "requestId": "c4a1f9de-...",
 *   "sessionId": "s_2b7e...",
 *   "industry": "clinics",
 *   "action": "submit_request",
 *   "input": {
 *     "name": "Jordan Ellis (fictional)",
 *     "email": "jordan@happyclinics-demo.example",
 *     "categoryId": "dental-care",
 *     "patientKind": "new",
 *     "preferredSlotId": "slot-1-9",
 *     "supportNeedsId": "support-none",
 *     "note": "",
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
 *     "categoryPending": false,
 *     "receptionOwnerId": "recep-priya",
 *     "providerId": "prov-dental",
 *     "taskIds": ["t_1"]
 *   }
 * }
 */
