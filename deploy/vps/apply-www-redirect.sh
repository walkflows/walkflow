#!/usr/bin/env bash
# Switch www.walkflow.tech from "serve the site" to "308 redirect to https://walkflow.tech" in the live Caddy config.
# Safe by design: backs up the Caddyfile, validates before applying, reloads gracefully (n8n keeps running), checks the result,
# and restores the backup by itself if anything is wrong.   usage (on the VPS):  /opt/walkflow-web/apply-www-redirect.sh
set -uo pipefail
CF=/etc/caddy/Caddyfile
B=/root/migration-backups/$(date -u +%Y%m%d-%H%M%S)-before-www-redirect; mkdir -p "$B"; cp -a "$CF" "$B/Caddyfile"
grep -q '^walkflow.tech, www.walkflow.tech {' "$CF" || { echo "Nothing to do: the shared walkflow.tech, www.walkflow.tech block was not found (already changed?)."; exit 0; }
cp "$CF" /tmp/Caddyfile.www
python3 - <<'PY'
p = '/tmp/Caddyfile.www'
s = open(p).read()
old = 'walkflow.tech, www.walkflow.tech {\n'
new = ('www.walkflow.tech {\n\theader Strict-Transport-Security "max-age=63072000"\n\tredir https://walkflow.tech{uri} 308\n}\n\nwalkflow.tech {\n')
assert s.count(old) == 1
open(p, 'w').write(s.replace(old, new))
PY
caddy validate --config /tmp/Caddyfile.www --adapter caddyfile >/dev/null 2>&1 || { echo "FAIL: new config does not validate; nothing changed"; exit 1; }
cp /tmp/Caddyfile.www "$CF"; systemctl reload caddy; sleep 3
fail=0
chk() { if [ "$2" = "$3" ]; then echo "  ok   $1"; else echo "  FAIL $1 (got '$3', expected '$2')"; fail=1; fi; }
R="--resolve walkflow.tech:443:127.0.0.1 --resolve www.walkflow.tech:443:127.0.0.1"
chk "www redirects (308 to the apex, path and query kept)" "308 https://walkflow.tech/services/web-design?utm_source=x&a=1" "$(curl -s -o /dev/null $R -w '%{http_code} %{redirect_url}' 'https://www.walkflow.tech/services/web-design?utm_source=x&a=1')"
chk "apex still serves the site"  200 "$(curl -s -o /dev/null $R -w '%{http_code}' https://walkflow.tech/)"
chk "apex contact page"           200 "$(curl -s -o /dev/null $R -w '%{http_code}' https://walkflow.tech/contact)"
chk "n8n health"                  200 "$(curl -s -o /dev/null -w '%{http_code}' https://n8n.walkflow.tech/healthz)"
chk "caddy active"                active "$(systemctl is-active caddy)"
if [ "$fail" != 0 ]; then echo "== rolling back the Caddyfile"; cp -a "$B/Caddyfile" "$CF"; systemctl reload caddy; echo "RESULT: FAIL - restored the previous config ($B)"; exit 1; fi
echo "RESULT: PASS - www now redirects to https://walkflow.tech (backup: $B/Caddyfile)"
