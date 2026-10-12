#!/usr/bin/env bash
# Place (or clear) the enquiry secret for an environment, exactly as typed, and prove it arrived unchanged.
#   usage: set-secret.sh <staging|production>          prompts for the secret (hidden), writes it, redeploys, verifies
#          set-secret.sh <staging|production> --clear  empties the secret and redeploys
# The secret is never printed, never put on a command line, never logged. Nothing about n8n is touched.
set -uo pipefail
ENVNAME="${1:?usage: set-secret.sh <staging|production> [--clear]}"
MODE="${2:-}"
BASE=/opt/walkflow-web
F="$BASE/$ENVNAME/web.env"
[ -f "$F" ] || { echo "FAIL: $F not found"; exit 1; }
CUR=$(cat "$BASE/$ENVNAME/current.image" 2>/dev/null) || { echo "FAIL: no current image recorded for $ENVNAME"; exit 1; }
SHORT=${CUR#walkflow-web:}
WEB="walkflow-web-$ENVNAME-web-1"

if [ "$MODE" = "--clear" ]; then
  S=""
else
  [ -t 0 ] && printf 'Paste the enquiry secret, then press Enter (nothing will be shown): '
  IFS= read -rs S
  [ -t 0 ] && echo
  S=${S%$'\r'}
  if [ -z "$S" ]; then echo "FAIL: nothing was entered"; exit 1; fi
  if [[ "$S" =~ [[:space:][:cntrl:]] ]]; then echo "FAIL: the value contains a space or control character (a pasted line break?). Nothing was changed. Run the script again and paste only the secret."; exit 1; fi
  if [ "${#S}" -lt 8 ]; then echo "FAIL: that is too short to be the real secret. Nothing was changed."; exit 1; fi
fi

# Write exactly the typed bytes (python reads the value from the environment: no shell escaping involved).
umask 077
cp -a "$F" "$F.bak.$$"
SECRET_VALUE="$S" ENVFILE="$F" python3 - <<'PY'
import os
p = os.environ['ENVFILE']
v = os.environ['SECRET_VALUE']
lines = open(p, encoding='utf-8').read().split('\n')
found = False
out = []
for l in lines:
    if l.startswith('N8N_ENQUIRY_SECRET='):
        out.append('N8N_ENQUIRY_SECRET=' + v)
        found = True
    else:
        out.append(l)
if not found:
    out.insert(0, 'N8N_ENQUIRY_SECRET=' + v)
open(p, 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
PY
chmod 600 "$F"

# Recreate the stack's containers so they read the new file (same image; n8n and Caddy are not touched).
if ! "$BASE/deploy.sh" "$ENVNAME" "$SHORT" >/dev/null 2>&1; then
  echo "FAIL: the website container did not become healthy. Restoring the previous settings file."
  cp -a "$F.bak.$$" "$F"; "$BASE/deploy.sh" "$ENVNAME" "$SHORT" >/dev/null 2>&1; shred -u "$F.bak.$$" 2>/dev/null || rm -f "$F.bak.$$"; exit 1
fi
shred -u "$F.bak.$$" 2>/dev/null || rm -f "$F.bak.$$"

# Exact comparison of three copies: what was typed, what is in the file, what the running container sees.
FILE_VAL=$(grep -m1 '^N8N_ENQUIRY_SECRET=' "$F" | cut -d= -f2-)
CONT_VAL=$(docker exec "$WEB" printenv N8N_ENQUIRY_SECRET 2>/dev/null)
pass=1
if [ "$MODE" = "--clear" ]; then
  [ -z "$FILE_VAL" ] && [ -z "$CONT_VAL" ] && echo "PASS: secret is empty in the file and in the running container" || { echo "FAIL: secret is not empty"; pass=0; }
else
  [ "$FILE_VAL" = "$S" ] && echo "PASS: file value is identical to what you pasted" || { echo "FAIL: file value differs from what you pasted"; pass=0; }
  [ "$CONT_VAL" = "$S" ] && echo "PASS: running container value is identical to what you pasted" || { echo "FAIL: container value differs from what you pasted"; pass=0; }
  [ "$FILE_VAL" = "$CONT_VAL" ] && echo "PASS: file and container values are identical" || { echo "FAIL: file and container values differ"; pass=0; }
  echo "(value length: ${#S} characters; the value itself is never displayed)"
fi
echo "website container: $(docker inspect -f '{{.State.Health.Status}}' "$WEB")   redis: $(docker inspect -f '{{.State.Health.Status}}' "walkflow-web-$ENVNAME-redis-1")   image: $CUR"
unset S FILE_VAL CONT_VAL SECRET_VALUE
[ "$pass" = 1 ] && echo "RESULT: PASS" || { echo "RESULT: FAIL"; exit 1; }
