import type { Metadata } from "next";
import Evidence from "@/components/home/Evidence";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { achievements, receipts } from "@/content/achievements";
import type { Achievement } from "@/content/types";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Competitions, rankings, scholarships, and the work behind them. First place at Gear Up NCR, one of ten winners at the eGov Hackathon PH.",
};

/* ===========================================================================
 * RECEIPTS.
 *
 * A result sheet, not a trophy cabinet. Grouped by year, numbered down the
 * page, and the RESULT is the largest thing in every row because that is what
 * the page is for.
 *
 * Three tiers behave differently in the same list, which is the point: a
 * competition with a story gets a door, one with a paragraph opens in place,
 * and one with neither is a row and stays a row. Nothing here is padded out to
 * match its neighbours.
 * ======================================================================== */

export default function AchievementsPage() {
  const years = Array.from(new Set(achievements.map((a) => a.year)));

  return (
    <>
      <Nav />
      <main id="main" className="receipts-page flex-1">
        <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
          {/* ⚠ The nav says "Achievements" and this page is called "Receipts",
              so the kicker prints the nav's word above the display heading. A
              reader arriving from the bar should never have to wonder whether
              they landed on the page they pressed. */}
          <header
            className="grid gap-x-16 gap-y-6 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end"
            data-seq="rise"
          >
            <div>
              <p className="u-meta text-ink-3">Achievements</p>
              <h1 className="u-display mt-2 text-[clamp(3rem,10vw,8rem)]">
                {receipts.title}
              </h1>
            </div>
            <p className="u-prose text-ink-2">{receipts.standfirst}</p>
          </header>
        </div>

        {/* ⚠ THE PHOTOGRAPH COMES BEFORE THE LIST ON PURPOSE. A results page is
         * the easiest thing on a portfolio to disbelieve, and the cheapest way
         * to fix that is not a better typeface, it is the actual room: five
         * people on a stage in Valenzuela holding the certificates the rest of
         * this page is a transcript of. */}
        <Evidence />

        <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
          {years.map((year) => (
            <section key={year} aria-labelledby={`y${year}`} className="mb-12">
              <h2 id={`y${year}`} className="u-meta receipts-year tabular-nums">
                {year}
              </h2>
              <ol data-seq="rows" className="receipts-rows">
                {achievements
                  .filter((a) => a.year === year)
                  .map((a) => (
                    <Row key={a.slug} a={a} />
                  ))}
              </ol>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

function Row({ a }: { a: Achievement }) {
  const inner = (
    <div className="receipt-row">
      <span className="u-meta receipt-n tabular-nums">{a.n}</span>
      <span className="receipt-name">
        <span className="u-display">{a.title}</span>
        <span className="u-meta receipt-org">{a.org}</span>
        {a.context ? (
          <span className="receipt-context">{a.context}</span>
        ) : null}
      </span>
      <span className="receipt-result">{a.result}</span>
    </div>
  );

  if (a.tier === "A") {
    return (
      <li className="border-rule border-b">
        <Link
          href={`/achievements/${a.slug}`}
          className="group hover:bg-ground-2 block transition-colors"
        >
          {inner}
          <p className="text-ink-2 -mt-2 pb-5 text-[0.9375rem] leading-relaxed sm:max-w-[60ch] sm:pl-12">
            {a.summary}
            <span
              aria-hidden
              className="text-ink-3 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </Link>
      </li>
    );
  }

  if (a.tier === "B") {
    return (
      <li className="border-rule border-b">
        <details className="group">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            {inner}
            <span className="u-meta text-ink-3 -mt-2 block pb-5 sm:pl-12">
              <span className="group-open:hidden">More</span>
              <span className="hidden group-open:inline">Less</span>
            </span>
          </summary>
          <p className="text-ink-2 max-w-[62ch] pb-6 text-[0.9375rem] leading-relaxed sm:pl-12">
            {a.summary}
            {a.project ? (
              <>
                {" "}
                <Link
                  href={`/work/${a.project}`}
                  className="border-ink hover:bg-ink hover:text-ground border-b transition-colors"
                >
                  The project
                </Link>
              </>
            ) : null}
          </p>
        </details>
      </li>
    );
  }

  return <li className="border-rule border-b">{inner}</li>;
}
