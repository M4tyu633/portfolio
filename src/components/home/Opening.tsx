"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CoverField from "@/components/home/CoverField";
import { opening } from "@/content/site";
import { entrances } from "@/content/worlds";
import { useSound } from "@/lib/sound";

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
  const { play } = useSound();
  const active = entrances[i];

  /* ⚠ WRAPPING, NOT CLAMPED, AND NO DISABLED STATE. Four entries in a ring is
   * a carousel of scenes, not a form wizard; a greyed-out arrow at either end
   * makes a reader think they have reached something. Modulo also means the
   * two controls are never a dead target, which is the difference between a
   * pager you press twice and one you press once and give up on. */
  const step = (d: number) =>
    setI((n) => (n + d + entrances.length) % entrances.length);

  /* The cover runs edge to edge, so it needs a landscape frame. Most projects
     have one already; the ones whose own picture is a tall phone screenshot
     name a different image for this and keep theirs everywhere else. */
  const coverSrc =
    active.cover ??
    (active.media.kind === "video" ? active.media.poster : active.media.src);

  return (
    <section
      className="opening"
      data-project={active.world}
      data-display={active.display}
      aria-labelledby="opening-statement"
    >
      {/* ⚠ THE FIELD IS THE FIRST SCREEN, NOT A PANEL ON IT.
        *
        * It used to be a framed plate in the right-hand column, which made the
        * cover a two-up card: a sentence, and a picture of a project beside it.
        * Nothing about that said the site itself was built. The reconstruction
        * now runs edge to edge behind everything, so the first thing that
        * happens when the page opens is the whole screen deriving the work out
        * of a cloud of points, with the name and the sentence sitting in it.
        *
        * The photograph underneath is the fallback and the alt text. If WebGL2
        * is not available it simply stays, and the cover is a full-bleed
        * photograph with type on it, which is still a cover. */}
      <div className="opening-stage" data-project={active.world}>
        <div className="opening-plate-fallback" key={active.title}>
          <Image
            src={coverSrc}
            alt={active.media.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
          />
        </div>
        <CoverField src={coverSrc} token={active.title} />
        <div aria-hidden className="opening-scrim" />
      </div>

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
          {/* ⚠ THE PAGER EXISTS BECAUSE HOVER IS NOT A CONTROL.
            *
            * Selecting a project was a pointer-enter on the index at the foot
            * of the screen, which is invisible to anyone who does not happen to
            * move a mouse across it: a touch reader, a keyboard reader, and
            * anyone who simply looked at the plate and waited. The index still
            * works exactly as it did and still drives the same state. This adds
            * the obvious thing that was missing, which is a way to press NEXT.
            *
            * Buttons, not links: nothing here navigates. The counter is the
            * only place on the opening that says how many projects there are,
            * so it is `aria-live` and the caption is announced with it. */}
          <figcaption className="plate-caption">
            <p key={`${active.n}-line`}>{active.line}</p>

            <div className="plate-controls">
              <div className="plate-pager">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  onPointerEnter={() => play("hover")}
                  aria-label="Previous project"
                >
                  <span aria-hidden>&larr;</span>
                </button>
                <span className="plate-count tabular-nums" aria-live="polite">
                  {active.n}
                  <span aria-hidden> / </span>
                  <span className="plate-count-total">
                    {String(entrances.length).padStart(2, "0")}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  onPointerEnter={() => play("hover")}
                  aria-label="Next project"
                >
                  <span aria-hidden>&rarr;</span>
                </button>
              </div>

              <Link href={active.href} className="plate-enter">
                <span>{active.action}</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
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
