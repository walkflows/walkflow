"use client";

import { useEffect, useRef } from "react";
import { formatPrice, type Property } from "@/content/real-estate-properties";
import { demoStrings } from "@/content/real-estate-demo";
import { ButtonEl } from "@/components/ui/Button";
import { IconClose } from "@/components/ui/icons";
import { PropertyThumb } from "@/components/ui/illustrations";

export function PropertyDetailsDialog({
  property,
  onClose,
  onBookViewing,
}: {
  property: Property | null;
  onClose: () => void;
  onBookViewing: (id: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (property && !dialog.open) {
      dialog.showModal();
    } else if (!property && dialog.open) {
      dialog.close();
    }
  }, [property]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="w-full max-w-lg rounded-3xl border border-navy/10 bg-white p-0 shadow-[var(--shadow-card)] backdrop:bg-navy-deep/60 backdrop:backdrop-blur-sm"
    >
      {property && (
        <div>
          <div className="relative aspect-[16/9]">
            <PropertyThumb propertyType={property.propertyType} className="h-full w-full rounded-t-3xl" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close property details"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy hover:bg-white"
            >
              <IconClose />
            </button>
          </div>
          <div className="p-6 sm:p-7">
            <p className="text-sm font-semibold text-orange-dark">{property.status}</p>
            <h3 className="mt-1 text-2xl font-bold text-navy">{property.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {property.neighbourhood} · {property.propertyType} · {property.listingType === "buy" ? "For sale" : "To rent"}
            </p>
            <p className="mt-3 text-xl font-bold text-navy">{formatPrice(property)}</p>
            <p className="mt-1 text-sm text-muted">
              {property.bedrooms} bedroom{property.bedrooms === 1 ? "" : "s"} · {property.bathrooms} bathroom
              {property.bathrooms === 1 ? "" : "s"}
            </p>
            <p className="mt-4 leading-relaxed text-muted">{property.description}</p>
            <p className="mt-4 rounded-xl bg-surface p-3.5 text-sm text-muted">
              Listing agent: Alex Rivera (fictional) · alex@ashcombe-demo.example
              <br />
              <span className="text-xs">{demoStrings.sampleMessageLabel}</span>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonEl variant="secondary" className="flex-1" onClick={onClose}>
                Close
              </ButtonEl>
              <ButtonEl
                className="flex-1"
                onClick={() => {
                  onBookViewing(property.id);
                }}
              >
                Book a viewing
              </ButtonEl>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
