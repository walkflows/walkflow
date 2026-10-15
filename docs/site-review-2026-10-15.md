# Site review, 15 October 2026

Evidence-based review of https://walkflow.tech (production on the Hostinger VPS). "Lab" means measured from one PC with no CPU or network
throttling; it is not real-visitor data. Items that could not be checked are listed as **Not verified**, not passed.

## Fixed in this review
| Issue | Evidence | Fix |
|---|---|---|
| Vercel standby copy (`walkflow-phi.vercel.app`) was a public, indexable duplicate of the whole site | returned 200, `robots.txt` allowed everything, no `noindex`; its pages declare the walkflow.tech canonical | `next.config.ts` sends `X-Robots-Tag: noindex, nofollow` for any `*.vercel.app` host only (walkflow.tech is unaffected, even if DNS is ever pointed back at Vercel) |
| GitHub "Uptime check" failed every run | the only failing step required `www.walkflow.tech/contact` to return 200, but www correctly answers 308 -> apex | check now expects `308 https://walkflow.tech/contact`; the site itself was up the whole time |
| Images/videos revalidated on every visit | `Cache-Control: public, max-age=0` on `/images`, `/videos`, `/brand`... (160 MB of media) | one-day cache + one-week background refresh for those folders; fingerprinted `/_next/static` files were already immutable |

## Verified OK (live)
- 33 sitemap pages: HTTP 200, unique title and description, exactly one H1, `lang="en"`, self-referencing canonical, no `noindex`, no missing image alt, no empty links; 69 internal links all resolve; unknown URLs return a real 404.
- `www` -> apex, `http` -> `https`, trailing slash -> clean URL: all permanent redirects. HTTPS/HSTS, CSP, frame, referrer and permissions headers present.
- Compression on (home page 212 KB -> about 23 KB over the wire). JS/CSS/fonts are immutable-cached. Videos support range requests and do not download until played.
- Lab, mobile viewport, no throttling: home FCP/LCP about 1.1 s, project page LCP about 1.4 s, CLS 0 on all tested pages, no video bytes on load.
- Enquiry API rejects: wrong method (405), empty/invalid JSON (400), unexpected fields (400), invalid email (400), filled honeypot (400), body over 8 KB (413). Rate limit 5 per 10 minutes per client. Only invalid payloads were sent; nothing reached n8n.
- Form: every field has a label, correct `autocomplete`, required fields marked; `?service=` preselects the service. Skip link, keyboard-operable dropdowns (Enter opens, Escape closes, focus returns), mobile menu with `aria-expanded` and scroll lock.
- `n8n.walkflow.tech/healthz` answers 200 (reachable from the tailnet). Secrets scan (gitleaks, all 99 commits): no leaks. `npm audit`: 0 issues in shipped dependencies (5 "high" are in lint tooling only).

## Needs action / not verified
- **Unverified claims on the home page**: "7 Years", "200+ Successful Projects", "100+ Happy Clients", "150+ Client Reviews", "Your #1 Choice". Owner decision (see SESSION-NOTES).
- **No analytics**: nothing measures traffic sources, consultation clicks or form success (CSP allows no third-party scripts; PostHog variables exist but no code uses them).
- **Search Console "Duplicate, Google chose different canonical"**: affected URLs were not available. The standby copy above is the leading, evidence-backed suspect; the live canonicals themselves are correct. Re-check after the fix is crawled.
- **Not verified (no access)**: Search Console / Bing Webmaster data, real-visitor Core Web Vitals (PageSpeed quota exhausted), Lighthouse scores, server updates/reboot flag/logs/backups (no SSH), production n8n workflow status, Google Sheets / Calendar / Telegram / email flows, an end-to-end enquiry test (needs a test inbox and your approval).
- Minor: heading level skips on `/contact` and `/industries`; chat assistant says "high-value service businesses" while the site says "small and growing businesses"; patch updates available (Next 16.4.1, React 19.3.1).
