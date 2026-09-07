import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import PatientSystem from "@/components/work/PatientSystem";
import { egovmed } from "@/content/projects/egovmed";
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
              What happened at the event ↗
            </Link>
            <a
              href={egovmed.links?.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the actual product ↗
            </a>
            <Link href="/work/glycoswarm-ai">Next: GlycoSwarm AI →</Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
