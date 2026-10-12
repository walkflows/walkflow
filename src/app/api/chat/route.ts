import { NextResponse, type NextRequest } from "next/server";
import { chatCopy } from "@/content/chat-assistant";
import { isRateLimited } from "@/lib/chat/rate-limit";
import { trustedClientIp } from "@/lib/client-ip";
import { readLimitedText } from "@/lib/read-body";
import { sharedRateLimit } from "@/lib/shared-rate-limit";
import { respond } from "@/lib/chat/respond";
import type { ChatApiResponse } from "@/lib/chat/types";

const MAX_MESSAGE_LENGTH = 500;
const MAX_BODY_BYTES = 2048;

function errorResponse(code: string, message: string, status: number) {
  const body: ChatApiResponse = { error: { code, message } };
  return NextResponse.json(body, { status });
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
  const client = trustedClientIp(request.headers);
  if ((await sharedRateLimit("chat", client, 20, 60)) === "limited" || isRateLimited(client)) {
    return errorResponse("rate_limited", chatCopy.rateLimited, 429);
  }

  const body = await readLimitedText(request, MAX_BODY_BYTES);
  if (!body.ok) return errorResponse("too_large", chatCopy.tooLong, 413);
  const raw = body.text;

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return errorResponse("invalid_json", "Send a JSON body with a single message field.", 400);
  }

  const message = readMessage(payload);
  if (!message) return errorResponse("invalid_message", "Enter a question to send.", 400);
  if (message.length > MAX_MESSAGE_LENGTH) return errorResponse("too_long", chatCopy.tooLong, 400);

  const reply: ChatApiResponse = { reply: respond(message) };
  return NextResponse.json(reply, { headers: { "Cache-Control": "no-store" } });
}
