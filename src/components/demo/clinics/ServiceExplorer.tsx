"use client";

import { useState } from "react";
import { serviceCategories } from "@/content/clinics-services";
import { ButtonEl } from "@/components/ui/Button";
import { ServiceCard } from "./ServiceCard";

const INITIAL_VISIBLE_COUNT = 3;

export function ServiceExplorer({
  onViewDetails,
  onRequestAppointment,
}: {
  onViewDetails: (id: string) => void;
  onRequestAppointment: (id: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? serviceCategories : serviceCategories.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div>
      <p className="text-sm text-white/50">{serviceCategories.length} sample services · Happy Clinics (reference business — fictional demo records)</p>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} onViewDetails={onViewDetails} onRequestAppointment={onRequestAppointment} />
        ))}
      </ul>

      {serviceCategories.length > INITIAL_VISIBLE_COUNT && (
        <div className="mt-6 flex justify-center">
          <ButtonEl variant="secondary-on-dark" size="sm" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show fewer" : "View all services"}
          </ButtonEl>
        </div>
      )}
    </div>
  );
}
