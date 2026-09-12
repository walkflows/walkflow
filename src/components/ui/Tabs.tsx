"use client";

import { useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cx } from "@/lib/utils";

export type TabItem = { id: string; label: string };

/**
 * Accessible horizontal tablist (WAI-ARIA APG tabs pattern, automatic activation):
 * arrow keys move focus and select in one step; Home/End jump to the ends.
 */
export function TabList({
  label,
  tabs,
  activeId,
  onChange,
  className,
  tabClassName,
  activeTabClassName,
  idPrefix = "",
}: {
  label: string;
  tabs: readonly TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  idPrefix?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusAndSelect(id: string) {
    onChange(id);
    refs.current[id]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, idx: number) {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = tabs.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      focusAndSelect(tabs[nextIdx].id);
    }
  }

  return (
    <div role="tablist" aria-label={label} className={className}>
      {tabs.map((tab, idx) => {
        const selected = activeId === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[tab.id] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={cx(tabClassName, selected && activeTabClassName)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  id,
  activeId,
  children,
  className,
  idPrefix = "",
}: {
  id: string;
  activeId: string;
  children: ReactNode;
  className?: string;
  idPrefix?: string;
}) {
  if (id !== activeId) return null;

  return (
    <div role="tabpanel" id={`${idPrefix}panel-${id}`} aria-labelledby={`${idPrefix}tab-${id}`} tabIndex={0} className={className}>
      {children}
    </div>
  );
}
