import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { projectNotes } from "@/content/portfolio";

const artwork: Record<
  string,
  { src: string; alt: string; companion?: string }
> = {
  "tumbang-preso": {
    src: "/work/tumbang/original/round-capture.webp",
    alt: "Actual Tumbang Preso gameplay on the plaza map, captured from the original game recording.",
    companion: "/work/tumbang/original/setup-capture.webp",
  },
  egovmed: {
    src: "/work/egovmed/demo-home.webp",
    alt: "The original eGovMed patient interface, with its blue Start a visit action and records, payment and message navigation.",
  },
  "glycoswarm-ai": {
    src: "/work/glycoswarm/workspace.webp",
    alt: "The preserved GlycoSwarm demonstration: four distinct specialists and a shared synthesis stage.",
  },
  "chip-8-emulator": {
    src: "/work/chip8/arcade.webp",
    alt: "The redesigned CHIP-8 micro arcade running Brix, with its six-cartridge library and simple playback controls.",
  },
  "knee-mri-reader": {
    src: "/work/knee-mri/reading-room.webp",
    alt: "Actual MRI study previews and held-out model scores in the reading station.",
  },
  "heart-disease-prediction": {
    src: "/work/heart/instrument.webp",
    alt: "CardioSense showing its real model inputs and signed coefficient contributions.",
  },
};

export default function GalleryProjects({ all = false }: { all?: boolean }) {
  return (
    <div className={`gallery-cases ${all ? "gallery-cases-index" : ""}`}>
      {projects.map((project, index) => {
        const copy = projectNotes[project.slug];
        const art = artwork[project.slug];
        return (
          <article
            className={`gallery-case gallery-case-${project.world}`}
            key={project.slug}
            id={`project-${project.n}`}
          >
            <div className="case-meta">
              <span>
                {project.n} / {project.category}
              </span>
              <span>{project.year}</span>
            </div>
            <div className="case-composition">
              <Link
                className="case-image"
                href={`/work/${project.slug}`}
                aria-label={`Explore ${project.title}`}
              >
                {project.world === "egov" ? (
                  <>
                    <span className="civic-caption" aria-hidden="true">
                      ONE PATIENT.
                      <br />
                      ONE VISIT.
                    </span>
                    <div className="civic-phone">
                      <Image
                        src={art.src}
                        alt={art.alt}
                        width={430}
                        height={960}
                        sizes="(max-width:700px) 190px, 260px"
                      />
                    </div>
                  </>
                ) : (
                  <Image
                    src={art.src}
                    alt={art.alt}
                    width={1600}
                    height={1000}
                    sizes={
                      index < 2
                        ? "(max-width:900px) 90vw, 65vw"
                        : "(max-width:700px) 90vw, 45vw"
                    }
                    className="case-main-image"
                  />
                )}
                {art.companion ? (
                  <Image
                    src={art.companion}
                    alt="The original character selector showing Jun-Jun and his speed, power and grit."
                    width={560}
                    height={315}
                    sizes="(max-width:700px) 140px, 250px"
                    className="case-companion"
                  />
                ) : null}
                <span className="case-open" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <div className="case-writing">
                <div className="case-number" aria-hidden="true">
                  0{index + 1}
                </div>
                <h3>
                  <Link href={`/work/${project.slug}`}>
                    {project.world === "cardio" ? "CardioSense" : project.title}
                  </Link>
                </h3>
                <p className="case-premise">{copy.title}</p>
                <p>{copy.summary}</p>
                <p className="case-responsibility">{copy.role}</p>
                <div className="case-outcome">{copy.result}</div>
                <Link href={`/work/${project.slug}`} className="gallery-link">
                  Explore the project <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
