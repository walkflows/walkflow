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

export function IconMail({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 6.5 7.5 6.5 7.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMobile({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="3" width="10" height="18" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 18h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconPeople({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="8.5" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c.55-3.1 2.55-4.7 5-4.7s4.45 1.6 5 4.7M14.3 19c.4-2.3 1.7-3.7 3.4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDocument({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M7 3.5h6.5L18 8v11.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.5 3.5V8H18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.7 12.5h6M8.7 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M4 6.8A2.8 2.8 0 0 1 6.8 4h10.4A2.8 2.8 0 0 1 20 6.8v6.9a2.8 2.8 0 0 1-2.8 2.8H10l-4.2 3.4v-3.4H6.8A2.8 2.8 0 0 1 4 13.7V6.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconGear({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M17.8 6.2l-1.55 1.55M7.75 16.25 6.2 17.8M17.8 17.8l-1.55-1.55M7.75 7.75 6.2 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSwap({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8h13.5M13.5 4.5 17.5 8l-4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16H6.5M10.5 12.5 6.5 16l4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M6.5 4.5c-1 0-2 .8-2 2 0 7 5.5 12.5 12.5 12.5 1.2 0 2-1 2-2v-2.3c0-.5-.3-.9-.8-1l-3-.7c-.4-.1-.9 0-1.1.4l-.8 1.2a9 9 0 0 1-4.4-4.4l1.2-.8c.4-.3.5-.7.4-1.1l-.7-3c-.1-.5-.5-.8-1-.8H6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconWhatsapp({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.4c.2-.5.4-.5.7-.5h.5c.2 0 .3.1.4.3l.5 1.2c.1.2 0 .4-.1.5l-.4.5c-.1.1-.1.3 0 .4.4.8 1.1 1.5 1.9 1.9.1.1.3.1.4 0l.5-.4c.1-.1.3-.2.5-.1l1.2.5c.2.1.3.2.3.4v.5c0 .3-.3.7-.6.8-1.8.6-4.1-.6-5.4-1.9-1.3-1.3-2.5-3.6-1.9-5.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconWhatsappBrand({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.8 11.8 0 0 0-3.5-8.42"
      />
    </svg>
  );
}

export function IconLinkedin({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.7" cy="8.2" r="1.1" fill="currentColor" />
      <path d="M7.7 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M11.3 17v-3.6c0-1.3.8-2.1 2-2.1s2 .8 2 2.1V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.3 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconTiktok({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
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

export function IconClose({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <path d="M11 4 6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPause({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <rect x="2.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="8.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
    </svg>
  );
}

export function IconPlay({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M3.5 2.3v9.4a.7.7 0 0 0 1.07.6l7.5-4.7a.7.7 0 0 0 0-1.2l-7.5-4.7a.7.7 0 0 0-1.07.6Z" fill="currentColor" />
    </svg>
  );
}
