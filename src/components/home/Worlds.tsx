import Link from "next/link";
import Image from "next/image";
import InteractiveFigure from "@/components/figures";
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
 * ⚠ The homepage loads TWO type families and no more, which is why the display
 * face does not change here. The type change is what happens when you go
 * through the door.
 * ======================================================================== */

function WorldFrame({
  project,
  children,
  className = "",
}: {
  project: Project;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={`w${project.n}`}
      data-world={project.world}
      data-world-panel
      aria-labelledby={`w${project.n}-title`}
      className={`bg-ground text-ink scroll-mt-14 ${className}`}
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
 * 01 · ASPHALT
 * ------------------------------------------------------------------------ */
export function TumbangWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <WorldFrame project={project} className="m-asphalt py-2">
      <div className="grid gap-x-12 gap-y-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end">
        <div>
          <h2
            id={`w${project.n}-title`}
            className="u-display text-[clamp(2.4rem,6.6vw,5.5rem)]"
          >
            {h.headline}
          </h2>
          <p className="u-prose mt-7">{h.body}</p>
          {h.coda ? (
            <p className="mt-6 inline-block border-b-2 pb-1 text-[1.0625rem]" style={{ borderColor: "var(--tp-gold)" }}>
              {h.coda}
            </p>
          ) : null}
        </div>

        <div>
          {h.figure ? <InteractiveFigure id={h.figure} /> : null}
          {h.figureCaption ? (
            <p className="u-meta text-ink-3 mt-3 normal-case tracking-[0.04em]">
              {h.figureCaption}
            </p>
          ) : null}
        </div>
      </div>
    </WorldFrame>
  );
}

/* ---------------------------------------------------------------------------
 * 02 · FORM
 * ------------------------------------------------------------------------ */
export function EgovWorld({ project }: { project: Project }) {
  const h = project.home!;
  return (
    <WorldFrame project={project} className="m-formgrid">
      <div className="py-12 sm:py-16">
        <div className="grid gap-x-14 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <h2
            id={`w${project.n}-title`}
            className="u-display text-[clamp(2.2rem,5.6vw,4.5rem)]"
          >
            {h.headline}
          </h2>
          <div className="lg:pt-3">
            <p className="u-prose">{h.body}</p>
            {h.coda ? (
              <p
                className="mt-6 border-l-2 pl-4 text-[0.9375rem] leading-relaxed"
                style={{ borderColor: "var(--eg-stamp)", color: "var(--eg-stamp)" }}
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
    <WorldFrame project={project} className="m-trace">
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
    <WorldFrame project={project}>
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
