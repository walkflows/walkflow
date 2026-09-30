import { NextResponse } from "next/server";
import type { DemoActionResponse } from "@/lib/real-estate-demo/contract";

/**
 * PREPARED, NOT WIRED. The Real Estate demo runs entirely in Preview Mode
 * (client-side simulation, see src/components/demo/real-estate/session.ts)
 * and never calls this route. It exists so a future Connected Mode has a
 * real place to land without inventing a new route or touching the demo
 * UI's contract — see src/lib/real-estate-demo/contract.ts for the request/
 * response shapes this should validate and use, and
 * docs/real-estate-demo-integration.md for the full setup and trace guide.
 *
 * Until N8N_REAL_ESTATE_WEBHOOK_URL and the Supabase service credentials
 * are configured and tested, this always returns a clean "unconfigured"
 * response rather than a crash — so hitting this URL by accident (or a
 * stray future fetch call) can never break the build or produce a
 * misleading success.
 */
export async function POST(): Promise<Response> {
  const body: DemoActionResponse = {
    requestId: "unconfigured",
    status: "failed",
    error: {
      code: "unconfigured",
      message: "Connected Mode is not configured yet. This demo runs in Preview Mode only.",
    },
  };
  return NextResponse.json(body, { status: 501 });
}
