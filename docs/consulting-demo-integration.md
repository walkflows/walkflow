# Consulting demo — integration guide

**Status: Preview Mode only.** The demo at `/demos/consulting` runs
entirely in the browser today. Nothing described below as "Connected
Mode" is wired up, tested, or reachable from the live site. This mirrors
`docs/real-estate-demo-integration.md`, `docs/home-services-demo-integration.md`
and `docs/clinics-demo-integration.md`'s structure and status exactly —
read those too if you're connecting all four demos together.

## What's implemented vs simulated vs awaiting credentials

| Piece | Status |
|---|---|
| Six-stage journey (request → assignment → scope & schedule → confirm → delivery → follow-up), with a session path and a separate custom-project path | **Implemented**, Preview Mode, client-side only |
| Consultant assignment, slot/kickoff generation | **Implemented** as plain TypeScript (`src/components/demo/consulting/engine.ts`) |
| "What happened automatically" activity log, Firm View, message previews | **Implemented**, Preview Mode |
| Finite follow-up sequence (max 2 touches, stops on accept/decline/cancel/opt-out) | **Implemented** in `src/components/demo/consulting/session.ts` |
| Session isolation | **Implemented trivially** — Preview Mode state lives only in the current browser tab's React state |
| Action contract types | **Prepared**, not called by anything (`src/lib/consulting-demo/contract.ts`) |
| `/api/demo/consulting` server route | **Prepared stub only** — always returns a clean `501 unconfigured` response |
| Supabase schema | **Prepared, not applied** — `supabase/migrations/0004_consulting_demo.sql` has never been run against a real project |
| n8n workflows | **Prepared, not imported or tested** — 6 JSON files in `n8n-workflows/consulting/`, each with a setup note |
| Connected Mode toggle | **Does not exist yet** — there is no mode flag in `src/content/consulting-demo.ts`; the UI is hardcoded to Preview Mode throughout |

## Real content, fictional records

Session names, descriptions, durations and prices come from QUES
Consulting's own supplied website content, not invented copy — this demo
models what a WALKFLOW build *for* a consulting firm like QUES would look
like. Every consultant, client and date/time/payment/proposal is
fictional. Custom-project pricing is always shown as an explicitly
labelled "illustrative range only" (`customProjectProposal` in
`src/content/consulting-services.ts`) — QUES's real content states these
are quoted separately, so no fixed false-precision fee is ever invented.

## Architecture

Identical shape to the Real Estate, Home Services and Clinics demos'
Connected Mode design:

```
WALKFLOW browser
   -> POST /api/demo/consulting             (this Next.js app, server-only secrets)
       -> n8n webhook (authenticated, shared secret header)
           -> Supabase (service role key, RLS blocks direct browser access)
       <- job accepted
   <- { requestId, status: "accepted" }
   -> (poll) GET /api/demo/consulting/status?requestId=...
   <- { requestId, status: "completed", result: {...} }
```

All four demos are **deliberately independent modules**, not a shared
library — separate content files, separate `engine.ts`/`session.ts`,
separate contract, separate migration, separate n8n workflows — per
explicit instruction to keep each industry's data and business rules
separate while reusing the same overall pattern.

## The two-path design

A request is either a standard **session** (one of four priced,
fixed-duration sessions, paid by simulated payment) or a **custom
project** (scoped via a sample proposal that can be approved, accepted,
declined or revised). These are genuinely separate routes through the
same six stages, not a single form with a hidden toggle:

- **Session path**: Request → Assignment → pick a slot (Scope & Schedule)
  → simulated payment (Confirm) → attendance + written summary (Delivery)
  → follow-up.
- **Project path**: Request → Assignment → a sample proposal is drafted
  and internally approved (Scope & Schedule) → the client accepts,
  declines or requests changes, with a revision loop back through
  re-approval (Confirm) → a kickoff date is scheduled (Delivery) →
  follow-up.
- A standard session never gains a proposal step, and a custom project
  never goes through simulated payment — see the `path` discriminator
  throughout `src/components/demo/consulting/session.ts`.

## The action contract

See `src/lib/consulting-demo/contract.ts` for the full TypeScript types:
every action (`submit_request`, `assign_consultant`, `request_session`,
`simulate_payment`, `cancel_session`, `mark_checked_in`,
`record_attendance`, `draft_proposal`, `approve_proposal`,
`record_proposal_decision`, `prepare_revised_proposal`,
`request_kickoff_date`, `preview_next_touch`, `record_followup_outcome`,
`restart_demo`), the request/response envelope, and the error codes. A
worked `submit_request` example payload is included in that file.

**Key design rule, unchanged from the other three demos**: Connected Mode
must reach the same conclusions as Preview Mode. `engine.ts`'s
`assignConsultant` is the single source of truth for consultant
assignment; the n8n workflows' Function/notes are marked
`TODO: port ... from engine.ts` or `session.ts` rather than
re-implementing the logic independently.

**Even connected, this stays a fictional public demo.** No real payment
is ever processed and no real proposal, booking or kickoff is ever
created — Connected Mode only changes where the simulated records and
previews are stored and who generates them, never what they represent.

## Setup steps (when you're ready to build Connected Mode)

1. **Supabase**: run `supabase/migrations/0004_consulting_demo.sql`
   against a real project (review it first). Confirm RLS is enabled on
   every table the migration creates.
2. **n8n**: import all six files in `n8n-workflows/consulting/` in order
   (01 → 06), following each file's Sticky Note. 06 is meant to be wired
   as the **Error Workflow** for 01–05, not triggered directly.
3. **Environment variables**: fill in `N8N_CONSULTING_WEBHOOK_URL` (you
   can reuse the existing `N8N_WEBHOOK_SECRET` if all four demos share
   one n8n instance) and the Supabase variables — locally in
   `.env.local` and in Vercel's project settings for anything deployed.
4. **Build the real `/api/demo/consulting` route**: replace the stub in
   `src/app/api/demo/consulting/route.ts` with real logic that validates
   against `contract.ts`, forwards to the n8n webhook, and returns
   `{ requestId, status: "accepted" }`. Add a matching status-polling
   route.
5. **Test end to end** against a real (non-production) Supabase project:
   walk a session request through payment → attendance → follow-up, walk
   a project request through proposal approval → client decision →
   revision loop → acceptance → kickoff, confirm cancelling a session and
   declining a proposal both immediately stop the follow-up sequence
   server-side, confirm the follow-up sequence never exceeds its fixed
   touch count, and confirm RLS actually blocks an anon-key read of
   another session's data.
6. **Only then** wire up a Connected Mode toggle and update the Preview
   Mode banner/behaviour to reflect it, mirroring whatever pattern gets
   built for the other three demos. Until that step, the demo must keep
   saying Preview Mode — never claim a connection that hasn't been
   verified.

## Troubleshooting: tracing a request from the website to n8n

Identical procedure to the other three demos' troubleshooting sections —
DevTools Network tab → Vercel function logs → n8n Executions tab →
Supabase Table Editor (filtered by `request_id`) →
`demo_consulting_jobs_queue` row status. The most common failure modes
are the same too: a mismatched `N8N_WEBHOOK_SECRET`, or an HTTP Request
node still pointing at the literal `YOUR-PROJECT` placeholder every
workflow file ships with.

## What's deliberately out of scope here

- No real payment processor integration — every "payment" is a labelled
  simulation.
- No real proposal, contract or invoicing system — every proposal is a
  sample record with an explicitly illustrative fee range.
- No indefinite nurture — the follow-up sequence is hard-capped at the
  length of `followUpSequence` and stops immediately on any client
  response or opt-out.
- No customer authentication — session isolation is per-browser-tab state
  (Preview Mode) or a signed httpOnly cookie (Connected Mode design).
- Real Estate, Home Services and Clinics demos are untouched and out of
  scope for this work.
