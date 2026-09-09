import Image from "next/image";

/* Laid out with `@container` queries so it responds to its own width rather
 * than the window's, which is what makes it survive browser zoom.
 *
 * ⚠ The container size lives on `.evidence-frame`, not on
 * `.evidence-composition`. An element cannot query itself: `container-type` on
 * the composition lets its children query it and does nothing for its own
 * `grid-template-columns`, which silently kept the one-column fallback while
 * the children moved into wide-layout positions, putting the plaque across the
 * middle of the stage photograph. */
export default function Evidence() {
  return (
    <div className="evidence-frame">
      <div className="evidence-composition">
        <figure className="evidence-event">
          <Image
            src="/work/tumbang/team-stage.webp"
            alt="BH Studios holding their certificates on stage at the Gear Up NCR awarding ceremony."
            width={1600}
            height={1067}
            sizes="(min-width: 900px) 62vw, 100vw"
          />
          <figcaption>Gear Up NCR · Valenzuela City · 8 August 2026</figcaption>
        </figure>
        <figure className="evidence-award">
          <Image
            src="/work/tumbang/trophies.webp"
            alt="The first-place plaque and certificates of recognition awarded to BH Studios."
            width={1600}
            height={2134}
            sizes="(min-width: 900px) 28vw, 50vw"
          />
          <figcaption>
            The first-place plaque and the team certificates.
          </figcaption>
        </figure>
        <p className="evidence-result">
          <span>01 / Gear Up NCR</span>
          <strong>
            First
            <br />
            place.
          </strong>
          <span>BH Studios · 2026</span>
        </p>
      </div>
    </div>
  );
}
