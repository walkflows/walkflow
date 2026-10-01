import type { FormEvent } from "react";
import { sessionServices, type ServiceId } from "@/content/consulting-services";
import { ButtonEl } from "@/components/ui/Button";
import { generateSessionSlots, type Requirements } from "./engine";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white [color-scheme:dark] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const optionClass = "bg-navy-deep text-white";

export type RequestFormValues = Requirements & { name: string; email: string };

const defaultName = "Morgan Reyes (fictional)";
const defaultEmail = "morgan@ques-demo.example";

export function RequestForm({
  prefill,
  submitting,
  onSubmit,
}: {
  prefill: Partial<RequestFormValues> | null;
  submitting: boolean;
  onSubmit: (values: RequestFormValues) => void;
}) {
  const path = prefill?.path ?? "session";
  const slots = generateSessionSlots();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      path,
      serviceId: path === "session" ? ((data.get("serviceId") as ServiceId) || sessionServices[0].id) : null,
      projectOverview: path === "project" ? (data.get("projectOverview") as string) || "" : "",
      preferredSlotId: (data.get("preferredSlotId") as string) || slots[0].id,
      context: (data.get("context") as string) || "",
      followUpOptIn: data.get("followUpOptIn") === "on",
      name: (data.get("name") as string) || defaultName,
      email: (data.get("email") as string) || defaultEmail,
    });
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-orange">Stage 1 — {path === "session" ? "Session Request" : "Project Enquiry"}</p>
      <h3 className="mt-2 text-xl text-white">{path === "session" ? "Tell us which session you'd like" : "Tell us about your project"}</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-white/60">
        Prefilled with a fictional sample client so you can try the journey immediately — every field is editable. No real financial records or confidential
        documents are needed.
      </p>
      <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        {path === "session" && (
          <div>
            <label className={labelClass} htmlFor="req-service">
              Session
            </label>
            <select id="req-service" name="serviceId" defaultValue={prefill?.serviceId ?? sessionServices[0].id} className={`${selectClass} mt-1.5`}>
              {sessionServices.map((s) => (
                <option key={s.id} value={s.id} className={optionClass}>
                  {s.name} — US${s.price}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={labelClass} htmlFor="req-slot">
            Preferred time
          </label>
          <select id="req-slot" name="preferredSlotId" defaultValue={prefill?.preferredSlotId ?? slots[0].id} className={`${selectClass} mt-1.5`}>
            {slots.map((s) => (
              <option key={s.id} value={s.id} className={optionClass}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        {path === "project" && (
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="req-overview">
              Project overview
            </label>
            <textarea
              id="req-overview"
              name="projectOverview"
              rows={3}
              defaultValue={prefill?.projectOverview ?? "e.g. We're restructuring our pricing model ahead of a product launch and need a financial model."}
              className={`${inputClass} mt-1.5 resize-y`}
            />
          </div>
        )}
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="req-context">
            Tell us what&rsquo;s slowing your business down
          </label>
          <textarea
            id="req-context"
            name="context"
            rows={2}
            defaultValue={prefill?.context ?? "e.g. Decisions are slower than they should be because our reporting is scattered across spreadsheets."}
            className={`${inputClass} mt-1.5 resize-y`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="req-name">
            Your name
          </label>
          <input id="req-name" name="name" type="text" required defaultValue={prefill?.name ?? defaultName} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="req-email">
            Your email
          </label>
          <input id="req-email" name="email" type="email" required defaultValue={prefill?.email ?? defaultEmail} className={`${inputClass} mt-1.5`} />
        </div>
        <div className="sm:col-span-2 flex items-center gap-2.5">
          <input
            id="req-followup-optin"
            name="followUpOptIn"
            type="checkbox"
            defaultChecked={prefill?.followUpOptIn ?? true}
            className="h-4 w-4 flex-none accent-orange"
          />
          <label htmlFor="req-followup-optin" className="text-sm text-white/70">
            Receive optional follow-up communications after this {path === "session" ? "session" : "engagement"}
          </label>
        </div>
        <div className="sm:col-span-2">
          <ButtonEl type="submit" disabled={submitting}>
            {submitting ? "Saving request…" : "Submit Request"}
          </ButtonEl>
        </div>
      </form>
    </div>
  );
}
