"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GameClip from "@/components/media/GameClip";
import { opening } from "@/content/site";
import { entrances } from "@/content/worlds";

/* ===========================================================================
 * THE OPENING — a catalogue cover with a live plate in it.
 *
 * ⚠ THE JOB, IN ORDER, AND ANY CHANGE HAS TO KEEP ALL FOUR:
 *   1  a stranger reads the name, the school and one sentence in his voice
 *   2  all four flagship projects are on screen, by name, without scrolling
 *   3  each of them says WHAT HE DID and WHERE IT WENT, in words, at size
 *   4  one of them is playing, right there, before anything is clicked
 *
 * The old version failed 3 outright — its selector printed four titles and an
 * arrow — and answered 1 with "Games. AI. Civic systems. I build across the
 * whole stack", which is a résumé line that would be true of a thousand people.
 *
 * Selecting is a HOVER/FOCUS on desktop and a scroll on a phone. The index
 * entries are links, not buttons, so the obvious gesture — click the project
 * name — goes to the project, and the coordinated scene change is a reward for
 * moving the pointer rather than a toll gate in front of the work.
 *
 * What "coordinated" means here, concretely: one state change moves the plate,
 * the caption, the display face, the accent, the entry verb and the rule under
 * the index. That is the difference between a scene and a crossfade.
 * ======================================================================== */

export default function Opening() {
  const [i, setI] = useState(0);
  const active = entrances[i];

  return (
    <section
      className="opening"
      data-project={active.world}
      data-display={active.display}
      aria-labelledby="opening-statement"
    >
      <div className="opening-body">
        {/* The order is a claim and then a signature, which is how a piece of
            writing is laid out and not how a résumé is. The name is under the
            sentence rather than over it because the sentence is the thing a
            stranger will still remember tomorrow. */}
        <div className="opening-id">
          <p className="opening-kicker">
            <span>Selected work</span>
            <span aria-hidden className="opening-rule" />
            <span>2025&ndash;2026</span>
          </p>

          <h1 id="opening-statement">{opening.statement}</h1>

          <p className="opening-sign">Matthew Labrador</p>

          <p className="opening-where">
            <span>Computer science, UP Manila</span>
            <span aria-hidden>/</span>
            <span>Manila, Philippines</span>
          </p>

          <p className="opening-blurb">{opening.body}</p>
        </div>

        {/* The plate. Keyed on the project so the wipe replays on every change,
            and the video is the only element that ever autoplays: it is muted,
            it is the work, and it pauses itself off-screen. */}
        <figure className="opening-plate">
          <div className="plate-frame">
            <div className="plate-media" key={active.title}>
              {active.media.kind === "video" ? (
                <GameClip
                  fill
                  src={active.media.src}
                  poster={active.media.poster}
                  alt={active.media.alt}
                  className="plate-clip"
                />
              ) : (
                <Image
                  src={active.media.src}
                  alt={active.media.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className={
                    active.media.fit === "contain"
                      ? "object-contain"
                      : "object-cover"
                  }
                  priority={i === 0}
                />
              )}
            </div>
          </div>

          <figcaption className="plate-caption">
            <p key={`${active.n}-line`}>{active.line}</p>
            <Link href={active.href} className="plate-enter">
              <span>{active.action}</span>
              <span aria-hidden>&rarr;</span>
            </Link>
          </figcaption>
        </figure>
      </div>

      <nav className="opening-index" aria-label="The work">
        <ol>
          {entrances.map((item, n) => (
            <li key={item.title} data-active={n === i || undefined}>
              <Link
                href={item.href}
                onPointerEnter={() => setI(n)}
                onFocus={() => setI(n)}
                onTouchStart={() => setI(n)}
              >
                <span className="idx-n u-meta">{item.n}</span>
                <strong className="idx-title">{item.title}</strong>
                <span className="idx-did">{item.did}</span>
                <span className="idx-result u-meta">{item.result}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
