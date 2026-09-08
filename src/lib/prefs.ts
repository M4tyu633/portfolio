"use client";

import { useSyncExternalStore } from "react";

/* ===========================================================================
 * Two external stores read the React 19 way.
 *
 * ⚠ Both of these were `useState` plus a `useEffect` that called `setState` on
 * mount, and React Compiler's lint rejects that outright: it is a cascading
 * render, and for a value that lives outside React it is also the wrong tool.
 * `useSyncExternalStore` exists for exactly this, and it gets hydration right
 * for free by rendering the server snapshot first and then re-rendering with
 * the real one.
 * ======================================================================== */

/* --- prefers-reduced-motion ---------------------------------------------- */

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

/* --- the sound preference ------------------------------------------------
 * A three line store rather than a state library. The value has to survive
 * navigation and reloads, be readable by any component, and never be true on
 * the server, which is all a module-level boolean plus a listener set gives.
 * ---------------------------------------------------------------------- */

const SOUND_KEY = "sound";
let soundCache: boolean | null = null;
const soundListeners = new Set<() => void>();

function readStoredSound() {
  try {
    return window.localStorage.getItem(SOUND_KEY) === "on";
  } catch {
    return false; // private mode, or storage disabled
  }
}

function subscribeSound(onChange: () => void) {
  soundListeners.add(onChange);
  // Another tab turning it off should turn it off here too.
  const onStorage = (e: StorageEvent) => {
    if (e.key === SOUND_KEY) {
      soundCache = readStoredSound();
      soundListeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    soundListeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSoundSnapshot() {
  if (soundCache === null) soundCache = readStoredSound();
  return soundCache;
}

export function setSoundEnabled(next: boolean) {
  soundCache = next;
  try {
    window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
  } catch {
    /* private mode */
  }
  soundListeners.forEach((l) => l());
}

export function useSoundEnabled() {
  return useSyncExternalStore(subscribeSound, getSoundSnapshot, () => false);
}
