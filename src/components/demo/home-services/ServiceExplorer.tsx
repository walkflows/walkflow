"use client";

import { useState } from "react";
import { roofingServices, sampleServiceAreaLabel } from "@/content/home-services-roofing";
import { ButtonEl } from "@/components/ui/Button";
import { ServiceCard } from "./ServiceCard";

const INITIAL_VISIBLE_COUNT = 3;

export function ServiceExplorer({
  onViewDetails,
  onRequestInspection,
}: {
  onViewDetails: (id: string) => void;
  onRequestInspection: (id: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? roofingServices : roofingServices.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div>
      <p className="text-sm text-white/50">
        {roofingServices.length} sample services · {sampleServiceAreaLabel}
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} onViewDetails={onViewDetails} onRequestInspection={onRequestInspection} />
        ))}
      </ul>

      {roofingServices.length > INITIAL_VISIBLE_COUNT && (
        <div className="mt-6 flex justify-center">
          <ButtonEl variant="secondary-on-dark" size="sm" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show fewer" : "View all services"}
          </ButtonEl>
        </div>
      )}
    </div>
  );
}
