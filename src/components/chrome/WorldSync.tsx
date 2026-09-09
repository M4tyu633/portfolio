"use client";

import { useEffect } from "react";
import type { WorldId } from "@/content/types";
import { useSound } from "@/lib/sound";

/* Writes the current world onto <body>, and tells the sound engine which voice
 * to use.
 *
 * A page's own sections already carry `data-world`, so their colours are right
 * without this. What this buys is everything OUTSIDE the section: the
 * navigation bar, the footer, the scrollbar and the overscroll bounce. Without
 * it, scrolling past the end of a near-black debugger page shows a strip of the
 * index world underneath it. `body` has a 420ms colour transition in
 * globals.css, so crossing into a world changes ground rather than snapping. */

export default function WorldSync({ world }: { world: WorldId }) {
  const { setWorld } = useSound();

  useEffect(() => {
    const previous = document.body.dataset.world;
    document.body.dataset.world = world;
    setWorld(world);
    return () => {
      document.body.dataset.world = previous ?? "index";
    };
  }, [world, setWorld]);

  return null;
}

/* The homepage version. Watches every `[data-world-panel]` and hands the body
 * whichever one owns the strip just under the navigation bar. One observer
 * rather than a scroll handler measuring six nodes a frame: the decision only
 * changes six times over the whole page. */
export function WorldScrollSync() {
  const { setWorld } = useSound();

  useEffect(() => {
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-world-panel]"),
    );
    if (panels.length === 0) return;

    // Ordered by document position so the last intersecting one wins, which is
    // the one nearest the top of the viewport as you scroll down.
    const visible = new Set<HTMLElement>();

    const apply = () => {
      let chosen: HTMLElement | undefined;
      for (const p of panels) if (visible.has(p)) chosen = p;
      const world = (chosen?.dataset.world as WorldId) ?? "index";
      if (document.body.dataset.world !== world) {
        document.body.dataset.world = world;
        setWorld(world);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        apply();
      },
      /* Anchored just under the navigation bar, not at the middle of the
       * viewport. What this attribute paints is everything outside the
       * sections, and all of it lives at the top edge; a mid-viewport decision
       * made the bar the wrong colour for half of every handoff.
       *
       * 68px, not 4.25rem: `rootMargin` only accepts px and %, and a rem value
       * throws rather than being ignored, taking the whole observer with it. */
      { rootMargin: "-68px 0px -88% 0px", threshold: 0 },
    );

    panels.forEach((p) => io.observe(p));
    return () => {
      io.disconnect();
      document.body.dataset.world = "index";
    };
  }, [setWorld]);

  return null;
}
