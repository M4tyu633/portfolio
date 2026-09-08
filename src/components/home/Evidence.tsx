import Image from "next/image";

export default function Evidence() {
  return (
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
        <figcaption>The plaque. The names. The result.</figcaption>
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
  );
}
