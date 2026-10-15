#!/usr/bin/env bash
# Automatic production release. Run every couple of minutes by walkflow-autorelease.timer (systemd) on the VPS.
# It is PULL-based: the server looks at GitHub itself, so GitHub holds no key, token or open door into the server.
#
# A commit on `master` is released only when ALL of these hold:
#   1. it is newer than (a descendant of) the commit that is live now;
#   2. GitHub reports the required "Vercel" check as successful for exactly that commit;
#   3. it is not the commit that already failed a release (a failed commit is not retried until a newer one lands).
# The release itself is the existing release.sh: capped build, health wait, live smoke test, automatic rollback.
# release.sh takes the shared lock, so this can never overlap with a manual release or with itself.
#
# Records: $BASE/auto-release/deployed-commit.txt (exact full commit now live) and $LOG (one line per decision).
# Never logs secrets: it handles only commit ids, GitHub check states and release.sh's own output.
set -uo pipefail
BASE="${WF_BASE:-/opt/walkflow-web}"
API="${WF_API:-https://api.github.com/repos/walkflows/walkflow}"
RELEASE="${WF_RELEASE:-$BASE/release.sh}"
LOG="${WF_LOG:-/var/log/walkflow-deploy.log}"
REQUIRED_CHECK="${WF_REQUIRED_CHECK:-Vercel}"
SRC="$BASE/src"
STATE="$BASE/auto-release"
mkdir -p "$STATE"

log() { printf '%s %s\n' "$(date -u +%FT%TZ)" "$*" >> "$LOG"; }
# Log a "waiting/blocked" reason once per commit+reason instead of every tick.
note() { [ "$(cat "$STATE/last-note" 2>/dev/null)" = "$1" ] || { log "$1"; printf '%s' "$1" > "$STATE/last-note"; }; }

git -C "$SRC" fetch --quiet origin '+refs/heads/master:refs/remotes/origin/master' || { note "fetch from GitHub failed; will retry"; exit 0; }
HEAD_SHA=$(git -C "$SRC" rev-parse origin/master) || exit 0
LIVE=$(cut -d' ' -f1 "$STATE/deployed-commit.txt" 2>/dev/null || true)
[ "$HEAD_SHA" = "$LIVE" ] && exit 0
[ "$HEAD_SHA" = "$(cat "$STATE/failed-commit" 2>/dev/null || true)" ] && exit 0

if [ -z "$LIVE" ]; then note "no recorded live commit; run install-auto-release.sh first. Doing nothing."; exit 0; fi
if ! git -C "$SRC" merge-base --is-ancestor "$LIVE" "$HEAD_SHA" 2>/dev/null; then
  note "master ${HEAD_SHA:0:7} is not a descendant of live ${LIVE:0:7}; refusing to release automatically"; exit 0
fi

# Required check must be green for exactly this commit (public GitHub API; no token needed).
STATE_JSON=$(curl -fsS -m 20 -H 'Accept: application/vnd.github+json' "$API/commits/$HEAD_SHA/status" 2>/dev/null) \
  || { note "could not read check status for ${HEAD_SHA:0:7}; will retry"; exit 0; }
CHECK=$(printf '%s' "$STATE_JSON" | python3 -c '
import json, sys
want = sys.argv[1]
d = json.load(sys.stdin)
print(next((s.get("state", "missing") for s in d.get("statuses", []) if s.get("context") == want), "missing"))
' "$REQUIRED_CHECK" 2>/dev/null || echo unreadable)
if [ "$CHECK" != success ]; then note "${HEAD_SHA:0:7}: required check '$REQUIRED_CHECK' is '$CHECK'; not releasing yet"; exit 0; fi

log "releasing ${HEAD_SHA:0:7} (live is ${LIVE:0:7}); check '$REQUIRED_CHECK' = success"
OUT=$("$RELEASE" production "$HEAD_SHA" 2>&1); RC=$?
printf '%s\n' "$OUT" | sed 's/^/    | /' >> "$LOG"
if [ "$RC" = 75 ]; then note "another release is running; will retry"; exit 0; fi
if printf '%s' "$OUT" | grep -q '^RESULT: PASS'; then
  printf '%s %s auto\n' "$HEAD_SHA" "$(date -u +%FT%TZ)" > "$STATE/deployed-commit.txt"
  rm -f "$STATE/failed-commit" "$STATE/last-note"
  log "LIVE: $HEAD_SHA"
else
  printf '%s' "$HEAD_SHA" > "$STATE/failed-commit"
  log "RELEASE FAILED for ${HEAD_SHA:0:7} (release.sh rolled back; live is still ${LIVE:0:7}). Not retrying this commit."
fi
exit 0
