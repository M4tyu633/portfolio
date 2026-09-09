import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { WorldScrollSync } from "@/components/chrome/WorldSync";
import Evidence from "@/components/home/Evidence";
import Opening from "@/components/home/Opening";
import WorldPassage from "@/components/home/WorldPassage";
import { KneeWorld, CardioWorld } from "@/components/home/ClinicalWorlds";
import { kneeMri } from "@/content/projects/knee-mri";
import { heartDisease } from "@/content/projects/heart-disease";
import {
  Chip8World,
  EgovWorld,
  GlycoWorld,
  TumbangWorld,
} from "@/components/home/Worlds";
import { achievements } from "@/content/achievements";
import { about } from "@/content/about";
import { featured } from "@/content/projects";

/* The homepage: an index into the work, then the results, then the person.
 * There is no skills section, no services grid and no timeline here, because
 * all three have real destinations. */

const [tumbang, egov, glyco, chip] = featured;

export default function Home() {
  const headline = achievements.filter(
    (a) => a.tier === "A" || a.slug === "paref-southridge",
  );

  return (
    <>
      <Nav />
      <WorldScrollSync />
      <main id="main" className="flex-1">
        <Opening />

        <WorldPassage n="01" title="Tumbang Preso" />
        <TumbangWorld project={tumbang} />
        <WorldPassage n="02" title="eGovMed" />
        <EgovWorld project={egov} />
        <WorldPassage n="03" title="GlycoSwarm" />
        <GlycoWorld project={glyco} />
        <WorldPassage n="04" title="CHIP-8" />
        <Chip8World project={chip} />
        <WorldPassage n="05" title="Knee MRI Reader" />
        <KneeWorld project={kneeMri} />
        <WorldPassage n="06" title="CardioSense" />
        <CardioWorld project={heartDisease} />
        <WorldPassage n="→" title="Achievements" />

        {/* ⚠ A table of results read as a résumé. A result is only believable if
            you can see the thing itself, so the first place at Gear Up NCR is a
            photograph of the actual plaque and the certificates that came with
            it, and the list hangs off it. */}
        <section
          data-world="index"
          data-world-panel
          aria-labelledby="receipts-signal"
          className="bg-ground text-ink receipts"
        >
          <div className="receipts-grid">
            <Evidence />

            <div className="receipts-list" data-seq="rows">
              <p className="u-meta text-ink-3">Achievements</p>
              <h2 id="receipts-signal" className="u-display">
                Receipts.
              </h2>
              <p className="u-prose mt-5">
                Competitions, rankings, scholarships, and the work behind them.
              </p>

              <ol>
                {/* ⚠ Numbered by position in this list, not by `a.n`. Each
                    achievement carries its own number in the full archive, so
                    printing it here gave a homepage list that counted 01, 02,
                    10. */}
                {headline.map((a, index) => (
                  <li key={a.slug}>
                    <span className="u-meta text-ink-3 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="receipts-title">{a.title}</span>
                    <span className="receipts-result">{a.result}</span>
                    <span className="u-meta text-ink-3 receipts-org">
                      {a.org} &middot; {a.year}
                    </span>
                  </li>
                ))}
              </ol>

              <Link href="/achievements" className="room-exit">
                <span>The whole archive</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        <section
          data-world="index"
          data-world-panel
          aria-labelledby="person-signal"
          className="bg-ground text-ink person"
        >
          <figure className="person-portrait">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={900}
              height={1200}
              sizes="(min-width: 900px) 30vw, 60vw"
            />
          </figure>
          <div className="person-copy">
            <p className="u-meta person-label">
              Matthew Labrador / Manila, Philippines
            </p>
            <h2 id="person-signal" className="u-display">
              I&rsquo;m a computer science student at UP Manila.
            </h2>
            <p className="u-prose mt-6">{about.paragraphs[0]}</p>
            <Link href="/about" className="room-exit">
              <span>About</span>
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
