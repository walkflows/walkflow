# Self-hosted deployment (Hostinger VPS)

Status: **LIVE since 12 October 2026.** walkflow.tech and www.walkflow.tech are served from this VPS (Docker + Caddy, Let's Encrypt
certificates). Vercel stays connected as a warm standby for the agreed 7-day rollback period (see below). n8n is untouched.

## What runs where
- `/opt/walkflow-web/` on the VPS holds the deployment files copied from `deploy/vps/`, a clone of this repo (`src/`), per-environment
  settings (`staging/web.env`, `production/web.env`) and `build.env`. **No secrets are in Git or in the image.**
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

Place or clear the secret with `/opt/walkflow-web/set-secret.sh <env>` (or `... --clear`): it prompts with hidden input, writes the exact value (no escaping needed; `$`, `#`, quotes and backslashes are preserved because the Compose env file is read in `raw` format), recreates the containers and prints PASS/FAIL after comparing what was typed, the file and the running container for exact equality. The value is never displayed.

## Rate limits (same policy as on Vercel)
`POST /api/enquiry`: 5 per 10 minutes per client address; `/api/chat`: 20 per minute. The client address is the one Caddy writes into
`X-WF-Client-IP` (it overwrites anything the visitor sends); forged `x-forwarded-for`, `x-real-ip` and `x-wf-client-ip` headers are ignored.

**Shared store (normal operation).** Counters live in the private Redis container with a password and append-only persistence, so they
survive restarts of the website container and of Redis itself. The Vercel Firewall rule does not exist on the VPS; this replaces it.

**Fallback (weaker protection).** If the store cannot be used, the app does not fail and does not reject visitors; it uses its in-process
limiter instead. That fallback is weaker than the shared store:
- it lives in one process's memory, so it is **lost whenever the website container restarts or is redeployed** (a client that was already
  limited can immediately send again, and an attacker who can force restarts could reset it);
- it is **not shared**: it only protects while there is exactly one website container (true today). If a second instance is ever run, each
  would count separately and the real limit becomes N times larger;
- counters are not persisted, and the table is cleared if it grows past 5,000 tracked clients.
It still enforces the same numbers per client for the running process, so it is a reasonable short-term safety net, not a replacement.

**How a store failure is detected and recovered.** Every limiter call opens a short connection (1.5 s timeout), authenticates, increments the
client's counter and sets its expiry. A refused/closed/timed-out connection, a wrong password or an unexpected reply counts as a failure.
On the first failure the app skips the store for 10 seconds (so a dead store costs one slow request, not one per visitor), writes **one** log
line `[rate-limit] shared store unavailable; using the weaker in-memory limiter until it recovers` (no request data), and keeps serving. After
10 seconds the next request tries the store again; on success it logs **one** line `[rate-limit] shared store recovered; shared limits
active again`. Recovery is automatic; nothing needs restarting. To watch for it:
`docker logs walkflow-web-<env>-web-1 2>&1 | grep rate-limit` and `docker inspect -f '{{.State.Health.Status}}' walkflow-web-<env>-redis-1`.
Alert on the "unavailable" line (or on the Redis container not being `healthy`) so a long outage does not go unnoticed.

## Oversized requests
The app reads request bodies with a hard cap (enquiry 8 KB, chat 2 KB) and answers **413** itself, whether or not the client declared a
Content-Length. Caddy adds a coarse guard: a declared size of 1,000,000+ bytes gets 413 at the proxy and undeclared (chunked) bodies are capped
at 1 MB. (Caddy 2.6 reports a body over its own cap as 502, which is why the app's cap is lower and normal oversized requests never reach it.)

## Where is my change? (saved vs live)
| Step | What happened | Is it live for visitors? |
|---|---|---|
| Claude Code edits files on your PC | Only on your computer | **No** |
| Branch pushed / pull request opened on GitHub | Saved on GitHub; a Vercel *preview* may appear (private) | **No** |
| Pull request merged into `master` | Saved on GitHub as the official version; Vercel's standby copy rebuilds | **No** (visitors are served from the Hostinger server) |
| `release.sh production master` run on the server, ends with `RESULT: PASS` | The server builds the code and replaces the website container | **YES, live now** (usually within 2 minutes) |
| `release.sh` ends with `RESULT: FAIL` | The server rolled back by itself | No (the previous version is still live) |
Only the last PASS step changes what visitors see. Until you run it, `master` on GitHub can be ahead of the live site (this is normal).

## Automatic releases (added 15 October 2026)
**After the one-time install below, merging to `master` publishes by itself.** Flow: approved change merged into `master` -> GitHub's required "Vercel"
check is green for that exact commit -> within ~2 minutes the VPS builds and releases it with the same `release.sh` (capped build, health wait, live
smoke test, automatic rollback). Until the install has been run, deployment stays manual as described below.
- **How it works (pull, not push):** `walkflow-autorelease.timer` runs `/opt/walkflow-web/auto-release.sh` on the server every 2 minutes. The server asks
  GitHub's public API; **GitHub holds no key, token or login for the server and nothing new is opened to the internet.** SSH/Tailscale rules are unchanged.
- **Why there is no separate deploy user:** nobody logs in for this job. It runs from systemd (root, because `release.sh` reads the root-only `web.env` and
  uses Docker; a Docker-group deploy user would be root-equivalent anyway) with `NoNewPrivileges`, `ProtectHome` and `PrivateTmp`. No secret is in Git or logs.
- **What it will not do:** release a commit whose "Vercel" check is not `success`; release anything that is not a descendant of the live commit (rewritten
  history is refused); retry a commit that already failed (a newer commit is picked up normally); run two releases at once (`release.sh` holds
  `/var/lock/walkflow-release.lock`, so a manual `release.sh` and the timer can never overlap).
- **Which commit is live:** `cat /opt/walkflow-web/auto-release/deployed-commit.txt` (full commit, time, `auto`/`install`); history and every decision:
  `tail -n 50 /var/log/walkflow-deploy.log`; the image tag `walkflow-web:<short-sha>` is in `/opt/walkflow-web/production/current.image`.
- **Pause it:** `systemctl stop walkflow-autorelease.timer` (resume: `systemctl start ...`). Manual `release.sh` still works either way.
- **One-time install** (Hostinger browser terminal, once, after the pull request adding these files is merged):
  `git -C /opt/walkflow-web/src fetch -q origin && bash <(git -C /opt/walkflow-web/src show origin/master:deploy/vps/install-auto-release.sh)`
- **Tests:** `bash deploy/vps/tests/auto-release.test.sh` (decision logic with a stub release and a fake GitHub API).
- **Limits:** GitHub's unauthenticated API allows 60 requests/hour per server address; the job calls it only when `master` has a new commit.
  A merge with a red or missing check is never published; fix the check or merge a new commit.

## Publishing website changes (how it works now)
**Manual release (still available; also the fallback). Without the automatic-release install above, nothing publishes when you merge.**
1. **Edit** with Claude Code on your PC. Ask for a branch (never edit `master` directly), for example "make the change on a new branch and open a pull request".
2. **Review and merge on GitHub:** open the pull request, read what changed, and merge it into `master`. Branch protection requires the "Vercel" check
   (and blocks force-pushes and deleting `master`). Merging only updates the code in GitHub; the live site does not change yet.
3. **Publish to the live site:** open PowerShell (Tailscale running) and run
   `ssh root@<vps>` (the server address you use over Tailscale), then `/opt/walkflow-web/release.sh production master`.
   The script builds exactly that code in a capped container (about 1.5 minutes), swaps in the new website container (a few seconds of interruption),
   runs a smoke test against the live site (home, contact, sitemap, 404, security headers, request limits, n8n health, no noindex) and
   **rolls back by itself if any check fails**. It ends with `RESULT: PASS` or `RESULT: FAIL`.
4. **Check it** in a browser and watch UptimeRobot stay green. To undo a published release at any time: `/opt/walkflow-web/rollback.sh production`.
5. For risky changes, try them first on staging (tailnet only): `/opt/walkflow-web/release.sh staging <branch-or-sha>` then open `https://<vps>/` .
The enquiry secret is never in Git; change it only with `/opt/walkflow-web/set-secret.sh production`.

## Vercel during the rollback period
- Vercel's Git integration is still connected, so every push still builds a Vercel preview and every merge to `master` still builds a Vercel production
  deployment. That deployment receives **no visitors** (DNS points at the VPS); it is a standby that is kept up to date.
- Rollback to Vercel is a DNS change at Hostinger: set `walkflow.tech` **A** back to `216.198.79.1` (TTL 300) and the `www` **CNAME** target back to
  `fab0dfb2ab99a76f.vercel-dns-017.com` (TTL 300). TTL-honouring resolvers follow within about 5 minutes, others can take an hour or more, so keep the
  VPS running for 24 hours after a rollback. Vercel may be unable to renew its own certificate while DNS points elsewhere, so the standby is reliable for
  days, not months. Nothing is deleted automatically; proposed rollback period: 7 days (until 19 October 2026).
- If Vercel is ever disconnected, the "Vercel" required check in `master`'s branch protection must be changed first, or merges will be blocked.

## SEO and speed building blocks (added October 2026)
- **Preferred address:** https://walkflow.tech. `www.walkflow.tech` answers only with a permanent 308 redirect to the same path and query on the apex
  (Caddy block in `deploy/vps/Caddyfile.production.proposed`; apply on the server with `deploy/vps/apply-www-redirect.sh`, which backs up, validates,
  reloads, checks and rolls back by itself). Every page also names itself in a canonical tag (`alternates.canonical` in `src/app/layout.tsx`).
- **Sitemap** (`src/app/sitemap.ts`): lists every public page that is finished; placeholder concept pages (`devNote` in `src/content/services.ts`) are left out
  and are marked `noindex`. When a new page or case study is added, check it appears in `/sitemap.xml` after the release.
- **Page descriptions and sharing previews:** each page's `metadata` (or `generateMetadata`) supplies its own description; project pages can use a `metaDescription`
  field. The sharing image is `src/app/opengraph-image.jpg` (also used for Twitter/X).
- **Small icons and fonts:** `scripts/brand/make-icons.mjs` rebuilds the favicon/app icons and the sharing image from the approved logo files;
  `scripts/brand/subset-fonts.sh` rebuilds the Latin web fonts in `src/fonts/` from the licensed originals (OFL kept next to them).

## Monitoring and routine care
- **UptimeRobot** (external, 5-minute checks, email alerts) on https://walkflow.tech/ and https://www.walkflow.tech/contact.
- **GitHub "Uptime check"** workflow (secondary): every 10 minutes when GitHub runs its scheduler; run it by hand from the Actions tab at any time.
- **On the server:** `walkflow-monitor.timer` checks the containers, the site, the certificate, disk, memory and n8n health every 5 minutes and logs to
  `/var/log/walkflow-monitor.log`; it restarts only an unhealthy WALKFLOW website container and never n8n. It writes a log only; it cannot send alerts.
- Security updates for Ubuntu are automatic (unattended-upgrades; reboot when `/var/run/reboot-required` exists). Docker base images (node, redis) and
  npm packages change only when you release: rebuild periodically (`release.sh production master`) and run `npm audit` (ask Claude Code).
