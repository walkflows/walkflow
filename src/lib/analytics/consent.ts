/**
 * The visitor's analytics choice, kept in this browser only (localStorage). "unset" = not asked yet.
 * Changes are broadcast so the banner, the page-view tracker and the footer link stay in step.
 */
export type ConsentChoice = "unset" | "granted" | "denied";

const KEY = "wf-analytics-consent-v1";
const listeners = new Set<() => void>();
let bannerForced = false; // true while "Cookie settings" has re-opened the banner
let memoryChoice: ConsentChoice = "unset"; // used only if browser storage is blocked

export function getConsent(): ConsentChoice {
  if (typeof window === "undefined") return "unset";
  try {
    const value = window.localStorage.getItem(KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Storage blocked: fall back to the in-page choice below.
  }
  return memoryChoice;
}

export function setConsent(choice: "granted" | "denied"): void {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    // Storage blocked: the choice still applies until the page is closed.
  }
  bannerForced = false;
  notify();
}

export function openBanner(): void {
  bannerForced = true;
  notify();
}

export function closeBanner(): void {
  bannerForced = false;
  notify();
}

export function isBannerForced(): boolean {
  return bannerForced;
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) fn();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((fn) => fn());
}
