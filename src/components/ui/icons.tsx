type IconProps = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
} as const;

export function IconWebsite({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 8.5h18" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6.2" cy="6.5" r="0.6" fill="currentColor" />
      <circle cx="8.2" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconAutomation({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M17.6 3.8v3h-3M6.4 20.2v-3h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEnquiry({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6.5h16v11H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSchedule({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3.5v3.2M16 3.5v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 13.2h2M13.5 13.2h2M8.5 16.4h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9.5h12V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19.5v-6h4v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWrench({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M14.7 8.3a4 4 0 0 1-5.3 5.3L5 18l1 1 4.4-4.4a4 4 0 0 1 5.3-5.3l-2.5 2.5-1.3-1.3 2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconPulse({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M4 13h3.5l2-4.5 3 9 2-6.5 1.5 2h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBriefcase({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="8" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3.5 13h17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
