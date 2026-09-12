# Music and audio behavior

The user requested a substantial music improvement and explicitly authorized downloading a suitable track. The selected gallery soundtrack is **Horizons by Scott Buckley**, from the composer's official library:
https://www.scottbuckley.com.au/library/horizons/

The official page provides the MP3 and releases it under CC BY 4.0. Attribution is visible in Music settings and included in `public/sound/music-credits.txt`.

## Mix

- Full 293.37-second composition, stereo. Source measured -14.09 LUFS integrated, -1.01 dBTP. Website edition has a -4.91 dB level adjustment, brief entry/exit fades, and VBR MP3 encoding (~4.17 MB).
- The file is not requested until a visitor presses Play music. Playback starts off each new page session; volume is remembered.
- Default volume is 30%. The player fades on toggle and volume changes, pauses in hidden tabs, and retains its place between portfolio routes.
- Background gain ducks to silence while an explicit, unmuted project media track plays. This avoids two music tracks playing over one another.
- Interface sounds are a separate opt-in. No hover chirps or per-world generated drum loops.
- The original TUMP menu track was recovered through Git LFS from `DOST-GameDEV/DOST-GameDev/assets/audio/music/ost_menu.mp3`. Use the full stereo source rather than the old 45-second mono excerpt. Its explicit project player is set to a controlled level.
- `scripts/prepare-music.py` records a reproducible loudness/encoding workflow. Audio masters stay in ignored `artifacts/audio/`; deliverables stay in `public/sound/`.

## Implementation

`src/lib/sound.tsx` owns one HTMLAudio element and Web Audio gain/analyser chain. `src/components/chrome/SoundToggle.tsx` exposes play/pause, volume and track information. `src/content/music.ts` owns metadata. `src/lib/prefs.ts` stores volume without a hydration mismatch.

`KineticScene.tsx` reads a stable `getLevel()` callback and gently adjusts the sculpture from actual audio energy. Reduced-motion and Pause motion disable this reactive movement. The scene is still usable with no audio or WebGL.

Validate source loading, play/pause, volume, route continuity, hidden-tab pause, media ducking and no automatic playback. Do not claim an audible listening review unless one was actually performed.
