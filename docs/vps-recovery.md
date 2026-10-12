# Recovery guide: WALKFLOW website on the Hostinger VPS

No secrets are written in this file. Placeholders: `<vps>` = the server's address you use to log in over Tailscale.

## 1. What exists and where
| Thing | Where | Protected by |
|---|---|---|
| Website code | GitHub `walkflows/walkflow`, branch `master` | GitHub (branch protection; every release is a Git commit) |
| Built website images | Docker on the VPS, tags `walkflow-web:<short-commit>` | Rebuildable from Git at any time (`build.sh <commit>`) |
| Website settings and secrets | `/opt/walkflow-web/production/web.env` and `/opt/walkflow-web/staging/web.env` (mode 600, root only) | **Not in Git.** Server only, plus the snapshot below. The enquiry secret also lives in your n8n credential "Header Auth account". |
| Scripts, Compose file, Caddy snippets | `/opt/walkflow-web/` (copies of `deploy/vps/` in Git) | Git |
| Web server config (Caddy) | `/etc/caddy/Caddyfile` (n8n block + website blocks) | Config snapshots in `/root/migration-backups/` |
| Rate-limit counters | Docker volume `walkflow-web-production_redis_data` | Disposable: losing it only resets limits |
| Image cache | Docker volume `..._web_cache` | Disposable |
| Health check | `walkflow-monitor.timer` (log: `/var/log/walkflow-monitor.log`) | Config snapshot |
| **n8n (separate, do not touch)** | Docker volume `n8n_n8n_data`; recovery backups in `/root/n8n-backups/` | Managed by the automation owner; website tools never read, write or delete them |
| Whole-server backup | Hostinger hPanel (VPS backups / snapshots) | **Check in hPanel: see section 4** |

Config snapshot taken 12 October 2026 after the cutover: `/root/migration-backups/2026-10-12-final-live-config/` (live Caddyfile, scripts, both `web.env` files, systemd units, image list; checksums verified; `RESTORE.txt` inside). It holds secrets, is on the same disk as the website, and is **not** an off-server backup: copy it off the server (section 4).

## 2. Common problems and the fix
| Problem | Fix |
|---|---|
| A release broke the site | `release.sh` rolls back by itself if its smoke test fails. Otherwise `/opt/walkflow-web/rollback.sh production` (returns to the previous build, seconds). |
| Website container stopped or unhealthy | `docker ps`; `docker restart walkflow-web-production-web-1`. The monitor restarts an unhealthy website container automatically. Do not restart n8n unless you mean to. |
| Bad Caddy change | Restore the last good file from `/root/migration-backups/` (for example `2026-10-12-final-live-config/Caddyfile.live`), then `caddy validate --config /etc/caddy/Caddyfile` and `systemctl reload caddy`. Reload is graceful and does not restart n8n. |
| Lost or damaged `web.env` | Recreate from `deploy/vps/web.env.example`: the production n8n webhook URL (n8n workflow "Receive Website Enquiry" > Production URL), a **new** random `REDIS_PASSWORD` with the same value inside `REDIS_URL`, the WhatsApp link, `CLIENT_IP_HEADER=x-wf-client-ip`; then enter the secret with `set-secret.sh production` (copy it from the n8n credential "Header Auth account"); it prints PASS/FAIL. |
| Enquiry form says it is unavailable | The secret or webhook URL is empty or wrong, or the n8n workflows are inactive/unreachable. Check `set-secret.sh` PASS lines and the n8n health URL. Never switch to a test or old Cloud URL. |
| Certificate problem | Caddy renews Let's Encrypt certificates itself. Check `journalctl -u caddy`, that ports 80 and 443 are open (`ufw status`), and that DNS still points to the server. |
| Need to go back to Vercel | In Hostinger DNS: `walkflow.tech` A back to `216.198.79.1` and the `www` CNAME target back to `fab0dfb2ab99a76f.vercel-dns-017.com` (both TTL 300). Not instant (cached DNS); keep the VPS running 24 hours afterwards. Only valid while the Vercel standby exists (planned until the 19 October 2026 review). |

## 3. If the whole server is lost or rebuilt
1. **Best:** restore the server from a Hostinger backup or snapshot (section 4), then check: `docker ps` (containers restart by themselves), `systemctl status caddy`, `systemctl status tailscaled`, the site in a browser, UptimeRobot green.
2. **From scratch** (new Ubuntu 24.04 server): install Docker, Caddy and Tailscale; allow only ports 22, 80, 443 (and Tailscale) in `ufw`; clone the repo to `/opt/walkflow-web/src`; copy `deploy/vps/*` to `/opt/walkflow-web/` and `chmod 755` the `.sh` files; recreate `build.env` and both `web.env` files as in section 2; `build.sh master` then `deploy.sh production <commit>`; add the website blocks from `deploy/vps/Caddyfile.production.proposed` (and `Caddyfile.staging` if wanted) to Caddy; enable the monitor (`deploy/vps/walkflow-monitor.*`).
3. **n8n:** restore it from its own recovery backup in `/root/n8n-backups` by the automation owner, including its encryption key. The Caddy block that routes `n8n.walkflow.tech` is saved inside those backups (`Caddyfile`) and in the config snapshots.
4. **DNS:** if the new server has a different public address, change the two website records (`walkflow.tech` A, and `www` still follows through its CNAME) and, with the automation owner, the `n8n` A record. Do not touch email records.
5. Certificates are re-requested automatically once DNS points at the new server (Let's Encrypt allows only a limited number of attempts per hour; do not repeat requests unnecessarily).

## 4. Backups: what to check and do yourself
- **Hostinger VPS backup/snapshot (manual check, cannot be seen from the server):** hPanel > VPS > your server > **Backups & Monitoring** (the exact label can differ by plan). Look for (a) automatic backups: the date of the latest one and the retention; (b) snapshots: whether a snapshot exists and its date. If no completed backup exists, create a snapshot now (note that a new snapshot may replace the old one) and turn on automatic backups if your plan includes them. Write down the date and plan limits.
- **Off-server copy of the website settings** (contain secrets: store privately, not in Git, not in a synced or shared folder): from PowerShell with Tailscale on,
  `scp -r root@<vps>:/root/migration-backups/2026-10-12-final-live-config "$env:USERPROFILE\walkflow-private-backup"`.
  Only the enquiry secret in `web.env` is not otherwise recoverable by you; it is also in the n8n credential.
- **n8n backups and the n8n encryption key:** keep them separate from each other (a backup without its key cannot be read, a key stored beside the backup defeats that). Where each is stored off-server is the automation owner's decision. Nothing in the website tooling touches them.

## 5. What has and has not been tested
Tested: rollbacks (`rollback.sh`, `release.sh` automatic rollback on staging), Caddy and Compose configuration restore dry-runs (validate/parse only), rate-limit store failure and recovery, secret placement with exact-value check, n8n recovery backup integrity checks (checksums) and the n8n recovery restore performed by the automation owner earlier.
Not tested: a full rebuild on a fresh server, a restore from a Hostinger backup, loss of the Redis volume under load.
