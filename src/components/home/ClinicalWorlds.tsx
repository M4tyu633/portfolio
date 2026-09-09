import Image from "next/image";
import Link from "next/link";
import RoomPlate from "@/components/home/RoomPlate";
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
      {/* The reading station itself, as the room it is read in. */}
      <RoomPlate src="/work/knee-mri/station.webp" />
      <div className="room-head">
        <span className="u-meta">05 / Knee MRI Reader</span>
        <span className="u-meta">ML · Imaging · 2026</span>
      </div>
      <div className="mri-composition">
        <div className="mri-copy">
          <p className="u-meta">Six views · twelve findings</p>
          <h2 id="w05-title" className="u-display">
            A reading station
            <br />
            for knee MRI.
          </h2>
          <p>
            A model that scores twelve findings from a knee MRI study, and a
            viewer that puts its scores next to the radiologist&rsquo;s own
            notes. I built the whole chain: reading the raw scan files, pulling
            labels out of free-text reports, training the model, and serving it.
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
            The same model scores 0.997 on studies it was trained on. 0.843 is
            the number measured on studies it had never seen, so 0.843 is the
            one printed here.
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
      {/* The browser instrument, as the room's ground. */}
      <RoomPlate src="/work/heart/station.webp" />
      <div className="room-head">
        <span className="u-meta">06 / CardioSense</span>
        <span className="u-meta">ML · Risk attribution · 2025</span>
      </div>
      <div className="cardio-composition">
        <div className="cardio-copy">
          <p className="u-meta">Input → attribution → risk</p>
          <h2 id="w06-title" className="u-display">
            Change a value.
            <br />
            See what moved.
          </h2>
          <p>
            A heart-risk model you can take apart. Change one measurement and
            the page shows exactly how much it moved the score, and in which
            direction. I prepared the data, compared the models, and ran the
            chosen one in the browser rather than on a server.
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
