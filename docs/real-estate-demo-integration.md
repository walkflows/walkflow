# Real Estate demo — integration guide

**Status: Preview Mode only.** The demo at `/demos/real-estate` runs entirely
in the browser today. Nothing described below as "Connected Mode" is wired
up, tested, or reachable from the live site. This document exists so a
future session (or Joshua directly) can turn Connected Mode on without
guessing at the shape of things — it is not a claim that any of it works
yet.

## What's implemented vs simulated vs awaiting credentials

| Piece | Status |
|---|---|
| Six-stage interactive journey (enquiry → matching → agent assignment → viewing → outcome → next step) | **Implemented**, Preview Mode, client-side only |
| Deterministic property matching, agent assignment, next-step branching | **Implemented** as plain TypeScript (`src/components/demo/real-estate/engine.ts`) |
| "What happened automatically" activity log, Agent View, message previews | **Implemented**, Preview Mode |
| Session isolation | **Implemented trivially** — Preview Mode state lives only in the current browser tab's React state; two tabs/visitors can never see each other's session |
| Action contract types (request/response shapes, error codes) | **Prepared**, not called by anything (`src/lib/real-estate-demo/contract.ts`) |
| `/api/demo/real-estate` server route | **Prepared stub only** — always returns a clean `501 unconfigured` response, never called by the frontend |
| Supabase schema | **Prepared, not applied** — `supabase/migrations/0001_real_estate_demo.sql` has never been run against a real project |
| n8n workflows | **Prepared, not imported or tested** — 5 JSON files in `n8n-workflows/real-estate/`, each with a setup note explaining exactly what's still a TODO |
| Connected Mode toggle | **Does not exist yet** — `realEstateDemoMode` in `src/content/real-estate-demo.ts` is hardcoded to `"preview"` |

## Architecture (once Connected Mode is built)

```
WALKFLOW browser
   -> POST /api/demo/real-estate           (this Next.js app, server-only secrets)
       -> n8n webhook (authenticated, shared secret header)
           -> Supabase (service role key, RLS blocks direct browser access)
       <- job accepted
   <- { requestId, status: "accepted" }
   -> (poll) GET /api/demo/real-estate/status?requestId=...
   <- { requestId, status: "completed", result: {...} }
```

The browser **never** talks to n8n or Supabase directly. It only ever calls
the Next.js route, which holds `N8N_REAL_ESTATE_WEBHOOK_URL`,
`N8N_WEBHOOK_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` server-side (see
`.env.example` — all currently blank).

## The action contract

See `src/lib/real-estate-demo/contract.ts` for the full TypeScript types:
every action (`submit_requirements`, `request_viewing`, `confirm_viewing`,
`cancel_viewing`, `reschedule_viewing`, `record_viewing_outcome`,
`preview_followup`, `close_enquiry`, `restart_demo`), the request/response
envelope, and the error codes (`invalid_input`, `out_of_order`, `not_found`,
`duplicate_request`, `rate_limited`, `session_expired`,
`upstream_unavailable`, `unconfigured`). That file also has a worked example
payload for `submit_requirements`.

The key design rule: **Connected Mode must reach the same conclusions as
Preview Mode.** `engine.ts`'s `matchProperties`/`assignAgent`/`nextStepFor`
are the single source of truth for the business rules; the n8n workflows'
Function nodes are marked with `TODO: port ... from engine.ts` rather than
re-implementing the logic independently, specifically so the two modes
can't silently disagree about a match, an assignment, or a next step.

## Setup steps (when you're ready to build Connected Mode)

1. **Supabase**: create/connect a project, then run
   `supabase/migrations/0001_real_estate_demo.sql` against it (review it
   first — it's never been applied anywhere). Confirm RLS is enabled on
   every table it creates (the migration does this itself) and that only
   the service role key can write.
2. **n8n**: import all five files in `n8n-workflows/real-estate/` into an
   n8n instance. Each has a Sticky Note at its top-left with the exact
   remaining steps (credential name, URL placeholders to replace, webhook
   secret). Do this in order: 01 → 02 → 03 → 04 → 05, since 05 is meant to
   be wired as the **Error Workflow** for 01–03 (Workflow Settings > Error
   Workflow in n8n), not triggered directly.
3. **Environment variables**: fill in `N8N_REAL_ESTATE_WEBHOOK_URL` and
   `N8N_WEBHOOK_SECRET` (from step 2) and the Supabase variables (from step
   1) — locally in `.env.local` (git-ignored) and in Vercel's project
   settings for anything deployed.
4. **Build the real `/api/demo/real-estate` route**: replace the stub in
   `src/app/api/demo/real-estate/route.ts` with real logic that validates
   the request against `contract.ts`, forwards to the n8n webhook with the
   shared secret header, and returns `{ requestId, status: "accepted" }`.
   Add a matching status-polling route.
5. **Test end to end** against a real (non-production) Supabase project
   before touching `realEstateDemoMode`. Submit a requirement, watch the
   row appear in `demo_real_estate_enquiries`, confirm a viewing, mark an
   outcome, and confirm the activity/message-preview rows all appear
   correctly and that RLS actually blocks an anon-key read of another
   session's data.
6. **Only then** flip `realEstateDemoMode` in
   `src/content/real-estate-demo.ts` to `"connected"` and update the
   Preview Mode banner copy/behaviour to reflect it. Until this step, the
   banner must keep saying Preview Mode — never claim a connection that
   hasn't been verified.

## Troubleshooting: tracing a request from the website to n8n

1. **Confirm the request left the browser**: open DevTools → Network,
   filter for `real-estate`, and check the request to `/api/demo/real-estate`
   — its payload should match `DemoActionRequest` in `contract.ts`.
2. **Confirm the Next.js route received it**: check the Vercel function
   logs (or local terminal in dev) for `/api/demo/real-estate` — it should
   log (never the payload's personal fields, per the no-secrets-in-logs
   rule) that it forwarded to n8n.
3. **Confirm n8n received it**: open the workflow's Executions tab in n8n
   and find the matching run by timestamp. A 401/403 here almost always
   means the `N8N_WEBHOOK_SECRET` header didn't match what the Webhook
   node's Authentication is configured to expect.
4. **Confirm Supabase received it**: check the relevant table
   (`demo_real_estate_enquiries`, `..._viewings`, etc.) directly in the
   Supabase dashboard's Table Editor, filtered by the `request_id` from
   step 1. If the row is missing but n8n shows a successful execution,
   check that node's HTTP Request URL still says `YOUR-PROJECT` (every
   workflow file ships with this placeholder — it must be replaced).
5. **Confirm the job status flows back**: `demo_real_estate_jobs` should
   have a row for the same `request_id`, moving from `accepted` →
   `processing` → `completed`/`failed`. If it's stuck on `accepted`, the
   workflow likely errored before reaching a Respond/Insert node — check
   n8n's Executions tab for the failed node, and confirm workflow 05 (error
   handling) is wired as those workflows' Error Workflow so failures are
   at least recorded rather than silent.

## What's deliberately out of scope here

- No real email, SMS, WhatsApp, payment or calendar integration — every
  "message" is a labelled preview row, by design, matching CLAUDE.md's
  rule that public demos never trigger real external actions.
- No customer authentication — session isolation is per-browser-tab state
  (Preview Mode) or a signed httpOnly cookie (Connected Mode design), never
  a login.
- Home Services, Clinics and Consulting demos are out of scope for this
  work — `engine.ts`/`session.ts`'s shapes were kept generic enough to be
  reused for those later, but nothing here builds them.
