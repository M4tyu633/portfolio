import Image from "next/image";
import Link from "next/link";
import Boot from "@/components/chrome/Boot";
import Nav from "@/components/chrome/Nav";
import { WorldScrollSync } from "@/components/chrome/WorldSync";
import Evidence from "@/components/home/Evidence";
import Opening from "@/components/home/Opening";
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
      {/* Once per tab, 1.6s, skippable by anything. See the component. */}
      <Boot />
      <Nav />
      <WorldScrollSync />
      <main id="main" className="flex-1">
        <Opening />

        <TumbangWorld project={tumbang} />
        <EgovWorld project={egov} />
        <GlycoWorld project={glyco} />
        <Chip8World project={chip} />

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
                {headline.map((a) => (
                  <li key={a.slug}>
                    <span className="u-meta text-ink-3 tabular-nums">
                      {a.n}
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
