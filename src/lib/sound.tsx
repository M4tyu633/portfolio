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
import { setSoundEnabled, useSoundEnabled } from "@/lib/prefs";

/* ===========================================================================
 * SOUND
 *
 * The site has a voice, and every world has its own.
 *
 * Three rules, in order of how much they matter:
 *
 *   1. NOTHING EVER PLAYS UNTIL SOMEBODY TURNS IT ON. The toggle starts off,
 *      the AudioContext is not even constructed until the press that enables
 *      it, and the choice is remembered. A portfolio that makes noise at a
 *      stranger is a portfolio they close.
 *   2. IT IS QUIET. Master gain is 0.3, the music bed sits at 0.055, and the
 *      loudest one-shot on the site peaks well under a notification.
 *   3. THE TUMBANG CUES ARE THE GAME'S OWN FILES. Everything else is
 *      synthesised here in about forty lines of WebAudio, because a hover tick
 *      is 30 ms of filtered noise and downloading a file for it would cost more
 *      than generating it.
 *
 * That split is also the art direction carried into sound: the archive ticks
 * like paper, eGovMed stamps, GlycoSwarm pings, CHIP-8 buzzes on a square wave
 * because a square-wave buzzer is literally the machine's entire sound
 * hardware, and Tumbang Preso plays the actual game.
 * ======================================================================== */

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

/* --- the synthesised voices ----------------------------------------------
 * `freq` is the pitch, `type` the waveform, `decay` the length in seconds and
 * `noise` swaps the oscillator for a burst of filtered noise. The archive's
 * tick is noise because paper and wood have no pitch.
 * ---------------------------------------------------------------------- */
type Voice = {
  hover: Tone;
  click: Tone;
  enter: Tone;
  impact: Tone;
};
type Tone = {
  freq: number;
  type?: OscillatorType;
  decay: number;
  gain: number;
  noise?: boolean;
  /** Sweeps to this frequency over the decay. */
  to?: number;
};

const VOICES: Record<Exclude<WorldId, "tumbang">, Voice> = {
  // Paper and wood. No pitch, just a short dry tick.
  index: {
    hover: { freq: 2600, decay: 0.018, gain: 0.1, noise: true },
    click: { freq: 1500, decay: 0.05, gain: 0.22, noise: true },
    enter: { freq: 900, decay: 0.11, gain: 0.24, noise: true },
    impact: { freq: 600, decay: 0.16, gain: 0.26, noise: true },
  },
  // A rubber stamp on a form: a low thud with a paper edge.
  egov: {
    hover: { freq: 2200, decay: 0.016, gain: 0.08, noise: true },
    click: { freq: 190, to: 120, type: "triangle", decay: 0.1, gain: 0.3 },
    enter: { freq: 160, to: 90, type: "triangle", decay: 0.16, gain: 0.34 },
    impact: { freq: 130, to: 70, type: "triangle", decay: 0.22, gain: 0.36 },
  },
  // A clinical monitor. Clean sine, no attack.
  glyco: {
    hover: { freq: 1320, type: "sine", decay: 0.05, gain: 0.1 },
    click: { freq: 880, type: "sine", decay: 0.12, gain: 0.2 },
    enter: { freq: 660, to: 990, type: "sine", decay: 0.2, gain: 0.22 },
    impact: { freq: 440, type: "sine", decay: 0.3, gain: 0.24 },
  },
  // ⚠ A square wave, because a single square-wave buzzer IS the whole of
  // CHIP-8's sound hardware. This is the one voice on the site that is a
  // reproduction of the real thing rather than an impression of it.
  chip8: {
    hover: { freq: 1760, type: "square", decay: 0.02, gain: 0.05 },
    click: { freq: 880, type: "square", decay: 0.045, gain: 0.12 },
    enter: { freq: 440, to: 880, type: "square", decay: 0.09, gain: 0.14 },
    impact: { freq: 220, type: "square", decay: 0.14, gain: 0.14 },
  },
  // The reading room: soft, damped, almost felt.
  reading: {
    hover: { freq: 1800, decay: 0.02, gain: 0.07, noise: true },
    click: { freq: 520, type: "sine", decay: 0.09, gain: 0.18 },
    enter: { freq: 390, type: "sine", decay: 0.15, gain: 0.2 },
    impact: { freq: 260, type: "sine", decay: 0.24, gain: 0.22 },
  },
};

/** The music bed per world. Only Tumbang has one, and it is the game's own
 *  menu theme. Nothing is invented to fill the others: silence in a reading
 *  room is correct. */
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

  const playTone = useCallback(
    (tone: Tone) => {
      const ctx = ensureContext();
      const master = masterRef.current;
      if (!ctx || !master) return;
      const now = ctx.currentTime;
      const g = ctx.createGain();
      // A 4 ms attack, then an exponential tail. Anything faster clicks.
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(tone.gain, now + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, now + tone.decay);
      g.connect(master);

      if (tone.noise) {
        const len = Math.ceil(ctx.sampleRate * tone.decay);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = tone.freq;
        bp.Q.value = 1.4;
        src.connect(bp).connect(g);
        src.start(now);
        src.stop(now + tone.decay);
        return;
      }

      const osc = ctx.createOscillator();
      osc.type = tone.type ?? "sine";
      osc.frequency.setValueAtTime(tone.freq, now);
      if (tone.to) {
        osc.frequency.exponentialRampToValueAtTime(tone.to, now + tone.decay);
      }
      osc.connect(g);
      osc.start(now);
      osc.stop(now + tone.decay);
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
      const voice = VOICES[world as Exclude<WorldId, "tumbang">];
      if (voice) playTone(voice[cue]);
    },
    [enabled, playSample, playTone],
  );

  /* --- the music bed ---------------------------------------------------- */
  const startBed = useCallback((world: WorldId) => {
    const url = BEDS[world];
    const el = bedRef.current;
    if (!url) {
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      return;
    }
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
  }, []);

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
      else playTone(VOICES[w as Exclude<WorldId, "tumbang">].click);
    } else {
      bedRef.current?.pause();
    }
  }, [enabled, ensureContext, playSample, playTone, startBed]);

  // Leaving the page should not leave a loop running in a background tab.
  useEffect(() => {
    const bed = bedRef;
    return () => {
      bed.current?.pause();
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
