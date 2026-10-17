import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { projectNotes } from "@/content/portfolio";

const selected = ["khanpanion", "egovmed", "tumbang-preso"];
export default function GalleryProjects({ all = false }: { all?: boolean }) {
  const shown = all
    ? projects
    : selected.flatMap((slug) =>
        projects.filter((project) => project.slug === slug),
      );
  return (
    <div className={`studio-projects ${all ? "studio-projects-all" : ""}`}>
      {shown.map((project, index) => {
        const copy = projectNotes[project.slug];
        return (
          <article
            className={`studio-project studio-project-${project.world}`}
            key={project.slug}
            data-seq="studio"
          >
            <Link
              className="studio-project-media"
              href={`/work/${project.slug}`}
              aria-label={`Explore ${project.title}`}
            >
              <div className="studio-project-browser" aria-hidden="true">
                <span>● ● ●</span>
                <span>{project.title}</span>
                <span>↗</span>
              </div>
              <div className="studio-project-capture">
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  width={1600}
                  height={1000}
                  sizes={
                    all
                      ? "(max-width: 800px) 90vw, 45vw"
                      : "(max-width: 850px) 90vw, 60vw"
                  }
                  className={
                    project.media.fit === "contain" ? "studio-contain" : ""
                  }
                />
              </div>
              <span className="studio-project-open">
                OPEN PROJECT <span aria-hidden="true">↗</span>
              </span>
            </Link>
            <div className="studio-project-copy">
              <p className="studio-eyebrow">
                {all ? project.n : `0${index + 1}`} / {project.category}
              </p>
              <h3>
                <Link href={`/work/${project.slug}`}>
                  {project.slug === "heart-disease-prediction"
                    ? "CardioSense"
                    : project.title}
                </Link>
              </h3>
              <p className="studio-project-premise">{copy.title}</p>
              <p className="studio-project-description">{copy.summary}</p>
              <div className="studio-project-credit">
                <span>MY PART</span>
                <p>{copy.role}</p>
              </div>
              <p className="studio-project-result">{copy.result}</p>
              <Link className="studio-link" href={`/work/${project.slug}`}>
                Inside the build ↗
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
