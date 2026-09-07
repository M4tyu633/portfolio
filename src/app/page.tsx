import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { WorldScrollSync } from "@/components/chrome/WorldSync";
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
      <Nav />
      <WorldScrollSync />
      <main id="main" className="flex-1">
        <Opening />

        <TumbangWorld project={tumbang} />
        <EgovWorld project={egov} />
        <GlycoWorld project={glyco} />
        <Chip8World project={chip} />

        {/* ---- back to paper ---- */}
        <section
          data-world="index"
          data-world-panel
          aria-labelledby="receipts-signal"
          className="bg-ground text-ink"
        >
          <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <div>
                <h2
                  id="receipts-signal"
                  className="u-display text-[clamp(2rem,4.6vw,3.5rem)]"
                >
                  Receipts.
                </h2>
                <p className="u-prose mt-5">
                  Competitions, rankings, scholarships, and the work behind
                  them.
                </p>
                <Link
                  href="/achievements"
                  className="border-ink hover:bg-ink hover:text-ground mt-6 inline-block border-b-2 pb-0.5 text-[1.0625rem] transition-colors"
                >
                  The whole archive
                </Link>
              </div>

              <ul className="border-rule border-t">
                {headline.map((a) => (
                  <li
                    key={a.slug}
                    className="border-rule-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b py-4 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-x-6"
                  >
                    <span className="u-meta text-ink-3 tabular-nums">
                      {a.n}
                    </span>
                    <span className="text-[1.0625rem] tracking-[-0.01em]">
                      {a.title}
                      <span className="u-meta text-ink-3 mt-1 block tracking-[0.04em] normal-case">
                        {a.result} · {a.org}
                      </span>
                    </span>
                    <span className="u-meta text-ink-3 col-start-2 tabular-nums sm:col-start-3">
                      {a.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="u-rule my-16 sm:my-24" />

            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <h2 className="u-display text-[clamp(1.75rem,3.6vw,2.75rem)]">
                {about.heading}
              </h2>
              <div>
                <p className="u-prose">{about.paragraphs[1]}</p>
                <Link
                  href="/about"
                  className="border-ink hover:bg-ink hover:text-ground mt-6 inline-block border-b-2 pb-0.5 text-[1.0625rem] transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
