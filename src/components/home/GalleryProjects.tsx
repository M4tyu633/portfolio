import ProductVisual from "@/components/work/ProductVisual";
import Link from "next/link";
import { projects } from "@/content/projects";
import { projectNotes } from "@/content/portfolio";

const selected = ["khanpanion", "egovmed", "tumbang-preso"];
const hiringOrder = [
  ...selected,
  "chip-8-emulator",
  "glycoswarm-ai",
  "knee-mri-reader",
  "heart-disease-prediction",
];
export default function GalleryProjects({ all = false }: { all?: boolean }) {
  const shown = (all ? hiringOrder : selected).flatMap((slug) =>
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
              <ProductVisual project={project} />
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
                <span>ENGINEERING CONTRIBUTION</span>
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
