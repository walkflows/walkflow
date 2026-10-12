#!/usr/bin/env bash
# Build a WALKFLOW website image on the VPS from an exact Git commit, without starving n8n.
#   usage: build.sh <commit-or-branch>      e.g. build.sh master   or   build.sh e5a6728
# The heavy step (npm ci + next build) runs in a throwaway container with hard CPU/memory caps, so
# an out-of-memory condition kills only that container, never n8n. The final image only copies the
# standalone output (no source, no dev dependencies, no secrets) and is tagged walkflow-web:<short-sha>.
set -euo pipefail
REF="${1:?usage: build.sh <commit-or-branch>}"
BASE=/opt/walkflow-web
REPO=https://github.com/walkflows/walkflow.git
BUILD_CPUS="${BUILD_CPUS:-1.5}"
BUILD_MEM="${BUILD_MEM:-3g}"

mkdir -p "$BASE/src" "$BASE/builds"
[ -d "$BASE/src/.git" ] || git clone --quiet "$REPO" "$BASE/src"
git -C "$BASE/src" fetch --quiet --tags origin '+refs/heads/*:refs/remotes/origin/*'
SHA=$(git -C "$BASE/src" rev-parse --verify --quiet "origin/$REF^{commit}" || git -C "$BASE/src" rev-parse --verify "$REF^{commit}")
SHORT=${SHA:0:7}
DIR="$BASE/builds/$SHORT"
echo ">> building $SHORT ($REF)"
rm -rf "$DIR"; mkdir -p "$DIR/src"
git -C "$BASE/src" archive "$SHA" | tar -x -C "$DIR/src"

# Public build-time values only (NEXT_PUBLIC_*). Secrets are never needed to build.
WHATSAPP=""
[ -f "$BASE/build.env" ] && WHATSAPP=$(grep -E '^NEXT_PUBLIC_WHATSAPP_URL=' "$BASE/build.env" | cut -d= -f2- || true)

echo ">> compiling in a limited container (cpus=$BUILD_CPUS mem=$BUILD_MEM)"
docker run --rm --cpus="$BUILD_CPUS" --memory="$BUILD_MEM" --memory-swap="$BUILD_MEM" --pids-limit=512 \
  -v "$DIR/src:/work" -w /work \
  -e BUILD_STANDALONE=1 -e NEXT_TELEMETRY_DISABLED=1 -e CI=1 \
  -e NODE_OPTIONS=--max-old-space-size=2048 \
  -e NEXT_PUBLIC_WHATSAPP_URL="$WHATSAPP" \
  node:24-bookworm-slim sh -c 'npm ci --ignore-scripts --no-audit --no-fund && npm run build'

mkdir -p "$DIR/ctx/dist"
cp -r "$DIR/src/.next/standalone" "$DIR/ctx/dist/standalone"
cp -r "$DIR/src/.next/static" "$DIR/ctx/dist/static"
cp -r "$DIR/src/public" "$DIR/ctx/dist/public"
cp "$DIR/src/deploy/vps/Dockerfile.runtime" "$DIR/ctx/Dockerfile"

echo ">> building runtime image walkflow-web:$SHORT"
docker build --quiet --build-arg GIT_COMMIT="$SHA" -t "walkflow-web:$SHORT" "$DIR/ctx"
# Free disk: keep only the small image, drop source and node_modules.
rm -rf "$DIR/src" "$DIR/ctx"
echo "$SHORT" > "$BASE/last-built"
echo ">> done: walkflow-web:$SHORT ($(docker image inspect -f '{{.Size}}' "walkflow-web:$SHORT" | awk '{printf "%.0f MB", $1/1048576}'))"
