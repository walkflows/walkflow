#!/usr/bin/env bash
# Start or update the website stack for an environment with a specific, already-built image.
#   usage: deploy.sh <staging|production> <short-sha>
# Records the previous image so rollback.sh can restore it. Never touches n8n or Caddy.
set -euo pipefail
ENVNAME="${1:?usage: deploy.sh <staging|production> <short-sha>}"
SHORT="${2:?usage: deploy.sh <staging|production> <short-sha>}"
BASE=/opt/walkflow-web
DIR="$BASE/$ENVNAME"
[ -f "$DIR/web.env" ] || { echo "missing $DIR/web.env"; exit 1; }
docker image inspect "walkflow-web:$SHORT" >/dev/null || { echo "image walkflow-web:$SHORT not built (run build.sh $SHORT)"; exit 1; }
# Loopback ports: staging 3100, production 3101 (production is not started in Phase 1).
PORT=3100; [ "$ENVNAME" = production ] && PORT=3101
cd "$DIR"
[ -f current.image ] && cp current.image previous.image || true
echo "walkflow-web:$SHORT" > current.image
export WALKFLOW_ENV_FILE="$DIR/web.env" WALKFLOW_ENV="$ENVNAME" WALKFLOW_IMAGE="walkflow-web:$SHORT" WALKFLOW_WEB_PORT="$PORT"
docker compose -f "$BASE/docker-compose.yml" --env-file /dev/null up -d --remove-orphans
for i in $(seq 1 30); do
  s=$(docker inspect -f '{{.State.Health.Status}}' "walkflow-web-$ENVNAME-web-1" 2>/dev/null || echo starting)
  [ "$s" = healthy ] && { echo ">> $ENVNAME is healthy on walkflow-web:$SHORT"; exit 0; }
  sleep 3
done
echo "!! not healthy after 90s; run rollback.sh $ENVNAME"; docker logs --tail 30 "walkflow-web-$ENVNAME-web-1"; exit 1
