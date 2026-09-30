/**
 * Real Estate demo — Connected Mode action contract (PREPARED, NOT WIRED).
 *
 * This file is documentation-as-types for the future integration:
 *   WALKFLOW browser -> POST /api/demo/real-estate -> n8n webhook -> Supabase -> polled status -> results shown on WALKFLOW.
 *
 * Nothing in the current UI imports or calls this contract. The six-stage
 * journey in src/components/demo/real-estate/ runs entirely in Preview
 * Mode (local React state, see session.ts) and does not depend on this
 * file, the Supabase migration in supabase/migrations/, or the n8n
 * workflows in n8n-workflows/real-estate/. When Connected Mode is built,
 * these types are the shape both the client and the /api/demo/real-estate
 * route handler should use, so the two sides can never silently disagree
 * about what a request or response looks like.
 *
 * Design notes:
 * - The browser never calls the n8n webhook directly. It always calls this
 *   Next.js route, which holds the real webhook URL and shared secret
 *   server-side only (see .env.example) and re-validates everything.
 * - Every request carries a client-generated `requestId` (a UUID) so the
 *   server can dedupe retries/double-clicks — the same requestId submitted
 *   twice must not create a second enquiry, task or viewing.
 * - `sessionId` identifies a demo session server-side (a signed, httpOnly
 *   cookie set on first load) — never a value the browser can set or spoof
 *   to impersonate another session or to skip stage-order rules.
 * - The server enforces the same stage-order guards as the Preview Mode
 *   reducer (session.ts's demoReducer) — an action attempted out of order
 *   (e.g. confirming a viewing that was never requested) is rejected, not
 *   silently accepted.
 */

export type DemoAction =
  | "submit_requirements"
  | "request_viewing"
  | "confirm_viewing"
  | "cancel_viewing"
  | "reschedule_viewing"
  | "record_viewing_outcome"
  | "preview_followup"
  | "close_enquiry"
  | "restart_demo";

/** Every request to /api/demo/real-estate uses this envelope, whatever the action. */
export type DemoActionRequest<TInput = unknown> = {
  requestId: string; // client-generated UUID, used for de-duplication
  sessionId: string; // server-issued, from an httpOnly cookie — never client-chosen
  action: DemoAction;
  input: TInput; // action-specific payload, validated server-side against the shapes below
};

export type DemoActionStatus = "accepted" | "processing" | "completed" | "failed";

export type DemoActionResponse<TResult = unknown> = {
  requestId: string; // echoes the request, so the client can match responses to actions
  status: DemoActionStatus;
  /** Present once status is "completed". */
  result?: TResult;
  /** Present once status is "failed". */
  error?: { code: DemoErrorCode; message: string };
};

export type DemoErrorCode =
  | "invalid_input" // failed server-side validation
  | "out_of_order" // action doesn't apply to the session's current stage
  | "not_found" // referenced enquiry/viewing/property id doesn't exist
  | "duplicate_request" // requestId already processed — server returns the original result, not an error, but the code exists for logging
  | "rate_limited"
  | "session_expired"
  | "upstream_unavailable" // n8n/Supabase unreachable or returned an error
  | "unconfigured"; // no real webhook/credentials set — the honest 501 this repo returns today

// ---- Action-specific input shapes -----------------------------------------

export type SubmitRequirementsInput = {
  name: string;
  email: string;
  listingType: "buy" | "rent";
  neighbourhood: string; // a value from content/real-estate-properties.ts neighbourhoods, or "any"
  maxBudget: number | null;
  minBedrooms: number;
  propertyType: string; // a PropertyType value, or "any"
  timeline: "asap" | "1-3-months" | "3-6-months" | "exploring";
  notes: string;
};

export type SubmitRequirementsResult = {
  enquiryId: string;
  matches: Array<{ propertyId: string; reasons: string[] }>;
  alternatives: Array<{ propertyId: string; reasons: string[]; differs: string }>;
  assignedAgentId: string;
  taskId: string;
};

export type RequestViewingInput = { enquiryId: string; propertyId: string; slotIso: string };
export type ConfirmViewingInput = { viewingId: string };
export type CancelViewingInput = { viewingId: string };
export type RescheduleViewingInput = { viewingId: string; slotIso: string };

export type RecordViewingOutcomeInput = {
  viewingId: string;
  outcome: "attended" | "cancelled" | "missed";
  interest?: "interested" | "not-interested" | "needs-info"; // required when outcome is "attended"
  feedback?: string;
};

export type PreviewFollowupInput = { enquiryId: string };
export type CloseEnquiryInput = { enquiryId: string };
export type RestartDemoInput = Record<string, never>;

/**
 * Example payload (submit_requirements), for the setup docs:
 *
 * Request:
 * {
 *   "requestId": "c1b1f9de-...",
 *   "sessionId": "s_9f2c...",
 *   "action": "submit_requirements",
 *   "input": {
 *     "name": "Jordan Ellis (fictional)",
 *     "email": "jordan@ashcombe-demo.example",
 *     "listingType": "buy",
 *     "neighbourhood": "Millbrook",
 *     "maxBudget": 500000,
 *     "minBedrooms": 3,
 *     "propertyType": "any",
 *     "timeline": "asap",
 *     "notes": ""
 *   }
 * }
 *
 * Response (accepted immediately, processing continues async):
 * { "requestId": "c1b1f9de-...", "status": "accepted" }
 *
 * Response (polled later, completed):
 * {
 *   "requestId": "c1b1f9de-...",
 *   "status": "completed",
 *   "result": {
 *     "enquiryId": "e_1234",
 *     "matches": [{ "propertyId": "wf-101", "reasons": ["Within your $500,000 budget", "In Millbrook"] }],
 *     "alternatives": [],
 *     "assignedAgentId": "agent-priya",
 *     "taskId": "t_5678"
 *   }
 * }
 */
