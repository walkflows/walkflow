#!/usr/bin/env bash
# Local test of auto-release.sh's decisions, with a fake origin repo, fake GitHub status API and a stub release.sh.
# Needs: bash, git, python3, curl.   Run:  bash deploy/vps/tests/auto-release.test.sh
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
PORT=$((20000 + RANDOM % 20000))   # fresh port each run: a stale server from an earlier run must never answer
T=$(mktemp -d); trap 'kill $SRV 2>/dev/null; rm -rf "$T"' EXIT
export WF_BASE="$T/base" WF_LOG="$T/deploy.log" WF_API="http://127.0.0.1:$PORT/repos/x" WF_RELEASE="$T/release-stub.sh"
mkdir -p "$WF_BASE" "$T/api/repos/x/commits" "$T/bin"
# Some dev machines (e.g. Windows) only have a "python3" stub: prefer a working interpreter.
PY=$(for c in python3 python; do "$c" -c "import sys" 2>/dev/null && { echo "$c"; break; }; done)
printf '#!/usr/bin/env bash
exec %s "$@"
' "$PY" > "$T/bin/python3"; chmod +x "$T/bin/python3"; export PATH="$T/bin:$PATH"

git init -q --bare "$T/origin.git"
git clone -q "$T/origin.git" "$T/work" 2>/dev/null
cd "$T/work" && git config user.email t@t && git config user.name t && git checkout -q -b master
commit() { echo "$1" > f; git add f; git commit -q -m "$1"; git push -q origin master 2>/dev/null; git rev-parse HEAD; }
A=$(commit a)
git clone -q "$T/origin.git" "$WF_BASE/src"
mkdir -p "$WF_BASE/auto-release"; echo "$A 2026-01-01T00:00:00Z install" > "$WF_BASE/auto-release/deployed-commit.txt"

cat > "$T/release-stub.sh" <<EOF
#!/usr/bin/env bash
echo "\$2" >> "$T/release-calls"
case "\$(cat "$T/release-mode")" in
  pass) echo "RESULT: PASS - stub"; exit 0 ;;
  fail) echo "RESULT: FAIL - stub"; exit 1 ;;
  busy) echo "RESULT: BUSY"; exit 75 ;;
esac
EOF
chmod +x "$T/release-stub.sh"; touch "$T/release-calls"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$T/api" >/dev/null 2>&1 & SRV=$!
for _ in 1 2 3 4 5 6 7 8 9 10; do curl -s -o /dev/null -m 2 "http://127.0.0.1:$PORT/" && break; sleep 0.5; done
setstatus() { echo "{\"statuses\":[{\"context\":\"Vercel\",\"state\":\"$2\"}]}" > "$T/api/repos/x/commits/$1.status"; mkdir -p "$T/api/repos/x/commits/$1"; cp "$T/api/repos/x/commits/$1.status" "$T/api/repos/x/commits/$1/status"; }
calls() { wc -l < "$T/release-calls" | tr -d ' '; }
live() { cut -d' ' -f1 "$WF_BASE/auto-release/deployed-commit.txt"; }
fails=0
expect() { if [ "$2" = "$3" ]; then echo "ok   $1"; else echo "FAIL $1 (got '$3', expected '$2')"; fails=1; fi; }
run() { bash "$HERE/../auto-release.sh"; }

run; expect "nothing new: no release" 0 "$(calls)"

B=$(commit b); echo pass > "$T/release-mode"
setstatus "$B" pending; run; expect "check pending: no release" 0 "$(calls)"
setstatus "$B" failure; run; expect "check failed: no release" 0 "$(calls)"
rm -rf "$T/api/repos/x/commits/$B" "$T/api/repos/x/commits/$B.status"; run; expect "check missing/unreadable: no release" 0 "$(calls)"

setstatus "$B" success; echo busy > "$T/release-mode"; run
expect "busy: release attempted once" 1 "$(calls)"; expect "busy: live unchanged" "$A" "$(live)"
echo pass > "$T/release-mode"; run
expect "check success: released that exact commit" "$B" "$(tail -1 "$T/release-calls")"; expect "live commit recorded" "$B" "$(live)"
run; expect "already live: no repeat" 2 "$(calls)"

C=$(commit c); setstatus "$C" success; echo fail > "$T/release-mode"; run
expect "failed release: attempted" 3 "$(calls)"; expect "failed release: live unchanged" "$B" "$(live)"
run; expect "failed commit not retried" 3 "$(calls)"
D=$(commit d); setstatus "$D" success; echo pass > "$T/release-mode"; run
expect "newer commit after a failure is released" "$D" "$(live)"

git reset -q --hard "$A"; echo rewrite > f; git commit -qam rewrite; git push -q -f origin master 2>/dev/null
E=$(git rev-parse HEAD); setstatus "$E" success; run
expect "history rewritten (not a descendant): refused" "$D" "$(live)"
grep -q "not a descendant" "$WF_LOG" && echo "ok   refusal logged" || { echo "FAIL refusal not logged"; fails=1; }

[ -n "${DEBUG:-}" ] && cat "$WF_LOG" >&2
[ "$fails" = 0 ] && echo "ALL PASSED" || { echo "SOME FAILED"; exit 1; }
