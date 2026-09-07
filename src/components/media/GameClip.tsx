"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/prefs";

/* ===========================================================================
 * A silent looping clip of the real game.
 *
 * ⚠ Four things this does that a bare <video autoplay loop> does not:
 *
 *   1. It does not fetch anything until it is near the viewport. `preload` is
 *      "none" and the src is not attached until an IntersectionObserver says
 *      the clip is within a screen of being seen. Three of these on one page
 *      would otherwise pull 1.8 MB before the visitor scrolls.
 *   2. It pauses when it leaves. A looping decode in a section nobody is
 *      looking at is the cheapest frame rate you will ever throw away.
 *   3. Under `prefers-reduced-motion` it never plays at all: the poster stays,
 *      and a play control appears so the choice is still available.
 *   4. It is muted and has no audio track at all, so it can never make noise,
 *      including on the pages where the site's sound toggle is on.
 * ======================================================================== */

export default function GameClip({
  src,
  poster,
  alt,
  className = "",
  ratio = "16 / 9",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [forced, setForced] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          if (el.readyState > 0) void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = reduced ? forced : armed;

  return (
    <div
      className={`bg-ground-2 relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={alt}
        src={play ? src : undefined}
        onLoadedData={(e) => {
          if (play) void e.currentTarget.play().catch(() => {});
        }}
        className="h-full w-full object-cover"
      />
      {reduced && !forced ? (
        <button
          type="button"
          onClick={() => setForced(true)}
          className="u-meta bg-ground text-ink border-ink absolute bottom-3 left-3 border px-3 py-1.5"
        >
          Play clip
        </button>
      ) : null}
    </div>
  );
}
