/**
 * Client identity for rate limiting. Forwarding headers are client-controlled
 * unless the platform overwrites them, so they are trusted only where that is
 * known to happen:
 *  - On Vercel (VERCEL=1) the edge sets x-vercel-forwarded-for / x-real-ip to
 *    the connecting client's address and discards any value the client sent.
 *  - ENQUIRY_TEST_RECEIVER=1 (scripts/test-enquiry.mjs only) lets the local
 *    test vary x-forwarded-for.
 * Anywhere else every caller shares one bucket ("unverified"), which is safe
 * (never bypassable by spoofing) at the cost of a shared limit.
 */
const IP_LIKE = /^[0-9a-fA-F:.]{3,45}$/;

export function trustedClientIp(headers: Headers): string {
  let candidate: string | null = null;
  if (process.env.VERCEL === "1") {
    candidate = headers.get("x-vercel-forwarded-for") ?? headers.get("x-real-ip");
  } else if (process.env.ENQUIRY_TEST_RECEIVER === "1") {
    candidate = headers.get("x-forwarded-for");
  }
  const first = candidate?.split(",")[0]?.trim() ?? "";
  return IP_LIKE.test(first) ? first : "unverified";
}
