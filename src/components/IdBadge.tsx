"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { badge } from "@/content/data";

/* ---------------------------------------------------------------------------
 * An ID card hanging from a lanyard. Grab it and throw it around — it swings
 * like a pendulum and spins on its vertical axis, then settles facing forward.
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
 * numbers the worst case a drag can produce peaks at about 75°. */
const MAX_SWING_VEL = 3.2; // rad/s
const MAX_SPIN_VEL = 14; // rad/s
const MAX_DRAG_ANGLE = 1.0; // rad (~57°) — the furthest it can be pulled aside
const MAX_ANGLE = Math.PI / 2; // hard stop at horizontal, whatever happens
const MIN_DT = 0.012; // s — stops a tiny dt turning into a huge velocity

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

export default function IdBadge() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
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
  });

  const draw = useCallback((angle: number, spin: number, len: number) => {
    const card = cardRef.current;
    const rope = ropeRef.current;
    if (!card || !rope) return;

    const x = Math.sin(angle) * len;
    const y = Math.cos(angle) * len;

    card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), ${y.toFixed(
      2,
    )}px, 0) rotateZ(${((angle * 180) / Math.PI).toFixed(2)}deg) rotateY(${(
      (spin * 180) /
      Math.PI
    ).toFixed(2)}deg)`;

    // The strap sags a little when the card swings inward.
    const sag = Math.max(0, 1 - Math.abs(angle) / 0.9) * 12;
    rope.setAttribute(
      "d",
      `M 0 0 Q ${(x / 2).toFixed(2)} ${(y / 2 + sag).toFixed(2)} ${x.toFixed(
        2,
      )} ${y.toFixed(2)}`,
    );
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // Hang it straight down and skip the animation loop entirely.
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

      // Spin decays and eases back to a flat face — front or back, whichever
      // is nearer, since sin() has stable points at 0 and π.
      s.spinVel = clamp(
        s.spinVel +
          (-SPIN_RETURN * Math.sin(s.spin) - SPIN_DAMPING * s.spinVel) * dt,
        -MAX_SPIN_VEL,
        MAX_SPIN_VEL,
      );
      s.spin += s.spinVel * dt;

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
    s.vel = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setHinted(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = sim.current;
    const wrap = wrapRef.current;
    if (!s.dragging || !wrap || e.pointerId !== s.pointerId) return;

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

  const endDrag = (e: React.PointerEvent) => {
    const s = sim.current;
    if (e.pointerId !== s.pointerId) return;
    s.dragging = false;
    s.pointerId = -1;
    // Don't let a frantic flick fling it over the top.
    s.vel = clamp(s.vel, -MAX_SWING_VEL, MAX_SWING_VEL);
  };

  /* Keyboard: nudge it, for anyone not using a pointer. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const s = sim.current;
    if (e.key === "ArrowLeft")
      s.vel = clamp(s.vel - 2.2, -MAX_SWING_VEL, MAX_SWING_VEL);
    else if (e.key === "ArrowRight")
      s.vel = clamp(s.vel + 2.2, -MAX_SWING_VEL, MAX_SWING_VEL);
    else if (e.key === " " || e.key === "Enter")
      s.spinVel = clamp(s.spinVel + 7, -MAX_SPIN_VEL, MAX_SPIN_VEL);
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
      {/* The strap. The SVG is zero-width and pinned to the centre line, so its
          user-space origin (0,0) is exactly the anchor point the sim uses. */}
      <svg
        className="pointer-events-none absolute top-0 left-1/2 h-full w-0 overflow-visible"
        aria-hidden="true"
      >
        <path
          ref={ropeRef}
          d="M 0 0 Q 0 84 0 168"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* the anchor loop at the top */}
        <circle cx="0" cy="0" r="7" fill="var(--color-accent)" />
        <circle cx="0" cy="0" r="3" fill="var(--color-background)" />
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
        aria-label={`ID card for ${badge.name}. Drag it, or use the arrow keys to swing it.`}
        className="absolute top-0 left-1/2 w-[12rem] cursor-grab touch-none active:cursor-grabbing sm:w-52"
        style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
      >
        {/* clip */}
        <div className="border-accent/70 bg-surface mx-auto h-5 w-9 rounded-t-md border-2 border-b-0" />

        {/* Two faces. The front is in normal flow and sets the height; the back
            is laid over it, pre-flipped, so the card reads right way round
            whichever side it settles on. */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <div
            className="border-border bg-surface overflow-hidden rounded-2xl border shadow-2xl shadow-black/40 backdrop-blur"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* header */}
            <div className="from-accent to-accent-2 bg-linear-to-r px-4 py-2.5">
              <p className="text-background text-[9px] leading-tight font-bold tracking-[0.14em] uppercase">
                {badge.orgShort}
              </p>
              <p className="text-background/80 text-[7px] leading-tight">
                {badge.org}
              </p>
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

              {/* barcode */}
              <div className="mt-3 flex h-6 items-end gap-[2px] overflow-hidden">
                {BARCODE.map((w, i) => (
                  <span
                    key={i}
                    className="bg-foreground/70 h-full"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
              <p className="text-muted mt-1.5 text-center text-[7px] tracking-[0.3em]">
                {badge.backNote.toUpperCase()}
              </p>
            </div>
          </div>

          {/* back face */}
          <div
            className="border-border bg-surface absolute inset-0 flex flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/40"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="from-accent-2 to-accent h-8 bg-linear-to-r" />
            <div className="bg-foreground/80 mt-4 h-9 w-full" />
            <div className="flex flex-1 flex-col justify-center px-5 text-center">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase">
                {badge.orgShort}
              </p>
              <p className="text-muted mt-2 text-[8px] leading-relaxed">
                {badge.org}
              </p>
              <p className="text-muted mt-4 text-[8px] leading-relaxed">
                This card is the property of the holder. If found, please return
                it — or just drag it around some more.
              </p>
              <p className="text-accent mt-4 text-[9px] font-medium">
                {badge.backNote}
              </p>
            </div>
            <div className="px-5 pb-5">
              <div className="flex h-6 items-end gap-[2px] overflow-hidden">
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

      {/* hint */}
      <p
        className={`text-muted pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-xs transition-opacity duration-500 ${
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
