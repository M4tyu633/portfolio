import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { lab, labEntries } from "@/content/about";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experiments, tools and pieces of larger projects that make more sense when they're running. A CHIP-8 emulator, a physics range, an agent topology.",
};

/* Each row says what you can DO with the thing, because that is the only reason
 * any of them is here. Nothing was invented to fill the page: every entry is
 * either a running build or a figure that already exists inside a case study. */
export default function LabPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          <header className="grid gap-x-16 gap-y-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="u-display text-[clamp(2.4rem,7vw,6rem)]">
              {lab.title}
            </h1>
            <p className="u-prose">{lab.standfirst}</p>
          </header>

          <ol className="border-rule border-t">
            {labEntries.map((e) => (
              <li key={e.n} className="border-rule border-b">
                <Link
                  href={e.href}
                  className="group hover:bg-ground-2 block py-6 transition-colors"
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,20rem)] sm:gap-x-8">
                    <span className="u-meta text-ink-3 tabular-nums">{e.n}</span>
                    <div>
                      <h2 className="u-display text-[clamp(1.3rem,2.8vw,2rem)]">
                        {e.title}
                      </h2>
                      <p className="text-ink-2 mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed">
                        {e.blurb}
                      </p>
                    </div>
                    <div className="col-start-2 sm:col-start-3">
                      <span className="u-meta text-ink-3">
                        {STATUS[e.status]}
                      </span>
                      <p className="text-ink mt-2 text-[0.9375rem] leading-relaxed">
                        {e.affordance}
                      </p>
                      <span
                        aria-hidden
                        className="text-ink-3 mt-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}

const STATUS: Record<string, string> = {
  live: "Runs here",
  embedded: "Inside a case study",
  diagram: "Inside a case study",
};
