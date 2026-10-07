> **DRAFT — not published.** For Joshua's review. See `README.md` in this folder.
> Grounded in the code as of commit `797fa9f`: checked `src/` for any
> `document.cookie`, `localStorage` or `sessionStorage` usage, and
> `package.json` for an analytics package — found neither.

# Cookie Policy

**Last updated:** [NEEDS INPUT — date of publication]

## Short version

This website does not currently set any non-essential cookies, and does not
run any analytics, advertising or tracking tool. We checked the site's own
code to write this — there is no analytics package installed, and nothing on
the site writes to your browser's cookies, local storage or session storage.

## What that means in practice

- No cookie banner is currently needed, because there is nothing
  non-essential to ask consent for.
- Your browser may still receive standard cookies or similar values set by
  our hosting provider (Vercel) purely to route and secure requests — these
  are not used to track you across sites or build a profile.
- If you click through to WhatsApp or Google (for the discovery-call
  booking), those sites may set their own cookies once you're there. That's
  covered by their policies, not this one.

## If this changes

CLAUDE.md (our internal build brief) already plans for PostHog analytics,
configured to be consent-aware and off until you agree, with autocapture and
session recording disabled. If and when that's switched on, this page will
be rewritten to say exactly what's tracked, and a consent control will be
added. Until then, this page's "no cookies" statement is accurate and should
not be published with analytics claims added speculatively.

---
*This draft reflects what the code does today. It is not legal advice.*
