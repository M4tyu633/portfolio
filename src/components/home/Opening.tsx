"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GameClip from "@/components/media/GameClip";
import { entrances } from "@/content/worlds";
export default function Opening() {
  const [selected, setSelected] = useState(0);
  const project = entrances[selected];
  return (
    <section
      className="cinema-opening"
      aria-labelledby="opening-statement"
      data-project={project.world}
    >
      <div className="cinema-media" key={project.src}>
        {selected === 0 ? (
          <GameClip
            src="/work/tumbang/match.mp4"
            poster="/work/tumbang/match-poster.webp"
            alt="Tumbang Preso gameplay"
            className="cinema-video"
          />
        ) : (
          <Image
            src={project.src}
            alt=""
            fill
            sizes="100vw"
            className={selected === 1 ? "object-contain" : "object-cover"}
            priority
          />
        )}
      </div>
      <div className="cinema-shade" />
      <div className="cinema-topline">
        <span>Computer science at UP Manila</span>
        <span>Manila, Philippines</span>
      </div>
      <h1 id="opening-statement">
        <span>
          <span>Matthew</span>
        </span>
        <span>
          <span>
            Labrador<span className="cinema-dot">.</span>
          </span>
        </span>
      </h1>
      <div className="cinema-bottom">
        <p>
          Games. AI. Civic systems.
          <br />I build across the whole stack.
        </p>
        <Link href={project.href} className="cinema-enter">
          <span>{project.title}</span>
          <span>{project.line}</span>
          <strong aria-hidden>↗</strong>
        </Link>
      </div>
      <div className="cinema-selector" aria-label="Choose the opening world">
        {entrances.map((item, i) => (
          <button
            key={item.title}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span>0{i + 1}</span>
            <strong>{item.title}</strong>
            <span aria-hidden>{selected === i ? "●" : "↗"}</span>
          </button>
        ))}
      </div>
      <a className="cinema-down" href="#w01" aria-label="Explore selected work">
        Scroll to explore ↓
      </a>
    </section>
  );
}
