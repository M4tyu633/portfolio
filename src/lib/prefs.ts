"use client";

import { useSyncExternalStore } from "react";

/* `useState` + `useEffect(setState)` is a cascading render that React
 * Compiler's lint rejects, and it is the wrong tool for a value that lives
 * outside React. `useSyncExternalStore` renders the server snapshot first and
 * corrects on hydration. */

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    // Server-side there is no preference to read. Rendering "no preference"
    // and correcting on hydration is right for this: the alternative is
    // suppressing motion for one paint on every visitor.
    () => false,
  );
}
