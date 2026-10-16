/**
 * Google Analytics 4 settings. The measurement ID is public by design (it is visible in any
 * page that uses GA), so a default is kept here; NEXT_PUBLIC_GA_MEASUREMENT_ID can override it.
 *
 * Analytics only ever runs on the production hostname. Local, preview (*.vercel.app) and
 * staging copies never load Google's script, show the consent banner, or send anything.
 * NEXT_PUBLIC_GA_EXTRA_HOST exists ONLY so the checks in scripts/test-analytics.mjs can
 * exercise the banner on localhost; it must never be set in production.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-9XKY1RW094";

const PRODUCTION_HOSTS = ["walkflow.tech", ...(process.env.NEXT_PUBLIC_GA_EXTRA_HOST ? [process.env.NEXT_PUBLIC_GA_EXTRA_HOST] : [])];

export function analyticsAllowedOnHost(hostname: string): boolean {
  return PRODUCTION_HOSTS.includes(hostname.toLowerCase());
}

/** Visible CTA labels that count as a consultation-button click when they link to /contact. */
const CONSULTATION_LABELS: Record<string, string> = {
  "book a consultation": "book_a_consultation",
  "request a call": "request_a_call",
  "request a consultation": "request_a_consultation",
};

export function consultationIdFromLabel(label: string): string | null {
  return CONSULTATION_LABELS[label.replace(/\s+/g, " ").trim().toLowerCase()] ?? null;
}

/** Campaign tags that may stay in the reported page address; every other query/hash part is dropped. */
export const ALLOWED_QUERY_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function safePageLocation(origin: string, pathname: string, search: string): string {
  const incoming = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const key of ALLOWED_QUERY_KEYS) {
    const value = incoming.get(key);
    if (value) kept.set(key, value.slice(0, 100));
  }
  const query = kept.toString();
  return `${origin}${pathname}${query ? `?${query}` : ""}`;
}
