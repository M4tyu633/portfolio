import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import { projectLinks } from "@/components/work/ProjectLinkRail";
import SwarmSystem from "@/components/work/SwarmSystem";
import { glycoswarm } from "@/content/projects/glycoswarm";
export const metadata: Metadata = {
  title: "GlycoSwarm AI",
  description: glycoswarm.oneLiner,
  alternates: { canonical: "/work/glycoswarm-ai" },
};
export default function GlycoPage() {
  return (
    <div
      data-world="glyco"
      data-display="plex"
      className="glyco-page bg-ground text-ink"
    >
      <WorldSync world="glyco" />
      <Nav tick={{ n: "03", title: "GlycoSwarm AI" }} />
      <main id="main">
        <header className="glyco-header">
          <Link href="/work">← All work</Link>
          <p>GlycoSwarm AI / Team Snowfall / AMD Developer Hackathon</p>
          <h1>
            Don’t blend
            <br />
            <span>the evidence.</span>
          </h1>
          <p>
            Four specialists inspect different inputs before a synthesis agent
            brings them together. Follow one through the actual contracts.
          </p>
          <a className="world-button" href="#s01">
            Trace a specialist ↓
          </a>
          <div className="glyco-artifact">
            <Image
              src={glycoswarm.media.src}
              alt={glycoswarm.media.alt}
              fill
              sizes="(min-width: 900px) 60vw, 100vw"
              className="object-contain"
            />
          </div>
        </header>
        <SwarmSystem />
        <section className="glyco-serving">
          <h2>
            Compute is allowed to fail.
            <br />
            Evidence isn’t allowed to appear.
          </h2>
          <div>
            <p>
              The project source configures Gemma 4 26B on an AMD MI300X through
              Ollama, with Fireworks GLM 5.2 as a hosted fallback. If neither
              provider is reachable, the affected step reports itself
              unavailable.
            </p>
            <p>
              I led the graph, FastAPI service and Next.js front end, then
              delivered the demo and pitch for an international team. This is a
              hackathon screening prototype, not a validated clinical device.
            </p>
          </div>
        </section>
        <section className="world-ending">
          <div>
            <p>LangGraph → FastAPI → Next.js</p>
            <h2>Inspect the preserved system.</h2>
            <p>
              The original hackathon build used temporary AMD compute and hosted
              inference. Those services are offline. The public demo preserves
              source inputs and contracts with clearly labeled deterministic
              reconstructions; no live clinical inference runs.
            </p>
          </div>
          <nav aria-label="Continue from GlycoSwarm">
            {projectLinks(glycoswarm).map((l) => (
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
            <Link href="/work/chip-8-emulator">Next: inside the machine</Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
