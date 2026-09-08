"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* ===========================================================================
 * THE CHOREOGRAPHER.
 *
 * One IntersectionObserver for the whole document. Anything carrying
 * `data-seq` gets `data-in` the first time it crosses into view, and the CSS
 * for that surface decides what that means. Nothing here knows what it is
 * animating, and nothing animates on a timer.
 *
 * ⚠ WHY NOT `animation-timeline: view()`. Scroll-driven animations are a Chrome
 * feature today; Firefox does not ship them and Safari's support is partial. A
 * portfolio that is flat and still in two of three browsers is worse than one
 * that is choreographed in all three, and an observer that fires once per
 * element is cheaper than a scroll handler either way.
 *
 * ⚠ WHY ONCE. A section that re-animates every time it re-enters is a section
 * that punishes you for scrolling back to re-read it. `unobserve` on entry.
 *
 * Reduced motion is honoured by the CSS, not here: every `[data-seq]` rule is
 * written so the resting state is the readable one and the transition is the
 * only thing removed. Marking things `data-in` regardless means a reader with
 * reduced motion gets the finished composition rather than an empty page.
 * ======================================================================== */

export default function Choreograph() {
  // ⚠ Keyed on the route. This component lives in the root layout, which does
  // NOT remount across a client navigation, so without the dependency the
  // observer would only ever see the first page's sequences and every
  // subsequent route would render its resting state and stay there.
  const pathname = usePathname();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-seq]");
    if (nodes.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => (n.dataset.in = ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          io.unobserve(e.target);
        }
      },
      // A little before the element is fully in frame: the choreography should
      // be starting as you arrive, not after you have already read the heading.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
