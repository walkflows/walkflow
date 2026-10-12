#!/usr/bin/env bash
# On-server health check for the WALKFLOW website stack. Run every 5 minutes by walkflow-monitor.timer.
# Logs to the journal (journalctl -u walkflow-monitor) and to /var/log/walkflow-monitor.log, restarts an unhealthy
# website container once per run, and exits non-zero (so systemd marks the run failed) when something is wrong.
# It cannot tell you the whole server is down: that is what the external uptime check is for.
set -u
LOG=/var/log/walkflow-monitor.log
ENVNAME="${WALKFLOW_ENV:-production}"
HOST="${WALKFLOW_PUBLIC_HOST:-walkflow.tech}"
problems=0
say() { echo "$(date -u +%FT%TZ) $*" | tee -a "$LOG"; }
bad() { say "PROBLEM: $*"; problems=$((problems+1)); }

for c in "walkflow-web-$ENVNAME-web-1" "walkflow-web-$ENVNAME-redis-1"; do
  st=$(docker inspect -f '{{.State.Health.Status}}' "$c" 2>/dev/null || echo missing)
  if [ "$st" != healthy ]; then
    bad "$c is $st"
    [ "$st" = unhealthy ] && docker restart "$c" >/dev/null 2>&1 && say "restarted $c"
  fi
done

if [ "${WALKFLOW_PRECUTOVER:-0}" = 1 ]; then
  # Before DNS points here: check the app directly on its loopback port; public certificate checks do not apply yet.
  code=$(curl -s -o /dev/null -m 15 -w '%{http_code}' "http://127.0.0.1:${WALKFLOW_APP_PORT:-3101}/robots.txt" || echo 000)
  [ "$code" = 200 ] || bad "app on port ${WALKFLOW_APP_PORT:-3101} returned $code"
  days="n/a (pre-cutover)"
else
  # The site as a visitor's browser would reach it, but locally (valid certificate required).
  code=$(curl -s -o /dev/null -m 15 -w '%{http_code}' --resolve "$HOST:443:127.0.0.1" "https://$HOST/robots.txt" || echo 000)
  [ "$code" = 200 ] || bad "https://$HOST/robots.txt via Caddy returned $code"
  end=$(echo | openssl s_client -servername "$HOST" -connect 127.0.0.1:443 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
  if [ -n "$end" ]; then
    days=$(( ( $(date -d "$end" +%s) - $(date +%s) ) / 86400 ))
    [ "$days" -ge 14 ] || bad "certificate for $HOST expires in $days days"
  else
    bad "no certificate readable for $HOST"
  fi
fi

used=$(df --output=pcent / | tail -1 | tr -dc 0-9)
[ "$used" -lt 80 ] || bad "disk ${used}% full"
avail=$(awk '/MemAvailable/{printf "%d",$2/1024}' /proc/meminfo)
[ "$avail" -gt 700 ] || bad "only ${avail} MB memory available"

n8n=$(curl -s -o /dev/null -m 10 -w '%{http_code}' http://127.0.0.1:5678/healthz || echo 000)
[ "$n8n" = 200 ] || bad "n8n health check returned $n8n (not managed by this script)"

warn=$(docker logs --since 6m "walkflow-web-$ENVNAME-web-1" 2>&1 | grep -c 'shared store unavailable')
[ "$warn" -eq 0 ] || bad "rate-limit store was unavailable in the last 6 minutes ($warn warning line(s))"

[ "$problems" -eq 0 ] && say "ok ($ENVNAME): containers healthy, site 200, cert ${days:-?}d, disk ${used}%, mem ${avail}MB, n8n $n8n"
exit "$problems"
