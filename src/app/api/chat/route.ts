import { NextResponse, type NextRequest } from "next/server";
import { chatCopy } from "@/content/chat-assistant";
import { isRateLimited } from "@/lib/chat/rate-limit";
import { respond } from "@/lib/chat/respond";
import type { ChatApiResponse } from "@/lib/chat/types";

const MAX_MESSAGE_LENGTH = 500;
const MAX_BODY_BYTES = 2048;

function errorResponse(code: string, message: string, status: number) {
  const body: ChatApiResponse = { error: { code, message } };
  return NextResponse.json(body, { status });
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function readMessage(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return null;
  const keys = Object.keys(payload);
  if (keys.length !== 1 || keys[0] !== "message") return null;
  const message = (payload as { message: unknown }).message;
  if (typeof message !== "string") return null;
  return message.replace(/\p{Cc}+/gu, " ").trim();
}

export async function POST(request: NextRequest): Promise<Response> {
  if (isRateLimited(clientKey(request))) {
    return errorResponse("rate_limited", chatCopy.rateLimited, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return errorResponse("too_large", chatCopy.tooLong, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return errorResponse("invalid_json", "Send a JSON body with a single message field.", 400);
  }

  const message = readMessage(payload);
  if (!message) return errorResponse("invalid_message", "Enter a question to send.", 400);
  if (message.length > MAX_MESSAGE_LENGTH) return errorResponse("too_long", chatCopy.tooLong, 400);

  const body: ChatApiResponse = { reply: respond(message) };
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
