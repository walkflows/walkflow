import { NextResponse } from "next/server";
import type { DemoActionResponse } from "@/lib/consulting-demo/contract";

/**
 * PREPARED, NOT WIRED. The Consulting demo runs entirely in Preview Mode
 * (client-side simulation, see src/components/demo/consulting/session.ts)
 * and never calls this route. See src/lib/consulting-demo/contract.ts for
 * the request/response shapes this should validate and use, and
 * docs/consulting-demo-integration.md for the full setup and trace guide.
 * Mirrors src/app/api/demo/real-estate/route.ts,
 * src/app/api/demo/home-services/route.ts and
 * src/app/api/demo/clinics/route.ts's stubs exactly.
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
