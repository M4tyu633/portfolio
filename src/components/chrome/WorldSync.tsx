"use client";

import { useEffect } from "react";
import type { WorldId } from "@/content/types";

/* ===========================================================================
 * Writes the current world onto <body>.
 *
 * The page's own sections already carry `data-world`, so their colours are
 * correct without this. What this buys is everything OUTSIDE the section: the
 * navigation bar, the footer, the scrollbar, and the overscroll bounce at the
 * top and bottom of the document. Without it, scrolling past the end of a
 * near-black debugger page shows a strip of archival paper underneath it.
 *
 * It is also the transition. `body` has a 420ms colour transition in
 * globals.css, so the whole page changes ground as you cross into a world
 * rather than snapping.
 * ======================================================================== */

export default function WorldSync({ world }: { world: WorldId }) {
  useEffect(() => {
    const previous = document.body.dataset.world;
    document.body.dataset.world = world;
    return () => {
      document.body.dataset.world = previous ?? "index";
    };
  }, [world]);

  return null;
}

/* ---------------------------------------------------------------------------
 * The homepage version. Watches every `[data-world]` panel and hands the body
 * whichever one owns the top third of the viewport.
 *
 * A single IntersectionObserver with a top-heavy rootMargin rather than a
 * scroll handler doing getBoundingClientRect on five nodes per frame: the
 * decision only changes four times over the whole page, so paying for it once
 * per crossing is the right trade.
 * ------------------------------------------------------------------------ */
export function WorldScrollSync() {
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
      document.body.dataset.world = chosen?.dataset.world ?? "index";
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
      // A panel owns the page once its top passes 45% of the viewport, and lets
      // go once its bottom does. Anything looser makes two worlds fight over
      // the body colour while a boundary is on screen.
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 },
    );

    panels.forEach((p) => io.observe(p));
    return () => {
      io.disconnect();
      document.body.dataset.world = "index";
    };
  }, []);

  return null;
}
