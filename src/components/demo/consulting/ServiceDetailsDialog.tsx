"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { SessionService } from "@/content/consulting-services";
import { ButtonEl } from "@/components/ui/Button";
import { IconClose } from "@/components/ui/icons";

export function ServiceDetailsDialog({
  service,
  onClose,
  onArrangeSession,
}: {
  service: SessionService | null;
  onClose: () => void;
  onArrangeSession: (id: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (service && !dialog.open) {
      dialog.showModal();
    } else if (!service && dialog.open) {
      dialog.close();
    }
  }, [service]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="w-full max-w-lg rounded-3xl border border-white/10 bg-navy p-0 shadow-[var(--shadow-card)] backdrop:bg-navy-deep/60 backdrop:backdrop-blur-sm"
    >
      {service && (
        <div>
          <div className="relative aspect-[16/9]">
            {service.image && <Image src={service.image} alt={service.name} fill sizes="512px" className="rounded-t-3xl object-cover" />}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close service details"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-deep hover:bg-white"
            >
              <IconClose />
            </button>
          </div>
          <div className="p-6 sm:p-7">
            <h3 className="text-2xl text-white">{service.name}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{service.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{service.sessionSummary}</p>
            <p className="mt-3 text-sm font-semibold text-orange">
              US${service.price} · {service.durationMinutes} minutes
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonEl variant="secondary-on-dark" className="min-w-0 flex-1 text-center leading-tight" onClick={onClose}>
                Close
              </ButtonEl>
              <ButtonEl className="min-w-0 flex-1 text-center leading-tight" onClick={() => onArrangeSession(service.id)}>
                Arrange Session
              </ButtonEl>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
