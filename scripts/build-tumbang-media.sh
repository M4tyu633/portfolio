#!/usr/bin/env bash
# =============================================================================
# Curates the Tumbang Preso media the site actually uses.
#
# ⚠⚠ EVERY SOURCE HERE IS THE GODOT BUILD, NOT THE UNITY PORT.
# The Godot project is the game that won Gear Up NCR, and it is what the
# trailer, the demo capture and every photograph are of. The Unity port is a
# work in progress and its art is not finished, so nothing from it ships on this
# site. An earlier pass pulled `splash_art.png` and `tump_logo.png` out of the
# Unity repository; both were removed for exactly that reason.
#
# ⚠ Nothing here is generated art. Every output is a frame, a crop or a
# transcode of something that already exists:
#
#   the menu backdrop    DOST-GameDev/assets/ui/main-menu/MENU BACKDROP.png
#   the wordmark         DOST-GameDev/assets/ui/main-menu/TUMP.png
#   the pennants         DOST-GameDev/assets/ui/main-menu/*BUTTON.png
#   the trailer          Downloads/TUMP Trailer BHStudios.mp4   (1080p, 92 s)
#   the demo capture     Downloads/TUMP Game Demo.mp4           (1080p, 250 s)
#   the competition      Downloads/TUMP FOLDER/PICS/*.jpg
#   the PC Express run   the same folder's PC EXPRESS/ set
#
# ⚠ The Godot repository is FROZEN and read-only. This script only reads from
# it. Never write into it.
#
# The sources come to about 2 GB. What ships is under 4 MB.
#
# Run from the portfolio root:  bash scripts/build-tumbang-media.sh
# =============================================================================
set -euo pipefail

FF="${FFMPEG_BIN:-ffmpeg}"
GODOT="${GODOT_DIR:-../DOST-GameDev/assets}"
PICS="${PICS_DIR:-}"
EVENT="${EVENT_DIR:-}"
TRAILER="${TRAILER_FILE:-}"
DEMO="${DEMO_FILE:-}"
OUT="public/work/tumbang"

# Validate required sources before touching curated outputs. Photos are optional.
command -v "$FF" >/dev/null 2>&1 || { echo "FFmpeg not found. Set FFMPEG_BIN to the executable path." >&2; exit 1; }
[ -d "$GODOT/ui/main-menu" ] || { echo "Set GODOT_DIR to the Godot assets directory (containing ui/ and audio/)." >&2; exit 1; }
[ -f "$DEMO" ] || { echo "Set DEMO_FILE to the original TUMP Game Demo.mp4." >&2; exit 1; }
[ -f "$TRAILER" ] || { echo "Set TRAILER_FILE to the original TUMP Trailer BHStudios.mp4." >&2; exit 1; }

mkdir -p "$OUT"

# --- clips ------------------------------------------------------------------
# Muted, short, H.264 only, capped at 960 wide.
#
# ⚠ There is no WebM here and that is measured, not lazy. VP9 at crf 38 came out
# LARGER than x264 at crf 30 on every one of these clips (913 KB against 661 KB
# on the match clip), because they are short, high-motion and already
# once-encoded. Shipping both would have cost 2.3 MB to hand a worse file to the
# browsers that prefer it. H.264 in MP4 plays everywhere.
clip () {          # clip <src> <start> <duration> <name>
  local src="$1" ss="$2" dur="$3" name="$4"
  echo "  clip $name  ($ss +${dur}s)"
  "$FF" -y -v error -ss "$ss" -i "$src" -t "$dur" -an \
    -vf "scale=960:-2,fps=24" \
    -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart \
    "$OUT/$name.mp4"
  # The poster is the clip's own first frame, so nothing flashes before play.
  "$FF" -y -v error -ss "$ss" -i "$src" -frames:v 1 \
    -vf "scale=960:-2" -q:v 82 "$OUT/$name-poster.webp"
}

echo "clips"
# ⚠ The hero clip comes from the DEMO capture, not the trailer. The trailer opens
# on the studio logo and then cuts to title cards ("3 Attackers!", "1 DEFENDER!")
# every few seconds, which is right for a trailer and wrong for something that
# loops silently behind a headline. The demo is one continuous 1080p capture of a
# real match, no cuts and no letterboxing.
clip "$DEMO" 00:01:58 8 "plaza"
clip "$DEMO" 00:01:36 8 "match"
clip "$DEMO" 00:02:20 8 "taya"

# --- stills -----------------------------------------------------------------
still () {         # still <src> <start> <name> [width]
  local src="$1" ss="$2" name="$3" w="${4:-1600}"
  echo "  still $name"
  "$FF" -y -v error -ss "$ss" -i "$src" -frames:v 1 \
    -vf "scale=$w:-2" -q:v 80 "$OUT/$name.webp"
}

echo "stills"
still "$DEMO" 00:00:20 "menu"       # the main menu, his own pennant art
still "$DEMO" 00:00:40 "select"     # the character screen, his own UI
still "$DEMO" 00:01:40 "hud"        # the HUD mid-round
still "$DEMO" 00:04:00 "knockdown"  # the lata going down
still "$DEMO" 00:01:00 "countdown"  # the round starting

# --- art --------------------------------------------------------------------
echo "art"
# The menu backdrop is the game's own key art: the lata and a tsinelas on the
# asphalt inside the chalk circle. 3840x2160 and 15 MB at source; the site never
# draws it above 2000, so that is where it is capped.
"$FF" -y -v error -i "$GODOT/ui/main-menu/MENU BACKDROP.png" \
  -vf "scale=2000:-1" -q:v 82 "$OUT/backdrop.webp"

# Transparency matters on these: they are drawn over the page, not inside a box.
art () {           # art <src> <name> <width>
  echo "  art $2"
  "$FF" -y -v error -i "$1" -vf "scale=$3:-1" \
    -c:v libwebp -lossless 1 -compression_level 6 "$OUT/$2.webp"
}
art "$GODOT/ui/main-menu/TUMP.png"            "wordmark"      1100
art "$GODOT/ui/main-menu/PLAY BUTTON.png"     "pennant-play"   520
art "$GODOT/ui/main-menu/SETTINGS BUTTON.png" "pennant-two"    520
art "$GODOT/ui/main-menu/TUTORIAL BUTTON.png" "pennant-three"  520
art "$GODOT/ui/main-menu/QUIT BUTTON.png"     "pennant-four"   520
art "$GODOT/ui/brand/bh_studios_logo.png"     "bh-studios"     420

# --- competition and showcase artefacts -------------------------------------
# His own photographs. Downscaled hard: the originals are 4032 to 5712 px wide
# and none of them is ever drawn above 1600.
photo () {         # photo <src> <name> [width]
  [ -f "$1" ] || { echo "  skip $2 (source missing)"; return 0; }
  echo "  photo $2"
  "$FF" -y -v error -i "$1" -vf "scale=${3:-1600}:-2" -q:v 78 "$OUT/$2.webp"
}

echo "photos"
photo "$PICS/Picture of us.jpg" "team-stage"
photo "$PICS/Trophies.jpg"      "trophies"

# The PC Express / Intel Gamer Days showcase: strangers playing it in a mall.
# ⚠ Set EVENT_DIR to the unpacked "PC EXPRESS" folder to rebuild these. They are
# skipped rather than failing when it is not mounted, because that folder lives
# in a 2 GB archive that is not part of any repository.
if [ -n "$EVENT" ]; then
  photo "$EVENT/IMG_6974.JPG" "event-playing" 1400   # students at the booth PCs
  photo "$EVENT/IMG_6977.JPG" "event-wall"    1400   # the game on the LED wall
  photo "$EVENT/IMG_6996.JPG" "event-stage"   1400   # the team, menu behind them
  photo "$EVENT/IMG_6938.JPG" "event-crowd"   1400   # the seated audience
  photo "$EVENT/IMG_6942.JPG" "event-hands"   1400   # someone actually playing
else
  echo "  skip event photos (EVENT_DIR unset)"
fi

echo
du -ch "$OUT"/* | tail -1

# =============================================================================
# SOUND
#
# ⚠ Nothing on this site ever plays without a press. These files exist so the
# sound toggle in the header has something to play, and the toggle starts off.
#
# All of them are the game's own cues, from the Godot project's assets/audio.
# Mono, 96 kbps for the one-shots and 72 kbps for the loop, which puts the whole
# set well under 200 KB: cheaper than one of the screenshots.
# =============================================================================
SND="public/sound"
mkdir -p "$SND"
GA="$GODOT/audio"

cue () {           # cue <src> <name> [gain dB]
  echo "  cue $2"
  "$FF" -y -v error -i "$1" -ac 1 -ar 44100 \
    -af "volume=${3:-0}dB" -c:a libmp3lame -b:a 96k "$SND/$2.mp3"
}

echo "sound"
cue "$GA/sfx/ui_hover.wav"       "ui-hover"
cue "$GA/sfx/ui_click.wav"       "ui-click"
cue "$GA/sfx/lata_impact.wav"    "lata-impact"
cue "$GA/sfx/lata_knockdown.wav" "lata-knockdown"
cue "$GA/sfx/slipper_bounce.wav" "slipper-bounce"
cue "$GA/sfx/throw_whoosh.wav"   "throw-whoosh"

# The street ambience, trimmed to a 12 s bed with a short fade at each end so it
# loops without a seam. It is the map's own ambience track.
echo "  loop street"
"$FF" -y -v error -ss 2 -t 12 -i "$GA/ambience/eskinita_street.wav" \
  -ac 1 -ar 44100 -af "afade=t=in:st=0:d=1.2,afade=t=out:st=10.8:d=1.2" \
  -c:a libmp3lame -b:a 72k "$SND/street.mp3"

echo
echo "sound:"; du -ch "$SND"/* | tail -1

# The game's own menu theme, as a quiet bed for the Tumbang world only.
# 45 s out of the middle of the track, mono, 64 kbps, faded at both ends so the
# loop has no seam. ⚠ It is fetched only when the sound toggle is ON and only on
# the Tumbang pages, so no other route pays for it.
echo "  music tumbang-theme"
"$FF" -y -v error -ss 8 -t 45 -i "$GA/music/ost_menu.mp3" \
  -ac 1 -ar 44100 -af "afade=t=in:st=0:d=2,afade=t=out:st=43:d=2,volume=-3dB" \
  -c:a libmp3lame -b:a 64k "$SND/tumbang-theme.mp3"
