"use client";

import { useEffect, useRef, useState } from "react";

/* The one piece of audio left on this site: the game's own menu theme, on the
 * page about the game, behind a button.
 *
 * `preload="none"` and no src until the first press, so a visitor who never
 * touches it never downloads it. Nothing here autoplays and there is no global
 * toggle to remember. */

export default function ThemeTrack({
  src,
  label,
  note,
}: {
  src: string;
  label: string;
  note: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [armed, playing]);

  return (
    <div className="theme-track">
      <button
        type="button"
        onClick={() => {
          setArmed(true);
          setPlaying((v) => !v);
        }}
        aria-pressed={playing}
      >
        <span aria-hidden className="theme-track-glyph">
          {playing ? "❚❚" : "▶"}
        </span>
        <span>{playing ? `Pause ${label}` : `Play ${label}`}</span>
      </button>
      <p className="u-meta text-ink-3">{note}</p>
      <audio
        ref={ref}
        src={armed ? src : undefined}
        preload="none"
        loop
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
