# Clinics demo — integration guide

**Status: Preview Mode only.** The demo at `/demos/clinics` runs entirely
in the browser today. Nothing described below as "Connected Mode" is
wired up, tested, or reachable from the live site. This mirrors
`docs/real-estate-demo-integration.md` and
`docs/home-services-demo-integration.md`'s structure and status exactly —
read those too if you're connecting all three demos together.

## What's implemented vs simulated vs awaiting credentials

| Piece | Status |
|---|---|
| Six-stage journey (request → assignment → confirm → reminders → attendance → follow-up) | **Implemented**, Preview Mode, client-side only |
| Reception/provider assignment, reminder invalidation, waiting-list matching, follow-up rules | **Implemented** as plain TypeScript (`src/components/demo/clinics/engine.ts`) |
| "What happened automatically" activity log, Clinic View, message previews | **Implemented**, Preview Mode |
| Session isolation | **Implemented trivially** — Preview Mode state lives only in the current browser tab's React state, including the waiting-list thread |
| Action contract types | **Prepared**, not called by anything (`src/lib/clinics-demo/contract.ts`) |
| `/api/demo/clinics` server route | **Prepared stub only** — always returns a clean `501 unconfigured` response |
| Supabase schema | **Prepared, not applied** — `supabase/migrations/0003_clinics_demo.sql` has never been run against a real project |
| n8n workflows | **Prepared, not imported or tested** — 6 JSON files in `n8n-workflows/clinics/`, each with a setup note |
| Connected Mode toggle | **Does not exist yet** — there is no mode flag in `src/content/clinics-demo.ts`; the UI is hardcoded to Preview Mode throughout |

## Real content, fictional records, strictly administrative

Service category names and descriptions come from Happy Clinics' own
supplied website content (`HAPPY-CLINICS-WEBSITE-CONTENT.md`), not
invented copy — this demo models what a WALKFLOW build *for* a
multidisciplinary clinic like Happy Clinics would look like. Every
reception owner, provider, patient, waiting-list candidate and
appointment time is fictional. The demo is kept strictly
administrative throughout: no diagnosis, treatment advice, clinical
decision-making, or real medical-record collection anywhere in the flow
(see the hero notice in `content/clinics-demo.ts`, and the comments in
`engine.ts`/`session.ts` reiterating this at each relevant point).

## Architecture

Identical shape to the Real Estate and Home Services demos' Connected
Mode design:

```
WALKFLOW browser
   -> POST /api/demo/clinics               (this Next.js app, server-only secrets)
       -> n8n webhook (authenticated, shared secret header)
           -> Supabase (service role key, RLS blocks direct browser access)
       <- job accepted
   <- { requestId, status: "accepted" }
   -> (poll) GET /api/demo/clinics/status?requestId=...
   <- { requestId, status: "completed", result: {...} }
```

All three demos are **deliberately independent modules**, not a shared
library — separate content files, separate `engine.ts`/`session.ts`,
separate contract, separate migration, separate n8n workflows — per
explicit instruction to keep each industry's data and business rules
separate while reusing the same overall pattern.

## The action contract

See `src/lib/clinics-demo/contract.ts` for the full TypeScript types:
every action (`submit_request`, `assign_staff`, `request_appointment`,
`confirm_appointment`, `cancel_appointment`, `reschedule_appointment`,
`preview_reminder`, `record_attendance`, `offer_waitlist_slot`,
`respond_waitlist_offer`, `expire_waitlist_offer`, `record_followup`,
`restart_demo`), the request/response envelope, and the error codes. A
worked `submit_request` example payload is included in that file.

**Key design rule, unchanged from the other two demos**: Connected Mode
must reach the same conclusions as Preview Mode. `engine.ts`'s
`assignReceptionOwner`, `assignProvider`, `hasConflict`,
`waitlistCandidateFor` and `followUpInstructionFor` are the single source
of truth for the business rules; the n8n workflows' Function nodes are
marked `TODO: port ... from engine.ts` rather than re-implementing the
logic independently.

**Even connected, this stays a fictional public demo.** No real email,
SMS or message is ever sent, and no real appointment, diagnosis or
medical record is ever created — Connected Mode only changes where the
simulated records and previews are stored and who generates them, never
what they represent.

## Setup steps (when you're ready to build Connected Mode)

1. **Supabase**: run `supabase/migrations/0003_clinics_demo.sql` against a
   real project (review it first). Confirm RLS is enabled on every table
   the migration creates.
2. **n8n**: import all six files in `n8n-workflows/clinics/` in order
   (01 → 06), following each file's Sticky Note. 06 is meant to be wired
   as the **Error Workflow** for 01–05, not triggered directly.
3. **Environment variables**: fill in `N8N_CLINICS_WEBHOOK_URL` (you can
   reuse the existing `N8N_WEBHOOK_SECRET` if all three demos share one
   n8n instance) and the Supabase variables — locally in `.env.local` and
   in Vercel's project settings for anything deployed.
4. **Build the real `/api/demo/clinics` route**: replace the stub in
   `src/app/api/demo/clinics/route.ts` with real logic that validates
   against `contract.ts`, forwards to the n8n webhook, and returns
   `{ requestId, status: "accepted" }`. Add a matching status-polling
   route.
5. **Test end to end** against a real (non-production) Supabase project:
   submit an "I'm not sure yet" request (confirm it stays pending reception
   review server-side too), submit a diagnostics request (confirm the
   referral/preparation task is created), walk a normal request through
   confirm → reminders → attendance → follow-up, cancel a confirmed
   appointment and confirm the waiting-list offer/accept/decline/expiry
   sequence behaves correctly, and confirm RLS actually blocks an
   anon-key read of another session's data.
6. **Only then** wire up a Connected Mode toggle and update the Preview
   Mode banner/behaviour to reflect it, mirroring whatever pattern gets
   built for the other two demos. Until that step, the demo must keep
   saying Preview Mode — never claim a connection that hasn't been
   verified.

## Troubleshooting: tracing a request from the website to n8n

Identical procedure to the other two demos' troubleshooting sections —
DevTools Network tab → Vercel function logs → n8n Executions tab →
Supabase Table Editor (filtered by `request_id`) →
`demo_clinics_jobs_queue` row status. The most common failure modes are
the same too: a mismatched `N8N_WEBHOOK_SECRET`, or an HTTP Request node
still pointing at the literal `YOUR-PROJECT` placeholder every workflow
file ships with.

## What's deliberately out of scope here

- No real email, SMS or message integration — every "message" is a
  labelled preview row.
- No diagnosis, treatment advice, clinical decision-making, prescriptions,
  test interpretation or personalised care instructions anywhere — this
  demo only ever organises administrative records (requests, assignments,
  appointments, attendance, follow-up tasks).
- No real medical-record collection — the request form only ever asks for
  a service category, patient-kind, preferred time, contact details,
  practical support needs and an optional non-clinical note.
- No customer authentication — session isolation is per-browser-tab state
  (Preview Mode) or a signed httpOnly cookie (Connected Mode design).
- Children's Health requests are always framed as a fictional parent/
  carer's request — the demo never implies a child can independently book
  or consent.
- Real Estate and Home Services demos are untouched and out of scope for
  this work.
