# Read-only server health check (Hostinger browser terminal)

Paste the whole block below into the Hostinger Web Console. It only **reads**: it does not install, upgrade, restart, reboot or change any setting,
and it never prints secrets (no `web.env`, no keys). `apt` reads the package lists already on the server; it does not run `apt update`.

```bash
echo "=== SYSTEM ==="; lsb_release -ds 2>/dev/null; uptime -p; date -u +"%F %T UTC"
echo "=== REBOOT NEEDED? ==="; if [ -f /var/run/reboot-required ]; then echo "YES"; cat /var/run/reboot-required.pkgs 2>/dev/null; else echo "no"; fi
echo "=== PENDING UPDATES (simulation, installs nothing) ==="; apt-get -s upgrade 2>/dev/null | grep -c '^Inst' | sed 's/^/packages that would upgrade: /'; apt-get -s upgrade 2>/dev/null | grep '^Inst' | grep -i security | head -15
echo "=== AUTOMATIC SECURITY UPDATES ==="; systemctl is-active unattended-upgrades; tail -n 5 /var/log/unattended-upgrades/unattended-upgrades.log 2>/dev/null
echo "=== DISK ==="; df -h / /opt /var/lib/docker 2>/dev/null; docker system df 2>/dev/null
echo "=== MEMORY / LOAD ==="; free -h; cat /proc/loadavg
echo "=== CONTAINERS ==="; docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}'
echo "=== LIVE WEBSITE VERSION + AUTO-RELEASE ==="; cat /opt/walkflow-web/auto-release/deployed-commit.txt 2>/dev/null; cat /opt/walkflow-web/production/current.image 2>/dev/null; echo; systemctl is-active walkflow-autorelease.timer; tail -n 8 /var/log/walkflow-deploy.log 2>/dev/null
echo "=== MONITOR ==="; systemctl is-active walkflow-monitor.timer; tail -n 8 /var/log/walkflow-monitor.log 2>/dev/null
echo "=== WEB SERVER + CERTIFICATE ==="; systemctl is-active caddy; echo | openssl s_client -servername walkflow.tech -connect walkflow.tech:443 2>/dev/null | openssl x509 -noout -enddate
echo "=== BACKUP FILES ON THE SERVER (names, sizes, dates only) ==="; ls -lh --time-style=long-iso /root/migration-backups /root/n8n-backups 2>/dev/null | head -25
echo "=== FAILED SERVICES / RECENT ERRORS ==="; systemctl --failed --no-pager --no-legend | head; journalctl -p err --since "24 hours ago" --no-pager 2>/dev/null | tail -n 12
echo "=== FIREWALL (status only) ==="; ufw status 2>/dev/null | head -12
```

What to look for: "REBOOT NEEDED? no" (or YES with a plan to reboot in a quiet hour), few or no security packages pending, disk under about 80%,
containers `healthy`, a recent `LIVE:` line in the deploy log, a certificate end date more than 14 days away, no failed services, and recent
files in the backup folders. **Hostinger's own VPS backup/snapshot** is not visible from the server: check it in hPanel > VPS > Backups.
