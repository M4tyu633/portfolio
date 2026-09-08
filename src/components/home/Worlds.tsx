import Link from "next/link";
import Image from "next/image";
import { daruma } from "@/app/fonts";
import InteractiveFigure from "@/components/figures";
import GameClip from "@/components/media/GameClip";
import type { Project } from "@/content/types";

// Home uses media compositions; the full systems live on their own routes.
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
          <span className="u-meta text-ink-3 tracking-[0.04em] normal-case">
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
        {/* The entrance, drawn on his own PLAY pennant.
         *
         * ⚠ THE IMAGE AND THE LABEL ARE SIZED IN THE SAME em, off one font-size
         * on the wrapper, so their ratio cannot drift as the viewport changes.
         * Sized by hand they did drift: the word sat at about 37 per cent of
         * the pennant's height with a lake of green either side of it, and his
         * own PLAY button sets its label at about 42 per cent filling roughly
         * half the width. 8.6em wide against 1.35em of type reproduces that.
         *
         * The ink is his dark green, not black. */}
        <Link
          href={`/work/${project.slug}`}
          className="group mt-12 inline-flex items-center"
          aria-label="Enter Tumbang Preso"
          style={{ fontSize: "clamp(1.55rem, 3.6vw, 2.3rem)" }}
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
        </Link>{" "}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 02 · FORM
 * ------------------------------------------------------------------------ */
export function EgovWorld({ project }: { project: Project }) {
  return (
    <section
      id="w02"
      data-world="egov"
      data-display="plex"
      data-world-panel
      className="home-civic media-scene"
      aria-labelledby="w02-title"
    >
      <div className="home-civic-copy">
        <p>eGovMed / Full-stack + API integrations</p>
        <h2 id="w02-title">
          One visit.
          <br />A lot happening
          <br />
          <em>underneath.</em>
        </h2>
        <p>
          Eight government integrations, from sign-in to payment. I made them
          behave like one system.
        </p>
        <Link href="/work/egovmed" className="scene-link">
          Enter eGovMed <span aria-hidden>↗</span>
        </Link>
      </div>
      <div className="civic-art">
        <span aria-hidden className="civic-eight">
          08
        </span>
        <div className="civic-phone">
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            sizes="(min-width: 768px) 320px, 230px"
            className="object-contain"
          />
        </div>
        <p>
          SSO · AI · eVerify · Liveness
          <br />
          Message · Chain · Pay · Report
        </p>
      </div>
    </section>
  );
}
export function GlycoWorld({ project }: { project: Project }) {
  return (
    <section
      id="w03"
      data-world="glyco"
      data-display="plex"
      data-world-panel
      className="home-swarm media-scene"
      aria-labelledby="w03-title"
    >
      <div className="home-swarm-top">
        <p>GlycoSwarm AI / Lead developer</p>
        <span>Renal / Retinal / Neuropathy / Cardiovascular</span>
      </div>
      <h2 id="w03-title">
        Four perspectives.
        <br />
        <span>One patient.</span>
      </h2>
      <div className="swarm-home-image">
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-contain"
        />
      </div>
      <div className="home-swarm-bottom">
        <p>
          Parallel specialists, executable scoring code, inspectable evidence.
          The graph is where the interesting decisions happen.
        </p>
        <Link href="/work/glycoswarm-ai" className="scene-link">
          Explore the preserved system <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}

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
        </div>
        <div>
          <InteractiveFigure id="c8-machine" />
          <dl className="border-rule mt-px grid grid-cols-2 gap-px border-t">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-ground py-3">
                <dt className="u-meta text-ink-3 tracking-[0.04em] normal-case">
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
