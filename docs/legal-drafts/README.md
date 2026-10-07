# Legal page drafts — for review, not published

These four files are drafts only. They are plain Markdown in `docs/`, not routes —
nothing here is linked from the site, and no `/privacy`, `/terms`, `/cookies` or
`/accessibility` page exists yet. The footer's legal links stay removed (see
`d6db3b6`) until you approve this text and I build the actual pages from it.

Each draft is based on what the codebase actually does today, checked directly
(see "Grounded in the code" at the top of each file), not assumed. Anywhere a
real business detail is missing — company registration, legal entity name,
registered address, governing-law jurisdiction, a dedicated privacy contact
address — it's marked **[NEEDS INPUT]** rather than invented. Please fill
those in or tell me what to put.

Two things worth flagging before you review:

- **No analytics or cookies are active yet.** There's no PostHog (or any
  other analytics) package installed, and nothing in `src/` sets a cookie or
  writes to `localStorage`/`sessionStorage`. The Cookie Policy draft reflects
  that honestly — it says the site doesn't set non-essential cookies today —
  rather than describing tracking that isn't there. CLAUDE.md's PostHog
  section is still deferred; when that's wired up, this draft needs a pass.
- **The enquiry form (n8n/Google Sheets) isn't live yet** — it's on the local
  `n8n-enquiry-connection` branch. The Privacy draft describes it as how the
  form *will* work once connected, flagged as not yet active, not as a
  currently-running integration.

Once you've reviewed and corrected these, tell me and I'll build the four
routes, add their nav entries back to `footerNav.legal` in
`src/content/navigation.ts`, and redeploy.
