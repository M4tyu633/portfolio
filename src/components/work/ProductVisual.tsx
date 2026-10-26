import Image from "next/image";
import type { Project } from "@/content/types";
import { presentations } from "@/content/presentation";

/** Native captures retain their interface pixels inside authored product compositions. */
export default function ProductVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const copy = presentations[project.world];
  const game = project.world === "tumbang";
  return (
    <div className={`product-visual product-visual-${project.world}`}>
      <div className="pv-surface">
        <div className="pv-meta" aria-hidden="true">
          <span>{project.category}</span>
          <span>
            {project.year} / {project.n}
          </span>
        </div>
        <div className="pv-brand">
          {project.world === "khan" ? (
            <Image
              src="/work/khanpanion/logo.svg"
              width={485}
              height={112}
              alt="Khanpanion"
              className="pv-logo"
            />
          ) : game ? (
            <Image
              src="/work/tumbang/wordmark.webp"
              width={900}
              height={300}
              alt="Tumbang Preso"
              className="pv-logo"
            />
          ) : (
            <span className="pv-name">{copy?.name ?? project.title}</span>
          )}
          <p>{game ? "The street is your playground." : copy?.caption}</p>
        </div>
        <div className="pv-device">
          <div className="pv-device-bar" aria-hidden="true">
            <span>● ● ●</span>
            <span>{project.title}</span>
            <span>↗</span>
          </div>
          <Image
            src={project.media.src}
            alt={project.media.alt}
            width={project.world === "egov" ? 430 : 1440}
            height={project.world === "egov" ? 930 : 900}
            sizes="(max-width: 700px) 90vw, 65vw"
            priority={priority}
            className="pv-capture"
          />
        </div>
        {project.world === "chip8" ? (
          <span className="pv-watermark" aria-hidden="true">
            1977
          </span>
        ) : null}
        <div className="pv-footer" aria-hidden="true">
          <span>{game ? "GODOT / ONLINE MULTIPLAYER" : copy?.technical}</span>
          <span>
            {project.world === "egov"
              ? "OFFLINE DEMO"
              : project.world === "glyco"
                ? "PRESERVED DEMO"
                : "PRODUCT / ENGINEERING"}
          </span>
        </div>
      </div>
    </div>
  );
}
