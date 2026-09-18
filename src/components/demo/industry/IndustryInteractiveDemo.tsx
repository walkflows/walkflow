"use client";

import { useState, type FormEvent } from "react";
import type { IndustryDemoContent } from "@/content/industry-demos";
import { Button, ButtonEl } from "@/components/ui/Button";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import { IconCheck } from "@/components/ui/icons";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
const inputClass = selectClass;
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-white/50";
const tabPanelClass = "mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8";

type Submission = { name: string; email: string; slot: string; issue: string };

/**
 * Generic two-mode interactive demo (customer flow + business-side view of
 * the resulting record) reused across the Home Services, Clinics and
 * Consulting Firms demo pages — same mechanism, components and styling as
 * /demos/real-estate's tabbed demo, parameterised per industry via
 * `content.interactiveDemo` rather than duplicated three times.
 */
export function IndustryInteractiveDemo({ content }: { content: IndustryDemoContent }) {
  const demo = content.interactiveDemo;
  const tabs = [
    { id: "customer", label: demo.customerTabLabel },
    { id: "business", label: demo.businessTabLabel },
  ] as const;

  const [activeTab, setActiveTab] = useState<"customer" | "business">("customer");
  const [submission, setSubmission] = useState<Submission | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmission({
      name: (data.get("name") as string) || "",
      email: (data.get("email") as string) || "",
      slot: (data.get("slot") as string) || demo.slots[0],
      issue: (data.get("issue") as string) || "",
    });
    setActiveTab("business");
  }

  function handleReset() {
    setSubmission(null);
    setActiveTab("customer");
  }

  return (
    <div id="interactive-demo" className="scroll-mt-24">
      <div className="rounded-2xl border border-orange/25 bg-orange/[0.08] p-4 text-sm font-medium text-white/85">
        {demo.disclaimer}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabList
          label={`${content.hero.heading} demo sections`}
          tabs={tabs}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as "customer" | "business")}
          className="flex flex-wrap gap-2"
          tabClassName="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white"
          activeTabClassName="border-orange! bg-orange! text-navy-deep!"
        />
        <ButtonEl variant="secondary-on-dark" size="sm" onClick={handleReset} className="self-start sm:self-auto">
          Restart Demo
        </ButtonEl>
      </div>

      <TabPanel id="customer" activeId={activeTab} className={tabPanelClass}>
        <p className={labelClass}>Available slots</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {demo.slots.map((slot) => (
            <span key={slot} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/70">
              {slot}
            </span>
          ))}
        </div>

        <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="demo-slot">
              {demo.slotLabel}
            </label>
            <select id="demo-slot" name="slot" defaultValue={demo.slots[0]} className={`${selectClass} mt-1.5`}>
              {demo.slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="demo-issue">
              {demo.issueLabel}
            </label>
            <textarea
              id="demo-issue"
              name="issue"
              required
              rows={3}
              placeholder={demo.issuePlaceholder}
              className={`${inputClass} mt-1.5 resize-none`}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="demo-name">
              Your name
            </label>
            <input
              id="demo-name"
              name="name"
              type="text"
              required
              placeholder="e.g. Jordan Ellis (fictional)"
              className={`${inputClass} mt-1.5`}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="demo-email">
              Your email
            </label>
            <input
              id="demo-email"
              name="email"
              type="email"
              required
              placeholder="e.g. jordan@demo.example"
              className={`${inputClass} mt-1.5`}
            />
          </div>
          <div className="sm:col-span-2">
            <ButtonEl type="submit">{demo.submitLabel}</ButtonEl>
          </div>
        </form>
      </TabPanel>

      <TabPanel id="business" activeId={activeTab} className={tabPanelClass}>
        {!submission ? (
          <p className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
            {demo.emptyStateBody}
          </p>
        ) : (
          <div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="font-semibold text-white">{submission.name || "Fictional customer"}</p>
              <p className="mt-1 text-sm text-white/60">{submission.email}</p>
              <p className="mt-3 text-sm text-white/70">{submission.issue}</p>
              <p className="mt-2 text-sm text-white/50">{demo.slotLabel}: {submission.slot}</p>
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {demo.businessSteps.map((step) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-orange text-navy-deep">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/60">{step.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="font-semibold text-white">{demo.confirmationHeading}</p>
              <div className="mt-4">
                <Button href={content.finalCta.cta.href}>{content.finalCta.cta.label}</Button>
              </div>
            </div>
          </div>
        )}
      </TabPanel>
    </div>
  );
}
