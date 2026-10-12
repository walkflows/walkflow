#!/usr/bin/env bash
# Return an environment to the image it ran before the last deploy.sh.   usage: rollback.sh <staging|production>
set -euo pipefail
ENVNAME="${1:?usage: rollback.sh <staging|production>}"
DIR=/opt/walkflow-web/$ENVNAME
[ -f "$DIR/previous.image" ] || { echo "no previous image recorded"; exit 1; }
PREV=$(cat "$DIR/previous.image")
echo ">> rolling $ENVNAME back to $PREV"
exec /opt/walkflow-web/deploy.sh "$ENVNAME" "${PREV#walkflow-web:}"
