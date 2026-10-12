/**
 * Client identity for rate limiting. Forwarding headers are client-controlled
 * unless the platform or reverse proxy overwrites them, so they are trusted
 * only where that is known to happen:
 *  - On Vercel (VERCEL=1) the edge sets x-vercel-forwarded-for / x-real-ip to
 *    the connecting client's address and discards any value the client sent.
 *  - Self-hosted behind Caddy: set CLIENT_IP_HEADER=x-wf-client-ip. Caddy must
 *    OVERWRITE that header with the real connecting address on every request
 *    (`header_up X-WF-Client-IP {remote_host}`) and the app port must be
 *    reachable only from Caddy (loopback / private network). Then a forged
 *    header from a visitor never reaches the app.
 *  - ENQUIRY_TEST_RECEIVER=1 (scripts/test-*.mjs only) lets the local tests
 *    vary x-forwarded-for.
 * Anywhere else every caller shares one bucket ("unverified"), which is safe
 * (never bypassable by spoofing) at the cost of a shared limit.
 */
const IP_LIKE = /^[0-9a-fA-F:.]{3,45}$/;
const HEADER_NAME = /^[a-z0-9-]{3,40}$/;

export function trustedClientIp(headers: Headers): string {
  let candidate: string | null = null;
  const proxyHeader = (process.env.CLIENT_IP_HEADER ?? "").toLowerCase();
  if (HEADER_NAME.test(proxyHeader)) {
    candidate = headers.get(proxyHeader);
  } else if (process.env.VERCEL === "1") {
    candidate = headers.get("x-vercel-forwarded-for") ?? headers.get("x-real-ip");
  } else if (process.env.ENQUIRY_TEST_RECEIVER === "1") {
    candidate = headers.get("x-forwarded-for");
  }
  const first = candidate?.split(",")[0]?.trim() ?? "";
  return IP_LIKE.test(first) ? first : "unverified";
}
