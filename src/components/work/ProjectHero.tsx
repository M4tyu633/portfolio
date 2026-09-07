import Image from "next/image";
import type { Project } from "@/content/types";

/* ===========================================================================
 * PROJECT HEROES.
 *
 * Three compositions for the five projects that use the shared shell. Tumbang
 * Preso has its own route and none of this.
 *
 * ⚠⚠ EVERY ONE OF THEM LEADS WITH A PHOTOGRAPH OF THE RUNNING PRODUCT. That is
 * the correction: the first pass opened four of these on a title and a ruled
 * facts grid, with the screenshot somewhere below, so a visitor had to read
 * three paragraphs before finding out what the thing looks like. The captures
 * come from `scripts/capture-live.sh`, which photographs the deployed URLs.
 *
 *   HANDSET     for a product that is a phone app. eGovMed is a mobile-first
 *               PWA, so a desktop screenshot of it is a narrow column floating
 *               in grey. It gets a device frame and the page is built around
 *               the shape of a phone.
 *   INSTRUMENT  a wide screenshot directly under the title, edge to edge on the
 *               container. For the two dark dashboards.
 *   STATION     the screenshot FIRST, full-bleed and cinematic, then the title.
 *               For the two clinical stations, whose own opening screens are
 *               already designed to be looked at.
 * ======================================================================== */

export default function ProjectHero({ project }: { project: Project }) {
  switch (project.world) {
    case "egov":
      return <Handset project={project} />;
    case "glyco":
    case "chip8":
      return <Instrument project={project} />;
    default:
      return <Station project={project} />;
  }
}

function Stamp({ project }: { project: Project }) {
  return (
    <div className="border-rule flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b py-4">
      <span className="u-meta text-accent tabular-nums">{project.n}</span>
      <span className="u-meta text-ink-3 normal-case tracking-[0.04em]">
        {project.category}
      </span>
      <span className="u-meta text-ink-3 ml-auto tabular-nums">
        {project.year}
      </span>
    </div>
  );
}

/* Facts as a flat run of label/value pairs rather than a boxed grid of
 * identical cells. Same data, less dossier. */
function Facts({ project }: { project: Project }) {
  return (
    <dl className="border-rule mt-10 grid gap-x-12 gap-y-5 border-t pt-6 sm:grid-cols-2 lg:grid-cols-3">
      {project.facts.map((f) => (
        <div key={f.label}>
          <dt className="u-meta text-ink-3">{f.label}</dt>
          <dd className="mt-1.5 text-[0.9375rem] leading-snug">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Award({ project }: { project: Project }) {
  if (!project.award) return null;
  return (
    <p
      className="u-meta mt-6 inline-block border px-3 py-2"
      style={{ borderColor: "var(--w-focus)", color: "var(--w-focus)" }}
    >
      {project.award}
    </p>
  );
}

/* ---------------------------------------------------------------------------
 * HANDSET
 * ------------------------------------------------------------------------ */
function Handset({ project }: { project: Project }) {
  return (
    <header>
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <Stamp project={project} />

        <div className="grid items-center gap-x-16 gap-y-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h1 className="u-display text-[clamp(2.6rem,8vw,6.5rem)] uppercase">
              {project.title}
            </h1>
            <p className="u-prose text-ink mt-7 text-[1.1875rem] leading-[1.55]">
              {project.lede}
            </p>
            <Award project={project} />
          </div>

          {/* The device. A 12px radius and a hairline, not a photorealistic
              iPhone render: it exists so the screenshot reads as a phone
              screen rather than as a cropped desktop page. */}
          <figure className="m-0 justify-self-center">
            <div
              className="relative w-[min(19rem,72vw)] overflow-hidden rounded-[1.75rem] border-[10px] shadow-[0_24px_60px_-24px_rgba(16,32,58,.45)]"
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
                priority
                sizes="19rem"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="u-meta text-ink-3 mt-4 text-center normal-case tracking-[0.04em]">
              The deployed app, on the screen it was designed for
            </figcaption>
          </figure>
        </div>

        <Facts project={project} />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------------
 * INSTRUMENT
 * ------------------------------------------------------------------------ */
function Instrument({ project }: { project: Project }) {
  return (
    <header>
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <Stamp project={project} />

        <div className="grid gap-x-16 gap-y-6 py-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
          <h1 className="u-display text-[clamp(2.4rem,6vw,4.75rem)]">
            {project.title}
          </h1>
          <p className="u-prose text-ink text-[1.125rem] leading-[1.55]">
            {project.lede}
          </p>
        </div>
      </div>

      <div className="border-rule relative aspect-[16/9] w-full border-y sm:aspect-[21/9]">
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          priority
          sizes="100vw"
          className={
            project.media.fit === "contain"
              ? "object-contain p-6"
              : "object-cover object-top"
          }
        />
      </div>

      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <Award project={project} />
        <Facts project={project} />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------------
 * STATION
 * ------------------------------------------------------------------------ */
function Station({ project }: { project: Project }) {
  return (
    <header>
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <Stamp project={project} />
      </div>

      <div className="relative aspect-[16/10] w-full sm:aspect-[2/1]">
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--w-ground) 0%, transparent 42%)",
          }}
        />
      </div>

      <div className="mx-auto -mt-16 max-w-[92rem] px-5 sm:-mt-24 sm:px-8">
        <div className="relative grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
          <h1 className="u-display text-[clamp(2.4rem,6vw,4.75rem)]">
            {project.title}
          </h1>
          <p className="u-prose text-ink text-[1.125rem] leading-[1.55]">
            {project.lede}
          </p>
        </div>
        <Award project={project} />
        <Facts project={project} />
      </div>
    </header>
  );
}
