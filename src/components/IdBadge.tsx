"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { badge } from "@/content/data";

/* ---------------------------------------------------------------------------
 * An ID card hanging from a lanyard. Grab it and throw it around — it swings
 * like a pendulum and spins on its vertical axis, then settles facing forward.
 * Tap it (or press Enter) to flip it over.
 *
 * The motion is a small physics sim run in a rAF loop and written straight to
 * the DOM (no React state per frame, so it stays at 60fps).
 * ------------------------------------------------------------------------ */

const ROPE_LEN = 140; // px from the anchor to the top of the card
const GRAVITY = 2600; // px/s² — tuned by feel, not by physics
const SWING_DAMPING = 1.1;
const SPIN_DAMPING = 1.6;
const SPIN_RETURN = 9; // eases the card back to facing front (or back)
const MAX_STRETCH = 1.28;

/* Limits, so a hard flick can't swing the card up past horizontal — a lanyard
 * that windmills over its own anchor looks broken.
 * Peak swing solves (1/2)ω² + (g/L)(1-cos θ₀) = (g/L)(1-cos θ_peak); with these
 * numbers the worst case a drag can produce peaks at about 71°. */
const MAX_SWING_VEL = 3.2; // rad/s
const MAX_SPIN_VEL = 14; // rad/s
const MAX_DRAG_ANGLE = 1.0; // rad (~57°) — the furthest it can be pulled aside
const MAX_ANGLE = Math.PI / 2; // hard stop at horizontal, whatever happens
const MIN_DT = 0.012; // s — stops a tiny dt turning into a huge velocity

/* A tap is a press that barely moved. Anything more is a drag. */
const TAP_SLOP = 8; // px

/* Flipping is driven to an explicit target rather than by an impulse. An
 * impulse can't be tuned to land on the far face: too little and it never
 * clears the barrier at π, too much and it carries straight on to 2π — which
 * is the front again. A critically-damped spring settles on the target face in
 * about a second, every time. */
const FLIP_K = 60;
const FLIP_C = 2 * Math.sqrt(FLIP_K);

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

export default function IdBadge() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const anchorRef = useRef<SVGGElement>(null);
  const [hinted, setHinted] = useState(false);

  // Physics state lives in refs — mutating it must not trigger a re-render.
  const sim = useRef({
    angle: 0.06, // radians from straight down
    vel: 0,
    spin: 0, // radians around the vertical axis
    spinVel: 0,
    len: ROPE_LEN,
    dragging: false,
    pointerId: -1,
    lastX: 0,
    lastT: 0,
    // for tap detection
    downX: 0,
    downY: 0,
    travel: 0,
    // horizontal centre of the wrapper, in the SVG's own coordinates
    cx: 0,
    // when a flip is in progress, the spin angle it's heading for
    flipTarget: null as number | null,
  });

  const draw = useCallback((angle: number, spin: number, len: number) => {
    const card = cardRef.current;
    const rope = ropeRef.current;
    if (!card || !rope) return;

    const cx = sim.current.cx;
    const x = Math.sin(angle) * len;
    const y = Math.cos(angle) * len;

    card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), ${y.toFixed(
      2,
    )}px, 0) rotateZ(${((angle * 180) / Math.PI).toFixed(2)}deg) rotateY(${(
      (spin * 180) /
      Math.PI
    ).toFixed(2)}deg)`;

    // The strap sags a little when the card hangs near vertical.
    const sag = Math.max(0, 1 - Math.abs(angle) / 0.9) * 12;
    rope.setAttribute(
      "d",
      `M ${cx} 0 Q ${(cx + x / 2).toFixed(2)} ${(y / 2 + sag).toFixed(2)} ${(
        cx + x
      ).toFixed(2)} ${y.toFixed(2)}`,
    );
  }, []);

  /* The SVG spans the whole wrapper, so the anchor's x is the wrapper's centre.
   * Measured here rather than faked with a zero-width SVG and overflow:visible,
   * which is exactly the kind of trick that renders differently per browser. */
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      sim.current.cx = wrap.clientWidth / 2;
      anchorRef.current?.setAttribute(
        "transform",
        `translate(${sim.current.cx} 0)`,
      );
      draw(sim.current.angle, sim.current.spin, sim.current.len);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [draw]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // Hang it straight down and skip the animation loop entirely.
      sim.current.angle = 0;
      draw(0, 0, ROPE_LEN);
      return;
    }

    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const s = sim.current;
      // Clamp dt so a backgrounded tab doesn't explode the integrator.
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;

      if (!s.dragging) {
        // Pendulum: angular acceleration from gravity, plus damping.
        const acc =
          -(GRAVITY / s.len) * Math.sin(s.angle) - SWING_DAMPING * s.vel;
        s.vel += acc * dt;
        s.angle += s.vel * dt;
        // Belt and braces: if it ever reaches horizontal, stop it dead there.
        if (s.angle > MAX_ANGLE || s.angle < -MAX_ANGLE) {
          s.angle = clamp(s.angle, -MAX_ANGLE, MAX_ANGLE);
          s.vel = 0;
        }
        // Rope springs back to its rest length.
        s.len += (ROPE_LEN - s.len) * Math.min(1, 10 * dt);
      }

      if (s.flipTarget !== null) {
        // Driven flip: spring straight to the requested face.
        s.spinVel +=
          (FLIP_K * (s.flipTarget - s.spin) - FLIP_C * s.spinVel) * dt;
        s.spin += s.spinVel * dt;
        if (
          Math.abs(s.flipTarget - s.spin) < 0.02 &&
          Math.abs(s.spinVel) < 0.2
        ) {
          // Land exactly on the face and fold the angle back near zero, so
          // repeated flips can't drift the number off to infinity.
          s.spin = s.flipTarget % (2 * Math.PI);
          s.spinVel = 0;
          s.flipTarget = null;
        }
      } else {
        // Free spin decays and eases back to a flat face — front or back,
        // whichever is nearer, since sin() has stable points at 0 and π.
        s.spinVel = clamp(
          s.spinVel +
            (-SPIN_RETURN * Math.sin(s.spin) - SPIN_DAMPING * s.spinVel) * dt,
          -MAX_SPIN_VEL,
          MAX_SPIN_VEL,
        );
        s.spin += s.spinVel * dt;
      }

      draw(s.angle, s.spin, s.len);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [draw]);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = sim.current;
    s.dragging = true;
    s.pointerId = e.pointerId;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.downX = e.clientX;
    s.downY = e.clientY;
    s.travel = 0;
    s.vel = 0;
    s.flipTarget = null; // grabbing it cancels any flip in progress
    // Capture on the card itself, not e.target — the target may be the <img>,
    // which React can swap out mid-gesture and silently drop the capture.
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setHinted(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = sim.current;
    const wrap = wrapRef.current;
    if (!s.dragging || !wrap || e.pointerId !== s.pointerId) return;

    s.travel = Math.max(
      s.travel,
      Math.hypot(e.clientX - s.downX, e.clientY - s.downY),
    );

    const rect = wrap.getBoundingClientRect();
    // Anchor sits at the top-centre of the wrapper.
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = Math.max(1, e.clientY - rect.top);

    const dist = Math.hypot(dx, dy);
    s.len = Math.min(dist, ROPE_LEN * MAX_STRETCH);

    const nextAngle = clamp(
      Math.atan2(dx, dy),
      -MAX_DRAG_ANGLE,
      MAX_DRAG_ANGLE,
    );
    const now = performance.now();
    const dt = Math.max(MIN_DT, (now - s.lastT) / 1000);

    // Angular velocity for the release, and a spin kick from horizontal speed.
    s.vel = clamp((nextAngle - s.angle) / dt, -MAX_SWING_VEL, MAX_SWING_VEL);
    s.spinVel = clamp(
      s.spinVel + ((e.clientX - s.lastX) / dt) * 0.00042,
      -MAX_SPIN_VEL,
      MAX_SPIN_VEL,
    );

    s.angle = nextAngle;
    s.lastX = e.clientX;
    s.lastT = now;
  };

  /** Send it round to the other face. */
  const flip = () => {
    const s = sim.current;
    // Nearest flat face, then one further round.
    s.flipTarget = (Math.round(s.spin / Math.PI) + 1) * Math.PI;
    setHinted(true);
  };

  const endDrag = (e: React.PointerEvent) => {
    const s = sim.current;
    if (e.pointerId !== s.pointerId) return;
    s.dragging = false;
    s.pointerId = -1;
    // Don't let a frantic flick fling it over the top.
    s.vel = clamp(s.vel, -MAX_SWING_VEL, MAX_SWING_VEL);
    // A press that barely moved is a tap, which flips the card. This is the
    // only way to turn it over on a touch screen, where there's no hover and a
    // short drag reads as a scroll attempt.
    if (s.travel < TAP_SLOP) flip();
  };

  /* Keyboard: nudge it, for anyone not using a pointer. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const s = sim.current;
    if (e.key === "ArrowLeft")
      s.vel = clamp(s.vel - 2.2, -MAX_SWING_VEL, MAX_SWING_VEL);
    else if (e.key === "ArrowRight")
      s.vel = clamp(s.vel + 2.2, -MAX_SWING_VEL, MAX_SWING_VEL);
    else if (e.key === " " || e.key === "Enter") flip();
    else return;
    e.preventDefault();
    setHinted(true);
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[32rem] w-full max-w-xs select-none sm:h-[34rem]"
      style={{ perspective: "1100px" }}
    >
      {/* The strap. The SVG covers the whole wrapper and the anchor is placed
          at the measured centre, so nothing depends on overflow behaviour. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          ref={ropeRef}
          d=""
          fill="none"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />
        <g ref={anchorRef}>
          {/* the loop the lanyard hangs from */}
          <circle cx="0" cy="0" r="8" fill="var(--accent)" />
          <circle cx="0" cy="0" r="3.5" fill="var(--background)" />
        </g>
      </svg>

      {/* the card */}
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`ID card for ${badge.name}. Tap to flip it over, drag to swing it, or use the arrow keys.`}
        className="absolute top-0 left-1/2 w-[12rem] cursor-grab touch-none active:cursor-grabbing sm:w-52"
        style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
      >
        {/* Everything below flips together, clip included. */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* front */}
          <div style={{ backfaceVisibility: "hidden" }}>
            {/* the clip that grips the card */}
            <div className="border-accent/70 bg-surface mx-auto -mb-1.5 h-6 w-10 rounded-t-lg border-2 border-b-0" />

            <div className="border-border bg-surface overflow-hidden rounded-2xl border shadow-2xl shadow-black/40">
              {/* header. The seal renders only once badge.seal points at a real
                  file, so an empty string leaves the original text header
                  exactly as it was rather than a broken image. */}
              <div className="from-accent to-accent-2 flex items-center gap-2 bg-linear-to-r px-4 py-2.5">
                {badge.seal && (
                  <Image
                    src={badge.seal}
                    alt=""
                    width={64}
                    height={64}
                    className="h-7 w-7 shrink-0 object-contain"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-background text-[9px] leading-tight font-bold tracking-[0.14em] uppercase">
                    {badge.orgShort}
                  </p>
                  <p className="text-background/80 text-[7px] leading-tight">
                    {badge.org}
                  </p>
                </div>
              </div>

              {/* punch hole */}
              <div className="flex justify-center py-2">
                <div className="bg-border h-1.5 w-12 rounded-full" />
              </div>

              {/* photo */}
              <div className="px-4">
                <div className="border-border bg-background relative aspect-square w-full overflow-hidden rounded-lg border">
                  <Image
                    src={badge.photo}
                    alt={badge.name}
                    fill
                    priority
                    sizes="14rem"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              </div>

              {/* details */}
              <div className="px-4 pt-3 pb-4">
                <p className="truncate text-sm font-bold">{badge.name}</p>
                <p className="text-muted mt-0.5 text-[10px]">{badge.role}</p>

                <dl className="mt-3 space-y-1">
                  {badge.fields.map((f) => (
                    <div key={f.label} className="flex justify-between gap-2">
                      <dt className="text-muted text-[8px] tracking-wider uppercase">
                        {f.label}
                      </dt>
                      <dd className="truncate text-[9px] font-medium">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3 flex h-6 items-end gap-[2px] overflow-hidden">
                  {BARCODE.map((w, i) => (
                    <span
                      key={i}
                      className="bg-foreground/70 h-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* back */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="border-accent/70 bg-surface mx-auto -mb-1.5 h-6 w-10 rounded-t-lg border-2 border-b-0" />

            <div className="border-border bg-surface flex h-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/40">
              <div className="from-accent-2 to-accent h-7 bg-linear-to-r" />
              {/* magnetic stripe */}
              <div className="bg-foreground/60 mt-3 h-8 w-full" />

              <div className="flex flex-1 flex-col justify-center px-5 text-center">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase">
                  {badge.orgShort}
                </p>
                <p className="text-muted mt-2 text-[8px] leading-relaxed">
                  {badge.org}
                </p>
                <p className="text-muted mt-3 text-[8px] leading-relaxed">
                  Property of the holder. If found, please return it, or just
                  drag it around some more.
                </p>
                <p className="text-accent mt-3 text-[9px] font-medium">
                  {badge.backNote}
                </p>
              </div>

              <div className="px-5 pb-4">
                <div className="flex h-5 items-end gap-[2px] overflow-hidden">
                  {BARCODE.map((w, i) => (
                    <span
                      key={i}
                      className="bg-foreground/70 h-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hint */}
      <p
        className={`text-muted pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs transition-opacity duration-500 ${
          hinted ? "opacity-0" : "opacity-100"
        }`}
      >
        drag me
      </p>
    </div>
  );
}

/* A fixed pattern, so the server and client render identical markup. */
const BARCODE = [
  2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 4,
  2, 1, 2, 3, 1, 1, 2, 4, 1, 2,
];
