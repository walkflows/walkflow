import { NextResponse, type NextRequest } from "next/server";
import { trustedClientIp } from "@/lib/client-ip";
import { enquiryRateLimited, forwardEnquiry, validateEnquiry, type FieldErrors } from "@/lib/enquiry-server";
import { sharedRateLimit } from "@/lib/shared-rate-limit";

/**
 * POST /api/enquiry — the contact form's only way out.
 * Browser → this route (validation, size + rate limits) → n8n webhook with the
 * X-WalkFlow-Secret header → Google Sheets. Answers 200 only once n8n confirms
 * the enquiry is saved. Never logs form contents.
 */

const MAX_BODY_BYTES = 8 * 1024;

export type EnquiryApiResponse =
  | { ok: true; duplicate: boolean }
  | { ok: false; code: "invalid" | "rate_limited" | "not_saved" | "uncertain" | "not_configured" | "too_large"; fieldErrors?: FieldErrors };

const reply = (body: EnquiryApiResponse, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest): Promise<Response> {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reply({ ok: false, code: "too_large" }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return reply({ ok: false, code: "invalid" }, 400);
  }

  const checked = validateEnquiry(payload);
  if (!checked.ok) return reply({ ok: false, code: "invalid", fieldErrors: checked.errors }, 400);

  // Shared (cross-instance) limit when a store is configured; the in-memory limiter always runs as well.
  // Note: retries of one submission also count against the shared budget (5 per 10 minutes per client).
  const client = trustedClientIp(request.headers);
  const shared = await sharedRateLimit("enquiry", client, 5, 600);
  if (shared === "limited" || enquiryRateLimited(client, checked.data.submissionId ?? "")) return reply({ ok: false, code: "rate_limited" }, 429);

  const result = await forwardEnquiry(checked.data);
  switch (result.kind) {
    case "saved":
      return reply({ ok: true, duplicate: result.duplicate }, 200);
    case "invalid":
      return reply({ ok: false, code: "invalid", fieldErrors: result.errors }, 400);
    case "not-saved":
      return reply({ ok: false, code: "not_saved" }, 503);
    case "not-configured":
      return reply({ ok: false, code: "not_configured" }, 503);
    default:
      return reply({ ok: false, code: "uncertain" }, 504);
  }
}
