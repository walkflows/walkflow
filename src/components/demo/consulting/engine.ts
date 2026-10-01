import {
  consultantForCustomProject,
  consultantForService,
  type Consultant,
  type EngagementPath,
  type ServiceId,
} from "@/content/consulting-services";

/**
 * Deterministic, rule-based demo logic — mirrors the architecture used by
 * the Real Estate, Home Services and Clinics demos but is an entirely
 * separate module with its own data and rules. No paid AI service is used
 * or required for any of this.
 */

export type Requirements = {
  path: EngagementPath;
  serviceId: ServiceId | null; // null when path is "project"
  projectOverview: string; // used only when path is "project"
  preferredSlotId: string;
  context: string; // "tell us about your project" — shared field, both paths
  followUpOptIn: boolean;
};

export function assignConsultant(path: EngagementPath, serviceId: ServiceId | null): Consultant {
  if (path === "project" || !serviceId) return consultantForCustomProject();
  return consultantForService(serviceId);
}

export type TimeSlot = { id: string; label: string; iso: string };

function buildSlots(from: Date, offsets: Array<{ days: number; hour: number }>): TimeSlot[] {
  return offsets.map(({ days, hour }) => {
    const d = new Date(from);
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return {
      id: `slot-${days}-${hour}`,
      label: `${d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })} · ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`,
      iso: d.toISOString(),
    };
  });
}

/** Future session slots — Stage 1's "preferred time" and Stage 3's actual request both draw from this same generator. */
export function generateSessionSlots(from: Date = new Date()): TimeSlot[] {
  return buildSlots(from, [
    { days: 1, hour: 10 },
    { days: 2, hour: 14 },
    { days: 4, hour: 11 },
  ]);
}

/** Project kickoff dates sit further out than session slots, reflecting the real sequence (proposal accepted, then a kickoff is scheduled). */
export function generateKickoffSlots(from: Date = new Date()): TimeSlot[] {
  return buildSlots(from, [
    { days: 7, hour: 9 },
    { days: 10, hour: 9 },
    { days: 14, hour: 9 },
  ]);
}
