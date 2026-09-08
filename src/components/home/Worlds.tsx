import Image from "next/image";
import Link from "next/link";
import { daruma } from "@/app/fonts";
import MachineFigure from "@/components/figures/MachineFigure";
import SwarmPreview from "@/components/home/SwarmPreview";
import GameClip from "@/components/media/GameClip";
import type { Project } from "@/content/types";
import { patientStages } from "@/content/worlds";

/* ===========================================================================
 * THE FOUR ROOMS.
 *
 * Not four project cards. Four compositions that have as little in common as
 * the projects do: a full-bleed match, a service route, a fan of parallel
 * traces, and a machine. They share a header strip and an exit line and nothing
 * else — no shared grid, no shared heading size, no shared card.
 *
 * Each one is about one screen tall. A recruiter reaching the receipts should
 * have passed four things, not scrolled through four case studies.
 * ======================================================================== */

/** The only thing every room shares: a catalogue strip at the top. */
function RoomHead({ project }: { project: Project }) {
  return (
    <div className="room-head">
      <span className="u-meta text-accent tabular-nums">{project.n}</span>
      <span className="u-meta">{project.title}</span>
      <span className="u-meta text-ink-3 tracking-[0.04em] normal-case">
        {project.category}
      </span>
      <span className="u-meta text-ink-3 ml-auto tabular-nums">
        {project.year}
      </span>
    </div>
  );
}

/** And the way out of it. The verb belongs to the work. */
function RoomExit({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="room-exit">
      <span>{label}</span>
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}

/* ---------------------------------------------------------------------------
 * 01 · THE STREET
 *
 * ⚠⚠ THIS PANEL USED TO BE A DARK BROWN BLOCK WITH A DIAGRAM IN IT, AND IT WAS
 * THE WORST THING ON THE SITE. A visitor should not have to wonder what the
 * game looks like: it looks like this, because this IS it. Full-bleed clip of a
 * real round, the game's own painted wordmark over it, and the entrance drawn
 * on his own PLAY pennant.
 *
 * The clip is silent, does not load until it is near the viewport, and pauses
 * the moment it leaves. See `GameClip`.
 *
 * Under it, the credit block. It is a list of the things he personally made,
 * set like film credits rather than as six capability cards, because the claim
 * being made — one person made all of this in five days — is a LIST, and the
 * card version of a list is just a list with more boxes.
 * ------------------------------------------------------------------------ */
const TUMBANG_CREDITS = [
  ["Models and characters", "Blender, every asset in the game"],
  ["Map and environment", "One street, built to be read at a glance"],
  ["Menus, HUD, wordmark", "Hand-lettered, in-engine"],
  ["Physics and contact rules", "Throw, bounce, knockdown, revival"],
  ["Netcode", "Authoritative host over ENet, LAN discovery, dedicated lobby"],
  ["Bots", "So a lobby of one is still a game"],
];

export function TumbangWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <section
      id={`w${project.n}`}
      data-world={project.world}
      data-display="daruma"
      data-world-panel
      aria-labelledby={`w${project.n}-title`}
      className={`${daruma.variable} bg-ground text-ink scroll-mt-[4.25rem]`}
    >
      {/* --- the game, edge to edge --- */}
      <div data-surface="stage" data-seq="stage" className="tp-stage">
        <GameClip
          src="/work/tumbang/match.mp4"
          poster="/work/tumbang/match-poster.webp"
          alt="A round of Tumbang Preso: the scoreboard, the timer, the lata standing in the middle of the road."
          ratio="16 / 9"
          className="max-h-[64vh] w-full"
        />
        <div aria-hidden className="tp-stage-shade" />
        <div className="tp-stage-mark">
          <Image
            src="/work/tumbang/wordmark.webp"
            alt="TÜMP"
            width={1100}
            height={316}
            className="h-auto w-[min(30vw,13rem)]"
          />
          <p className="u-meta">
            <span style={{ color: "var(--tp-gold)" }}>01</span>
            <span>{project.title}</span>
            <span aria-hidden>/</span>
            <span>{project.category}</span>
            <span aria-hidden className="hidden sm:inline">
              /
            </span>
            <span className="hidden sm:inline">{project.year}</span>
          </p>
        </div>
      </div>

      {/* --- the claim, and the credit block that backs it --- */}
      <div className="tp-claim">
        <div className="tp-claim-type">
          <h2 id={`w${project.n}-title`} className="u-display">
            {h.headline}
          </h2>
          <p className="u-prose mt-6">{h.body}</p>
          {h.coda ? <p className="tp-coda">{h.coda}</p> : null}

          {/* The entrance, drawn on his own PLAY pennant.
           *
           * ⚠ THE IMAGE AND THE LABEL ARE SIZED IN THE SAME em, off one
           * font-size on the wrapper, so their ratio cannot drift as the
           * viewport changes. Sized by hand they did drift: the word sat at
           * about 37 per cent of the pennant's height with a lake of green
           * either side of it, and his own PLAY button sets its label at about
           * 42 per cent filling roughly half the width. 8.6em wide against
           * 1.35em of type reproduces that. The ink is his dark green. */}
          <Link
            href={`/work/${project.slug}`}
            className="group mt-10 inline-flex items-center"
            aria-label="Enter the Tumbang Preso build"
            style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)" }}
          >
            <span className="relative inline-flex items-center">
              <Image
                src="/work/tumbang/pennant-play.webp"
                alt=""
                width={954}
                height={256}
                className="h-auto w-[8.6em] transition-transform duration-200 group-hover:scale-[1.035]"
              />
              <span className="u-display absolute inset-y-0 right-[13%] left-0 flex items-center justify-center text-[1.35em] leading-none tracking-[0.01em] text-[#15290a] uppercase">
                ENTER
              </span>
            </span>
          </Link>
        </div>

        <ol className="tp-credits" data-seq="credits">
          {TUMBANG_CREDITS.map(([what, how]) => (
            <li key={what}>
              <span>{what}</span>
              <span>{how}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 02 · THE ROUTE
 *
 * A visit is a line with stops on it. The composition IS that line: the real
 * signed-in product on the left as a bright object on a dark ground, and the
 * six services it crosses drawn as a route underneath, each stop carrying the
 * failure it is allowed to have.
 *
 * ⚠ This replaced a flat blue block with a floating phone on it, which is what
 * every healthcare product's marketing site looks like. The failure line is the
 * whole point of the room: an engineer should be able to tell in four seconds
 * that this project thought about what happens when a government service is
 * down, because that sentence is printed on the picture.
 * ------------------------------------------------------------------------ */
export function EgovWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <section
      id={`w${project.n}`}
      data-world="egov"
      data-display="plex"
      data-world-panel
      aria-labelledby={`w${project.n}-title`}
      className="bg-ground text-ink eg-room scroll-mt-[4.25rem]"
    >
      <RoomHead project={project} />

      <div className="eg-top">
        <div className="eg-device" data-seq="device">
          <div className="eg-phone-status" aria-hidden="true">
            <span>9:41</span>
            <span className="eg-island" />
            <span>▮▮▮ ▰</span>
          </div>
          <div className="eg-phone-screen">
            <Image
              src={project.media.src}
              alt={project.media.alt}
              width={430}
              height={880}
              sizes="(min-width: 900px) 300px, 60vw"
            />
          </div>
          <div className="eg-phone-home" aria-hidden="true" />
        </div>
        <div className="eg-type">
          <p className="eg-wordmark">
            <span aria-hidden className="eg-brand-ring" />
            eGov<span>Med</span>
          </p>
          <p className="u-meta eg-eyebrow">
            A connected visit · Architecture walkthrough
          </p>
          <h2 id={`w${project.n}-title`} className="u-display">
            {h.headline}
          </h2>
          <p className="u-prose mt-6">{h.body}</p>
          <RoomExit href={`/work/${project.slug}`} label="Follow the patient" />
        </div>
      </div>

      {/* The route. Six stops, real service names, and under each one the
          failure that stop is allowed to have without taking the visit down. */}
      <ol
        className="eg-route"
        data-seq="route"
        aria-label="What one visit crosses"
      >
        {patientStages.map((s) => (
          <li key={s.name}>
            <span aria-hidden className="eg-node" />
            <span className="eg-stop">{s.name}</span>
            <span className="u-meta eg-service">{s.service}</span>
            <span className="eg-fail">
              <em>{s.failure}</em>
              {s.outcome}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 03 · THE FAN
 *
 * ⚠ THE ROOM THIS REPLACED WAS A HEADLINE, A SCREENSHOT AND 700px OF EMPTY
 * DARK. The topology is the only interesting thing about this project and it
 * was not on screen.
 *
 * One panel of laboratory values goes to four specialists AT THE SAME TIME,
 * none of them able to see another's answer, and only then does anything
 * combine. Drawn as orthogonal rules on a grid rather than as SVG curves: a bus
 * and four stubs is what the diagram actually is, and rules cannot skew when
 * the grid reflows. The fields on each branch are the real ones the specialist
 * reads — see content/worlds.ts, extracted from the source.
 * ------------------------------------------------------------------------ */
export function GlycoWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <section
      id={`w${project.n}`}
      data-world="glyco"
      data-display="plex"
      data-world-panel
      aria-labelledby={`w${project.n}-title`}
      className="bg-ground text-ink gs-room scroll-mt-[4.25rem]"
    >
      <RoomHead project={project} />

      <div className="gs-top">
        <div className="gs-type">
          <h2 id={`w${project.n}-title`} className="u-display">
            {h.headline}
          </h2>
          <p className="u-prose mt-6">{h.body}</p>
          <RoomExit href={`/work/${project.slug}`} label="Trace a specialist" />
        </div>

        <SwarmPreview />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 04 · THE MACHINE
 *
 * The only room whose subject can be handed to the visitor, so it is. The
 * emulator is real WebAssembly and it is not loaded until the button is
 * pressed; everything around it is the instrument's own typography.
 * ------------------------------------------------------------------------ */
export function Chip8World({ project }: { project: Project }) {
  const h = project.home!;
  const specs = [
    ["Instructions", "35"],
    ["Memory", "4 KB"],
    ["Registers", "16 x 8-bit"],
    ["Display", "64 x 32, monochrome"],
    ["Assertions over the core", "106"],
    ["ROMs, all written for this", "6"],
  ];

  return (
    <section
      id={`w${project.n}`}
      data-world="chip8"
      data-display="mono"
      data-world-panel
      aria-labelledby={`w${project.n}-title`}
      className="bg-ground text-ink c8-room scroll-mt-[4.25rem]"
    >
      <RoomHead project={project} />

      <div className="c8-top">
        <div className="c8-type">
          <h2 id={`w${project.n}-title`} className="u-display">
            {h.headline}
          </h2>
          <p className="u-prose mt-7">{h.body}</p>
          {h.coda ? <p className="c8-coda">{h.coda}</p> : null}
          <dl className="c8-specs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <RoomExit href={`/work/${project.slug}`} label="Open the debugger" />
        </div>

        <div className="c8-machine">
          <MachineFigure />
        </div>
      </div>
    </section>
  );
}
