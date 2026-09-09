import type { Metadata } from "next";
import { daruma } from "@/app/fonts";
import Nav from "@/components/chrome/Nav";
import Archive from "@/components/work/Archive";
import { projects } from "@/content/projects";
import { opening, technicalIndex } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The complete archive: games, civic systems, clinical machine learning and low-level experiments, with the measurements behind each one.",
};

/* ⚠ The game's face is loaded on this route on purpose. The archive's preview
 * plate takes the selected project's world, and when that world is Tumbang it
 * is set in Darumadrop, which needs the variable in scope. Without it the plate
 * falls back to the site's serif and the preview goes back to being a dark navy
 * card with a screenshot in it, which is one of the surfaces this pass exists
 * to fix. `contents` keeps the wrapper out of the layout entirely. */
export default function WorkPage() {
  return (
    <div className={`${daruma.variable} contents`}>
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
          <header className="grid gap-x-16 gap-y-6 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="u-display text-[clamp(2.4rem,6vw,5.25rem)]">Work</h1>
            <p className="u-prose text-ink-2">{opening.shortBody}</p>
          </header>

          <Archive projects={projects} />

          {/* One row per technology, and the row's whole content is where it
              was used. A capability with no work under it does not appear. */}
          <section aria-labelledby="tech-index" className="py-16 sm:py-20">
            <h2
              id="tech-index"
              className="u-display text-[clamp(1.6rem,3.2vw,2.5rem)]"
            >
              What it was built with
            </h2>
            <p className="u-prose text-ink-2 mt-4">
              Each row says where it was used. Nothing appears here without work
              under it.
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
    </div>
  );
}
