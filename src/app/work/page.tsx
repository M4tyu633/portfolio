import type { Metadata } from "next";
import Nav from "@/components/chrome/Nav";
import Archive from "@/components/work/Archive";
import { projects } from "@/content/projects";
import { opening, technicalIndex } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The complete archive: games, civic systems, clinical machine learning and low-level experiments, with the measurements behind each one.",
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          <header className="grid gap-x-16 gap-y-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="u-display text-[clamp(2.4rem,6.4vw,5.5rem)]">
              {opening.short}
            </h1>
            <p className="u-prose">{opening.shortBody}</p>
          </header>

          <Archive projects={projects} />

          {/* ---------------------------------------------------------------
           * The technical index. Not forty pills in five groups: one row per
           * technology, and the row's whole content is where it was used. A
           * capability with no work under it does not appear.
           * ------------------------------------------------------------- */}
          <section aria-labelledby="tech-index" className="py-20 sm:py-28">
            <h2 id="tech-index" className="u-display text-[clamp(1.6rem,3.2vw,2.5rem)]">
              What it was built with
            </h2>
            <p className="u-prose mt-4">
              Shown through the work that proves it. Each row says where.
            </p>

            <dl className="border-rule mt-10 grid gap-x-14 border-t sm:grid-cols-2">
              {technicalIndex.map((t) => (
                <div
                  key={t.name}
                  className="border-rule-2 grid grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-x-6 border-b py-3.5"
                >
                  <dt className="font-mono text-[0.875rem]">{t.name}</dt>
                  <dd className="text-ink-2 text-[0.9375rem] leading-snug">
                    {t.where}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
    </>
  );
}
