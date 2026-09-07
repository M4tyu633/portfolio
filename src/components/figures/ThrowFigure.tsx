"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ===========================================================================
 * THROW A TSINELAS.
 *
 * The signature interaction of world 01, and it is not a toy version of the
 * game. It is the QUESTION the game's physics turns on, handed to the visitor:
 *
 *   Two ways to decide whether a slipper hit the can.
 *
 *   A · AREA OVERLAP     is the slipper inside the contact radius at any
 *                        physics TICK? This is what a trigger volume can see:
 *                        positions, sampled at a fixed rate.
 *   B · HOST DISTANCE    what was the closest approach over the whole swept
 *                        path? Continuous, and independent of the tick.
 *
 * They agree on a slow throw. They stop agreeing when the step between two
 * ticks gets long relative to the contact radius, which is exactly what a hard
 * throw does. The visitor throws a few times and builds their own version of
 * the probe table that made him stop trusting the engine's callbacks.
 *
 * ⚠ What is honest about this and what is not: the two TESTS are the real
 * pair, and the counts quoted in the prose (36 staged, 20 fired) are his
 * measured ones. This canvas is not a simulation of Godot and does not claim
 * to reproduce which specific cases failed. It demonstrates the mechanism.
 *
 * Everything is drawn in Canvas 2D. No 3D renderer: the argument is about
 * distance between two points on a flat court, which is a 2D argument, and a
 * WebGL scene would cost more than the whole rest of the page to make a claim
 * it cannot make any better.
 * ======================================================================== */

/* ---- court geometry, in metres ------------------------------------------ */
const COURT_W = 12;
const COURT_H = 9;
const BOX = 3.0; // the box is a SQUARE, and X and Z clamp independently
const BOX_CX = 6;
const BOX_CY = 3.4;
const LATA = { x: BOX_CX, y: BOX_CY, r: 0.3 };
const SLIPPER_R = 0.12;
const CONTACT_R = LATA.r + SLIPPER_R; // 0.42 m
const THROWER = { x: 6, y: 8.1 };
const DRAG = 0.55; // per second, air and ground drag combined
const MAX_SPEED = 34;
const MIN_SPEED = 9;

type Sample = { x: number; y: number };

type Verdict = {
  speed: number;
  hz: number;
  step: number;
  closest: number;
  areaFired: boolean;
  hostFired: boolean;
  restedInBox: boolean;
};

type Tally = { throws: number; area: number; host: number; disagree: number };

const HZ_CHOICES = [60, 30, 20] as const;

export default function ThrowFigure({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [hz, setHz] = useState<number>(30);
  const [aim, setAim] = useState(-90); // degrees, -90 is straight up the court
  const [power, setPower] = useState(0.62); // 0..1
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [tally, setTally] = useState<Tally>({
    throws: 0,
    area: 0,
    host: 0,
    disagree: 0,
  });

  /* The simulation lives in refs. A rAF loop that called setState per frame
   * would re-render this subtree sixty times a second to move one dot. */
  const sim = useRef<{
    flying: boolean;
    samples: Sample[];
    t: number;
    pos: Sample;
    vel: Sample;
    dt: number;
    spin: number;
    resolved: Verdict | null;
  }>({
    flying: false,
    samples: [],
    t: 0,
    pos: { ...THROWER },
    vel: { x: 0, y: 0 },
    dt: 1 / 30,
    spin: 0,
    resolved: null,
  });

  /* Mirrors of the three controls, written in effects rather than during
   * render: the rAF loop needs their current values but must not be a
   * dependency of them, and React Compiler's lint rejects a ref written while
   * rendering. One frame of lag on an aim line is not observable. */
  const aimRef = useRef(aim);
  const powerRef = useRef(power);
  const hzRef = useRef(hz);
  const dragRef = useRef<{ active: boolean } | null>(null);

  useEffect(() => {
    aimRef.current = aim;
  }, [aim]);
  useEffect(() => {
    powerRef.current = power;
  }, [power]);
  useEffect(() => {
    hzRef.current = hz;
  }, [hz]);

  /* ---- the throw ------------------------------------------------------- */
  const launch = useCallback(() => {
    const s = sim.current;
    if (s.flying) return;

    const speed = MIN_SPEED + powerRef.current * (MAX_SPEED - MIN_SPEED);
    const rad = (aimRef.current * Math.PI) / 180;
    const tick = hzRef.current;

    s.dt = 1 / tick;
    s.pos = { ...THROWER };
    s.vel = { x: Math.cos(rad) * speed, y: Math.sin(rad) * speed };
    s.samples = [{ ...THROWER }];
    s.t = 0;
    s.spin = 0;
    s.flying = true;
    s.resolved = null;

    /* Run the whole flight up front. The animation replays it; it does not
     * produce it. That is what lets a reduced-motion visitor get the identical
     * verdict with no animation at all, and it means the two contact tests are
     * evaluated over exactly the samples that get drawn. */
    const pos = { ...THROWER };
    const vel = { ...s.vel };
    let closest = Infinity;

    for (let i = 0; i < 400; i++) {
      const prev = { ...pos };
      pos.x += vel.x * s.dt;
      pos.y += vel.y * s.dt;
      const decay = Math.max(0, 1 - DRAG * s.dt);
      vel.x *= decay;
      vel.y *= decay;

      // B · the host's test: closest approach over the SWEPT SEGMENT, not at
      // its endpoints. This is the number the game actually resolves on.
      closest = Math.min(closest, segmentDistance(prev, pos, LATA));

      s.samples.push({ ...pos });

      const speedNow = Math.hypot(vel.x, vel.y);
      const out =
        pos.x < -0.5 || pos.x > COURT_W + 0.5 || pos.y < -0.5 || pos.y > COURT_H + 0.5;
      if (speedNow < 1.2 || out) break;
    }

    // A · the trigger volume's test: is any SAMPLE inside the contact radius?
    const areaFired = s.samples.some(
      (p) => Math.hypot(p.x - LATA.x, p.y - LATA.y) <= CONTACT_R,
    );
    const hostFired = closest <= CONTACT_R;
    const rest = s.samples[s.samples.length - 1];
    const restedInBox =
      Math.abs(rest.x - BOX_CX) <= BOX / 2 && Math.abs(rest.y - BOX_CY) <= BOX / 2;

    s.resolved = {
      speed,
      hz: tick,
      step: speed / tick,
      closest,
      areaFired,
      hostFired,
      restedInBox,
    };
  }, []);

  /* ---- render loop ----------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let scale = 1;
    let ox = 0;
    let oy = 0;

    /* The world's colours, resolved once rather than per frame.
     * `getComputedStyle` forces style resolution, and calling it eight times a
     * frame to fetch constants that only change when the world does is the kind
     * of cost that shows up on a phone and nowhere else. */
    let palette = readPalette(canvas);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(w / COURT_W, h / COURT_H);
      ox = (w - COURT_W * scale) / 2;
      oy = (h - COURT_H * scale) / 2;
      palette = readPalette(canvas);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const X = (mx: number) => ox + mx * scale;
    const Y = (my: number) => oy + my * scale;

    // Precomputed chalk jitter, so the hand-drawn line does not shimmer.
    const jitter = Array.from({ length: 96 }, () => (Math.random() - 0.5) * 2.4);

    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dtReal = Math.min((now - last) / 1000, 0.05);
      last = now;

      const { ink, chalk, faint, accent, red, rim, defense, persimmon } =
        palette;

      ctx.clearRect(0, 0, w, h);

      /* --- the court, drawn in chalk --- */
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // The box. Square, dashed, hand-wobbled at the corners.
      ctx.save();
      ctx.strokeStyle = chalk;
      ctx.lineWidth = Math.max(1.5, scale * 0.035);
      ctx.setLineDash([scale * 0.34, scale * 0.2]);
      const bx = BOX_CX - BOX / 2;
      const by = BOX_CY - BOX / 2;
      ctx.beginPath();
      wobbleRect(ctx, X(bx), Y(by), BOX * scale, BOX * scale, jitter);
      ctx.stroke();
      ctx.restore();

      // The contact radius around the lata. This is the thing both tests are
      // asking about, so it is always visible.
      ctx.save();
      ctx.strokeStyle = faint;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(X(LATA.x), Y(LATA.y), CONTACT_R * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // The throwing line.
      ctx.save();
      ctx.strokeStyle = faint;
      ctx.lineWidth = 1;
      ctx.setLineDash([scale * 0.12, scale * 0.18]);
      ctx.beginPath();
      ctx.moveTo(X(0.6), Y(THROWER.y));
      ctx.lineTo(X(COURT_W - 0.6), Y(THROWER.y));
      ctx.stroke();
      ctx.restore();

      const s = sim.current;

      /* --- the swept path and its samples --- */
      if (s.samples.length > 1) {
        const shown = s.flying
          ? Math.min(s.samples.length, Math.floor(s.t / s.dt) + 1)
          : s.samples.length;

        ctx.save();
        ctx.strokeStyle = faint;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(X(s.samples[0].x), Y(s.samples[0].y));
        for (let i = 1; i < shown; i++) {
          ctx.lineTo(X(s.samples[i].x), Y(s.samples[i].y));
        }
        ctx.stroke();
        ctx.restore();

        // Every physics tick, drawn. These dots ARE the argument: the trigger
        // volume can only ever see these positions, and the gaps between them
        // are where a contact goes missing.
        ctx.save();
        ctx.fillStyle = chalk;
        for (let i = 0; i < shown; i++) {
          const p = s.samples[i];
          const inside = Math.hypot(p.x - LATA.x, p.y - LATA.y) <= CONTACT_R;
          ctx.fillStyle = inside ? accent : chalk;
          ctx.beginPath();
          ctx.arc(X(p.x), Y(p.y), inside ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      /* --- closest approach, once a throw has resolved --- */
      if (!s.flying && s.resolved) {
        const near = nearestPointOnPath(s.samples, LATA);
        ctx.save();
        ctx.strokeStyle = s.resolved.hostFired ? persimmon : faint;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(X(LATA.x), Y(LATA.y));
        ctx.lineTo(X(near.x), Y(near.y));
        ctx.stroke();
        ctx.restore();
      }

      /* --- the taya --- */
      ctx.save();
      ctx.fillStyle = defense;
      ctx.beginPath();
      ctx.arc(X(BOX_CX + 0.85), Y(BOX_CY + 0.75), scale * 0.17, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      /* --- the lata --- */
      const toppled = !!s.resolved && s.resolved.hostFired && !s.flying;
      ctx.save();
      ctx.translate(X(LATA.x), Y(LATA.y));
      if (toppled) ctx.rotate(0.9);
      ctx.fillStyle = red;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        LATA.r * scale * (toppled ? 1.5 : 1),
        LATA.r * scale * (toppled ? 0.62 : 1),
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.ellipse(
        0,
        toppled ? 0 : -LATA.r * scale * 0.22,
        LATA.r * scale * (toppled ? 0.6 : 0.74),
        LATA.r * scale * (toppled ? 0.5 : 0.34),
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      /* --- the thrower, and the aim --- */
      ctx.save();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(X(THROWER.x), Y(THROWER.y), scale * 0.17, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (!s.flying) {
        const rad = (aimRef.current * Math.PI) / 180;
        const len = (1.1 + powerRef.current * 2.6) * scale;
        ctx.save();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.setLineDash([scale * 0.1, scale * 0.1]);
        ctx.beginPath();
        ctx.moveTo(X(THROWER.x), Y(THROWER.y));
        ctx.lineTo(
          X(THROWER.x) + Math.cos(rad) * len,
          Y(THROWER.y) + Math.sin(rad) * len,
        );
        ctx.stroke();
        ctx.restore();
      }

      /* --- the slipper in flight --- */
      if (s.flying) {
        s.t += reduced ? 999 : dtReal;
        const idx = Math.floor(s.t / s.dt);
        if (idx >= s.samples.length - 1) {
          s.flying = false;
          const v = s.resolved;
          if (v) {
            setVerdict(v);
            setTally((t) => ({
              throws: t.throws + 1,
              area: t.area + (v.areaFired ? 1 : 0),
              host: t.host + (v.hostFired ? 1 : 0),
              disagree: t.disagree + (v.areaFired !== v.hostFired ? 1 : 0),
            }));
          }
        } else {
          const a = s.samples[idx];
          const b = s.samples[idx + 1];
          const f = (s.t % s.dt) / s.dt;
          const px = a.x + (b.x - a.x) * f;
          const py = a.y + (b.y - a.y) * f;
          s.spin += dtReal * 16;
          drawSlipper(ctx, X(px), Y(py), scale, s.spin, ink);
        }
      } else if (s.samples.length > 1) {
        const rest = s.samples[s.samples.length - 1];
        drawSlipper(ctx, X(rest.x), Y(rest.y), scale, s.spin, ink);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  /* ---- pointer aiming -------------------------------------------------- */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const toCourt = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const scale = Math.min(rect.width / COURT_W, rect.height / COURT_H);
      const ox = (rect.width - COURT_W * scale) / 2;
      const oy = (rect.height - COURT_H * scale) / 2;
      return {
        x: (e.clientX - rect.left - ox) / scale,
        y: (e.clientY - rect.top - oy) / scale,
      };
    };

    const update = (e: PointerEvent) => {
      const p = toCourt(e);
      // Pull BACK from the thrower to aim forward, like a slingshot.
      const dx = THROWER.x - p.x;
      const dy = THROWER.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.15) return;
      setAim((Math.atan2(dy, dx) * 180) / Math.PI);
      setPower(Math.min(1, dist / 4.2));
    };

    const down = (e: PointerEvent) => {
      if (sim.current.flying) return;
      dragRef.current = { active: true };
      wrap.setPointerCapture(e.pointerId);
      update(e);
    };
    const move = (e: PointerEvent) => {
      if (!dragRef.current?.active) return;
      e.preventDefault();
      update(e);
    };
    const up = (e: PointerEvent) => {
      if (!dragRef.current?.active) return;
      dragRef.current = null;
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* the pointer may already be gone */
      }
      launch();
    };

    wrap.addEventListener("pointerdown", down);
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerup", up);
    wrap.addEventListener("pointercancel", up);
    return () => {
      wrap.removeEventListener("pointerdown", down);
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerup", up);
      wrap.removeEventListener("pointercancel", up);
    };
  }, [launch]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 1 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setAim((a) => clamp(a - step, -170, -10));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setAim((a) => clamp(a + step, -170, -10));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setPower((p) => clamp(p + 0.06, 0, 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setPower((p) => clamp(p - 0.06, 0, 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      launch();
    }
  };

  const disagreed = verdict && verdict.areaFired !== verdict.hostFired;

  return (
    <div className="border-rule bg-ground-2 border">
      <div
        ref={wrapRef}
        tabIndex={0}
        role="application"
        aria-label="Throwing range. Drag back from the thrower and release to throw a slipper at the can. Arrow keys aim and set power, Enter throws."
        onKeyDown={onKeyDown}
        className="m-asphalt relative w-full cursor-crosshair touch-none select-none"
        style={{ aspectRatio: compact ? "12 / 8" : "12 / 9" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        {!verdict ? (
          <p className="u-meta text-ink-3 pointer-events-none absolute inset-x-0 bottom-3 text-center">
            Drag back and let go
          </p>
        ) : null}
      </div>

      {/* Readouts live in the DOM rather than on the canvas: they are text, so
          they should be selectable, translatable and reachable by a reader. */}
      <div className="border-rule grid grid-cols-2 gap-px border-t sm:grid-cols-4">
        <Verd
          label="A · Area overlap"
          sub={verdict ? `sampled at ${verdict.hz} Hz` : "trigger volume"}
          state={
            verdict ? (verdict.areaFired ? "fired" : "missed") : "waiting"
          }
        />
        <Verd
          label="B · Host distance"
          sub={
            verdict
              ? `closest ${verdict.closest.toFixed(2)} m`
              : `contact under ${CONTACT_R.toFixed(2)} m`
          }
          state={verdict ? (verdict.hostFired ? "fired" : "missed") : "waiting"}
        />
        <Readout
          label="Step between ticks"
          value={verdict ? `${verdict.step.toFixed(2)} m` : "—"}
          note={`contact window ${(CONTACT_R * 2).toFixed(2)} m`}
        />
        <Readout
          label="Your probe"
          value={
            tally.throws
              ? `${tally.area}/${tally.throws}`
              : "0/0"
          }
          note={
            tally.disagree
              ? `${tally.disagree} disagreement${tally.disagree === 1 ? "" : "s"}`
              : "area fired / thrown"
          }
        />
      </div>

      <div className="border-rule flex flex-wrap items-center gap-x-6 gap-y-3 border-t px-4 py-3">
        <fieldset className="flex items-center gap-3">
          <legend className="sr-only">Physics tick rate</legend>
          <span className="u-meta text-ink-3">Physics tick</span>
          <div className="border-rule flex border">
            {HZ_CHOICES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setHz(c)}
                aria-pressed={hz === c}
                className={`u-meta border-rule border-r px-2.5 py-1.5 transition-colors last:border-r-0 ${
                  hz === c
                    ? "bg-accent text-accent-ink"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                {c} Hz
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={launch}
          className="u-meta border-ink hover:bg-ink hover:text-ground border px-3 py-1.5 transition-colors"
        >
          Throw
        </button>

        <p
          aria-live="polite"
          className="u-meta text-ink-3 min-h-[1.2em] flex-1 normal-case tracking-[0.04em]"
        >
          {!verdict
            ? "Two contact tests run on every throw."
            : disagreed
              ? verdict.areaFired
                ? "The trigger fired and the swept path never came inside the radius."
                : "The swept path passed inside the radius and the trigger never fired. That is the sixteen."
              : verdict.hostFired
                ? verdict.restedInBox
                  ? "Both agree. Your tsinelas is inside the box now, which is the part that gets you tagged."
                  : "Both agree."
                : "Both agree: a miss."}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function Verd({
  label,
  sub,
  state,
}: {
  label: string;
  sub: string;
  state: "fired" | "missed" | "waiting";
}) {
  return (
    <div className="bg-ground px-4 py-3">
      <div className="u-meta text-ink-3">{label}</div>
      <div
        className="mt-1.5 font-mono text-lg tracking-tight"
        style={{
          color:
            state === "fired"
              ? "var(--w-accent)"
              : state === "missed"
                ? "var(--w-focus)"
                : "var(--w-ink-3)",
        }}
      >
        {state === "waiting" ? "—" : state === "fired" ? "FIRED" : "MISSED"}
      </div>
      <div className="u-meta text-ink-3 mt-1 normal-case tracking-[0.04em] opacity-70">
        {sub}
      </div>
    </div>
  );
}

function Readout({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="bg-ground px-4 py-3">
      <div className="u-meta text-ink-3">{label}</div>
      <div className="mt-1.5 font-mono text-lg tracking-tight tabular-nums">
        {value}
      </div>
      <div className="u-meta text-ink-3 mt-1 normal-case tracking-[0.04em] opacity-70">
        {note}
      </div>
    </div>
  );
}

/* ---- geometry ----------------------------------------------------------- */

/** The world's colours, read off the canvas so the figure never hardcodes a
 *  hex. Everything here comes from `[data-world="tumbang"]` in globals.css,
 *  which in turn came from a script that clustered the game's own artwork. */
function readPalette(el: HTMLElement) {
  const s = getComputedStyle(el);
  const get = (n: string, f: string) => s.getPropertyValue(n).trim() || f;
  return {
    ink: get("--w-ink", "#ece5d6"),
    chalk: get("--w-ink-2", "#ece5d6b0"),
    faint: get("--w-rule", "#ece5d633"),
    accent: get("--w-accent", "#d6ce01"),
    red: get("--tp-red", "#980715"),
    rim: get("--tp-rim", "#c32e0d"),
    defense: get("--tp-defense", "#0080e8"),
    persimmon: get("--tp-persimmon", "#fd8041"),
  };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/** Distance from a point to a line SEGMENT, which is the whole difference
 *  between the two contact tests. Testing the endpoints only is test A. */
function segmentDistance(a: Sample, b: Sample, p: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = clamp(t, 0, 1);
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function nearestPointOnPath(samples: Sample[], p: { x: number; y: number }) {
  let best = samples[0] ?? { x: 0, y: 0 };
  let bestD = Infinity;
  for (let i = 0; i < samples.length - 1; i++) {
    const a = samples[i];
    const b = samples[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t = len2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
    t = clamp(t, 0, 1);
    const q = { x: a.x + t * dx, y: a.y + t * dy };
    const d = Math.hypot(p.x - q.x, p.y - q.y);
    if (d < bestD) {
      bestD = d;
      best = q;
    }
  }
  return best;
}

/** A chalk rectangle with the corners nudged, so the court reads as drawn by
 *  hand rather than stroked by a renderer. */
function wobbleRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  j: number[],
) {
  const pts: [number, number][] = [
    [x + j[0], y + j[1]],
    [x + w + j[2], y + j[3]],
    [x + w + j[4], y + h + j[5]],
    [x + j[6], y + h + j[7]],
  ];
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}

function drawSlipper(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  spin: number,
  ink: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.fillStyle = ink;
  ctx.globalAlpha = 0.92;
  const w = scale * 0.42;
  const h = scale * 0.2;
  ctx.beginPath();
  ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  // The thong, so it reads as a tsinelas and not as a pebble.
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = ink;
  ctx.lineWidth = Math.max(1, scale * 0.02);
  ctx.beginPath();
  ctx.moveTo(-w * 0.18, -h * 0.28);
  ctx.lineTo(w * 0.1, 0);
  ctx.lineTo(-w * 0.18, h * 0.28);
  ctx.stroke();
  ctx.restore();
}
