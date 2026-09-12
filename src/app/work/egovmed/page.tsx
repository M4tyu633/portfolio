import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import PhotoStrip from "@/components/media/PhotoStrip";
import PatientSystem from "@/components/work/PatientSystem";
import { projectLinks } from "@/components/work/ProjectLinkRail";
import { egovmed } from "@/content/projects/egovmed";
import { patientStages } from "@/content/worlds";
export const metadata: Metadata = {
  title: "eGovMed",
  description: egovmed.oneLiner,
  alternates: { canonical: "/work/egovmed" },
};
export default function EgovPage() {
  return (
    <div
      data-world="egov"
      data-display="plex"
      className="egov-page bg-ground text-ink"
    >
      <WorldSync world="egov" />
      <Nav tick={{ n: "02", title: "eGovMed" }} />
      <main id="main">
        <header className="egov-header">
          <Link href="/work">← All work</Link>
          <p>Civic software / BH Studios / 2026</p>
          <h1>
            Before
            <br />
            <span>the queue.</span>
          </h1>
          <div>
            <p>eGovMed</p>
            <p>
              A patient visit across eight government integrations. I built
              across the stack, owned the adapters, and delivered the pitch.
            </p>
          </div>
        </header>
        <section className="demo-preview" aria-labelledby="egov-demo-title">
          <div className="demo-preview-copy">
            <p className="u-meta">Interactive demo</p>
            <h2 id="egov-demo-title">Take a visit from start to finish.</h2>
            <p>
              The original patient interface, now with a complete local
              walkthrough. Try symptom intake, identity verification, booking
              and payment.
            </p>
            <a className="world-button" href="/demos/egovmed/index.html">
              Try the patient demo ↗
            </a>
            <p className="demo-notice">
              Demo only. The hackathon APIs have expired. All patients, identity
              checks, bookings and payments in this walkthrough are simulated.
            </p>
          </div>
          <div className="demo-phone-strip">
            {[
              {
                file: "demo-home",
                label: "01 / Start a visit",
                alt: "Actual eGovMed demo home showing the patient navigation and visit action.",
              },
              {
                file: "demo-booking",
                label: "02 / Visit booked",
                alt: "The original booking confirmation screen with a clearly labeled demo visit.",
              },
              {
                file: "demo-payment",
                label: "03 / Payment complete",
                alt: "The original payment receipt screen showing a simulated completed payment.",
              },
            ].map((p) => (
              <figure key={p.file}>
                <Image
                  src={`/work/egovmed/${p.file}.webp`}
                  alt={p.alt}
                  width={366}
                  height={745}
                  sizes="(max-width:700px) 52vw, 20vw"
                />
                <figcaption>{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <PatientSystem />
        <section className="egov-principle" id="s02">
          <span>
            Eight integrations.
            <br />
            Two modes each.
          </span>
          <div>
            <h2>
              The demo can run offline.
              <br />
              Production must know better.
            </h2>
            <p>
              Mock and live paths are selected per service. The production gate
              refuses missing credentials or forbidden mocks, rather than
              quietly serving a demonstration as a working integration.
            </p>
            <p>
              The same discipline applies to the data: clinical records stay
              off-chain. The chain anchors a fingerprint. Estimated benefits in
              the demo are labelled as estimates, not payer determinations.
            </p>
          </div>
        </section>

        {/* ⚠ THE SAME SIX OUTCOMES, WITHOUT THE CLICKING. The walkthrough above
         * is better if you use it, but a reader with ninety seconds will not,
         * and the failure boundaries are the most persuasive thing on this
         * page. They are printed here as a flat sheet so they are legible at a
         * glance, and so nothing about this project's engineering is only
         * reachable through an interaction. */}
        <section className="egov-boundaries" aria-labelledby="boundaries">
          <div className="egov-boundaries-head">
            <h2 id="boundaries">Six ways to break the visit.</h2>
            <p>
              Every one of these was decided before the happy path was made to
              look good. The right column is what still works after the left
              column happens.
            </p>
          </div>
          <ol data-seq="rows">
            {patientStages.map((s) => (
              <li key={s.name}>
                <span className="u-meta eb-stage">{s.name}</span>
                <span className="eb-fail">{s.failure}</span>
                <span className="eb-out">{s.outcome}</span>
                <code>{s.path}</code>
              </li>
            ))}
          </ol>
        </section>
        {/* ⚠ HIS OWN PHOTOGRAPHS, FROM THE EVENT. The page argued the whole
            way down from source and architecture and then ended on a sentence
            claiming a result. These are the room it happened in: the ten
            medals, the pitch, and the people who were there. */}
        <section aria-labelledby="egov-room" className="egov-photos">
          <h2 id="egov-room" className="u-meta">
            The room it happened in
          </h2>
          <PhotoStrip
            label="eGovPH Hackathon 2026"
            photos={[
              {
                src: "/work/egovmed/medals.webp",
                alt: "Ten eGovPH Hackathon 2026 medals held up in a circle by the finalists.",
                caption: "Ten teams. Ten medals.",
              },
              {
                src: "/work/egovmed/pitch.webp",
                alt: "Matthew presenting eGovMed on stage at the eGovPH Hackathon.",
                caption: "The pitch, in front of the wall.",
              },
              {
                src: "/work/egovmed/team.webp",
                alt: "The eGovMed team and other finalists at the eGovPH Hackathon venue.",
                caption: "The people who were in the room.",
              },
            ]}
          />
        </section>
        <section className="world-ending">
          <div>
            <p>eGov Hackathon PH 2026</p>
            <h2>One of ten winning teams.</h2>
            <p>
              ₱100,000 prize. Philippine General Hospital is the pilot target,
              not a claimed deployment or endorsement.
            </p>
          </div>
          <nav aria-label="Continue from eGovMed">
            <Link href="/achievements/egov-hackathon">
              What happened at the event
            </Link>
            {projectLinks(egovmed).map((l) => (
              <a
                key={l.key}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            <Link href="/work/glycoswarm-ai">Next: GlycoSwarm AI</Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
