"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { formatPrice, type Property } from "@/content/real-estate-properties";
import { demoStrings } from "@/content/real-estate-demo";
import { ButtonEl } from "@/components/ui/Button";
import { IconClose } from "@/components/ui/icons";
import { PropertyThumb } from "@/components/ui/illustrations";

export function PropertyDetailsDialog({
  property,
  onClose,
  onRequestViewing,
}: {
  property: Property | null;
  onClose: () => void;
  onRequestViewing: (id: string) => void;
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
      className="w-full max-w-lg rounded-3xl border border-white/10 bg-navy p-0 shadow-[var(--shadow-card)] backdrop:bg-navy-deep/60 backdrop:backdrop-blur-sm"
    >
      {property && (
        <div>
          <div className="relative aspect-[16/9]">
            {property.image ? (
              <Image src={property.image} alt={property.name} fill sizes="512px" className="rounded-t-3xl object-cover" />
            ) : (
              <PropertyThumb propertyType={property.propertyType} className="h-full w-full rounded-t-3xl" />
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close property details"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-deep hover:bg-white"
            >
              <IconClose />
            </button>
          </div>
          <div className="p-6 sm:p-7">
            <p className="text-sm font-semibold text-orange">{property.status}</p>
            <h3 className="mt-1 text-2xl text-white">{property.name}</h3>
            <p className="mt-1 text-sm text-white/60">
              {property.neighbourhood} · {property.propertyType} · {property.listingType === "buy" ? "For sale" : "To rent"}
            </p>
            <p className="mt-3 text-xl font-heading font-medium text-white">{formatPrice(property)}</p>
            <p className="mt-1 text-sm text-white/60">
              {property.bedrooms} bedroom{property.bedrooms === 1 ? "" : "s"} · {property.bathrooms} bathroom
              {property.bathrooms === 1 ? "" : "s"}
            </p>
            <p className="mt-4 leading-relaxed text-white/70">{property.description}</p>
            <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-sm text-white/60">
              Listing agent: Alex Rivera (fictional) · alex@ashcombe-demo.example
              <br />
              <span className="text-xs">{demoStrings.sampleMessageLabel}</span>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonEl variant="secondary-on-dark" className="min-w-0 flex-1 text-center leading-tight" onClick={onClose}>
                Close
              </ButtonEl>
              <ButtonEl
                className="min-w-0 flex-1 text-center leading-tight"
                onClick={() => {
                  onRequestViewing(property.id);
                }}
              >
                Request a viewing
              </ButtonEl>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
