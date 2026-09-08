#!/usr/bin/env bash
# =============================================================================
# Photographs the deployed products.
#
# ⚠ These are screenshots of the REAL running applications, taken from their own
# production URLs. Nothing here is a mockup, a browser frame drawn in CSS, or an
# impression of what the product might look like. If a capture comes back as a
# loading state or a sign-in wall, that is the honest answer and the site uses a
# different frame rather than faking a logged-in one.
#
# Headless Chrome rather than a Playwright dependency: it is already installed,
# it needs no download, and one flag does the whole job.
#
# Run from the portfolio root:  bash scripts/capture-live.sh
# =============================================================================
set -uo pipefail

CHROME="${CHROME_BIN:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
FF="${FFMPEG_BIN:-/c/Users/matth/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin}"
RAW="$(mktemp -d)"
trap 'rm -rf "$RAW"' EXIT

shot () {           # shot <url> <out-relative-path> <width> <height> [wait-ms]
  local url="$1" out="$2" w="$3" h="$4" wait="${5:-4000}"
  echo "  $out  <-  $url"
  mkdir -p "$(dirname "$out")"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --force-device-scale-factor=2 \
    --window-size="$w,$h" \
    --virtual-time-budget="$wait" \
    --screenshot="$(cygpath -w "$RAW/shot.png" 2>/dev/null || echo "$RAW/shot.png")" \
    "$url" >/dev/null 2>&1
  if [ ! -s "$RAW/shot.png" ]; then
    echo "    FAILED, skipping"
    return 0
  fi
  # Down to a sane delivery size and into webp. The 2x device scale above is
  # what makes text in these captures legible after the downscale.
  "$FF/ffmpeg" -y -v error -i "$RAW/shot.png" -vf "scale=1600:-2" -q:v 80 "$out"
  rm -f "$RAW/shot.png"
}

echo "eGovMed"
shot "https://egovmed-frontend.vercel.app/"        public/work/egovmed/home.webp     1440 900  7000
shot "https://egovmed-frontend.vercel.app/triage"  public/work/egovmed/triage.webp   1440 900  7000
shot "https://egovmed-frontend.vercel.app/book"    public/work/egovmed/booking.webp  1440 900  7000
shot "https://egovmed-frontend.vercel.app/"        public/work/egovmed/mobile.webp    430 932  7000

echo "GlycoSwarm"
shot "https://glycoswarm-ai.vercel.app/"           public/work/glycoswarm/home.webp  1440 900  8000

echo "Knee MRI"
shot "https://knee-mri-reader.vercel.app/"         public/work/knee-mri/station.webp 1440 900  9000

echo "Heart"
shot "https://cardiosense-app.vercel.app/"         public/work/heart/station.webp    1440 900  7000

echo "CHIP-8"
shot "https://chip8-debugger.vercel.app/"          public/work/chip8/debugger.webp   1440 900  9000

echo
du -ch public/work/*/[a-z]*.webp 2>/dev/null | tail -1
