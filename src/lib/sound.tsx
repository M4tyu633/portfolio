"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { WorldId } from "@/content/types";
import { Bed } from "@/lib/bed";
import { setSoundEnabled, useSoundEnabled } from "@/lib/prefs";

// Opt-in samples and music from the Godot game. Other pages are silent.
// The emulator owns its actual buzzer inside its isolated document.
export type Cue = "hover" | "click" | "enter" | "impact";

type Ctx = {
  enabled: boolean;
  toggle: () => void;
  play: (cue: Cue) => void;
  /** Sets the world whose voice is used, and whose music bed plays. */
  setWorld: (w: WorldId) => void;
};

const SoundCtx = createContext<Ctx | null>(null);

const MASTER = 0.3;
const MUSIC = 0.055;

/* --- the sampled cues, Tumbang only -------------------------------------- */
const SAMPLES: Partial<Record<Cue, string>> = {
  hover: "/sound/ui-hover.mp3",
  click: "/sound/ui-click.mp3",
  enter: "/sound/lata-impact.mp3",
  impact: "/sound/lata-knockdown.mp3",
};

/** ⚠ THE SAMPLED BED IS TUMBANG'S ONLY, AND IT IS THE GAME'S OWN MENU THEME.
 *  Every other world is played by the synth in `lib/bed.ts` rather than by a
 *  file, because a stock loop would have been the least honest thing on a
 *  portfolio whose argument is that the work is real. See that file. */
const BEDS: Partial<Record<WorldId, string>> = {
  tumbang: "/sound/tumbang-theme.mp3",
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSoundEnabled();
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<Map<string, AudioBuffer>>(new Map());
  const worldRef = useRef<WorldId>("index");
  const bedRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<Bed | null>(null);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = MASTER;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  }, []);

  const playSample = useCallback(
    async (url: string, gain: number) => {
      const ctx = ensureContext();
      const master = masterRef.current;
      if (!ctx || !master) return;
      let buf = bufferRef.current.get(url);
      if (!buf) {
        try {
          const res = await fetch(url);
          buf = await ctx.decodeAudioData(await res.arrayBuffer());
          bufferRef.current.set(url, buf);
        } catch {
          return;
        }
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const g = ctx.createGain();
      g.gain.value = gain;
      src.connect(g).connect(master);
      src.start();
    },
    [ensureContext],
  );

  const play = useCallback(
    (cue: Cue) => {
      if (!enabled) return;
      const world = worldRef.current;
      ctxRef.current?.resume();
      if (world === "tumbang") {
        const url = SAMPLES[cue];
        if (url) void playSample(url, cue === "hover" ? 0.35 : 0.8);
        return;
      }
    },
    [enabled, playSample],
  );

  /* --- the music bed ----------------------------------------------------
   * Two engines, and which one runs is decided by the world. Tumbang plays its
   * own recorded menu theme, because the game has one and it is his. Every
   * other world is generated: a kick, a hat, a sub and a held pad, scheduled
   * ahead on the audio clock, with a different tempo, scale and pattern per
   * room. See `lib/bed.ts` for why each pattern is what it is.
   *
   * ⚠ NEITHER STARTS BY ITSELF. Autoplaying audio is refused by every browser
   * worth shipping to and should be. The toggle in the navigation bar is the
   * only thing that starts either of them.
   * ------------------------------------------------------------------- */
  const startBed = useCallback(
    (world: WorldId) => {
      const url = BEDS[world];
      const el = bedRef.current;

      /* The recorded bed, if this world has one. */
      if (url) {
        synthRef.current?.stop();
        const audio = el ?? new Audio();
        bedRef.current = audio;
        if (audio.getAttribute("src") !== url) {
          audio.src = url;
          audio.loop = true;
          audio.preload = "none";
        }
        audio.volume = MUSIC;
        void audio.play().catch(() => {
          /* the browser can still refuse; the toggle is the only promise made */
        });
        return;
      }

      /* Otherwise, the synth. */
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      const ctx = ensureContext();
      const master = masterRef.current;
      if (!ctx || !master) return;
      if (!synthRef.current) synthRef.current = new Bed(ctx, master);
      synthRef.current.setWorld(world);
      synthRef.current.start();
    },
    [ensureContext],
  );

  const setWorld = useCallback(
    (w: WorldId) => {
      worldRef.current = w;
      if (enabled) startBed(w);
    },
    [enabled, startBed],
  );

  const toggle = useCallback(() => {
    const now = !enabled;
    setSoundEnabled(now);
    if (now) {
      ensureContext()?.resume();
      startBed(worldRef.current);
      // A cue on the press itself, so turning it on demonstrates what it did.
      const w = worldRef.current;
      if (w === "tumbang") void playSample(SAMPLES.click!, 0.8);
    } else {
      bedRef.current?.pause();
      synthRef.current?.stop();
    }
  }, [enabled, ensureContext, playSample, startBed]);

  // Leaving the page should not leave a loop running in a background tab.
  useEffect(() => {
    const bed = bedRef;
    const synth = synthRef;
    return () => {
      bed.current?.pause();
      synth.current?.dispose();
      void ctxRef.current?.close();
    };
  }, []);

  const value = useMemo(
    () => ({ enabled, toggle, play, setWorld }),
    [enabled, toggle, play, setWorld],
  );

  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
}

/** Safe to call outside the provider: it returns a no-op, so a component can
 *  ask for sound without knowing whether it is mounted inside one. */
export function useSound(): Ctx {
  const ctx = useContext(SoundCtx);
  return (
    ctx ?? {
      enabled: false,
      toggle: () => {},
      play: () => {},
      setWorld: () => {},
    }
  );
}

/** Attach to any interactive element to give it the current world's voice. */
export function useSoundHandlers() {
  const { play } = useSound();
  return useMemo(
    () => ({
      onPointerEnter: () => play("hover"),
      onClick: () => play("click"),
    }),
    [play],
  );
}
