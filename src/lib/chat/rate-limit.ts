const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const MAX_TRACKED_CLIENTS = 5_000;

const requestTimes = new Map<string, number[]>();

/**
 * Best-effort, per-instance limit. Serverless instances do not share memory,
 * so this slows bursts from one client but is not a hard global limit. Use a
 * shared store (see docs/website-chat-and-whatsapp.md) before relying on it.
 */
export function isRateLimited(clientKey: string, now = Date.now()): boolean {
  if (requestTimes.size > MAX_TRACKED_CLIENTS) requestTimes.clear();

  const recent = (requestTimes.get(clientKey) ?? []).filter((time) => now - time < WINDOW_MS);
  const limited = recent.length >= MAX_REQUESTS_PER_WINDOW;
  if (!limited) recent.push(now);
  requestTimes.set(clientKey, recent);
  return limited;
}
