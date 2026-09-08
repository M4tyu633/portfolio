#!/usr/bin/env bash
# =============================================================================
# Screenshots every route of the LOCAL dev server, desktop and phone, into the
# scratch directory for review.
#
# ⚠ This exists because the in-app preview pane cannot be trusted for
# screenshots on this project: it composites a scaled surface and returns torn
# or stale captures on any page with a sticky bar over full-bleed media, which
# is most of them now. Headless Chrome against the same server is exact.
#
# Nothing it writes is part of the site. Output goes to a temp folder.
#
#   bash scripts/review-shots.sh [outdir]
# =============================================================================
set -uo pipefail

CHROME="${CHROME_BIN:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
BASE="${BASE_URL:-http://localhost:3100}"
OUT="${1:-./.review}"
mkdir -p "$OUT"

shot () {           # shot <path> <name> <width> <height>
  local path="$1" name="$2" w="$3" h="$4"
  echo "  $name"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$w,$h" --virtual-time-budget=6000 \
    --screenshot="$OUT/$name.png" "$BASE$path" >/dev/null 2>&1
}

D_W=1440; D_H=1600      # tall enough to catch a hero and what follows it
M_W=390;  M_H=1400

for spec in \
  "/|home" \
  "/work|work" \
  "/work/tumbang-preso|tumbang" \
  "/work/egovmed|egovmed" \
  "/work/glycoswarm-ai|glyco" \
  "/work/chip-8-emulator|chip8" \
  "/work/knee-mri-reader|knee" \
  "/work/heart-disease-prediction|heart" \
  "/achievements|achievements" \
  "/achievements/gear-up-ncr|gear-up" \
  "/lab|lab" \
  "/about|about"
do
  path="${spec%%|*}"; name="${spec##*|}"
  shot "$path" "d-$name" "$D_W" "$D_H"
  shot "$path" "m-$name" "$M_W" "$M_H"
done

echo
ls -1 "$OUT" | wc -l
echo "-> $OUT"
