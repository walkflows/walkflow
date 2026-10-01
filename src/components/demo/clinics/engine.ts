import {
  followUpInstructions,
  providerForCategory,
  receptionStaff,
  waitlistCandidateForCategory,
  type PatientKind,
  type Provider,
  type ReceptionStaff,
  type ServiceCategoryId,
  type WaitlistCandidate,
} from "@/content/clinics-services";

/**
 * Deterministic, rule-based demo logic — mirrors the architecture used by
 * the Real Estate and Home Services demos but is an entirely separate
 * module with its own data and rules. No paid AI service is used or
 * required for any of this; free-text notes are never used to infer
 * clinical urgency or choose treatment.
 */

export type Requirements = {
  categoryId: ServiceCategoryId;
  patientKind: PatientKind;
  preferredSlotId: string;
  supportNeedsId: string;
  note: string;
  followUpOptIn: boolean;
};

/** "not-sure" always routes to the reception-review owner; everything else matches by category. */
export function assignReceptionOwner(categoryId: ServiceCategoryId): ReceptionStaff {
  const byCategory = receptionStaff.find((r) => r.categories.includes(categoryId));
  return byCategory ?? receptionStaff[receptionStaff.length - 1];
}

/** No provider is assigned for "not-sure" — the category itself is still pending reception review. */
export function assignProvider(categoryId: ServiceCategoryId): Provider | null {
  if (categoryId === "not-sure") return null;
  return providerForCategory(categoryId);
}

export type AppointmentSlot = { id: string; label: string; iso: string };

function buildSlots(from: Date, offsets: Array<{ days: number; hour: number }>): AppointmentSlot[] {
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

/** Always future slots — Stage 1's "preferred time" and Stage 3's actual request both draw from this same generator, so there is never a stale or past slot to pick. */
export function generateAppointmentSlots(from: Date = new Date()): AppointmentSlot[] {
  return buildSlots(from, [
    { days: 1, hour: 9 },
    { days: 2, hour: 14 },
    { days: 4, hour: 11 },
  ]);
}

/**
 * Conceptual overlap check for Stage 3. This demo only ever models one
 * active appointment per session, so there is trivially nothing to
 * conflict with — but the check is kept as a real function (not skipped)
 * so a future multi-appointment Connected Mode has a documented place to
 * extend it, rather than silently assuming no conflicts are possible.
 */
export function hasConflict(existingSlotIso: string | null, candidateSlotIso: string): boolean {
  if (!existingSlotIso) return false;
  return existingSlotIso === candidateSlotIso;
}

export function waitlistCandidateFor(categoryId: ServiceCategoryId): WaitlistCandidate | null {
  return waitlistCandidateForCategory(categoryId);
}

export function followUpInstructionFor(categoryId: ServiceCategoryId): string | null {
  return followUpInstructions[categoryId];
}
