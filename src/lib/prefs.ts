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

const VOLUME_KEY = "portfolio.music-volume";
let volumeCache: number | null = null;
const volumeListeners = new Set<() => void>();
function readVolume() {
  try {
    const value = window.localStorage.getItem(VOLUME_KEY);
    const parsed = value === null ? 0.3 : Number(value);
    return Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 0.3;
  } catch {
    return 0.3;
  }
}
function subscribeVolume(listener: () => void) {
  volumeListeners.add(listener);
  const sync = (event: StorageEvent) => {
    if (event.key === VOLUME_KEY) {
      volumeCache = readVolume();
      volumeListeners.forEach((update) => update());
    }
  };
  window.addEventListener("storage", sync);
  return () => {
    volumeListeners.delete(listener);
    window.removeEventListener("storage", sync);
  };
}
export function setMusicVolume(value: number) {
  if (!Number.isFinite(value)) return;
  volumeCache = Math.max(0, Math.min(1, value));
  try {
    window.localStorage.setItem(VOLUME_KEY, String(volumeCache));
  } catch {
    /* private browsing */
  }
  volumeListeners.forEach((update) => update());
}
export function useMusicVolume() {
  return useSyncExternalStore(
    subscribeVolume,
    () => {
      if (volumeCache === null) volumeCache = readVolume();
      return volumeCache;
    },
    () => 0.3,
  );
}
