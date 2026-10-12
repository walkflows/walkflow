# Self-hosted deployment (Hostinger VPS)

Status: **Phase 1 (staging) only.** walkflow.tech and www.walkflow.tech still serve from Vercel. Nothing here changes
production DNS, Vercel, or the n8n stack.

## What runs where
- `/opt/walkflow-web/` on the VPS holds the deployment files copied from `deploy/vps/`, a clone of this repo (`src/`), per-environment
  settings (`staging/web.env`, later `production/web.env`) and `build.env`. **No secrets are in Git or in the image.**
- Docker Compose project `walkflow-web-staging` = two containers: `web` (Next.js standalone, non-root, read-only filesystem, 1 CPU / 1 GB cap,
  health-checked, restart policy, rotated logs) and `redis` (private rate-limit store, no published port, AOF persistence).
  The web port is bound to `127.0.0.1` only; Caddy (already on the host for n8n) is the only way in.
- Caddy gets one extra site block (`Caddyfile.staging`): tailnet-only (everyone else receives a plain 404), `noindex`, request-body cap, and it
  **overwrites** `X-WF-Client-IP` with the real client address. The app trusts only that header (`CLIENT_IP_HEADER`). n8n's block is untouched.

## Build and deploy (on the VPS)
```
/opt/walkflow-web/build.sh <commit-or-branch>      # builds walkflow-web:<short-sha> in a CPU/RAM-capped container
/opt/walkflow-web/deploy.sh staging <short-sha>     # starts/updates the stack, waits for "healthy"
/opt/walkflow-web/rollback.sh staging               # returns to the previous image
```
`build.sh` needs about 1.5 CPUs and up to 3 GB RAM for roughly 1 minute; n8n was monitored during the test build (see the migration report).
Images stay on disk (about 0.6 GB each); remove old ones with `docker image rm walkflow-web:<sha>` once a newer one is verified.

## Settings (`<env>/web.env`, mode 600) — see `deploy/vps/web.env.example`
`N8N_ENQUIRY_WEBHOOK_URL` (production n8n webhook, never the retired Cloud copy or a test URL), `N8N_ENQUIRY_SECRET` (set by the owner, never pasted
in chat), `CLIENT_IP_HEADER=x-wf-client-ip`, `REDIS_PASSWORD`/`REDIS_URL`. With the secret empty the form refuses to send (503 "not available") —
this is how staging is kept from creating real enquiries.

## Rate limits (same policy as on Vercel)
`POST /api/enquiry`: 5 per 10 minutes per client address; `/api/chat`: 20 per minute. Counters live in the private Redis (survive restarts). If Redis
is unreachable the app silently falls back to its in-process limiter (still enforces the same numbers for the single container) — requests are never
rejected only because Redis is down. The Vercel Firewall rule does not exist on the VPS; this replaces it.

## Day-to-day changes (planned workflow)
1. Edit with Claude Code on a branch, open a PR to `master` (branch protection and the Vercel check still apply).
2. While Vercel's Git integration stays connected, every push still creates a Vercel preview and every merge to `master` still builds a Vercel
   production deployment. Before cutover that deployment is what visitors see; **after** cutover it is only a warm standby (it keeps building but
   receives no traffic, because DNS points at the VPS). Disconnect it only after the agreed rollback period.
3. Deploy to the VPS by hand: `build.sh master` then `deploy.sh production <sha>`. Automatic deploy-on-merge (for example a GitHub Action over
   Tailscale SSH) is **not** enabled; if wanted it should be proposed and approved separately.

## Phase 2 (not started)
See `Caddyfile.production.proposed`. Cutover needs DNS changes at the DNS host (Hostinger DNS) and owner approval.
