#!/usr/bin/env bash
# One-command release: build an exact Git ref, deploy it, smoke-test it, and roll back by itself if the test fails.
#   usage: release.sh <staging|production> [git-ref]        (default ref: master)
# Production example, run on the VPS (ssh root@<vps>):   /opt/walkflow-web/release.sh production master
# It never touches n8n or Caddy, and it only ever replaces the website container of the named environment.
set -uo pipefail
ENVNAME="${1:?usage: release.sh <staging|production> [git-ref]}"
REF="${2:-master}"
BASE=/opt/walkflow-web
CA=/var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt
case "$ENVNAME" in production|staging) ;; *) echo "environment must be staging or production"; exit 2 ;; esac

n8n_code() { curl -s -o /dev/null -m 10 -w '%{http_code}' http://127.0.0.1:5678/healthz || echo 000; }
[ "$(n8n_code)" = 200 ] || echo "WARNING: n8n health check is not 200 before the release (not caused by this script)."

echo "== 1/4 building $REF"
"$BASE/build.sh" "$REF" || { echo "RESULT: FAIL - build failed, nothing was deployed"; exit 1; }
SHORT=$(cat "$BASE/last-built")
PREV=$(cat "$BASE/$ENVNAME/current.image" 2>/dev/null || echo none)

echo "== 2/4 deploying walkflow-web:$SHORT to $ENVNAME (was: $PREV)"
if ! "$BASE/deploy.sh" "$ENVNAME" "$SHORT"; then
  echo "== deploy did not become healthy: rolling back"
  [ "$PREV" != none ] && "$BASE/deploy.sh" "$ENVNAME" "${PREV#walkflow-web:}"
  echo "RESULT: FAIL - deploy unhealthy, rolled back to $PREV"; exit 1
fi

echo "== 3/4 smoke test"
if [ "$ENVNAME" = production ]; then
  CURL=(curl -s -m 20 --resolve walkflow.tech:443:127.0.0.1); BASEURL=https://walkflow.tech
else
  CURL=(curl -s -m 20 --cacert "$CA"); BASEURL=https://100.65.217.96
fi
fail=0
check() { if [ "$2" = "$3" ]; then echo "  ok   $1"; else echo "  FAIL $1 (got $3, expected $2)"; fail=1; fi; }
check "home page 200"        200 "$("${CURL[@]}" -o /dev/null -w '%{http_code}' $BASEURL/)"
check "contact page 200"     200 "$("${CURL[@]}" -o /dev/null -w '%{http_code}' $BASEURL/contact)"
check "sitemap 200"          200 "$("${CURL[@]}" -o /dev/null -w '%{http_code}' $BASEURL/sitemap.xml)"
check "unknown page 404"     404 "$("${CURL[@]}" -o /dev/null -w '%{http_code}' $BASEURL/definitely-not-a-page)"
check "home mentions WALKFLOW" 1 "$("${CURL[@]}" $BASEURL/ | grep -c 'WALKFLOW' | sed 's/^[1-9][0-9]*$/1/')"
check "security headers"     2 "$("${CURL[@]}" -D - -o /dev/null $BASEURL/ | grep -ciE '^(content-security-policy|strict-transport-security):')"
check "enquiry GET refused 405" 405 "$("${CURL[@]}" -o /dev/null -w '%{http_code}' $BASEURL/api/enquiry)"
check "oversized request 413"   413 "$("${CURL[@]}" -o /dev/null -w '%{http_code}' -X POST -H 'Content-Type: application/json' --data-binary @<(head -c 20000 /dev/zero | tr '\0' a) $BASEURL/api/enquiry)"
[ "$ENVNAME" = production ] && check "no noindex header" 0 "$("${CURL[@]}" -D - -o /dev/null $BASEURL/ | grep -ci '^x-robots-tag')"
check "n8n still healthy"    200 "$(n8n_code)"
[ "${SMOKE_FORCE_FAIL:-0}" = 1 ] && { echo "  FAIL (forced by SMOKE_FORCE_FAIL=1 for testing)"; fail=1; }

if [ "$fail" != 0 ]; then
  echo "== 4/4 smoke test FAILED: rolling back to $PREV"
  if [ "$PREV" != none ]; then "$BASE/deploy.sh" "$ENVNAME" "${PREV#walkflow-web:}"; fi
  echo "RESULT: FAIL - $ENVNAME is back on $PREV; the new image walkflow-web:$SHORT was NOT kept live"; exit 1
fi
echo "== 4/4 done"
echo "RESULT: PASS - $ENVNAME is now running walkflow-web:$SHORT (previous: $PREV; undo with: $BASE/rollback.sh $ENVNAME)"
echo "Tidy old images when you are happy:  docker image ls walkflow-web   then   docker image rm walkflow-web:<old-sha>"
