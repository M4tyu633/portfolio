import Image from "next/image";

/* Photos from the Enactus Philippines National Competition, 10 October 2026. */
export default function AwardPhotos() {
  return (
    <section className="award-photos" aria-labelledby="award-photos-title">
      <div className="award-photos-head">
        <p className="u-meta text-accent">Grand Champion · ₱200,000 prize</p>
        <h2 id="award-photos-title">
          Khan Academy Education Impact Challenge 2026
        </h2>
        <p>
          Enactus Philippines National Competition and Innovation Summit, 10
          October 2026.
        </p>
      </div>
      <div className="award-photos-grid">
        <figure className="is-main">
          <Image
            src="/work/khanpanion/award-cheque.webp"
            alt="The Khanpanion team on stage holding the ₱200,000 Khan Academy Education Impact Challenge cheque."
            width={1600}
            height={1200}
            sizes="(min-width: 900px) 60vw, 100vw"
          />
        </figure>
        <figure>
          <Image
            src="/work/khanpanion/award-trophy.webp"
            alt="The team with the Grand Champion trophy at the Enactus Philippines National Competition."
            width={1200}
            height={1600}
            sizes="(min-width: 900px) 25vw, 50vw"
          />
        </figure>
        <figure>
          <Image
            src="/work/khanpanion/award-stage.webp"
            alt="The team on the Enactus Philippines National Competition stage."
            width={1600}
            height={1200}
            sizes="(min-width: 900px) 25vw, 50vw"
          />
        </figure>
      </div>
    </section>
  );
}
