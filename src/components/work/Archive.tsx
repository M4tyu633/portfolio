"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SwarmPreview from "@/components/home/SwarmPreview";
import GameClip from "@/components/media/GameClip";
import ProjectLinkRail from "@/components/work/ProjectLinkRail";
import type { Project } from "@/content/types";

/* ===========================================================================
 * THE ARCHIVE.
 *
 * A museum collection record is a row of typed metadata, and the object
 * photograph is served BESIDE the list rather than inside every row. That is
 * the whole layout: move down the catalogue and the plate changes.
 *
 * ⚠ WHAT THE ROWS SAY IS THE POINT, AND THE FIRST VERSION GOT IT WRONG. It
 * printed a title, a category, a year and a one-line description, so a reader
 * had to open six case studies to discover which of these Matthew personally
 * built and which of them went anywhere. Every row now carries `did` and
 * `outcome` at full size, and they are the two lines with the most contrast in
 * the row rather than a footnote under it.
 *
 * The stage updates on hover AND on focus, so tabbing through the rows drives
 * it identically. Only the ACTIVE plate mounts its media, which is why the
 * moving one can be a real video without the page pulling six of them.
 *
 * Below `lg` the composition is different rather than scaled: the stage is
 * gone and each row carries its own plate, because a fixed pane beside a list
 * needs a width a phone does not have.
 * ======================================================================== */

export default function Archive({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="archive">
      {/* -------- the catalogue -------- */}
      <ol className="archive-list" data-seq="rows">
        {projects.map((p, i) => (
          <li key={p.slug} data-active={i === active || undefined}>
            <Link
              href={`/work/${p.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onTouchStart={() => setActive(i)}
              className="archive-row"
            >
              <span className="u-meta arc-n tabular-nums">{p.n}</span>

              <span className="arc-head">
                <span className="u-display arc-title">{p.title}</span>
                <span className="u-meta arc-class">{p.category}</span>
                <span className="u-meta arc-year tabular-nums">{p.year}</span>
              </span>

              <span className="arc-did">{p.did}</span>
              <span className="u-meta arc-outcome">{p.outcome}</span>
              <span className="arc-line">{p.oneLiner}</span>

              {/* The phone composition: the plate lives in the row. */}
              <span className="arc-plate" data-world={p.world}>
                <Image
                  src={p.media.src}
                  alt={p.media.alt}
                  fill
                  sizes="100vw"
                  className={
                    p.media.fit === "contain"
                      ? "object-contain p-5"
                      : "object-cover"
                  }
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* -------- the stage -------- */}
      <div className="archive-stage" data-world={current.world}>
        <div className="archive-stage-label">
          <span>
            {current.n} / {current.title}
          </span>
          <span>{current.category}</span>
        </div>
        <div className="archive-frame m-reg">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              aria-hidden={i !== active}
              className="archive-shot"
              data-on={i === active || undefined}
            >
              {/* Only the selected plate mounts anything that moves. */}
              {p.world === "glyco" && i === active ? (
                <SwarmPreview />
              ) : p.clip && i === active ? (
                <GameClip
                  fill
                  src={p.clip.src}
                  poster={p.clip.poster}
                  alt={p.media.alt}
                />
              ) : (
                <Image
                  src={p.media.src}
                  alt=""
                  fill
                  sizes="44rem"
                  priority={i === 0}
                  className={
                    p.media.fit === "contain"
                      ? "object-contain p-8"
                      : "object-cover"
                  }
                />
              )}
            </div>
          ))}
        </div>

        <dl className="archive-facts">
          {current.facts.slice(0, 3).map((f) => (
            <div key={f.label}>
              <dt className="u-meta text-ink-3">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <ProjectLinkRail project={current} />
      </div>
    </div>
  );
}
