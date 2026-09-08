import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
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
