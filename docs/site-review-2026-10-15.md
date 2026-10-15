# Site review, 15 October 2026

Evidence-based review of https://walkflow.tech (production on the Hostinger VPS). "Lab" means measured from one PC with no CPU or network
throttling; it is not real-visitor data. Items that could not be checked are listed as **Not verified**, not passed.

## Fixed in this review
| Issue | Evidence | Fix |
|---|---|---|
| Vercel standby copy (`walkflow-phi.vercel.app`) was a public, indexable duplicate of the whole site (Search Console canonical warning: **mitigation deployed; awaiting confirmation**) | returned 200, `robots.txt` allowed everything, no `noindex`; its pages declare the walkflow.tech canonical | `next.config.ts` sends `X-Robots-Tag: noindex, nofollow` for any `*.vercel.app` host only (walkflow.tech is unaffected, even if DNS is ever pointed back at Vercel) |
| GitHub "Uptime check" failed every run | the only failing step required `www.walkflow.tech/contact` to return 200, but www correctly answers 308 -> apex | check now expects `308 https://walkflow.tech/contact`; the site itself was up the whole time |
| Images/videos revalidated on every visit | `Cache-Control: public, max-age=0` on `/images`, `/videos`, `/brand`... (160 MB of media) | one-day cache + one-week background refresh for those folders; fingerprinted `/_next/static` files were already immutable |

## Verified OK (live)
- 33 sitemap pages: HTTP 200, unique title and description, exactly one H1, `lang="en"`, self-referencing canonical, no `noindex`, no missing image alt, no empty links; 69 internal links all resolve; unknown URLs return a real 404.
- `www` -> apex, `http` -> `https`, trailing slash -> clean URL: all permanent redirects. HTTPS/HSTS, CSP, frame, referrer and permissions headers present.
- Compression on (home page 212 KB -> about 23 KB over the wire). JS/CSS/fonts are immutable-cached. Videos support range requests and do not download until played.
- Unthrottled lab run from one PC (mobile-sized window, no CPU or network limits): FCP/LCP about 1.1-1.4 s, CLS 0. **This does not show how the site performs on a typical phone or for real visitors**; see the throttled results below.
- Enquiry API rejects: wrong method (405), empty/invalid JSON (400), unexpected fields (400), invalid email (400), filled honeypot (400), body over 8 KB (413). Rate limit 5 per 10 minutes per client. Only invalid payloads were sent; nothing reached n8n.
- Form: every field has a label, correct `autocomplete`, required fields marked; `?service=` preselects the service. Skip link, keyboard-operable dropdowns (Enter opens, Escape closes, focus returns), mobile menu with `aria-expanded` and scroll lock.
- `n8n.walkflow.tech/healthz` answers 200 (reachable from the tailnet). Secrets scan (gitleaks, all 99 commits): no leaks. `npm audit`: 0 issues in shipped dependencies (5 "high" are in lint tooling only).

## Needs action / not verified
- **Unverified claims on the home page**: "7 Years", "200+ Successful Projects", "100+ Happy Clients", "150+ Client Reviews", "Your #1 Choice". Owner decision (see SESSION-NOTES).
- **No analytics**: nothing measures traffic sources, consultation clicks or form success (CSP allows no third-party scripts; PostHog variables exist but no code uses them).
- **Search Console "Duplicate, Google chose different canonical"**: status **mitigation deployed; awaiting confirmation** (not "fixed"). The affected URLs and Google-selected canonicals have not been seen. The standby copy above is the leading suspect, not a proven cause; the live canonicals themselves are correct. To confirm: export the affected URLs from Search Console and inspect a few with URL Inspection to read "Google-selected canonical".
- **Not verified (no access)**: Search Console / Bing Webmaster data, real-visitor (field) Core Web Vitals (PageSpeed quota exhausted; throttled lab results are below), server updates/reboot flag/logs/backups (no SSH), production n8n workflow status, Google Sheets / Calendar / Telegram / email flows, an end-to-end enquiry test (needs a test inbox and your approval).
- Minor: heading level skips on `/contact` and `/industries`; chat assistant says "high-value service businesses" while the site says "small and growing businesses"; patch updates available (Next 16.4.1, React 19.3.1).

## Follow-up, same day: throttled mobile test (Lighthouse 12, Slow 4G, 4x CPU slowdown, simulated; lab data, not real visitors)
| Page | Perf | Accessibility | FCP | LCP | TBT | Speed Index | CLS |
|---|---|---|---|---|---|---|---|
| Home | **59** | 99 | 2.0 s | 2.3 s | **2,290 ms** | **11.6 s** | 0 |
| /services/web-design | 89 | 95 | 1.4 s | 1.9 s | 410 ms | 3.1 s | 0 |
| Project page (LEADFLOW) | 72 | 99 | 1.5 s | **4.0 s** | 530 ms | 3.7 s | 0 |
| /contact | 78 | 94 | 1.3 s | **3.3 s** | 550 ms | 3.2 s | 0 |
Best practices 100 and SEO 100 on all four. Home is the weak page: main-thread work is mostly "Other" (5.3 s), Style & Layout (2.4 s) and script (1.5 s) under 4x CPU slowdown, with 20 long tasks; page weight (about 950 KB) is not the cause. The exact trigger (animation, hydration of a 212 KB document, or layout recalculation) is not yet proven; it needs a profiled investigation. Real-visitor (field) data is still not verified.

Accessibility defects found by Lighthouse (proposed, not yet changed): logo `alt="WALKFLOW"` repeats the adjacent wordmark text (all pages); dim step numerals on service pages (contrast 1.76:1, `ServiceProcess.tsx`); grey select text on `/contact` (3.2:1); skipped heading level on `/contact`.

## Production n8n
Production is the **self-hosted n8n on the VPS** (`n8n.walkflow.tech`, tailnet only; health 200; Caddy block and recovery backups described in `vps-recovery.md`). The real webhook host and secret live only in `/opt/walkflow-web/production/web.env`, never in Git. The n8n account reachable from the review tooling is the **retired Cloud copy** (`walkflow.app.n8n.cloud`, five inactive workflows) and was not changed.

## Performance and accessibility fixes (PR #23): method and results
Method: Lighthouse 12, mobile, simulated Slow 4G + 4x CPU slowdown, run against https://walkflow.tech before (3 runs per page) and after (5 runs per page), medians reported. **Lab data, not real visitors.** The test PC was at 100% CPU from other applications, so timing-based numbers (blocking time, Speed Index) are noisy; treat them with caution.

| Page (median) | Perf before -> after | LCP before -> after | Accessibility |
|---|---|---|---|
| Home | 63 -> 67 | 2.6 s -> 2.3 s | 99 -> 100 |
| LEADFLOW project page | 62 -> 89 | 4.2 s -> 2.4 s | 99 -> 100 |
| Contact | 80 -> 84 | 3.4 s -> 2.1 s | 94 -> 100 |

What was measured and fixed:
- Cause of the slow largest paint on Contact and LEADFLOW (and late text on Home): headline, intro and first images were sent in the HTML as `opacity:0` and only appeared after JavaScript downloaded and hydrated. They now use a CSS entrance that plays at first paint. Blocks that can be the largest paint use a rise-only entrance, because Chrome did not reliably register elements fading in from opacity 0 (2 of 3 test runs reported no LCP at all with a fade).
- The footer-only Caveat font is no longer preloaded in front of the heading/body fonts.
- Accessibility: logo image is decorative (`alt=""`) while the link keeps its name ("WALKFLOW home"); footer column titles are `h2`; dim step numerals 1.76:1 -> about 3.7:1; placeholder/select text 3.2:1 -> above 4.5:1.

Not fixed / not proven:
- **Home blocking time** is not shown to have improved: single runs ranged from 651 ms to 21,596 ms on the noisy PC. A CPU profile showed JavaScript is only about 200 ms; the rest is native rendering. A trace showed the page renders about 58 frames a second even when idle, because the hero industry carousel is moved by script on every frame (roughly a quarter of the main thread on a 4x-slower device, in many short frames rather than long tasks). Moving the carousel to a compositor-driven CSS animation would remove that, but it changes drag/pause behaviour and needs its own careful change and test.
- Other pages with the same hide-until-JavaScript pattern (industry pages, About, demos) were not changed; the new `Reveal eager` option and `.enter` / `.enter-rise` classes are the way to fix them.
- Real-visitor (field) data is still not verified.

## Corrections to earlier statements in this review
- **Email sender**: an earlier note said test emails would come from "your business Gmail". That was an inference from the retired n8n Cloud copy (its Send Email node uses a Gmail OAuth credential type). The production sender is **not verified**: the repo does not record it, and the domain's public mail records point to Hostinger (MX and SPF). Verify in the production n8n: open the workflow's "Send Email" node and read the credential type and From address. Do not change it on an assumption.
- **Analytics**: cookieless tools are not automatically exempt from consent rules, and no tool excludes bots perfectly. No tool has been chosen. Before implementing one, check its current behaviour and the consent requirements for the countries your visitors are in.

## Carousel and first-screen heroes (PR #25): method and results
- **Carousel**: the homepage industries gallery now moves with a Web Animations API transform animation on the compositor instead of a Motion value rewritten by JavaScript every frame. Appearance, pace, seamless loop, 1:1 drag, pause/resume button and reduced-motion behaviour (static, still draggable) are unchanged; it also pauses while off screen or when the tab is hidden.
- **Measured** (Chrome trace, 4x CPU slowdown, mobile viewport, idle homepage, 5 s window, 3 runs each; these counts do not depend on how fast the PC is): main-thread frames per second **about 59 -> about 2.4**; main-thread time per second **about 250 ms -> about 15 ms**. Live after deploy: 2.2-3.0 frames/s and 14-18 ms/s.
- **Not measured**: Lighthouse before/after for this change. The test PC stayed at about 100% CPU from other applications, so no Lighthouse batch was run; timing-based scores would not have been trustworthy. Real-visitor (field) data is still not verified.
- **First-screen heroes**: About intro, the industries overview and industry hero, and the four demo heroes now have their headline and intro visible in the server HTML (previously `opacity:0` until JavaScript hydrated). Verified live on 10 representative pages. `Reveal eager` supports the optional scale used by the industry hero.
- **Remaining limitations**: other pages below the first screen keep the scroll-triggered reveal (intended); home blocking time and real-visitor Core Web Vitals still need a quiet-machine Lighthouse run or field data; analytics is not installed. Target markets (US, UK, Canada, Australia, Europe; Nigeria lower priority) are targets, not verified visitor locations.

## Controlled enquiry test, 15 October 2026: closed out (functional pass; side checks listed as unverified)
Owner-approved: one enquiry through the live form plus one identical resubmission, to an owner-controlled inbox (address deliberately not recorded here); no real customer was contacted; the working setup was not changed. Test record: submission reference `web-d3cd5682-109f-44a4-bc53-dce8e7624781`, enquiry reference `ENQ-20261015-3C6XJS`, name "TEST DO NOT ACTION".

**Passed (V = verified by the tester at the website; U = user-confirmed, reported by the owner, not independently verified)**
| Check | Result |
|---|---|
| Live form accepts and saves an enquiry | V: 22:32:17 UTC, HTTP 200 `{"ok":true,"duplicate":false}`, success message shown (the server answers this only after n8n confirms the save) |
| Duplicate prevention | V at the API: identical resubmission at 22:32:42 UTC returned `{"ok":true,"duplicate":true}`. U in the sheet: exactly one Enquiries row for the reference, five Scheduled Emails entries, none doubled |
| Confirmation email | U: exactly one arrived. Headers (U): From `WALKFLOW <hello@walkflow.tech>`, Reply-To `hello@walkflow.tech`, sent 22:32:24 UTC, received 22:32:31 UTC, SPF/DKIM/DMARC all PASS |
| Internal alert | U: arrived in `hello@walkflow.tech`, exactly one copy |
| Reply stops follow-ups | U: after the owner replied, Customer replied = YES and the three Enquiry Follow-up entries show Cancelled ("Follow-up paused" stayed NO: the reply rule stopped them) |
| Cleanup (no deletions) | U: Follow-up paused set to YES, note "TEST completed - do not action" added, no other enquiry changed |

**How email is sent (from the owner's workflow export plus the headers; the export alone does not prove which version is published)**: the "Send Email" node is an HTTP Request to Gmail's `/gmail/v1/users/me/messages/send` using a `gmailOAuth2` connection; "Build Message (Send Email)" sets From and Reply-To to `hello@walkflow.tech`. The delivery chain shows `gmailapi.google.com` then authenticated sending through `smtp.hostinger.com`, which points to Gmail API sending as `hello@walkflow.tech`, relayed through Hostinger SMTP. This supersedes the earlier recollection of n8n connecting to Hostinger SMTP directly. Unchanged and working.

**Still unverified (not blocking the test)**
- Problems & Alerts tab and any stray alert (for example Telegram) from the test.
- A re-check, after one sender cycle, that nothing further was sent after the follow-ups were cancelled.
- Which workflow version is published in production.
- The Gmail account's "Send mail as" entry for `hello@walkflow.tech` (via `smtp.hostinger.com`).
- The Google OAuth app's publishing status. If the app is left in "Testing", its sign-in can expire after about a week and emails would stop until reconnected; also Gmail's daily sending limit applies. Check: Google Cloud Console > APIs & Services > OAuth consent screen > Publishing status.
- DMARC policy is still `p=none` (monitoring only).
