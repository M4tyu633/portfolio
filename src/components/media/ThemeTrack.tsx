"use client";

import { useEffect, useRef, useState } from "react";

/* The original game soundtrack is fetched only after an explicit play action.
 * Shared gallery music ducks while this media element plays. */

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
    el.volume = 0.35;
    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
    return () => el.pause();
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
