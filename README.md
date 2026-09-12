# WALKFLOW website

Next.js (App Router) + TypeScript + Tailwind CSS v4, with Motion for React for restrained scroll reveals.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit

## Structure

- `src/app` — routes (App Router). Only `/` is built so far.
- `src/components/layout` — Header, Footer (shared site chrome)
- `src/components/sections/home` — homepage sections
- `src/components/ui` — Button, Container, Reveal (motion wrapper), MediaPlaceholder, icons
- `src/content` — approved copy and structured content, kept separate from presentation (`home.ts`, `navigation.ts`, `site.ts`, `media.ts`)
- `brand_assets/` — source brand kit (logos, content pack) — not served publicly
- `public/brand/` — the two logo variants actually used by the site

## Environment

Copy `.env.example` to `.env.local` and fill in values once Supabase/PostHog are ready to connect. Until then, the enquiry form and analytics remain intentionally unconfigured — see `CLAUDE.md`.

## Known issue to resolve with the source logo files

Several files in `brand_assets/walkflow-logo/` have content that doesn't match their filename (e.g. `walkflow-3d-white-logo-navy.png` actually contains an orange logo, not white). `public/brand/logo-navy-on-white.png` and `logo-white-on-navy.png` were copied from the files verified to contain the correct visual content, not from the identically-named source files. Also note the wordmark in every logo file reads "Walkflow Agcy." rather than "WALKFLOW" — worth confirming this is the intended final logo before launch.
