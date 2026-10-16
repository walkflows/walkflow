# Google Analytics 4

Measurement ID `G-9XKY1RW094` (default in `src/lib/analytics/config.ts`). Runs only on `walkflow.tech`, only after a visitor presses Accept.

- Banner, page views and click tracking: `src/components/analytics/AnalyticsProvider.tsx`
- Loading, consent signals, event allowlist: `src/lib/analytics/ga.ts`
- Footer "Cookie settings" link re-opens the choice.
- Events: `page_view` (once per route, query/hash removed except `utm_*`), `consultation_click` (links to /contact labelled Book a Consultation / Request a Call / Request a Consultation), `booking_link_click` (the Google Calendar link; a click only, never a booking), `generate_lead` (enquiry confirmed saved by the server and not a duplicate).
- Only allowlisted event names and parameters can be sent; no form data ever reaches Google.
- The CSP in `next.config.ts` allows only Google's script and data hosts.

## Still to do inside Google Analytics (cannot be set from code)
1. Admin → Data collection → Google signals: keep OFF. Data retention: set to 14 months if wanted.
2. Admin → Data streams → web stream → Enhanced measurement → gear icon: turn OFF "Page changes based on browser history events" (the site sends its own page views; checked as not duplicating in testing, but switching it off removes the risk), "Form interactions" (adds automatic `form_start` events) and "Outbound clicks".
3. Admin → Events: mark `generate_lead` as a key event. Do NOT mark `consultation_click` or `booking_link_click` as conversions of bookings.
4. Admin → Data filters: create an "Internal traffic" filter if the team's own visits should be excluded.
5. Confirm in Reports → Realtime after accepting the banner on https://walkflow.tech.

## Local testing
Build with `NEXT_PUBLIC_GA_EXTRA_HOST=localhost`, then `next start`. Never set that variable in production.
