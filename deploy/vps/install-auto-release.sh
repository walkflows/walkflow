#!/usr/bin/env bash
# ONE-TIME setup of automatic releases on the VPS. Safe to run again (it only re-copies the files and re-enables the timer).
# Run as root, straight from GitHub's master, with this single line in the Hostinger browser terminal:
#   git -C /opt/walkflow-web/src fetch -q origin && bash <(git -C /opt/walkflow-web/src show origin/master:deploy/vps/install-auto-release.sh)
# It does NOT touch n8n, Caddy, the website containers, web.env files or the enquiry secret.
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "Run this as root."; exit 1; }
BASE=/opt/walkflow-web
SRC=$BASE/src
STATE=$BASE/auto-release
command -v flock >/dev/null || { echo "flock is missing (package util-linux)"; exit 1; }
command -v python3 >/dev/null || { echo "python3 is missing"; exit 1; }

git -C "$SRC" fetch -q origin '+refs/heads/master:refs/remotes/origin/master'
get() { git -C "$SRC" show "origin/master:deploy/vps/$1"; }

echo ">> backing up the current release.sh"
cp -p "$BASE/release.sh" "$BASE/release.sh.bak-$(date -u +%Y%m%d-%H%M%S)"

echo ">> installing scripts and timer"
get release.sh > "$BASE/release.sh.new"      && chmod 755 "$BASE/release.sh.new"      && mv "$BASE/release.sh.new" "$BASE/release.sh"
get auto-release.sh > "$BASE/auto-release.sh.new" && chmod 755 "$BASE/auto-release.sh.new" && mv "$BASE/auto-release.sh.new" "$BASE/auto-release.sh"
get walkflow-autorelease.service > /etc/systemd/system/walkflow-autorelease.service
get walkflow-autorelease.timer   > /etc/systemd/system/walkflow-autorelease.timer
get walkflow-deploy.logrotate    > /etc/logrotate.d/walkflow-deploy
bash -n "$BASE/release.sh" && bash -n "$BASE/auto-release.sh"
systemctl daemon-reload

echo ">> self-test: running a Docker build inside the same sandbox the timer uses (nothing is released or changed)"
# These properties mirror the [Service] hardening in walkflow-autorelease.service. A tiny "FROM scratch" build needs a writable
# Docker config directory, which is exactly what failed before ("mkdir /root/.docker: read-only file system").
SANDBOX=(-p ProtectHome=yes -p PrivateTmp=yes -p NoNewPrivileges=yes -p ProtectKernelModules=yes -p ProtectControlGroups=yes
         -p StateDirectory=walkflow-autorelease -p StateDirectoryMode=0700
         -p Environment=HOME=/var/lib/walkflow-autorelease -p Environment=DOCKER_CONFIG=/var/lib/walkflow-autorelease/docker)
TEST_CMD='docker compose version >/dev/null && printf "FROM scratch\nLABEL walkflow-selftest=1\n" | docker build -q -t walkflow-selftest:1 - >/dev/null && docker image rm walkflow-selftest:1 >/dev/null && echo SELFTEST_OK'
SELFTEST=$(systemd-run --wait --pipe --quiet --collect "${SANDBOX[@]}" /bin/sh -c "$TEST_CMD" 2>&1 || true)
if ! printf '%s' "$SELFTEST" | grep -q SELFTEST_OK; then
  echo "SELF-TEST FAILED. The timer was NOT enabled and nothing was released. Output:"
  printf '%s\n' "$SELFTEST"
  exit 1
fi
echo "   self-test passed"

echo ">> recording the commit that is live right now"
mkdir -p "$STATE"
if [ ! -s "$STATE/deployed-commit.txt" ]; then
  CUR=$(cut -d: -f2 "$BASE/production/current.image")            # e.g. walkflow-web:0786117 -> 0786117
  FULL=$(git -C "$SRC" rev-parse --verify "$CUR^{commit}")
  printf '%s %s install\n' "$FULL" "$(date -u +%FT%TZ)" > "$STATE/deployed-commit.txt"
fi
touch /var/log/walkflow-deploy.log && chmod 640 /var/log/walkflow-deploy.log

# A release that failed only because of this sandbox problem must be allowed to run again; the self-test above has just
# proven the problem is fixed. (A commit that fails later for a real reason is still never retried automatically.)
if [ -s "$STATE/failed-commit" ]; then
  echo ">> clearing the failed-commit marker ($(cut -c1-7 "$STATE/failed-commit")) so that commit is retried"
  rm -f "$STATE/failed-commit" "$STATE/last-note"
fi
systemctl enable --now walkflow-autorelease.timer
systemctl restart walkflow-autorelease.timer
echo
echo "DONE. Live commit recorded as: $(cut -d' ' -f1 "$STATE/deployed-commit.txt")"
echo "Next automatic check:"; systemctl list-timers walkflow-autorelease.timer --no-pager | head -3
echo "Watch it with:  tail -f /var/log/walkflow-deploy.log"
