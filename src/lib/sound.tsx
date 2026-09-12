"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import type { WorldId } from "@/content/types";
import { setMusicVolume, useMusicVolume } from "@/lib/prefs";
import { soundtrack } from "@/content/music";

export type Cue = "hover" | "click" | "enter" | "impact";
type SoundContext = {
  enabled: boolean;
  loading: boolean;
  error: string | null;
  volume: number;
  setVolume: (value: number) => void;
  effects: boolean;
  setEffects: (value: boolean) => void;
  toggle: () => void;
  play: (cue: Cue) => void;
  setWorld: (world: WorldId) => void;
  getLevel: () => number;
};
const SoundCtx = createContext<SoundContext | null>(null);
const samples: Partial<Record<Cue, string>> = {
  click: "/sound/ui-click.mp3",
  enter: "/sound/lata-impact.mp3",
  impact: "/sound/lata-knockdown.mp3",
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [effects, setEffectsState] = useState(false);
  const volume = useMusicVolume();
  const audioRef = useRef<HTMLAudioElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const effectGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const meter = useRef(new Uint8Array(128));
  const desired = useRef(false);
  const world = useRef<WorldId>("index");
  const volumeRef = useRef(0.3);
  const effectsRef = useRef(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buffers = useRef(new Map<string, AudioBuffer>());
  const audibleFrames = useRef(new Set<MessageEventSource>());

  const mix = useCallback(() => {
    const context = contextRef.current,
      gain = gainRef.current;
    if (!context || !gain) return;
    const frames = [...document.querySelectorAll("iframe")];
    for (const source of audibleFrames.current) {
      if (!frames.some((frame) => frame.contentWindow === source))
        audibleFrames.current.delete(source);
    }
    const anotherTrack =
      audibleFrames.current.size > 0 ||
      [...document.querySelectorAll<HTMLMediaElement>("audio,video")].some(
        (media) =>
          media !== audioRef.current &&
          !media.paused &&
          !media.ended &&
          !media.muted,
      );
    const reading = ["reading", "cardio", "glyco"].includes(world.current);
    const target =
      desired.current && !document.hidden && !anotherTrack
        ? volumeRef.current * (reading ? 0.78 : 1)
        : 0;
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.setTargetAtTime(target, context.currentTime, 0.16);
  }, []);

  const ensureAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return null;
    if (contextRef.current) return contextRef.current;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const source = context.createMediaElementSource(audio);
    const gain = context.createGain();
    gain.gain.value = 0;
    const effectGain = context.createGain();
    effectGain.gain.value = 0.07;
    const analyser = context.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.85;
    source.connect(gain).connect(analyser).connect(context.destination);
    effectGain.connect(context.destination);
    analyserRef.current = analyser;
    contextRef.current = context;
    gainRef.current = gain;
    effectGainRef.current = effectGain;
    return context;
  }, []);

  const toggle = useCallback(() => {
    desired.current = !desired.current;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    const audio = audioRef.current;
    if (!audio) return;
    if (!desired.current) {
      setEnabled(false);
      setLoading(false);
      mix();
      pauseTimer.current = setTimeout(() => {
        if (!desired.current) audio.pause();
      }, 400);
      return;
    }
    setError(null);
    setLoading(true);
    const context = ensureAudio();
    if (!context) {
      desired.current = false;
      setLoading(false);
      setError("Audio is unavailable in this browser.");
      return;
    }
    if (!audio.getAttribute("src")) audio.src = soundtrack.src;
    // Both calls occur in the visitor's gesture, including on Safari.
    void Promise.all([context.resume(), audio.play()])
      .then(() => {
        if (!desired.current) {
          audio.pause();
          return;
        }
        setLoading(false);
        setEnabled(true);
        mix();
      })
      .catch(() => {
        desired.current = false;
        setEnabled(false);
        setLoading(false);
        setError("Music couldn’t start. Tap to try again.");
      });
  }, [ensureAudio, mix]);

  const setWorld = useCallback(
    (next: WorldId) => {
      world.current = next;
      mix();
    },
    [mix],
  );
  const getLevel = useCallback(() => {
    if (!desired.current || !analyserRef.current || document.hidden) return 0;
    analyserRef.current.getByteTimeDomainData(meter.current);
    let sum = 0;
    for (const value of meter.current) {
      const centered = (value - 128) / 128;
      sum += centered * centered;
    }
    return Math.min(1, Math.sqrt(sum / meter.current.length) * 7);
  }, []);
  const setEffects = useCallback(
    (next: boolean) => {
      effectsRef.current = next;
      setEffectsState(next);
      if (next) void ensureAudio()?.resume();
    },
    [ensureAudio],
  );
  const play = useCallback(async (cue: Cue) => {
    // No hover noise. Original game cues are available as an explicit option.
    if (!effectsRef.current || world.current !== "tumbang" || cue === "hover")
      return;
    const url = samples[cue],
      context = contextRef.current,
      destination = effectGainRef.current;
    if (!url || !context || !destination) return;
    try {
      void context.resume();
      let buffer = buffers.current.get(url);
      if (!buffer) {
        const response = await fetch(url);
        if (!response.ok) return;
        buffer = await context.decodeAudioData(await response.arrayBuffer());
        buffers.current.set(url, buffer);
      }
      if (!effectsRef.current || document.hidden) return;
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(destination);
      source.start();
      source.onended = () => source.disconnect();
    } catch {
      /* Optional cues never interrupt navigation. */
    }
  }, []);

  useEffect(() => {
    volumeRef.current = volume;
    mix();
  }, [volume, mix]);
  useEffect(() => {
    mix();
  }, [pathname, mix]);
  useEffect(() => {
    const music = audioRef.current;
    const frameAudio = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        !event.source ||
        event.data?.type !== "portfolio-project-audio" ||
        typeof event.data.active !== "boolean"
      )
        return;
      if (
        ![...document.querySelectorAll("iframe")].some(
          (frame) => frame.contentWindow === event.source,
        )
      )
        return;
      if (event.data.active) audibleFrames.current.add(event.source);
      else audibleFrames.current.delete(event.source);
      mix();
    };
    window.addEventListener("message", frameAudio);
    const mediaChanged = (event: Event) => {
      if (event.target !== music) mix();
    };
    const visibility = () => {
      if (document.hidden) {
        music?.pause();
        void contextRef.current?.suspend();
      } else if (desired.current && music) {
        void Promise.all([contextRef.current?.resume(), music.play()])
          .then(mix)
          .catch(() => {
            desired.current = false;
            setEnabled(false);
          });
      }
    };
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("play", mediaChanged, true);
    document.addEventListener("pause", mediaChanged, true);
    document.addEventListener("ended", mediaChanged, true);
    return () => {
      window.removeEventListener("message", frameAudio);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("play", mediaChanged, true);
      document.removeEventListener("pause", mediaChanged, true);
      document.removeEventListener("ended", mediaChanged, true);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      music?.pause();
      void contextRef.current?.close();
    };
  }, [mix]);

  const value = useMemo(
    () => ({
      enabled,
      loading,
      error,
      volume,
      setVolume: setMusicVolume,
      effects,
      setEffects,
      toggle,
      play,
      setWorld,
      getLevel,
    }),
    [
      enabled,
      loading,
      error,
      volume,
      effects,
      setEffects,
      toggle,
      play,
      setWorld,
      getLevel,
    ],
  );
  return (
    <SoundCtx.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        data-site-music
        preload="none"
        loop
        onError={() => {
          desired.current = false;
          setEnabled(false);
          setLoading(false);
          setError("Music is unavailable. Please try again.");
        }}
      />
    </SoundCtx.Provider>
  );
}

export function useSound(): SoundContext {
  return (
    useContext(SoundCtx) ?? {
      enabled: false,
      loading: false,
      error: null,
      volume: 0.3,
      setVolume: () => {},
      effects: false,
      setEffects: () => {},
      toggle: () => {},
      play: () => {},
      setWorld: () => {},
      getLevel: () => 0,
    }
  );
}
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
