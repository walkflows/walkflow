"use client";

import { useSyncExternalStore } from "react";
import { analyticsAllowedOnHost } from "@/lib/analytics/config";
import { openBanner } from "@/lib/analytics/consent";

const noopSubscribe = () => () => {};

/** Footer link that re-opens the analytics choice. Only shown where analytics can run (the live site). */
export function CookieSettingsButton() {
  const eligible = useSyncExternalStore(noopSubscribe, () => analyticsAllowedOnHost(window.location.hostname), () => false);
  if (!eligible) return null;
  return (
    <button type="button" onClick={openBanner} className="hover:text-white focus-visible:outline-2 focus-visible:outline-orange">
      Cookie settings
    </button>
  );
}
