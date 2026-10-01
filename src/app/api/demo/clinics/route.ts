import { NextResponse } from "next/server";
import type { DemoActionResponse } from "@/lib/clinics-demo/contract";

/**
 * PREPARED, NOT WIRED. The Clinics demo runs entirely in Preview Mode
 * (client-side simulation, see src/components/demo/clinics/session.ts)
 * and never calls this route. See src/lib/clinics-demo/contract.ts for
 * the request/response shapes this should validate and use, and
 * docs/clinics-demo-integration.md for the full setup and trace guide.
 * Mirrors src/app/api/demo/real-estate/route.ts and
 * src/app/api/demo/home-services/route.ts's stubs exactly.
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
