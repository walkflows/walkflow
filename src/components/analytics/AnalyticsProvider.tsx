"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { contactForm } from "@/content/contact";
import { analyticsAllowedOnHost, consultationIdFromLabel } from "@/lib/analytics/config";
import { closeBanner, getConsent, isBannerForced, setConsent, subscribe } from "@/lib/analytics/consent";
import { disableAnalytics, enableAnalytics, trackEvent, trackPageView } from "@/lib/analytics/ga";

const noopSubscribe = () => () => {};

/**
 * Consent banner + Google Analytics 4 wiring. Renders nothing and loads nothing unless the site is
 * running on the production hostname, and sends nothing until the visitor presses Accept.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const eligible = useSyncExternalStore(noopSubscribe, () => analyticsAllowedOnHost(window.location.hostname), () => false);
  const consent = useSyncExternalStore(subscribe, getConsent, () => "unset" as const);
  const forced = useSyncExternalStore(subscribe, isBannerForced, () => false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Start or stop Analytics whenever the choice changes.
  useEffect(() => {
    if (!eligible) return;
    if (consent === "granted") enableAnalytics();
    else disableAnalytics();
  }, [eligible, consent]);

  // One page_view per route change (the first load included). Short wait so document.title is the new page's.
  useEffect(() => {
    if (!eligible || consent !== "granted") return;
    const timer = window.setTimeout(() => trackPageView(pathname), 150);
    return () => window.clearTimeout(timer);
  }, [eligible, consent, pathname]);

  // Consultation-button and booking-link clicks. A click is only a click: neither is a completed booking.
  useEffect(() => {
    if (!eligible || consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href === contactForm.bookingLink) {
        trackEvent("booking_link_click", { page_path: window.location.pathname });
        return;
      }
      if (href === "/contact" || href.startsWith("/contact?")) {
        const cta = consultationIdFromLabel(anchor.textContent ?? "");
        if (cta) trackEvent("consultation_click", { cta, page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [eligible, consent]);

  const visible = eligible && (consent === "unset" || forced);

  // When "Cookie settings" re-opens the banner, move focus into it and let Escape close it.
  useEffect(() => {
    if (!visible || !forced) return;
    bannerRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBanner();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, forced]);

  if (!visible) return null;

  const button =
    "inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white bg-white px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors duration-150 ease-out hover:border-orange hover:bg-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-white/15 bg-navy-deep p-5 text-white shadow-[var(--shadow-card)] focus:outline-none sm:bottom-6"
    >
      <h2 id="cookie-banner-title" className="font-body text-base font-bold">
        Can we use analytics cookies?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        With your OK, we use Google Analytics to count visits and see which pages and buttons are used. It never receives
        your name, email, phone number or enquiry. No advertising cookies are used. If you say no, nothing is sent to Google.{" "}
        <Link href="/privacy#analytics" className="underline underline-offset-4 hover:text-orange">
          Read how this works
        </Link>
        .
      </p>
      {forced && consent !== "unset" && (
        <p className="mt-2 text-sm text-white/60">Your current choice: {consent === "granted" ? "Accepted" : "Rejected"}.</p>
      )}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={button} onClick={() => setConsent("granted")}>
          Accept analytics
        </button>
        <button type="button" className={button} onClick={() => setConsent("denied")}>
          Reject analytics
        </button>
      </div>
    </div>
  );
}
