import Link from "next/link";
import type { Project } from "@/content/types";
import { presentations } from "@/content/presentation";
import ProductVisual from "./ProductVisual";

export default function ProjectHero({ project }: { project: Project }) {
  const copy = presentations[project.world];
  return (
    <header className={`case-opening case-opening-${project.world}`}>
      <div className="case-opening-top">
        <Link href="/work">← All work</Link>
        <span>
          {project.category} / {project.year}
        </span>
        <span>{project.n}</span>
      </div>
      <div className="case-opening-grid">
        <div className="case-opening-copy">
          <p className="case-project-name">{project.title}</p>
          <h1>{copy?.headline ?? project.title}</h1>
          <p className="case-lede">{project.lede}</p>
          <div className="case-actions">
            {project.links?.demo ? (
              <a href={project.links.demo} className="case-primary">
                {project.linkLabels?.demo ?? "Open the application"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            <a
              href={project.world === "chip8" ? "#machine" : "#s01"}
              className="case-secondary"
            >
              {project.world === "chip8"
                ? "Boot the emulator"
                : "Explore the engineering"}{" "}
              ↓
            </a>
          </div>
        </div>
        <ProductVisual project={project} priority />
      </div>
      <dl className="case-signals">
        {copy?.signals.map((signal) => (
          <div key={signal.label}>
            <dt>{signal.label}</dt>
            <dd>{signal.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
