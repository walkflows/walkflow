"use client";

import { useState } from "react";
import Link from "next/link";
import { journeyPreview } from "@/content/home";
import { IconArrowUpRight } from "@/components/ui/icons";
import { TabList, TabPanel } from "@/components/ui/Tabs";

type PanelId = keyof typeof journeyPreview.panels;

export function JourneyPreview() {
  const [active, setActive] = useState<PanelId>("attract");

  return (
    <div>
      <TabList
        label="Customer journey stages"
        tabs={journeyPreview.tabs}
        activeId={active}
        onChange={(id) => setActive(id as PanelId)}
        idPrefix="home-journey-"
        className="flex flex-wrap gap-2"
        tabClassName="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/60 hover:text-white"
        activeTabClassName="border-orange! bg-orange/15! text-orange-light!"
      />

      {journeyPreview.tabs.map((tab) => {
        const panel = journeyPreview.panels[tab.id as PanelId];
        return (
          <TabPanel key={tab.id} id={tab.id} activeId={active} idPrefix="home-journey-" className="mt-5">
            <h3 className="text-base font-bold text-white">{panel.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/60">{panel.body}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {panel.rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3.5 py-2.5"
                >
                  <span className="text-sm font-semibold text-white">{row.label}</span>
                  <span className="text-xs text-white/50">{row.detail}</span>
                </li>
              ))}
            </ul>
          </TabPanel>
        );
      })}

      <Link
        href="/demos/real-estate"
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-light"
      >
        Open the full demo
        <IconArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
