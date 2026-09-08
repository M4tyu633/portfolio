"use client";

import Image from "next/image";
import { useState } from "react";

/* ===========================================================================
 * THE FREEZE FRAME.
 *
 * A real frame out of the shipped build, stopped on a contact, and then
 * annotated one layer at a time until it stops being a screenshot and becomes
 * the question the engine was actually asked.
 *
 * ⚠ EVERYTHING DRAWN ON TOP IS DRAWN, AND THE FIGURE SAYS SO. The photograph is
 * the game; the ring, the path and the crosshair are annotation. Nothing here
 * is presented as an engine overlay, and no number appears that is not one of
 * his: 36 contacts staged, 20 resolved by the area callbacks, 16 that never
 * fired. The geometry is positioned by eye on this frame to point at the right
 * objects, and it is not claimed to be the collider's true radius.
 *
 * The reader advances it. Auto-playing this would make it a cutscene, and the
 * whole point of the section is that somebody went and checked.
 * ======================================================================== */

const STEPS = [
  {
    kicker: "Frame 0",
    title: "A contact, in the shipped build.",
    body: "The lata is down inside the chalk ring and a tsinelas is still in the air. Somewhere between those two facts is a decision the game had to make.",
  },
  {
    kicker: "The objects",
    title: "One thrown thing, one thing worth hitting.",
    body: "A slipper leaves a player's hand at throw speed. The can has a contact radius around it. Everything about scoring, tagging and knockdown comes down to whether those two ever met.",
  },
  {
    kicker: "The question",
    title: "Is the slipper inside the radius on a physics tick?",
    body: "That is what an area-overlap callback answers, and it is what I built first. It is not the same question as: did the path the slipper travelled pass through the radius. At throw speed those two answers stop agreeing.",
  },
  {
    kicker: "The answer",
    title: "36 contacts staged. 20 fired.",
    body: "I wrote a probe that ran every contact case and counted what the engine actually reported. Sixteen never fired, and they did not scatter. They clustered by target, which is what a physics problem looks like when it is disguised as a balance problem.",
  },
];

export default function FreezeFigure() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <figure className="freeze" data-step={step}>
      <div className="freeze-frame">
        <Image
          src="/work/tumbang/knockdown.webp"
          alt="A frame from Tumbang Preso: the lata knocked over inside its chalk ring, the taya turning, and a slipper still in the air on the right of the street."
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 60vw, 100vw"
        />

        {/* One SVG in the frame's own coordinate space, so every mark stays on
            the object it points at at any width. */}
        <svg
          className="freeze-marks"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* the swept path */}
          <path
            className="fz-path"
            d="M1180 366 C 900 430, 620 560, 320 706"
            fill="none"
          />
          {/* the contact radius around the lata */}
          <ellipse className="fz-ring" cx="300" cy="722" rx="150" ry="86" />
          {/* the slipper */}
          <g className="fz-pin fz-pin-slipper">
            <circle cx="1180" cy="366" r="26" />
            <line x1="1180" y1="340" x2="1180" y2="250" />
          </g>
          {/* the lata */}
          <g className="fz-pin fz-pin-can">
            <circle cx="300" cy="722" r="26" />
            <line x1="300" y1="748" x2="300" y2="838" />
          </g>
        </svg>

        <span className="freeze-tag freeze-tag-slipper">Tsinelas</span>
        <span className="freeze-tag freeze-tag-can">Lata</span>
        <span className="freeze-tag freeze-tag-radius">Contact radius</span>

        <p className="freeze-verdict" aria-hidden={step < 3}>
          <span>20</span>
          <span>/ 36 resolved</span>
        </p>
      </div>

      <figcaption className="freeze-read">
        <p className="u-meta freeze-kicker">{s.kicker}</p>
        <h3 className="u-display freeze-title">{s.title}</h3>
        <p className="freeze-body" aria-live="polite">
          {s.body}
        </p>

        <div className="freeze-controls">
          <button
            type="button"
            onClick={() => setStep((n) => Math.max(0, n - 1))}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((n) => Math.min(STEPS.length - 1, n + 1))}
            disabled={step === STEPS.length - 1}
          >
            {step === 0 ? "Show me" : "Next"}
          </button>
          <span className="u-meta freeze-count tabular-nums">
            {step + 1} / {STEPS.length}
          </span>
        </div>

        <p className="freeze-note">
          The frame is the real build. The ring, the path and the pins are
          annotation drawn on top of it.
        </p>
      </figcaption>
    </figure>
  );
}
