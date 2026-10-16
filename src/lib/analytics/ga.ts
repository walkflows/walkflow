import { GA_MEASUREMENT_ID, safePageLocation } from "./config";

/**
 * Thin, privacy-first wrapper around Google Analytics 4 (gtag.js).
 *  - Nothing is loaded or sent until enableAnalytics() runs, which only happens after the visitor accepts.
 *  - Advertising features stay off: ad consent signals are always "denied", Google signals and ad
 *    personalisation are disabled.
 *  - Only the events/parameters allowlisted below can be sent, so names, emails, phone numbers and
 *    enquiry text can never be passed along by accident.
 */

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: string]: unknown };
const w = (): GtagWindow => window as unknown as GtagWindow;
const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

let scriptRequested = false;
let enabled = false;
let lastPagePath: string | null = null;
let lastPageLocation: string | null = null;

function ensureGtag() {
  const win = w();
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      // gtag.js requires the real `arguments` object, not an array.
      win.dataLayer!.push(arguments);
    };
  }
  return win.gtag;
}

export function enableAnalytics(): void {
  const gtag = ensureGtag();
  w()[DISABLE_FLAG] = false;
  if (!scriptRequested) {
    scriptRequested = true;
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    // Granted BEFORE the config command so no cookie-less "denied" ping is ever sent.
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false, // page views are sent by hand on every route change (see trackPageView)
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: "SameSite=Lax;Secure",
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  } else {
    gtag("consent", "update", { analytics_storage: "granted" });
  }
  enabled = true;
}

/** Stops sending and removes Google's cookies from this browser. */
export function disableAnalytics(): void {
  enabled = false;
  lastPagePath = null;
  lastPageLocation = null;
  if (scriptRequested) {
    w()[DISABLE_FLAG] = true;
    ensureGtag()("consent", "update", { analytics_storage: "denied" });
  }
  clearGoogleCookies();
}

function clearGoogleCookies() {
  try {
    const suffix = GA_MEASUREMENT_ID.replace(/^G-/, "");
    const names = ["_ga", `_ga_${suffix}`, "_gid", "_gat"];
    const host = window.location.hostname;
    const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
    for (const name of names) {
      for (const domain of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  } catch {
    // Cookie access blocked: nothing to clear.
  }
}

/** One page_view per distinct path; repeated calls for the same path (re-renders, Strict Mode) are ignored. */
export function trackPageView(pathname: string): void {
  if (!enabled || pathname === lastPagePath) return;
  try {
    const location = safePageLocation(window.location.origin, pathname, window.location.search);
    ensureGtag()("event", "page_view", {
      page_location: location,
      page_path: pathname,
      page_title: document.title,
      ...(lastPageLocation ? { page_referrer: lastPageLocation } : {}),
    });
    lastPagePath = pathname;
    lastPageLocation = location;
  } catch {
    // Analytics must never break the site.
  }
}

const SAFE_VALUE = /^[a-z0-9_\-/]{1,80}$/i;
const EVENTS = {
  consultation_click: ["cta", "page_path"],
  booking_link_click: ["page_path"],
  generate_lead: ["form_name"],
} as const;

export type AnalyticsEvent = keyof typeof EVENTS;

/** Sends an allowlisted event. Does nothing unless analytics is enabled; never throws. */
export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}): void {
  if (!enabled) return;
  try {
    const allowedKeys: readonly string[] = EVENTS[name] ?? [];
    const clean: Record<string, string> = {};
    for (const key of allowedKeys) {
      const value = params[key];
      if (typeof value === "string" && SAFE_VALUE.test(value)) clean[key] = value;
    }
    ensureGtag()("event", name, clean);
  } catch {
    // Analytics must never break the site or an enquiry.
  }
}
