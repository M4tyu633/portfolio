import type { WorldId } from "@/content/types";

/* ===========================================================================
 * THE BED — a beat, generated, one per world.
 *
 * ⚠ WHY THIS IS SYNTHESISED AND NOT A FILE.
 *
 * The site had exactly one music bed: the game's own menu theme, on the
 * Tumbang world, and silence everywhere else. Silence was defensible when the
 * alternative was a stock loop, but it left five of six rooms with no voice at
 * all, and a stock loop would have been the single least honest thing on a
 * portfolio whose whole argument is that the work is real.
 *
 * So there is no audio file here. There is a small synth: a kick built from a
 * pitch-swept sine, a hat built from filtered noise, a sub, and a held pad,
 * scheduled ahead on the WebAudio clock. Six worlds, six different tempos,
 * scales, patterns and timbres, and none of it is a sample anyone else made.
 * It is about four kilobytes of code instead of six megabytes of MP3, and the
 * bed for a world is derived from that world rather than picked to suit it.
 *
 * ⚠ IT NEVER STARTS ON ITS OWN. Every browser blocks autoplaying audio, and
 * the ones that do not should. Nothing in here makes a sound until the reader
 * presses the toggle in the navigation bar, and the toggle is the only promise
 * the site makes about audio.
 *
 * ⚠ SCHEDULING IS AHEAD OF TIME, NOT ON A TIMER. `setInterval` drifts and
 * stutters the moment the main thread is busy, which on this site it will be:
 * there is a WebGL cover on the first screen. The loop below wakes every 25ms,
 * looks 120ms into the future, and books every note that falls inside that
 * window with the audio clock, which does not care what React is doing.
 * ======================================================================== */

type Pattern = {
  /** Beats per minute. */
  bpm: number;
  /** Steps per bar. Sixteen everywhere; the feel comes from what is on them. */
  steps: number;
  /** Which sixteenths each voice lands on. */
  kick: number[];
  hat: number[];
  sub: number[];
  /** Semitones above the root, one per sub hit, cycled. */
  notes: number[];
  /** Root frequency in Hz. */
  root: number;
  /** A held chord under everything, in semitones. Empty for no pad. */
  pad: number[];
  /** 0 to 1. How much of the bed is noise rather than pitch. */
  grit: number;
  /** Overall level, so a busy world is not louder than a quiet one. */
  level: number;
};

/* ⚠ EACH OF THESE IS ARGUED FROM ITS WORLD, NOT CHOSEN BY EAR ALONE.
 *
 *   index    the archive     slow, sparse, almost nothing. A room, not a track.
 *   tumbang  the street      the fastest thing here, off-beat hats, a rubber
 *                            sub. It is a party game about hitting a can.
 *   egov     infrastructure  metronomic and even. Every stop on the route is
 *                            the same distance from the last.
 *   glyco    the instrument  four parallel reads, so the pad is a stacked
 *                            chord and the sub walks a slow arpeggio through it
 *   chip8    the machine     60Hz, square-ish, mechanical. A CPU with a clock.
 *   reading  the viewing room the slowest, lowest, most spacious. Nothing is
 *                            allowed to be urgent in a room where somebody is
 *                            reading a scan.
 *   cardio   the strip chart a pulse. It is a heart risk instrument.
 *   seam     the handoff     one held note, no rhythm at all.
 */
const PATTERNS: Record<WorldId, Pattern> = {
  index: {
    bpm: 68,
    steps: 16,
    kick: [0, 10],
    hat: [4, 12],
    sub: [0, 6, 10],
    notes: [0, 7, 3],
    root: 55,
    pad: [0, 7, 14],
    grit: 0.12,
    level: 0.55,
  },
  tumbang: {
    bpm: 104,
    steps: 16,
    kick: [0, 3, 6, 10, 11],
    hat: [2, 5, 7, 9, 13, 14, 15],
    sub: [0, 3, 6, 10],
    notes: [0, 0, 5, 3],
    root: 62,
    pad: [],
    grit: 0.5,
    level: 0.85,
  },
  egov: {
    bpm: 88,
    steps: 16,
    kick: [0, 4, 8, 12],
    hat: [2, 6, 10, 14],
    sub: [0, 8],
    notes: [0, 5],
    root: 49,
    pad: [0, 7],
    grit: 0.08,
    level: 0.6,
  },
  glyco: {
    bpm: 76,
    steps: 16,
    kick: [0, 8],
    hat: [3, 7, 11, 15],
    sub: [0, 4, 8, 12],
    notes: [0, 3, 7, 10],
    root: 52,
    pad: [0, 3, 7, 10],
    grit: 0.06,
    level: 0.55,
  },
  chip8: {
    bpm: 96,
    steps: 16,
    kick: [0, 4, 8, 12],
    hat: [0, 2, 4, 6, 8, 10, 12, 14],
    sub: [0, 2, 8, 10],
    notes: [0, 12, 0, 7],
    root: 58,
    pad: [],
    grit: 0.34,
    level: 0.5,
  },
  reading: {
    bpm: 58,
    steps: 16,
    kick: [0],
    hat: [8],
    sub: [0, 11],
    notes: [0, -5],
    root: 44,
    pad: [0, 7, 12],
    grit: 0.05,
    level: 0.5,
  },
  cardio: {
    bpm: 72,
    steps: 16,
    /* Two beats close together, then a rest. A heartbeat, not a four-to-the-
       floor: lub-dub, gap, lub-dub. */
    kick: [0, 2, 8, 10],
    hat: [],
    sub: [0, 8],
    notes: [0, 3],
    root: 47,
    pad: [0, 3, 10],
    grit: 0.1,
    level: 0.6,
  },
  seam: {
    bpm: 60,
    steps: 16,
    kick: [],
    hat: [],
    sub: [0],
    notes: [0],
    root: 41,
    pad: [0, 7],
    grit: 0.04,
    level: 0.4,
  },
};

const semitone = (root: number, n: number) => root * Math.pow(2, n / 12);

/** A short burst of white noise, made once and reused by every hat. */
function noiseBuffer(ctx: AudioContext) {
  const len = Math.floor(ctx.sampleRate * 0.4);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

export class Bed {
  private ctx: AudioContext;
  private out: GainNode;
  private noise: AudioBuffer;
  private pad: { osc: OscillatorNode; gain: GainNode }[] = [];
  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;
  private world: WorldId = "index";
  private stopped = true;

  constructor(ctx: AudioContext, destination: AudioNode) {
    this.ctx = ctx;
    this.out = ctx.createGain();
    this.out.gain.value = 0;
    this.out.connect(destination);
    this.noise = noiseBuffer(ctx);
  }

  private p() {
    return PATTERNS[this.world] ?? PATTERNS.index;
  }

  /* --- the voices -------------------------------------------------------
   * Each one builds its own tiny graph, schedules itself, and stops. Nothing
   * is pooled: an oscillator is cheaper than the bookkeeping to reuse it.
   * ------------------------------------------------------------------- */

  private kick(at: number, level: number) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    /* The whole character of a kick is the pitch envelope, not the level one. */
    o.frequency.setValueAtTime(140, at);
    o.frequency.exponentialRampToValueAtTime(42, at + 0.09);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(level, at + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.24);
    o.connect(g).connect(this.out);
    o.start(at);
    o.stop(at + 0.3);
  }

  private hat(at: number, level: number, grit: number) {
    const s = this.ctx.createBufferSource();
    const f = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    s.buffer = this.noise;
    f.type = "highpass";
    f.frequency.value = 5200 - grit * 1800;
    g.gain.setValueAtTime(level, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.035 + grit * 0.05);
    s.connect(f).connect(g).connect(this.out);
    s.start(at);
    s.stop(at + 0.14);
  }

  private tone(at: number, freq: number, level: number, grit: number) {
    const o = this.ctx.createOscillator();
    const f = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    o.type = grit > 0.3 ? "square" : "triangle";
    o.frequency.setValueAtTime(freq, at);
    f.type = "lowpass";
    f.frequency.setValueAtTime(700 + grit * 900, at);
    f.frequency.exponentialRampToValueAtTime(180, at + 0.3);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(level, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.34);
    o.connect(f).connect(g).connect(this.out);
    o.start(at);
    o.stop(at + 0.4);
  }

  /* The pad is the one voice that is held rather than struck, so it is built
     once per world and detuned rather than rescheduled every bar. */
  private buildPad() {
    this.clearPad();
    const p = this.p();
    const now = this.ctx.currentTime;
    for (const n of p.pad) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = "sawtooth";
      o.frequency.value = semitone(p.root, n) * 2;
      o.detune.value = (Math.random() - 0.5) * 9;
      const f = this.ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 460;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.018 * p.level, now + 2.2);
      o.connect(f).connect(g).connect(this.out);
      o.start(now);
      this.pad.push({ osc: o, gain: g });
    }
  }

  private clearPad() {
    const now = this.ctx.currentTime;
    for (const { osc, gain } of this.pad) {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      osc.stop(now + 0.7);
    }
    this.pad = [];
  }

  /* --- the clock -------------------------------------------------------- */
  private tick = () => {
    if (this.stopped) return;
    const p = this.p();
    const stepDur = 60 / p.bpm / 4;
    const horizon = this.ctx.currentTime + 0.12;

    while (this.nextTime < horizon) {
      const at = this.nextTime;
      const s = this.step % p.steps;
      if (p.kick.includes(s)) this.kick(at, 0.5 * p.level);
      if (p.hat.includes(s)) this.hat(at, 0.11 * p.level, p.grit);
      const subIndex = p.sub.indexOf(s);
      if (subIndex >= 0) {
        const n = p.notes[subIndex % p.notes.length];
        this.tone(at, semitone(p.root, n), 0.2 * p.level, p.grit);
      }
      this.nextTime += stepDur;
      this.step += 1;
    }
  };

  setWorld(world: WorldId) {
    if (this.world === world) return;
    this.world = world;
    /* Re-anchor the grid so a world change lands on a beat rather than
       half-way through one, and rebuild the held chord. */
    this.step = 0;
    this.nextTime = Math.max(this.nextTime, this.ctx.currentTime + 0.05);
    if (!this.stopped) this.buildPad();
  }

  start() {
    if (!this.stopped) return;
    this.stopped = false;
    this.step = 0;
    this.nextTime = this.ctx.currentTime + 0.08;
    this.buildPad();
    const now = this.ctx.currentTime;
    this.out.gain.cancelScheduledValues(now);
    this.out.gain.setValueAtTime(0.0001, now);
    this.out.gain.linearRampToValueAtTime(1, now + 1.1);
    this.timer = window.setInterval(this.tick, 25);
    this.tick();
  }

  stop() {
    if (this.stopped) return;
    this.stopped = true;
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    this.clearPad();
    const now = this.ctx.currentTime;
    this.out.gain.cancelScheduledValues(now);
    this.out.gain.setValueAtTime(this.out.gain.value, now);
    this.out.gain.linearRampToValueAtTime(0.0001, now + 0.35);
  }

  dispose() {
    this.stop();
    this.out.disconnect();
  }
}
