"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { opening, stamp, worldIndex } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/prefs";
import { useSound } from "@/lib/sound";

/* ===========================================================================
 * THE OPENING.
 *
 * ⚠⚠ THE FIRST VERSION WAS A BEAUTIFUL STATIC SLAB OF SERIF ON PAPER AND IT WAS
 * NOT ENOUGH. Restraint was the intent and it read as a magazine cover: nothing
 * on the first screen said "someone built this".
 *
 * The statement is a WINDOW now. A soft circle follows the pointer, and inside
 * it the page becomes the work: the four projects' real screens, laid left to
 * right in catalogue order, with the sentence knocked out of them in paper. The
 * metadata line under it names whichever one you are looking through.
 *
 * ⚠ It fills the PAGE, not the letters. The first attempt clipped the image to
 * the glyphs, and with four mostly-light captures the words simply went pale on
 * paper. Cutting a hole through the page instead is the version that reads.
 *
 * Why this and not a generic text effect: it is the one interaction here that
 * could only belong to this site. The sentence is "I keep picking projects that
 * are slightly unreasonable", and the projects are literally inside it. Nothing
 * is invented for it either; the strip is four real captures, built by
 * scripts/build-tumbang-media.sh and scripts/capture-live.sh.
 *
 * Idle, touch and reduced motion:
 *   - with no pointer it drifts on its own, so it is discoverable on a phone
 *   - under prefers-reduced-motion it parks and never moves
 *   - the ink copy is the real text; the knocked-out copy is aria-hidden, so a
 *     reader hears the sentence once
 * ======================================================================== */

/** Where each project sits across the strip, as a 0..1 fraction. */
const PANELS = worldIndex.map((w, i) => ({
  ...w,
  from: i / worldIndex.length,
  to: (i + 1) / worldIndex.length,
}));

/* How far the image layer extends past the sentence, in pixels. It has to be
 * bigger than the lens radius, or the circle clips against the text block and
 * reads as a rectangle with two rounded corners, which is what the first cut
 * did. Keep this and the `-inset-40` / `inset-40` pair in step. */
const BLEED = 160;

export default function Opening() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [looking, setLooking] = useState<number | null>(null);
  const lastRef = useRef<number | null>(null);

  /* The lens position is written straight to the node as two custom properties.
   * Holding it in React state would re-render this subtree on every pointer
   * sample to move one gradient. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    let raf = 0;
    let idle = true;
    let t = 0;

    const setLens = (x: number, y: number) => {
      el.style.setProperty("--lx", `${x}px`);
      el.style.setProperty("--ly", `${y}px`);

      // Measured against the IMAGE layer, which is BLEED wider on each side
      // than the sentence. Measuring against the sentence instead named the
      // wrong project by most of a panel.
      const w = el.offsetWidth + BLEED * 2;
      const f = (x + BLEED) / w;
      const next = Math.min(
        PANELS.length - 1,
        Math.max(0, Math.floor(f * PANELS.length)),
      );
      if (lastRef.current !== next) {
        lastRef.current = next;
        setLooking(next);
      }
    };

    // A slow lissajous, so the idle state is never a static circle and never a
    // loop short enough to read as an animation waiting to be interrupted.
    const drift = () => {
      t += 0.005;
      setLens(
        el.offsetWidth * (0.5 + Math.sin(t) * 0.36),
        el.offsetHeight * (0.5 + Math.sin(t * 1.7) * 0.3),
      );
      raf = requestAnimationFrame(drift);
    };

    if (reduced) setLens(el.offsetWidth * 0.24, el.offsetHeight * 0.5);
    else raf = requestAnimationFrame(drift);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (idle) {
        idle = false;
        cancelAnimationFrame(raf);
      }
      setLens(e.clientX - r.left, e.clientY - r.top);
    };

    const onLeave = () => {
      if (reduced || idle) return;
      idle = true;
      raf = requestAnimationFrame(drift);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const active = looking === null ? null : PANELS[looking];
  const TYPE = "u-display max-w-[16ch] text-[clamp(2.6rem,8.2vw,7.5rem)]";
  const LENS =
    "radial-gradient(circle at calc(var(--lx) + 160px) calc(var(--ly) + 160px), #000 0, #000 calc(var(--lr) * 0.74), transparent var(--lr))";

  return (
    <section
      aria-labelledby="opening-statement"
      /* overflow-x-clip, not hidden: the image layer hangs 160px past the
         sentence on both sides and would otherwise put a horizontal scrollbar
         on the homepage. `clip` suppresses that without making this a scroll
         container, which `hidden` would. */
      className="mx-auto flex min-h-[calc(100dvh-4.25rem)] max-w-[92rem] flex-col overflow-x-clip px-5 sm:px-8"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-9 sm:pt-14">
        <p className="u-meta text-ink-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          {stamp.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {s}
            </span>
          ))}
        </p>
        <ManilaClock />
      </div>

      <div className="flex flex-1 flex-col justify-center py-12 sm:py-20">
        <div
          ref={frameRef}
          className="relative isolate w-fit touch-none select-none"
          style={{ "--lr": "clamp(115px, 15vw, 240px)" } as React.CSSProperties}
        >
          <h1 id="opening-statement" className={TYPE}>
            {opening.statement}
          </h1>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-40"
            style={{ WebkitMaskImage: LENS, maskImage: LENS }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/work/opening-strip.webp)",
                // 100% 100%, not cover. The readout names the panel from the
                // lens's x fraction across this layer, and only an exact map
                // makes that claim true.
                backgroundSize: "100% 100%",
              }}
            />
            <span className={`${TYPE} text-ground absolute inset-40 block`}>
              {opening.statement}
            </span>
          </div>
        </div>

        <div className="mt-9 grid gap-x-16 gap-y-6 sm:mt-12 lg:grid-cols-[minmax(0,34em)_minmax(0,1fr)]">
          <p className="u-prose">{opening.body}</p>
          <p className="u-display text-ink-3 self-end text-[clamp(1.15rem,2vw,1.6rem)] italic">
            {opening.coda}
          </p>
        </div>

        {/* A live caption on an interaction, not decoration: it says the thing
            you are looking through has a name and a catalogue number. */}
        <p
          aria-live="polite"
          className="u-meta text-ink-3 mt-8 flex h-5 items-center gap-3"
        >
          {active ? (
            <>
              <span aria-hidden>◎</span>
              <span className="text-ink">{active.n}</span>
              <span>{active.title}</span>
              <span aria-hidden className="hidden sm:inline">
                /
              </span>
              <span className="hidden normal-case tracking-[0.04em] sm:inline">
                {reduced ? "seen through the sentence" : "move across the line"}
              </span>
            </>
          ) : null}
        </p>
      </div>

      <nav aria-label="Selected work" className="border-rule border-t pb-10">
        <ul>
          {worldIndex.map((w) => (
            <li key={w.n} className="border-rule-2 border-b last:border-0">
              <Link
                href={w.href}
                onPointerEnter={() => play("hover")}
                onClick={() => play("click")}
                className="group flex items-baseline gap-4 py-3.5 sm:gap-6"
              >
                <span className="u-meta text-ink-3 tabular-nums">{w.n}</span>
                <span className="text-[1.125rem] tracking-[-0.01em] sm:text-xl">
                  {w.title}
                </span>
                <span className="u-meta text-ink-3 ml-auto hidden normal-case tracking-[0.04em] sm:block">
                  {w.tag}
                </span>
                <span
                  aria-hidden
                  className="text-ink-3 transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * A clock in Manila. One honest live detail in the stamp line: the site already
 * says where he is, so it may as well say what time it is there.
 *
 * Empty on the server and filled after mount, because the server has no idea
 * what second it will be by the time the HTML arrives.
 * ------------------------------------------------------------------------ */
function ManilaClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="u-meta text-ink-3 tabular-nums opacity-60">
      {now ? `/ ${now}` : ""}
    </span>
  );
}
