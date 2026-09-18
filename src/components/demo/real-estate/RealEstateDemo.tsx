"use client";

import { useState } from "react";
import { demoStrings, demoTabs, type DemoTabId } from "@/content/real-estate-demo";
import { properties } from "@/content/real-estate-properties";
import { ButtonEl } from "@/components/ui/Button";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import { AgentView } from "./AgentView";
import { PreferenceForm, type PreferenceResult, type PreferenceValues } from "./PreferenceForm";
import { PropertyDetailsDialog } from "./PropertyDetailsDialog";
import { PropertyExplorer, initialFilters, matchesFilters } from "./PropertyExplorer";
import type { Filters, Lead } from "./types";
import { ViewingRequestForm, type ViewingResult, type ViewingValues } from "./ViewingRequestForm";

const tabPanelClass = "mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8";

function summarisePreferences(values: PreferenceValues) {
  const listing = values.listingType === "buy" ? "Buy" : "Rent";
  const budget = values.maxBudget ? `up to $${values.maxBudget.toLocaleString("en-US")}` : "no max budget";
  const beds = values.minBedrooms > 0 ? `${values.minBedrooms}+ beds` : "any beds";
  const type = values.propertyType === "any" ? "any type" : values.propertyType;
  const area = values.neighbourhood === "any" ? "any area" : values.neighbourhood;
  return `${listing} · ${area} · ${budget} · ${beds} · ${type}`;
}

export function RealEstateDemo() {
  const [activeTab, setActiveTab] = useState<DemoTabId>("browse");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [pendingPropertyId, setPendingPropertyId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [preferenceResult, setPreferenceResult] = useState<PreferenceResult | null>(null);
  const [viewingResult, setViewingResult] = useState<ViewingResult | null>(null);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) ?? null;

  function handleBookViewing(id: string) {
    setSelectedPropertyId(null);
    setPendingPropertyId(id);
    setActiveTab("viewing");
  }

  function handlePreferenceSubmit(values: PreferenceValues) {
    const matched = properties.filter((p) =>
      matchesFilters(p, {
        listingType: values.listingType,
        neighbourhood: values.neighbourhood,
        maxBudget: values.maxBudget,
        minBedrooms: values.minBedrooms,
        propertyType: values.propertyType,
      }),
    );
    const matchedPropertyIds = matched.map((p) => p.id);
    setPreferenceResult({ matchedPropertyIds });
    setLeads((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: values.name,
        email: values.email,
        stage: matchedPropertyIds.length > 0 ? "Matched" : "New Enquiry",
        requirementsSummary: summarisePreferences(values),
        matchedPropertyIds,
        followUpReady: false,
      },
    ]);
  }

  function handleViewingSubmit(values: ViewingValues) {
    setViewingResult({ propertyId: values.propertyId, date: values.date });
    const property = properties.find((p) => p.id === values.propertyId);
    setLeads((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: values.name,
        email: values.email,
        stage: "Viewing Requested",
        requirementsSummary: `Viewing request · ${property?.name ?? "sample property"}`,
        matchedPropertyIds: [],
        viewing: { propertyId: values.propertyId, date: values.date },
        followUpReady: true,
      },
    ]);
  }

  function handleResetDemo() {
    setActiveTab("browse");
    setFilters(initialFilters);
    setSelectedPropertyId(null);
    setPendingPropertyId(null);
    setLeads([]);
    setPreferenceResult(null);
    setViewingResult(null);
  }

  return (
    <div id="interactive-demo" className="scroll-mt-24">
      <div className="rounded-2xl border border-orange/25 bg-orange/[0.08] p-4 text-sm font-medium text-white/85">
        {demoStrings.persistentNotice}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabList
          label="Real estate demo sections"
          tabs={demoTabs}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as DemoTabId)}
          className="flex flex-wrap gap-2"
          tabClassName="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white"
          activeTabClassName="border-orange! bg-orange! text-navy-deep!"
        />
        <ButtonEl variant="secondary-on-dark" size="sm" onClick={handleResetDemo} className="self-start sm:self-auto">
          {demoStrings.restartDemo}
        </ButtonEl>
      </div>

      <TabPanel id="browse" activeId={activeTab} className={tabPanelClass}>
        <PropertyExplorer
          filters={filters}
          onFiltersChange={setFilters}
          onViewDetails={setSelectedPropertyId}
          onBookViewing={handleBookViewing}
        />
      </TabPanel>

      <TabPanel id="requirements" activeId={activeTab} className={tabPanelClass}>
        <PreferenceForm onSubmit={handlePreferenceSubmit} result={preferenceResult} />
      </TabPanel>

      <TabPanel id="viewing" activeId={activeTab} className={tabPanelClass}>
        <ViewingRequestForm initialPropertyId={pendingPropertyId} onSubmit={handleViewingSubmit} result={viewingResult} />
      </TabPanel>

      <TabPanel id="agent" activeId={activeTab} className={tabPanelClass}>
        <AgentView leads={leads} />
      </TabPanel>

      <PropertyDetailsDialog property={selectedProperty} onClose={() => setSelectedPropertyId(null)} onBookViewing={handleBookViewing} />
    </div>
  );
}
