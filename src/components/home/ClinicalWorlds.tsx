import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

export function KneeWorld({ project }: { project: Project }) {
  return (
    <section
      id="w05"
      data-world="reading"
      data-world-panel
      className="mri-room"
      aria-labelledby="w05-title"
    >
      <div className="room-head">
        <span className="u-meta">05 / Knee MRI Reader</span>
        <span className="u-meta">ML · Imaging · 2026</span>
      </div>
      <div className="mri-composition">
        <div className="mri-copy">
          <p className="u-meta">Six views. Twelve findings.</p>
          <h2 id="w05-title" className="u-display">
            The scan stays
            <br />
            at the center.
          </h2>
          <p>
            I built the path from raw DICOM to a multi-view model and a browser
            reading station. Compare held-out scores with the radiologist’s
            annotations.
          </p>
          <div className="mri-score">
            <strong>0.843</strong>
            <span>
              Macro AUC
              <br />
              Strict out-of-fold
            </span>
          </div>
          <p className="clinical-note">
            0.997 in-sample. The distinction is part of the work.
          </p>
          <Link className="room-exit" href={`/work/${project.slug}`}>
            Inside the reading station →
          </Link>
        </div>
        <figure>
          <Image
            src={project.media.src}
            alt={project.media.alt}
            width={1440}
            height={960}
            sizes="(min-width: 900px) 65vw, 100vw"
          />
          <figcaption>
            Real series previews · held-out predictions · radiologist
            annotations
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function CardioWorld({ project }: { project: Project }) {
  return (
    <section
      id="w06"
      data-world="cardio"
      data-world-panel
      className="cardio-room"
      aria-labelledby="w06-title"
    >
      <div className="room-head">
        <span className="u-meta">06 / CardioSense</span>
        <span className="u-meta">ML · Risk attribution · 2025</span>
      </div>
      <div className="cardio-composition">
        <div className="cardio-copy">
          <p className="u-meta">Input → Attribution → Risk</p>
          <h2 id="w06-title" className="u-display">
            Change a value.
            <br />
            See what moved.
          </h2>
          <p>
            I built the data pipeline, compared models, and brought the exported
            Logistic Regression model into the browser. Every input contributes
            to a score you can inspect.
          </p>
          <p className="clinical-note">
            920 UCI records · four hospitals · local inference.
            <br />
            Research demonstration, not a clinical decision tool.
          </p>
          <Link className="room-exit" href={`/work/${project.slug}`}>
            Explore the risk instrument →
          </Link>
        </div>
        <figure>
          <Image
            src={project.media.src}
            alt={project.media.alt}
            width={1440}
            height={960}
            sizes="(min-width: 900px) 65vw, 100vw"
          />
          <figcaption>
            The actual station. Signed model contributions, not a simulated ECG.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
