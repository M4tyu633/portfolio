import Link from "next/link";
import Image from "next/image";
import { daruma, franklin } from "@/app/fonts";
import InteractiveFigure from "@/components/figures";
import GameClip from "@/components/media/GameClip";
import type { Project } from "@/content/types";

/* ===========================================================================
 * THE FOUR HOMEPAGE WORLDS.
 *
 * Deliberately four separate components rather than one parameterised panel.
 * The brief for this site is that the rooms are not identical, and a single
 * template with a colour prop is exactly how you end up with the same Tailwind
 * component in twelve places wearing different paint.
 *
 * So each one has its own LAYOUT LOGIC, not just its own palette:
 *
 *   01 asphalt   a court. Title top-left at poster scale, the range below it,
 *                everything drawn on a ground with grain.
 *   02 form      a printed document. Two columns, ruled, with the route
 *                running across the page like a wayfinding sign.
 *   03 trace     a chart. Narrow centred column over a baseline grid, and the
 *                graph given the full width because it IS the content.
 *   04 machine   an instrument panel. Label column down the left, readouts
 *                down the right, and the door to the running machine.
 *
 * What they share is `WorldFrame`: the catalogue number, the classification,
 * and the way in. That is the building.
 *
 * ⚠⚠ A WORLD PANEL SUBSTITUTES ITS DISPLAY FACE, IT DOES NOT ADD ONE.
 * The rule is at most two families in front of a reader at a time, and that is
 * what happens here: inside the Tumbang panel the building's serif is replaced
 * by the game's own Darumadrop, inside eGovMed by Libre Franklin, and outside
 * them the serif comes back. At no point are three display faces on screen
 * together.
 *
 * The first version inherited the serif into these panels, and it put the word
 * ENTER in Times on top of a hand-painted green pennant out of the game. A
 * button drawn by hand deserves the lettering it was drawn for.
 *
 * Both faces are preload:false (see app/fonts.ts), so they are fetched when
 * the panel that draws them scrolls into reach rather than on first paint.
 * ======================================================================== */

function WorldFrame({
  project,
  children,
  display,
  className = "",
}: {
  project: Project;
  children: React.ReactNode;
  display?: "franklin" | "plex" | "mono";
  className?: string;
}) {
  return (
    <section
      id={`w${project.n}`}
      data-world={project.world}
      data-display={display}
      data-world-panel
      aria-labelledby={`w${project.n}-title`}
      className={`bg-ground text-ink scroll-mt-[4.25rem] ${className}`}
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="border-rule flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b py-4">
          <span className="u-meta text-accent tabular-nums">{project.n}</span>
          <span className="u-meta">{project.title}</span>
          <span className="u-meta text-ink-3 normal-case tracking-[0.04em]">
            {project.category}
          </span>
          <span className="u-meta text-ink-3 ml-auto tabular-nums">
            {project.year}
          </span>
        </div>
        {children}
        <div className="border-rule border-t py-5">
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex items-baseline gap-3"
          >
            <span className="border-ink group-hover:bg-ink group-hover:text-ground border-b-2 pb-0.5 text-[1.0625rem] transition-colors">
              Enter {project.title}
            </span>
            <span
              aria-hidden
              className="text-ink-3 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
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
 * ------------------------------------------------------------------------ */
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
      <div data-surface="stage" className="bg-ground relative">
        <GameClip
          src="/work/tumbang/match.mp4"
          poster="/work/tumbang/match-poster.webp"
          alt="A round of Tumbang Preso: the scoreboard, the timer, the lata standing in the middle of the road."
          ratio="16 / 9"
          className="max-h-[68vh] w-full"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(20,14,8,.9) 0%, rgba(20,14,8,.35) 30%, rgba(20,14,8,0) 62%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[92rem] px-5 pb-7 sm:px-8 sm:pb-10">
          <Image
            src="/work/tumbang/wordmark.webp"
            alt="TÜMP"
            width={1100}
            height={316}
            className="h-auto w-[min(34vw,15rem)]"
          />
          <p className="u-meta mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[#fcd39f]">
            <span className="text-[#f5b521]">01</span>
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

      {/* --- the claim --- */}
      <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <h2
            id={`w${project.n}-title`}
            className="u-display text-[clamp(2.4rem,6.4vw,5.5rem)]"
          >
            {h.headline}
          </h2>
          <div>
            <p className="u-prose">{h.body}</p>
            {h.coda ? (
              <p
                className="mt-6 inline-block border-b-[3px] pb-1 text-[1.125rem]"
                style={{ borderColor: "var(--tp-gold)" }}
              >
                {h.coda}
              </p>
            ) : null}
          </div>
        </div>

        {/* The entrance, drawn on his own PLAY pennant. */}
        <Link
          href={`/work/${project.slug}`}
          className="group mt-12 inline-flex items-center"
          aria-label={`Enter Tumbang Preso`}
        >
          <span className="relative inline-flex items-center">
            <Image
              src="/work/tumbang/pennant-play.webp"
              alt=""
              width={520}
              height={140}
              className="h-auto w-[15rem] transition-transform duration-200 group-hover:scale-[1.04] sm:w-[19rem]"
            />
            {/* ⚠ The pennant PNG is a blank chevron; the game draws its own label
                on top at runtime and this matches HOW. In his PLAY button the
                word is Darumadrop, all caps, near-black, centred over the whole
                sprite with a slight right bias, and its cap height is about 42
                per cent of the pennant. Anything smaller reads as a caption
                sitting on a button rather than as the button. */}
            <span className="u-display absolute inset-0 flex items-center justify-center pl-[5%] text-[clamp(1.7rem,4.2vw,2.6rem)] leading-none tracking-[0.01em] text-[#20200f] uppercase">
              ENTER
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 02 · FORM
 * ------------------------------------------------------------------------ */
export function EgovWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <WorldFrame project={project} display="franklin" className={franklin.variable}>
      <div className="py-12 sm:py-16">
        {/* ⚠ The product first. eGovMed is a phone app and it looks like one,
            so the panel is built around a handset rather than around a grid of
            ruled boxes pretending to be a government form. */}
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
          <div
            className="relative w-[min(15rem,58vw)] justify-self-center overflow-hidden rounded-[1.5rem] border-[9px] shadow-[0_20px_50px_-22px_rgba(16,32,58,.45)]"
            style={{
              aspectRatio: "430 / 932",
              borderColor: "var(--w-ink)",
              background: "var(--w-ground-2)",
            }}
          >
            <Image
              src={project.media.src}
              alt={project.media.alt}
              fill
              sizes="15rem"
              className="object-cover object-top"
            />
          </div>

          <div>
            <h2
              id={`w${project.n}-title`}
              className="u-display text-[clamp(2.2rem,5.6vw,4.5rem)] uppercase"
            >
              {h.headline}
            </h2>
            <p className="u-prose mt-6">{h.body}</p>
            {h.coda ? (
              <p
                className="mt-6 border-l-[3px] pl-4 text-[0.9375rem] leading-relaxed"
                style={{
                  borderColor: "var(--eg-teal)",
                  color: "var(--w-ink-2)",
                }}
              >
                {h.coda}
              </p>
            ) : null}
          </div>
        </div>

        {h.figure ? <InteractiveFigure id={h.figure} /> : null}
        {h.figureCaption ? (
          <p className="u-meta text-ink-3 -mt-8 normal-case tracking-[0.04em]">
            {h.figureCaption}
          </p>
        ) : null}
      </div>
    </WorldFrame>
  );
}

/* ---------------------------------------------------------------------------
 * 03 · TRACE
 * ------------------------------------------------------------------------ */
export function GlycoWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <WorldFrame project={project} display="plex" className="m-trace">
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-[52rem] text-center">
          <h2
            id={`w${project.n}-title`}
            className="u-display text-[clamp(2.2rem,5.6vw,4.5rem)]"
          >
            {h.headline}
          </h2>
          <p className="u-prose mx-auto mt-7 text-center">{h.body}</p>
          {h.coda ? (
            <p className="text-accent mt-6 font-mono text-[0.9375rem]">
              {h.coda}
            </p>
          ) : null}
        </div>

        {/* The deployed dashboard, then the topology it draws. The diagram is
            the argument, but it is an argument ABOUT something, and this is the
            something. */}
        <div className="border-rule relative mt-12 aspect-[16/9] overflow-hidden border">
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            sizes="(min-width: 1024px) 88rem, 100vw"
            className={
              project.media.fit === "contain"
                ? "object-contain p-6"
                : "object-cover object-top"
            }
          />
        </div>

        {h.figure ? <InteractiveFigure id={h.figure} /> : null}
        {h.figureCaption ? (
          <p className="u-meta text-ink-3 -mt-8 text-center normal-case tracking-[0.04em]">
            {h.figureCaption}
          </p>
        ) : null}
      </div>
    </WorldFrame>
  );
}

/* ---------------------------------------------------------------------------
 * 04 · MACHINE
 *
 * The one world with no interactive figure on the homepage, on purpose. The
 * emulator is 540 KB of WebAssembly and it lives one click away, in the lab and
 * on its own page. Putting it here would make the homepage the heaviest
 * document on the site to show something nobody asked for yet.
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
    <WorldFrame project={project} display="mono">
      <div className="grid gap-x-14 gap-y-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <h2
            id={`w${project.n}-title`}
            className="u-display text-[clamp(2rem,5vw,4rem)]"
          >
            {h.headline}
          </h2>
          <p className="u-prose mt-7">{h.body}</p>
          {h.coda ? (
            <p className="text-ink-3 mt-6 font-mono text-[0.875rem] leading-relaxed">
              {h.coda}
            </p>
          ) : null}
          <Link
            href="/lab/chip-8"
            className="u-meta border-accent text-accent hover:bg-accent hover:text-accent-ink mt-8 inline-block border px-4 py-2.5 transition-colors"
          >
            ▶ Run it
          </Link>
        </div>

        <div>
          <div className="border-rule bg-ground-2 relative aspect-[16/10] border">
            <Image
              src={project.media.src}
              alt={project.media.alt}
              fill
              sizes="(min-width: 1024px) 44rem, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="border-rule mt-px grid grid-cols-2 gap-px border-t">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-ground py-3">
                <dt className="u-meta text-ink-3 normal-case tracking-[0.04em]">
                  {k}
                </dt>
                <dd className="mt-1 font-mono text-[0.9375rem] tabular-nums">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </WorldFrame>
  );
}
