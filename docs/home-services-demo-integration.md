# Home Services (roofing) demo — integration guide

**Status: Preview Mode only.** The demo at `/demos/home-services` runs
entirely in the browser today. Nothing described below as "Connected Mode"
is wired up, tested, or reachable from the live site. This mirrors
`docs/real-estate-demo-integration.md`'s structure and status exactly —
read that document too if you're connecting both demos together.

## What's implemented vs simulated vs awaiting credentials

| Piece | Status |
|---|---|
| Six-stage journey (request → review/assign → inspection → estimate → job → completion) | **Implemented**, Preview Mode, client-side only |
| Service area check, crew assignment, urgent flagging, estimate pricing, job/invoice rules | **Implemented** as plain TypeScript (`src/components/demo/home-services/engine.ts`) |
| "What happened automatically" activity log, Business View, message previews | **Implemented**, Preview Mode |
| Session isolation | **Implemented trivially** — Preview Mode state lives only in the current browser tab's React state |
| Action contract types | **Prepared**, not called by anything (`src/lib/home-services-demo/contract.ts`) |
| `/api/demo/home-services` server route | **Prepared stub only** — always returns a clean `501 unconfigured` response |
| Supabase schema | **Prepared, not applied** — `supabase/migrations/0002_home_services_demo.sql` has never been run against a real project |
| n8n workflows | **Prepared, not imported or tested** — 5 JSON files in `n8n-workflows/home-services/`, each with a setup note |
| Connected Mode toggle | **Does not exist yet** — there is no mode flag in `src/content/home-services-demo.ts`; the UI is hardcoded to Preview Mode throughout |

## Real content, fictional records

Service names, descriptions and card images come from ROOFORA's own
supplied landing-page copy and live site assets (`ROOFORA — Landing Page
Copy.md`, section 05), not invented copy — this demo models what a
WALKFLOW build *for* ROOFORA specifically would look like. Every crew,
coordinator, customer, date, estimate and invoice in the interactive demo
is fictional. No real inspection, roofing work or payment is arranged
through this demo (see the hero notice in `content/home-services-demo.ts`).

## Architecture

Identical shape to the Real Estate demo's Connected Mode design:

```
WALKFLOW browser
   -> POST /api/demo/home-services        (this Next.js app, server-only secrets)
       -> n8n webhook (authenticated, shared secret header)
           -> Supabase (service role key, RLS blocks direct browser access)
       <- job accepted
   <- { requestId, status: "accepted" }
   -> (poll) GET /api/demo/home-services/status?requestId=...
   <- { requestId, status: "completed", result: {...} }
```

The two demos are **deliberately independent modules**, not a shared
library — separate content files, separate `engine.ts`/`session.ts`,
separate contract, separate migration, separate n8n workflows — per
explicit instruction to keep each industry's data and business rules
separate while reusing the same overall pattern. If a genuine shared layer
(e.g. a common slot-generator or job-queue poller) is worth extracting
later, do that as its own deliberate refactor rather than importing one
demo's internals into the other.

## The action contract

See `src/lib/home-services-demo/contract.ts` for the full TypeScript
types: every action (`submit_request`, `request_inspection`,
`confirm_inspection`, `cancel_inspection`, `reschedule_inspection`,
`record_inspection_outcome`, `approve_estimate`,
`record_estimate_decision`, `prepare_revised_estimate`,
`request_job_date`, `update_job_status`, `reschedule_job`,
`record_job_completion`, `simulate_payment`, `preview_followup`,
`restart_demo`), the request/response envelope, and the error codes. A
worked `submit_request` example payload is included in that file.

**Key design rule, unchanged from Real Estate**: Connected Mode must reach
the same conclusions as Preview Mode. `engine.ts`'s `checkServiceArea`,
`assignCrew`, `buildEstimate`/`reviseEstimate` are the single source of
truth for the business rules; the n8n workflows' Function nodes are marked
`TODO: port ... from engine.ts` rather than re-implementing the logic
independently.

## Setup steps (when you're ready to build Connected Mode)

1. **Supabase**: run `supabase/migrations/0002_home_services_demo.sql`
   against a real project (review it first). Confirm RLS is enabled on
   every table the migration creates.
2. **n8n**: import all five files in `n8n-workflows/home-services/` in
   order (01 → 05), following each file's Sticky Note. 05 is meant to be
   wired as the **Error Workflow** for 01–04, not triggered directly.
3. **Environment variables**: fill in `N8N_HOME_SERVICES_WEBHOOK_URL` (you
   can reuse the existing `N8N_WEBHOOK_SECRET` if both demos share one n8n
   instance) and the Supabase variables — locally in `.env.local` and in
   Vercel's project settings for anything deployed.
4. **Build the real `/api/demo/home-services` route**: replace the stub in
   `src/app/api/demo/home-services/route.ts` with real logic that
   validates against `contract.ts`, forwards to the n8n webhook, and
   returns `{ requestId, status: "accepted" }`. Add a matching
   status-polling route.
5. **Test end to end** against a real (non-production) Supabase project:
   submit a request in an out-of-area location (confirm the honest
   "outside the sample service area" path fires server-side too), submit
   an urgent request (confirm the flag task is created), walk a normal
   request through inspection → estimate → job → completion → payment, and
   confirm RLS actually blocks an anon-key read of another session's data.
6. **Only then** wire up a Connected Mode toggle and update the Preview
   Mode banner/behaviour to reflect it, mirroring whatever pattern gets
   built for Real Estate's `realEstateDemoMode`. Until that step, the demo
   must keep saying Preview Mode — never claim a connection that hasn't
   been verified.

## Troubleshooting: tracing a request from the website to n8n

Identical procedure to `docs/real-estate-demo-integration.md`'s
troubleshooting section — DevTools Network tab → Vercel function logs →
n8n Executions tab → Supabase Table Editor (filtered by `request_id`) →
`demo_home_services_jobs_queue` row status. The most common failure modes
are the same too: a mismatched `N8N_WEBHOOK_SECRET`, or an HTTP Request
node still pointing at the literal `YOUR-PROJECT` placeholder every
workflow file ships with.

## What's deliberately out of scope here

- No real email, SMS, WhatsApp, payment or calendar integration — every
  "message" is a labelled preview row, and `simulate_payment` only ever
  flips a status column, never processes money.
- No customer authentication — session isolation is per-browser-tab state
  (Preview Mode) or a signed httpOnly cookie (Connected Mode design).
- No automatic damage diagnosis or emergency-attendance promises — urgent
  requests are flagged for staff review, not auto-escalated.
- Clinics and Consulting demos are untouched and out of scope for this
  work — they still use the shared generic template in
  `content/industry-demos.ts`.
