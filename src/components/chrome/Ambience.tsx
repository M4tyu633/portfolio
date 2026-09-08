"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { WorldId } from "@/content/types";
import { useHydrated } from "@/lib/hydrated";

/* ===========================================================================
 * AMBIENCE — a different room behind every world.
 *
 * ⚠ NO SURFACE ON THIS SITE IS EVER A FLAT COLOUR, AND NO TWO WORLDS SHARE A
 * BACKGROUND. A blank ground is the fastest way to make a page read as
 * generated; one generic drifting-blob layer recoloured seven times is the
 * second fastest. Each world below has its own MATERIAL and its own motion,
 * chosen from what the project is actually made of:
 *
 *   index     the archive      warm light, a measurement ruling, dust
 *   tumbang   the street       heat haze off asphalt, dust rising, chalk arcs
 *   egov      infrastructure   a service map drifting past, cool and routed
 *   glyco     the instrument   a plotting grid under a slow sweep line
 *   chip8     the machine      phosphor scanlines and a raster sweep
 *   reading   the viewing room heavy film grain and a slice sweep
 *   cardio    the strip chart  chart-paper ruling and a slow crimson field
 *
 * Every colour is a `--w-*` token, so a world's own palette paints its own
 * room and none of this knows which world it is in.
 *
 * ⚠ IT MUST NOT COMPETE WITH THE WORK. Cycles run 20 to 80 seconds and every
 * layer is under 12% contrast against its ground. If a reader can follow
 * anything here with their eye, it is too fast or too bright. Everything
 * animates `transform` or `opacity` only, so the whole layer is composited.
 *
 * ⚠ CLIENT ONLY. Motion writes inline style on mount and the server markup
 * cannot match it; server-rendering this produced a hydration mismatch on
 * every element. It is decorative and `aria-hidden`, so nothing is lost.
 * ======================================================================== */

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Slow dust. Shared by the rooms that should feel like air, not by all. */
function Motes({
  count,
  reduced,
  rise = 1,
}: {
  count: number;
  reduced: boolean | null;
  rise?: number;
}) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 1) * 100,
        top: seeded(i + 41) * 100,
        size: 1 + seeded(i + 91) * 2,
        drift: (12 + seeded(i + 131) * 24) * rise,
        seconds: 30 + seeded(i + 171) * 34,
        opacity: 0.08 + seeded(i + 211) * 0.2,
      })),
    [count, rise],
  );

  return (
    <>
      {motes.map((m, i) => (
        <motion.span
          key={i}
          className="bg-ink absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            willChange: "transform",
          }}
          animate={
            reduced
              ? undefined
              : { y: [0, -m.drift, 0], x: [0, m.drift * 0.4, 0] }
          }
          transition={{ duration: m.seconds, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/** A very large, very soft field of light. The only shared primitive. */
function Field({
  paint,
  size,
  x,
  y,
  dx,
  dy,
  seconds,
  opacity,
  reduced,
}: {
  paint: string;
  size: string;
  x: string;
  y: string;
  dx: number;
  dy: number;
  seconds: number;
  opacity: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-[90px]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${paint} 0%, transparent 68%)`,
        opacity,
        left: x,
        top: y,
        willChange: "transform",
      }}
      animate={
        reduced
          ? undefined
          : {
              x: ["0%", `${dx}%`, "0%"],
              y: ["0%", `${dy}%`, "0%"],
              scale: [1, 1.12, 1],
            }
      }
      transition={{ duration: seconds, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const ink = (pct: number) =>
  `color-mix(in srgb, var(--w-ink) ${pct}%, var(--w-ground))`;
const accent = (pct: number) =>
  `color-mix(in srgb, var(--w-accent) ${pct}%, transparent)`;
const accent2 = (pct: number) =>
  `color-mix(in srgb, var(--w-accent-2) ${pct}%, transparent)`;

/* ------------------------------------------------------------------------ */

function Archive({ reduced }: { reduced: boolean | null }) {
  return (
    <>
      <Field paint={accent(60)} size="70vw" x="-26%" y="-30%" dx={8} dy={6} seconds={47} opacity={0.16} reduced={reduced} />
      <Field paint={ink(16)} size="84vw" x="48%" y="-24%" dx={-7} dy={9} seconds={59} opacity={0.9} reduced={reduced} />
      <Field paint={accent2(55)} size="42vw" x="70%" y="56%" dx={-8} dy={-7} seconds={67} opacity={0.1} reduced={reduced} />
      <Field paint={ink(10)} size="78vw" x="-18%" y="54%" dx={10} dy={-6} seconds={79} opacity={0.95} reduced={reduced} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--w-rule) 1px, transparent 1px), linear-gradient(90deg, var(--w-rule) 1px, transparent 1px)",
          backgroundSize: "2rem 2rem",
          maskImage:
            "radial-gradient(115% 95% at 50% 36%, black 8%, transparent 74%)",
        }}
      />
      <Motes count={28} reduced={reduced} />
    </>
  );
}

/** The street: heat coming off the road, and dust going up through it. */
function Street({ reduced }: { reduced: boolean | null }) {
  return (
    <>
      <Field paint={accent(45)} size="96vw" x="-20%" y="46%" dx={5} dy={-4} seconds={53} opacity={0.14} reduced={reduced} />
      <Field paint={`color-mix(in srgb, var(--w-focus) 50%, transparent)`} size="60vw" x="58%" y="-18%" dx={-6} dy={7} seconds={71} opacity={0.1} reduced={reduced} />
      {/* the road's own grain, coarser than the archive's ruling */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(var(--w-rule-2) 0.8px, transparent 0.8px), radial-gradient(var(--w-rule-2) 0.6px, transparent 0.6px)",
          backgroundSize: "7px 7px, 11px 11px",
          backgroundPosition: "0 0, 3px 5px",
        }}
      />
      {/* two chalk arcs, drawn the way the ring around the lata is */}
      <motion.div
        className="absolute -bottom-[30vh] left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-[50%] border"
        style={{ borderColor: "var(--w-rule-2)" }}
        animate={reduced ? undefined : { rotate: [0, 3, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motes count={22} reduced={reduced} rise={1.8} />
    </>
  );
}

/** Civic infrastructure: a service map sliding past, far away. */
function Network({ reduced }: { reduced: boolean | null }) {
  const lines = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        y: 8 + i * 13.5 + seeded(i + 3) * 4,
        w: 30 + seeded(i + 17) * 55,
        x: seeded(i + 29) * 40,
        seconds: 60 + seeded(i + 53) * 50,
        dx: 6 + seeded(i + 71) * 10,
      })),
    [],
  );

  return (
    <>
      <Field paint={accent(50)} size="80vw" x="-24%" y="-26%" dx={7} dy={6} seconds={61} opacity={0.12} reduced={reduced} />
      <Field paint={ink(14)} size="70vw" x="56%" y="44%" dx={-8} dy={-6} seconds={73} opacity={0.85} reduced={reduced} />
      {lines.map((l, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            top: `${l.y}%`,
            left: `${l.x}%`,
            width: `${l.w}%`,
            background: "var(--w-rule)",
            willChange: "transform",
          }}
          animate={reduced ? undefined : { x: ["0%", `${l.dx}%`, "0%"] }}
          transition={{ duration: l.seconds, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="absolute top-1/2 left-0 size-1 -translate-y-1/2 rounded-full"
            style={{ background: "var(--w-accent)", opacity: 0.35 }}
          />
          <span
            className="absolute top-1/2 right-0 size-1 -translate-y-1/2 rounded-full"
            style={{ background: "var(--w-accent)", opacity: 0.2 }}
          />
        </motion.div>
      ))}
    </>
  );
}

/** The instrument: plotting paper, and one sweep travelling down it. */
function Instrument({ reduced }: { reduced: boolean | null }) {
  return (
    <>
      <Field paint={accent(45)} size="76vw" x="-22%" y="-28%" dx={8} dy={5} seconds={57} opacity={0.12} reduced={reduced} />
      <Field paint={ink(12)} size="64vw" x="60%" y="50%" dx={-7} dy={-6} seconds={69} opacity={0.85} reduced={reduced} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--w-rule-2) 1px, transparent 1px), linear-gradient(90deg, var(--w-rule-2) 1px, transparent 1px)",
          backgroundSize: "1.25rem 1.25rem",
        }}
      />
      <motion.div
        className="absolute inset-x-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--w-accent) 9%, transparent), transparent)",
          willChange: "transform",
        }}
        animate={reduced ? undefined : { y: ["-10vh", "110vh"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}

/** The machine: phosphor lines, and the raster going down the tube. */
function Machine({ reduced }: { reduced: boolean | null }) {
  return (
    <>
      <Field paint={accent(35)} size="66vw" x="-18%" y="-24%" dx={6} dy={5} seconds={63} opacity={0.1} reduced={reduced} />
      <Field paint={ink(10)} size="60vw" x="58%" y="52%" dx={-6} dy={-5} seconds={77} opacity={0.8} reduced={reduced} />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 2px, var(--w-rule-2) 2px 3px)",
        }}
      />
      <motion.div
        className="absolute inset-x-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--w-accent) 7%, transparent), transparent)",
          willChange: "transform",
        }}
        animate={reduced ? undefined : { y: ["-20vh", "120vh"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}

/** The viewing room: grain, and a slice moving across the light box. */
function ViewingRoom({ reduced }: { reduced: boolean | null }) {
  return (
    <>
      <Field paint={ink(15)} size="90vw" x="-14%" y="-30%" dx={5} dy={6} seconds={67} opacity={0.9} reduced={reduced} />
      <Field paint={accent(40)} size="46vw" x="66%" y="52%" dx={-6} dy={-5} seconds={83} opacity={0.1} reduced={reduced} />
      <motion.div
        className="absolute inset-y-0 w-px"
        style={{ background: "var(--w-accent)", opacity: 0.14, willChange: "transform" }}
        animate={reduced ? undefined : { x: ["-2vw", "102vw"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <Motes count={16} reduced={reduced} />
    </>
  );
}

/** The strip chart: paper ruling, and one warm field over it. */
function StripChart({ reduced }: { reduced: boolean | null }) {
  return (
    <>
      <Field paint={accent(45)} size="72vw" x="-24%" y="42%" dx={7} dy={-6} seconds={59} opacity={0.13} reduced={reduced} />
      <Field paint={ink(13)} size="68vw" x="54%" y="-26%" dx={-6} dy={7} seconds={73} opacity={0.85} reduced={reduced} />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--w-rule-2) 0 1px, transparent 1px 0.375rem), repeating-linear-gradient(to bottom, var(--w-rule-2) 0 1px, transparent 1px 1.875rem)",
          maskImage:
            "radial-gradient(120% 100% at 50% 40%, black 10%, transparent 76%)",
        }}
      />
    </>
  );
}

const ROOMS: Record<WorldId, (p: { reduced: boolean | null }) => React.ReactNode> = {
  index: Archive,
  tumbang: Street,
  egov: Network,
  glyco: Instrument,
  chip8: Machine,
  reading: ViewingRoom,
  cardio: StripChart,
};

export default function Ambience() {
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const [world, setWorld] = useState<WorldId>("index");

  /* WorldSync writes the current world onto <body>; this follows it. An
     observer rather than context, because the homepage changes world four
     times as you scroll and the provider would re-render the whole page. */
  useEffect(() => {
    const body = document.body;
    const read = () => {
      const next = (body.dataset.world as WorldId) ?? "index";
      setWorld((prev) => (prev === next ? prev : next));
    };
    const mo = new MutationObserver(read);
    mo.observe(body, { attributes: true, attributeFilter: ["data-world"] });
    /* ⚠ The first read goes through a tick. Calling it inline is a synchronous
     * setState in an effect body, which the React Compiler lint rejects. */
    const t = setTimeout(read, 0);
    return () => {
      clearTimeout(t);
      mo.disconnect();
    };
  }, []);

  if (!hydrated) return null;

  const Room = ROOMS[world] ?? Archive;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <Room reduced={reduced} />
      {/* Every room ends the same way: the light falls off at the edges, so
          the page is never a lit rectangle on a dark screen. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(135% 110% at 50% 42%, transparent 36%, color-mix(in srgb, var(--w-ground) 90%, #000) 100%)",
        }}
      />
    </div>
  );
}
