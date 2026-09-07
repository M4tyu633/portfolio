import Image from "next/image";
import type { Project } from "@/content/types";

/* ===========================================================================
 * PROJECT HEROES.
 *
 * Four compositions, not one template with a colour prop. Which one a project
 * gets is a property of the project, and the difference is layout rather than
 * paint:
 *
 *   POSTER      title at the top of the page at maximum scale, over asphalt,
 *               with the plate full-bleed underneath. It is a game.
 *   DOCUMENT    a ruled header block. Reference number, classification and
 *               date across the top, title and lede in a two-column form.
 *   INSTRUMENT  a specification panel. The title is small, the facts are the
 *               composition, and the plate is one readout among several.
 *   PLATE       the reading-room default: image first, at size, then the text.
 * ======================================================================== */

export default function ProjectHero({ project }: { project: Project }) {
  switch (project.world) {
    case "tumbang":
      return <Poster project={project} />;
    case "egov":
      return <Document project={project} />;
    case "glyco":
    case "chip8":
      return <Instrument project={project} />;
    default:
      return <Plate project={project} />;
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

function Facts({ project, cols = 3 }: { project: Project; cols?: number }) {
  return (
    <dl
      className={`border-rule bg-rule mt-px grid gap-px border-t sm:grid-cols-2 ${
        cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
      }`}
    >
      {project.facts.map((f) => (
        <div key={f.label} className="bg-ground px-4 py-3.5">
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
 * POSTER
 * ------------------------------------------------------------------------ */
function Poster({ project }: { project: Project }) {
  return (
    <header className="m-asphalt">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Stamp project={project} />
        <h1 className="u-display py-8 text-[clamp(2.75rem,10vw,8.5rem)] sm:py-12">
          {project.title}
        </h1>
      </div>

      <div className="relative aspect-[16/9] max-h-[70vh] w-full sm:aspect-[2/1]">
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-x-14 gap-y-6 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <p className="u-prose text-ink text-[1.1875rem] leading-[1.55]">
              {project.lede}
            </p>
            <Award project={project} />
          </div>
        </div>
        <Facts project={project} />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------------
 * DOCUMENT
 * ------------------------------------------------------------------------ */
function Document({ project }: { project: Project }) {
  return (
    <header className="m-formgrid">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Stamp project={project} />

        <div className="grid gap-x-14 gap-y-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <h1 className="u-display text-[clamp(2.5rem,7.5vw,6rem)] uppercase">
              {project.title}
            </h1>
            <Award project={project} />
          </div>
          <div className="lg:pt-4">
            <p className="u-prose text-ink text-[1.1875rem] leading-[1.55]">
              {project.lede}
            </p>
          </div>
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
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Stamp project={project} />

        <div className="grid gap-x-14 gap-y-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <h1 className="u-display text-[clamp(2.2rem,5.6vw,4.25rem)]">
              {project.title}
            </h1>
            <p className="u-prose mt-6">{project.lede}</p>
            <Award project={project} />
          </div>

          <div className="relative aspect-[16/10] self-start">
            <div className="border-rule bg-ground-2 absolute inset-0 border">
              <Image
                src={project.media.src}
                alt={project.media.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46rem, 100vw"
                className={
                  project.media.fit === "contain"
                    ? "object-contain p-8"
                    : "object-cover"
                }
              />
            </div>
          </div>
        </div>

        <Facts project={project} />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------------
 * PLATE
 * ------------------------------------------------------------------------ */
function Plate({ project }: { project: Project }) {
  return (
    <header>
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Stamp project={project} />

        <div className="border-rule relative mt-8 aspect-[16/9] border sm:aspect-[21/9]">
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            priority
            sizes="100vw"
            className={
              project.media.fit === "contain"
                ? "object-contain p-8"
                : "object-cover"
            }
          />
        </div>

        <div className="grid gap-x-14 gap-y-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <h1 className="u-display text-[clamp(2.2rem,5.2vw,4rem)]">
            {project.title}
          </h1>
          <div>
            <p className="u-prose text-ink text-[1.1875rem] leading-[1.55]">
              {project.lede}
            </p>
            <Award project={project} />
          </div>
        </div>

        <Facts project={project} />
      </div>
    </header>
  );
}
