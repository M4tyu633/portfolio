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

/* ===========================================================================
 * THE HOMEPAGE.
 *
 * Quiet, then four rooms, then quiet again. It is an index into the work rather
 * than the whole résumé: there is no skills section, no services grid and no
 * timeline here, because all three have real destinations now.
 * ======================================================================== */

const [tumbang, egov, glyco, chip] = featured;

export default function Home() {
  const headline = achievements.filter(
    (a) => a.tier === "A" || a.slug === "paref-southridge",
  );

  return (
    <>
      {/* ⚠ THERE IS NO BOOT SCREEN ANY MORE, AND THAT IS DELIBERATE.
       *
       * A full-screen card held a manifest over the page for 1.6 seconds once
       * per tab. That is long enough to be in the way and far too short to
       * read, so it cost every visitor a wait in exchange for nothing. The
       * cover's own resolve replaced it: the page arrives as a cloud of points
       * and becomes the work. The loading IS the opening.
       *
       * See `CoverField`. */}
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
        <WorldPassage n="→" title="Receipts" />

        {/* ---- the evidence ----
         *
         * ⚠ THIS USED TO BE A TABLE OF RESULTS AND IT READ AS A RÉSUMÉ. A
         * result is only believable if you can see the thing itself, so the
         * first place at Gear Up NCR is a photograph of the actual plaque and
         * the seven certificates that came with it, with his name on one of
         * them, and the list hangs off it as a caption. */}
        <section
          data-world="index"
          data-world-panel
          aria-labelledby="receipts-signal"
          className="bg-ground text-ink receipts"
        >
          <div className="receipts-grid">
            <Evidence />

            <div className="receipts-list" data-seq="rows">
              <h2 id="receipts-signal" className="u-display">
                Receipts.
              </h2>
              <p className="u-prose mt-5">
                Competitions, rankings, scholarships, and the work behind them.
              </p>

              <ol>
                {/* ⚠ NUMBERED BY POSITION IN THIS LIST, NOT BY `a.n`. Each
                    achievement carries its own number in the full archive, so
                    printing it here gave a homepage list that counted 01, 02,
                    10: correct in the archive, nonsense in a list of three. */}
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

        {/* ---- the person ---- */}
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
            <figcaption className="person-caption">
              Computer science. A habit of asking one more question.
            </figcaption>
          </figure>
          <div className="person-copy">
            <p className="u-meta person-label">
              Matthew Labrador / Manila, Philippines
            </p>
            <h2 id="person-signal" className="u-display">
              {about.heading}
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
