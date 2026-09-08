import Image from "next/image";

export default function ContactEvidence() {
  return (
    <figure className="contact-evidence">
      <Image
        src="/work/tumbang/knockdown.webp"
        alt="A real frame from the Godot competition build, with the can knocked down on the street."
        width={1600}
        height={900}
        sizes="(min-width: 900px) 55vw, 100vw"
      />
      <figcaption>
        <p className="u-meta">Measured with a contact probe</p>
        <dl>
          {[
            ["36", "Expected"],
            ["20", "Observed"],
            ["16", "Missing"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <h3 className="u-display">Count the failure. Replace the check.</h3>
        <p>
          Collision callbacks missed 16 of 36 staged contacts. I replaced the
          critical check with host-authoritative distance logic, so every peer
          uses the same decision.
        </p>
        <small>
          Real game frame. Counts come from the probe, not this image.
        </small>
      </figcaption>
    </figure>
  );
}
