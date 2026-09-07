import Link from "next/link";
import { opening, stamp, worldIndex } from "@/content/site";

/* ===========================================================================
 * THE OPENING.
 *
 * One statement, on paper, with a great deal of nothing around it. The whole
 * first viewport holds a stamp line and a sentence, which is the Unseen Studio
 * principle borrowed on purpose: emptiness reads as confidence, and it is what
 * makes the first world takeover land instead of being the fourth animation in
 * a row.
 *
 * There is no gradient name, no availability pill, no three-role subtitle and
 * no pair of rounded buttons, and none of them are coming back.
 * ======================================================================== */

export default function Opening() {
  return (
    <section
      aria-labelledby="opening-statement"
      className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[88rem] flex-col px-5 sm:px-8"
    >
      <p className="u-meta text-ink-3 flex flex-wrap items-center gap-x-3 gap-y-1 pt-10 sm:pt-16">
        {stamp.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {s}
          </span>
        ))}
      </p>

      <div className="flex flex-1 flex-col justify-center py-16 sm:py-24">
        <h1
          id="opening-statement"
          className="u-display max-w-[16ch] text-[clamp(2.6rem,8.2vw,7.5rem)]"
        >
          {opening.statement}
        </h1>

        <div className="mt-10 grid gap-x-16 gap-y-6 sm:mt-14 lg:grid-cols-[minmax(0,34em)_minmax(0,1fr)]">
          <p className="u-prose">{opening.body}</p>
          <p className="u-display text-ink-3 self-end text-[clamp(1.1rem,2vw,1.5rem)] italic">
            {opening.coda}
          </p>
        </div>
      </div>

      {/* The index strip. Four rooms, numbered, and the numbers persist all the
          way through the archive and into each world's own chrome. */}
      <nav aria-label="Selected work" className="border-rule border-t pb-10">
        <ul>
          {worldIndex.map((w) => (
            <li key={w.n} className="border-rule-2 border-b last:border-0">
              <Link
                href={w.href}
                className="group flex items-baseline gap-4 py-3 sm:gap-6"
              >
                <span className="u-meta text-ink-3 tabular-nums">{w.n}</span>
                <span className="text-[1.0625rem] tracking-[-0.01em] sm:text-lg">
                  {w.title}
                </span>
                <span className="u-meta text-ink-3 ml-auto hidden normal-case tracking-[0.04em] sm:block">
                  {w.tag}
                </span>
                <span
                  aria-hidden
                  className="text-ink-3 transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
