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
        <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
          <header className="grid gap-x-16 gap-y-6 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="u-display text-[clamp(2.4rem,6vw,5.25rem)]">
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
          <section aria-labelledby="tech-index" className="py-16 sm:py-20">
            <h2
              id="tech-index"
              className="u-display text-[clamp(1.6rem,3.2vw,2.5rem)]"
            >
              What it was built with
            </h2>
            <p className="u-prose mt-4">
              Shown through the work that proves it. Each row says where.
            </p>

            <dl className="tech-index mt-10">
              {technicalIndex.map((t) => (
                <div key={t.name}>
                  <dt>{t.name}</dt>
                  <dd>{t.where}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
    </>
  );
}
