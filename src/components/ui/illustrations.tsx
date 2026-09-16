import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function WebsiteIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" fill="none" aria-hidden className={className}>
      <rect x="0.5" y="0.5" width="399" height="279" rx="15.5" fill="#1A1A1A" stroke="white" strokeOpacity="0.08" />
      <circle cx="26" cy="24" r="4" fill="#FF991C" />
      <circle cx="40" cy="24" r="4" fill="white" fillOpacity="0.18" />
      <circle cx="54" cy="24" r="4" fill="white" fillOpacity="0.18" />
      <rect x="150" y="19" width="120" height="10" rx="5" fill="white" fillOpacity="0.1" />

      <rect x="24" y="52" width="180" height="18" rx="4" fill="white" fillOpacity="0.9" />
      <rect x="24" y="78" width="220" height="18" rx="4" fill="white" fillOpacity="0.9" />
      <rect x="24" y="112" width="150" height="10" rx="5" fill="white" fillOpacity="0.35" />
      <rect x="24" y="128" width="110" height="10" rx="5" fill="white" fillOpacity="0.35" />
      <rect x="24" y="156" width="96" height="30" rx="15" fill="#FF991C" />

      <rect x="240" y="112" width="136" height="110" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.12" />
      <rect x="256" y="128" width="60" height="10" rx="5" fill="#FF991C" fillOpacity="0.8" />
      <rect x="256" y="150" width="104" height="8" rx="4" fill="white" fillOpacity="0.3" />
      <rect x="256" y="164" width="88" height="8" rx="4" fill="white" fillOpacity="0.3" />
      <rect x="256" y="192" width="72" height="20" rx="10" fill="white" fillOpacity="0.14" />

      <rect x="24" y="204" width="120" height="52" rx="12" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
      <circle cx="46" cy="230" r="10" fill="#FF991C" fillOpacity="0.5" />
      <rect x="64" y="222" width="64" height="8" rx="4" fill="white" fillOpacity="0.3" />
      <rect x="64" y="236" width="48" height="8" rx="4" fill="white" fillOpacity="0.2" />
    </svg>
  );
}

export function AutomationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" fill="none" aria-hidden className={className}>
      <rect x="0.5" y="0.5" width="399" height="279" rx="15.5" fill="#1A1A1A" stroke="white" strokeOpacity="0.08" />

      <rect x="24" y="34" width="128" height="46" rx="12" fill="white" fillOpacity="0.9" />
      <rect x="40" y="48" width="60" height="8" rx="4" fill="#141414" />
      <rect x="40" y="60" width="80" height="7" rx="3.5" fill="#141414" fillOpacity="0.45" />

      <path d="M152 57h36" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 5" />

      <rect x="188" y="34" width="128" height="46" rx="12" fill="#FF991C" />
      <rect x="204" y="48" width="56" height="8" rx="4" fill="#141414" />
      <rect x="204" y="60" width="76" height="7" rx="3.5" fill="#141414" fillOpacity="0.55" />

      <path d="M250 80v28" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 5" />

      <rect x="186" y="108" width="132" height="46" rx="12" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.15" />
      <rect x="202" y="122" width="52" height="8" rx="4" fill="white" fillOpacity="0.75" />
      <rect x="202" y="134" width="80" height="7" rx="3.5" fill="white" fillOpacity="0.35" />

      <path d="M186 131h-64" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 5" />

      <rect x="24" y="108" width="128" height="46" rx="12" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.15" />
      <rect x="40" y="122" width="50" height="8" rx="4" fill="white" fillOpacity="0.75" />
      <rect x="40" y="134" width="70" height="7" rx="3.5" fill="white" fillOpacity="0.35" />

      <path d="M88 154v28" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 5" />

      <rect x="24" y="196" width="290" height="48" rx="12" fill="white" fillOpacity="0.05" stroke="#FF991C" strokeOpacity="0.5" />
      <circle cx="48" cy="220" r="9" fill="#FF991C" />
      <rect x="66" y="212" width="90" height="8" rx="4" fill="white" fillOpacity="0.75" />
      <rect x="66" y="224" width="130" height="7" rx="3.5" fill="white" fillOpacity="0.35" />
      <rect x="264" y="211" width="34" height="20" rx="10" fill="#FF991C" fillOpacity="0.85" />
    </svg>
  );
}

const buildingLike = new Set(["Apartment", "Studio", "Duplex", "Townhouse"]);

/**
 * Branded placeholder artwork for a property card — no stock or fabricated
 * photography, since these listings are fictional. Aspect ratio is fixed by
 * the wrapper (aspect-[4/3]) wherever this is used.
 */
export function PropertyThumb({ propertyType, className }: { propertyType: string; className?: string }) {
  const isBuilding = buildingLike.has(propertyType);

  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="160" height="120" fill="#141414" />
      <rect width="160" height="120" fill="url(#thumb-fade)" />
      {isBuilding ? (
        <g>
          <rect x="58" y="26" width="44" height="72" rx="3" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.18" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <rect x="65" y={34 + row * 15} width="10" height="9" rx="1.5" fill="#FF991C" fillOpacity={row === 3 ? 0.35 : 0.6} />
              <rect x="85" y={34 + row * 15} width="10" height="9" rx="1.5" fill="white" fillOpacity="0.25" />
            </g>
          ))}
        </g>
      ) : (
        <g>
          <path d="M40 62 80 34l40 28" stroke="#FF991C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="50" y="60" width="60" height="38" rx="2" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.18" />
          <rect x="72" y="76" width="16" height="22" fill="#FF991C" fillOpacity="0.55" />
          <rect x="56" y="68" width="10" height="10" fill="white" fillOpacity="0.3" />
          <rect x="94" y="68" width="10" height="10" fill="white" fillOpacity="0.3" />
        </g>
      )}
      <defs>
        <radialGradient id="thumb-fade" cx="0" cy="0" r="1" gradientTransform="translate(160 0) rotate(135) scale(210)">
          <stop stopColor="#242424" />
          <stop offset="1" stopColor="#0A0A0A" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function BrowserFrame({
  className,
  contentClassName,
  children,
}: {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-orange" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-3 h-5 flex-1 max-w-52 rounded-full bg-white/8" />
      </div>
      <div className={cx("rounded-b-xl border border-white/10 bg-navy-800", contentClassName)}>{children}</div>
    </div>
  );
}
