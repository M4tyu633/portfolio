"use client";

import { useSyncExternalStore } from "react";

/* ===========================================================================
 * "Has this component hydrated yet?"
 *
 * ⚠ NOT `useState(false)` PLUS `useEffect(() => setState(true))`. That is the
 * usual spelling of this and the React Compiler lint in this repo rejects it:
 * a synchronous setState in an effect body causes a cascading render. This is
 * the sanctioned form — the store never changes, the server snapshot is
 * `false` and the client snapshot is `true`, so the value flips exactly once
 * at hydration with no extra render pass and no mismatch.
 *
 * Used by anything that must not be server-rendered because a library writes
 * its own inline style on mount: see components/chrome/Ambience.tsx.
 * ======================================================================== */

const subscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
