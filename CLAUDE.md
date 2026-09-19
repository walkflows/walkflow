# WALKFLOW - Website Project Instructions

## Purpose and current decisions
- Build WALKFLOW's business website using Claude Code. This is a new code-based website, not a Lovable or Wix build.
- WALKFLOW provides web design and practical AI automation, organised around business problems and industry needs.
- Help visitors understand the offer, explore relevant solutions, and request a conversation with Joshua.
- Position the business as a provider of scoped, tailored projects. Do not present it as an existing self-service SaaS platform.
- Primary conversion: Request a Call -> enquiry form -> successful database save -> manual email follow-up to arrange a call.
- No customer registration, login, client portal, checkout, subscriptions, or customer dashboard in this launch scope.
- Project updates happen through email or calls. GoHighLevel and n8n are deferred; the marketing website must not depend on them.

## Always do first
- Inspect the repository, package.json, lockfile, README, content files, brand assets and available skills before changing code.
- Read the user's latest approved content and instructions. New explicit user decisions take precedence over older project notes.
- Check `brand_assets/`, `public/`, `content/` and `docs/` if present. These are suggested locations, not files that are guaranteed to exist.
- If supplied, read `WALKFLOW_Complete_Website_Content.md` for the full page copy. Do not assume this file is bundled with CLAUDE.md.
- Use the latest user-edited homepage copy over any older homepage draft. Preserve approved wording; request missing copy instead of claiming invented text was approved.
- Use an installed frontend-design or UI/UX Pro Max skill for design work. Choose one lead design approach and retain WALKFLOW's identity.
- Use available SEO/schema skills for relevant reviews and one browser tool for inspection. Do not assume skills, MCP servers or accounts are connected.
- If a tool is missing, explain the specific setup needed briefly and continue work that does not depend on it. Do not install overlapping tools unnecessarily.

## Brand identity
- Name: WALKFLOW.
- Primary colours (Session 7): orange `#FF991C` and near-black `#0A0A0A`. Two supporting orange shades exist for contrast reasons, not interchangeably: `#A85700` (orange-dark, for orange text/accents on light backgrounds — plain `#FF991C` only reaches ~2.1:1 on white) and `#E8850F` (orange-hover, the primary button's hover background only). See `src/app/globals.css` for the full token set and the comment explaining the split.
- Headings: **Poppins — an approximation, not a verified match** to the Session 6/7 reference (a rasterised screenshot/PDF/video with no embedded font metadata; the real typeface could not be identified). Chosen for its slimmer, normal-width geometric letterforms versus the previous Unbounded. Body, navigation, forms and buttons: Manrope. Optional handwritten accent: Caveat, used sparingly (e.g. the footer tagline), never for body copy or UI controls.
- Use the approved logo files without altering proportions, colours or lettering. Choose the supplied variant that suits the background. Note: the logo artwork itself still shows the old navy/orange colourway (it's a static image, not re-themeable) — flagged as a known mismatch against the new near-black palette, not fixed by a code-only colour change.
- If no logo file is available, use a temporary WALKFLOW text wordmark. Do not invent a replacement logo.
- Supporting white and neutral dark/light grey surfaces are allowed (no more warm cream/sand tones). Define brand colours, typography, spacing, radii and shadows centrally.
- Avoid the obsolete cyan `#06BDF4` and navy `#071A2F` palette, and (as of Session 7) the earlier orange `#E76E0C` / navy `#13233C` palette this project shipped with initially.
- Check contrast before using orange for small text or white text on orange. Use accessible text/background combinations — see the orange-dark/orange-hover split above.
- Tagline: "Take the steps. Build the flow."

## Visual direction and references
- References: https://www.getjobber.com/ ; https://agnos-wbs.framer.website/ ; https://berrinagency.com/ .
- Use these for outcome-led organisation, polished agency presentation and restrained motion. Inspect them when access is available; do not claim unseen details were verified.
- Agnos inspiration: slowly moving platform-logo cards with generous spacing, depth and soft shadows. Platform logos represent tools, never invented clients or endorsements.
- Build an original WALKFLOW layout around approved content. Do not copy reference brands, copywriting, testimonials or unlicensed assets.
- The supplied CLAUDE.md screenshots are examples of instruction structure, not website-layout mockups.
- If a later screenshot is explicitly supplied as a layout target, compare composition, spacing, type scale and alignment at the same viewport size; retain WALKFLOW branding unless told otherwise.
- Aim for clear hierarchy, generous whitespace, strong typography and varied section composition. Avoid a repetitive page of identical card grids.
- Mix light surfaces, navy sections, restrained orange glows, gradients and subtle texture where useful. Do not apply every effect to every section.
- Keep navigation, copy and calls to action clear above decorative effects. Do not use splash screens or forced intro animations.

## Motion, usability and accessibility
- Use Motion for React for coordinated reveals, floating cards and meaningful hover/scroll effects; CSS transitions are sufficient for simple interactions.
- Prefer transform and opacity animations. Avoid `transition: all`, layout-thrashing loops, heavy video backgrounds and unnecessary animation libraries.
- Respect `prefers-reduced-motion`; provide static alternatives. Provide a pause mechanism where continuous moving content requires one for accessibility.
- Decorative elements must not block pointer events, keyboard access or reading order. Avoid forced scrolling, cursor replacements and scroll hijacking.
- Mobile-first layout; verify at roughly 390px, 768px and 1440px, plus a narrow 320px overflow check.
- Use semantic landmarks, logical headings, visible focus, keyboard-operable menus/dialogs, meaningful links, labels and accessible errors.
- Ensure content is available without hover. Keep touch controls comfortably sized and prevent horizontal overflow.

## Technical defaults
- For a genuinely empty project: Next.js App Router, TypeScript and Tailwind CSS, with Motion where needed.
- If a codebase already exists, inspect and preserve its working framework unless the user requests migration.
- Install compatible stable dependencies using the existing package manager and lockfile. Do not replace the lockfile or framework casually.
- Build reusable header, footer, buttons, form fields, service cards, industry cards and section components.
- Keep content and media references separate from presentation so text, images, videos and demo URLs are easy to change.
- Do not use the screenshot tutorial's single HTML file, Tailwind CDN, hard-coded Windows paths, assumed Puppeteer install or assumed `server.js`.
- Discover real scripts in package.json. Use its dev/build/lint/typecheck commands when present; document actual commands in README.
- Run the local development server through the framework. Use its reported localhost URL; reuse the running server rather than starting duplicates.

## Pages and navigation
- Keep the approved main navigation (Session 9, supersedes the original Home/Web Design/Industry Solutions/About/Contact order): **Home | About | Industry Solutions | Services | Demo Projects | Contact**; header/hero button: Book a Consultation, primary button elsewhere: Request a Call.
- Industry Solutions, Services and Demo Projects are dropdown-only triggers (no parent destination page, opens a menu on hover/click/focus only). Dropdown contents:
  - Industry Solutions: Real Estate, Home Services – HVAC & Plumbing, Clinics, Consulting Firms.
  - Services: Business Automation & CRM, Email Marketing, Web Design, Mobile App Development.
  - Demo Projects: Real Estate, Home Services – HVAC & Plumbing, Clinics, Consulting Firms.
  - "Industry Solutions" describes the offering; "Demo Projects" shows practical examples of how it works.
- All four Services children are now built (Session 21, content rebuilt Session 23): `/services/business-automation-crm`, `/services/email-marketing`, `/services/web-design`, `/services/mobile-app-development` — no longer a gap. Each also has real project-detail sub-pages at `/services/<service>/projects/<project>` (Session 23), statically generated for every project in `content/services.ts`; an unknown combination genuinely 404s. The three Demo Projects children pointing at `/demos/home-services`, `/demos/clinics`, `/demos/consulting` are now built (Session 10) — see the `/demos/*` entry below.
- Include AI Automation and Demos through relevant menus, internal links and the footer without overcrowding the main navigation.
- Use the supplied complete content pack as the authority for page-level copy and any approved route refinements.
- Core routes:
  - `/`: homepage.
  - `/web-design`: web design overview.
  - `/web-design/business-websites`, `/web-design/ecommerce`, `/web-design/landing-pages`, `/web-design/web-apps`: scoped service pages when approved copy is supplied.
  - `/ai-automation`: practical automation overview.
  - `/industries`: industry solutions overview.
  - `/industries/real-estate`, `/industries/home-services`, `/industries/clinics`, `/industries/consulting`: four industry pages.
  - `/industries/home-services/hvac`, `/industries/home-services/plumbing`, `/industries/home-services/roofing`: supporting pages when supplied in the approved content pack.
  - `/demos`: demo showcase overview (not yet built as a standalone page — the homepage's Demo Showcase section currently serves this role). `/demos/real-estate`, `/demos/home-services`, `/demos/clinics`, `/demos/consulting`: four concept-demonstration walkthroughs, all built (Session 10), each with an interactive customer-flow-plus-business-view demo. Copy/content still pending your sign-off before launch.
  - `/about`, `/contact`, `/thank-you`, `/privacy`, `/cookies`, `/terms`, `/accessibility`, plus the framework's not-found page.
- Keep FAQ and process content within the relevant pages unless separate pages are explicitly approved.
- Do not create extra portfolio cases, blogs, pricing plans, admin interfaces or dashboards merely to fill space.
- Missing legal/business details must stay marked in development and be reported before publication; do not invent them or claim policies are legally approved.
- Exclude thank-you, private, draft and error routes from indexing as appropriate. Return a genuine 404 for unknown URLs.

## Copy and conversion rules
- Lead with the customer problem, then the solution, practical benefits and one clear next action. Explain tools only where needed for a decision.
- Preserve the approved homepage hero: "Make it easier for customers to choose you."
- Hero eyebrow (Session 7, explicit instruction, supersedes the "Web Design & AI Automation" label previously documented here): "Your #1 Choice for Web Design & AI Automation", with "#1" as a small styled badge. Flagged for awareness, not blocked: "#1 Choice" is an unsubstantiated superlative of the kind the line below asks to avoid — implemented as instructed since it was explicit and specific, not silently softened.
- Main CTA: "Request a Call" — still used site-wide except the header and hero, which say "Book a Consultation" (Session 6 decision, not yet reconciled; see SESSION-NOTES.md). Secondary hero CTA: "Explore Our Solutions".
- Request a Call leads to `/contact` or the accessible enquiry form. It must not falsely imply a calendar booking has been confirmed.
- Use concise, human wording. Avoid hype, unsupported promises, fake urgency, invented metrics, testimonials, certifications or client logos.
- **Known exception, flagged not silently fixed (Session 9)**: the homepage Platforms and Tools section (`platformsAndTools.stats`/`features` in `src/content/home.ts`) currently holds explicitly unverified PLACEHOLDER numbers/copy ("7 Years", "200+ Successful Projects", "100+ Happy Clients", "150+ Client Reviews", plus three feature-card claims) — added at your explicit direction as a layout placeholder for a motion/visual-effects task, pending your sign-off on real figures or removal. Do not treat as approved. See SESSION-NOTES.md.
- **Same placeholder figures reused again, flag still open (Session 18)**: the Industry Solutions pages' brief explicitly called these same four numbers "approved WALKFLOW proof points" and asked for them on every industry page (`IndustryTrust.tsx`, reusing `platformsAndTools.stats` rather than duplicating the numbers). That instruction conflicts with the still-unresolved flag directly above — implemented as instructed (now shown on 4 more pages) rather than silently blocked or silently treated as verified. Confirming or replacing these figures now affects five pages, not one.
- **Second known exception, status changed (Session 9, updated Session 22)**: the footer's "Connect with Us" column and the Contact page's new hero cards (`site.contact` in `src/content/site.ts`) held a dummy email, phone number and address, added at your explicit direction for the footer redesign layout. As of Session 22 you explicitly confirmed these exact values for display on the Contact page hero, so `site.contact.confirmed` is now `true` and `ContactHero.tsx` shows the Phone/Address/Email cards. Flagged for awareness, not blocked: these were originally documented as placeholder dummy data, not verified business details — worth a final sanity check that these are the real, intended-for-publication values before launch. `site.contact.hours` is still `null` (no opening-hours copy ever supplied — that card stays hidden) and the three social links (WhatsApp/LinkedIn/Instagram, `site.social`) still point to `#` placeholders, so the Contact hero's "Follow Us" card also stays hidden until at least one becomes a real profile URL.
- Explain industry offerings as scoped solutions that can be built, not existing live capabilities unless verified.
- SECTION labels in the content pack are editorial instructions, not text to display on the public website.

## Images, videos and demos
- Build without final media if necessary. Prefer approved assets; otherwise use local branded placeholders with fixed aspect ratios and no broken image requests.
- Centralise asset references in a content/config module with fields for image source, alt text, poster, video URL, demo URL and availability status.
- Document recommended dimensions, formats and where each asset is used. Preserve image space to avoid layout shifts and compress large assets.
- Missing videos should show an intentional preview/coming-soon state, not a player with a broken source or an active fake play button.
- Use captions/transcripts for supplied spoken videos where available; flag missing ones. Avoid autoplay with sound.
- Demo states: planned, simulated, live. Public wording and buttons must match the real state.
- Use "Coming soon" for unfinished demos. Clearly label simulations and sample listings; do not fabricate completed automation results.
- Real estate is the first demo priority. The other industries are home services, clinics and consulting.
- A real-estate demo may use 10 clearly fictional property records. Never invent real availability or treat an enquiry as a confirmed viewing.
- Building full interactive demos is a separate scoped task; placeholder cards do not count as implemented products.
- Keep clinic demos administrative, without patient records or diagnosis. Require human approval for real quotes, proposals and appointment commitments.

## Enquiries and Supabase
- Use the user's existing Supabase project only when configured. MCP access helps development; it does not automatically wire the website to the database.
- Form fields (Session 22, supersedes the Session 17 list): Name; Email address (renamed from "Business email" — helper text "Business or personal email is welcome.", and the email regex never actually restricted to business domains); Company name; "Which service are you interested in?" (required dropdown — Business Automation & CRM / Email Marketing / Web Design / Mobile App Development / All — placed immediately before the message field); "Tell us what's slowing your business down" (textarea); Role (optional); Website URL (optional); Preferred contact method — Email or WhatsApp (two-option toggle, not a dropdown). Selecting WhatsApp reveals a required "WhatsApp number" field directly beneath (helper text "Include your country code."; hidden and its validation cleared the moment another method is selected).
- Required fields are marked with a visible "*" plus a "Fields marked * are required." note above the form; optional fields carry an explicit "(optional)" suffix in their label. Every field error is shown as text beside the field (with an icon, not colour alone), matched 1:1 to `ContactForm.tsx`'s actual `validate()` rules.
- Above the form fields: "Tell us what's going on — we'll get back to you within 24 hours to set up a discovery call."
- Submit button (Session 17, supersedes "Send My Enquiry"): "Start the Conversation".
- Success copy (Session 17, supersedes the original "Thanks for getting in touch..." line): "Thanks — we'll be in touch within 24 hours." Shown inline in place of the form, not via a `/thank-you` redirect — the `/thank-you` route hasn't been built as part of this flow.
- **Correction (Session 22): the two compact after-Services/after-Demo-Showcase homepage CTA cards this line used to describe were removed from the homepage in Session 19**, per explicit instruction (screenshots of the two cards were attached and marked for removal). This line is being kept only as a historical note, not as current-state documentation, to avoid future confusion — the homepage has no such CTA cards as of Session 19 onward.
- Show success only after a confirmed submission. A click, timeout or unconfigured integration must never produce a fake success. As of Session 17 no backend is wired (`src/lib/enquiry.ts` always throws `EnquiryNotConfiguredError`, by design) — the form shows an explicit "not connected yet" notice instead of the success state when submitted. See that file for exactly where to wire a real endpoint. `EnquiryPayload` (Session 22) now also carries `service` (always) and `whatsappNumber` (only when `method === "whatsapp"`).
- Validate on the server and client; trim inputs, bound lengths, validate email and reject unexpected fields. Add suitable spam protection and request throttling. A client-side honeypot field is in place (Session 17); real server-side throttling still needs a backend to land on.
- Provide loading, error and retry states; preserve input on failure. Prevent duplicate submissions, including retries after uncertain responses.
- Prefer a validated server endpoint for writes; block public reads/updates/deletes with RLS and appropriate permissions. Do not expose private enquiries to browsers.
- Keep privileged database keys server-only. Do not log form contents or commit secrets to GitHub.
- Preserve existing data; use reviewed migrations and never reset production data to make development easier.
- If credentials are missing, finish the UI and document configuration; clearly state submission is unconfigured in development.
- If a `/thank-you` route is built later, redirect to it only after success, and a direct visit to that page must not claim an enquiry was received.
- No customer authentication is needed. Joshua can use the existing Supabase dashboard; do not build a new admin portal by default.

## PostHog and privacy
- Configure PostHog through environment variables, not credentials embedded in this instruction file. Confirm the project's region; the previously selected US ingestion host is `https://us.i.posthog.com`.
- Implement consent-aware analytics, with optional analytics off until consent under the agreed site settings. Let users change preferences.
- Track only public page visits, demo starts, demo completions and enquiries successfully saved to Supabase.
- Disable autocapture and session recording. Avoid duplicate manual/automatic pageviews and duplicate events on rerenders, retries or navigation.
- Send only allowlisted event properties such as a safe route identifier and demo ID. Do not send names, emails, phone numbers, messages or sensitive query/hash parameters.
- Explicitly control SDK page URL, referrer and other default properties as well as custom properties; verify the outgoing payload.
- Exclude private/admin/login routes if any are introduced later. A demo card click is not a demo completion.
- Analytics failure must never prevent an enquiry from saving or cause a false form error after a successful save.

## SEO, delivery and validation
- Add accurate page titles/descriptions, social previews, canonical URLs once the real domain is known, robots rules and a sitemap of published public routes.
- Use relevant schema only for verified business information. Do not invent ratings, addresses or reviews to populate structured data.
- Protect unpublished previews from indexing. Align policy text and cookie settings with what is actually configured before launch.
- Host on Vercel with GitHub as the code source. Document required environment variable names in `.env.example` without real values.
- Keep local secrets in ignored environment files; add deployment values through the hosting settings. Do not assume local variables transfer automatically.
- Before deploying, confirm the user's intended repository, project and domain. Follow existing authorisation; never claim deployment without a verified live result.
- Use Agent Browser or Playwright to inspect localhost, not `file://` screenshots. Save review screenshots under a clearly named temporary project folder.
- Inspect desktop and mobile screenshots; fix concrete spacing, clipping, contrast and overflow issues, then recheck the affected views.
- Test navigation, dropdowns, keyboard focus, media fallbacks, 404s, form validation, database success/failure and analytics consent/event behaviour.
- Run available build, lint and type checks; add focused tests for consequential behaviour, especially enquiries and privacy. Report any unavailable checks honestly.
- Separate verified live integrations from simulated, unconfigured or untested features. Never describe the whole site as working because the frontend renders.
- Give Joshua brief, plain-language updates: what changed, what was tested and the exact manual step needed next. Avoid unnecessary subscriptions or repeated confirmations.

## Build sequence
1. Inspect supplied content and assets; establish the design system and route structure.
2. Build the homepage, review it in the browser and carry its design through the remaining approved pages.
3. Add responsive behaviour, restrained motion and replaceable media/demo states.
4. Connect and verify enquiries, then analytics and consent.
5. Complete SEO, policy configuration and end-to-end checks; prepare the agreed deployment.
6. Hand over concise instructions for replacing media, changing copy, updating GitHub and checking new deployments.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
