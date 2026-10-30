import Image from "next/image";
import type { Project } from "@/content/types";

const badges: Partial<
  Record<Project["world"], { src: string; w: number; h: number; tone?: string }>
> = {
  khan: { src: "/work/khanpanion/logo-reverse.svg", w: 329, h: 64 },
  egov: {
    src: "/work/egovmed/logo-wordmark.png",
    w: 859,
    h: 192,
    tone: "is-egov",
  },
  tumbang: {
    src: "/work/tumbang/wordmark.webp",
    w: 900,
    h: 300,
    tone: "is-tump",
  },
};

const egovScreens = ["patient-home", "patient-booking", "patient-payment"];

/** The real product, full-bleed, with its own logo as a small badge. */
export default function ProductVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const badge = badges[project.world];
  const phones = project.world === "egov";
  const name =
    project.slug === "heart-disease-prediction" ? "CardioSense" : project.title;
  return (
    <div className={`product-visual product-visual-${project.world}`}>
      <div className={`shot-frame ${phones ? "is-phones" : ""}`}>
        {phones ? (
          egovScreens.map((file, i) => (
            <Image
              key={file}
              src={`/work/egovmed/${file}.jpg`}
              alt={i === 0 ? project.media.alt : ""}
              width={430}
              height={845}
              sizes="(max-width: 700px) 30vw, 18vw"
              priority={priority}
            />
          ))
        ) : (
          <Image
            src={project.media.src}
            alt={project.media.alt}
            width={1440}
            height={900}
            sizes="(max-width: 700px) 92vw, 60vw"
            priority={priority}
            className="shot-image"
          />
        )}
        <span className={`shot-badge ${badge?.tone ?? ""}`}>
          {badge ? (
            <Image src={badge.src} width={badge.w} height={badge.h} alt="" />
          ) : (
            <span className="shot-badge-name">{name}</span>
          )}
        </span>
      </div>
    </div>
  );
}
