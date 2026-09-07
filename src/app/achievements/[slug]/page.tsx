import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/chrome/Nav";
import Blocks from "@/components/ui/Blocks";
import { achievementBySlug, achievementPages } from "@/content/achievements";
import { projectBySlug } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return achievementPages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = achievementBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.title}: ${a.result}`,
    description: a.summary,
    alternates: { canonical: `${site.url}/achievements/${a.slug}` },
  };
}

/* ===========================================================================
 * A result on its own does not say what happened. These two pages are the
 * "what happened", and they stay in the building's own monochrome rather than
 * borrowing the project's world: the competition is not the software.
 * ======================================================================== */
export default async function AchievementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = achievementBySlug(slug);
  if (!a || a.tier !== "A" || !a.sections) notFound();

  const project = a.project ? projectBySlug(a.project) : undefined;

  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          <div className="border-rule flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b py-4">
            <Link
              href="/achievements"
              className="u-meta text-ink-3 hover:text-ink transition-colors"
            >
              ← Receipts
            </Link>
            <span className="u-meta text-ink-3 ml-auto tabular-nums">
              {a.n} / {a.year}
            </span>
          </div>

          <header className="py-14 sm:py-20">
            <p className="u-meta text-ink-3">{a.title}</p>
            <h1 className="u-display mt-4 max-w-[18ch] text-[clamp(2.4rem,7.5vw,6rem)]">
              {a.lede}
            </h1>
            <p className="mt-8 font-mono text-[clamp(1.125rem,2.4vw,1.75rem)] tracking-[-0.02em]">
              {a.result}
              <span className="text-ink-3"> · {a.org}</span>
            </p>

            {a.facts ? (
              <dl className="border-rule bg-rule mt-10 grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3">
                {a.facts.map((f) => (
                  <div key={f.label} className="bg-ground px-4 py-3.5">
                    <dt className="u-meta text-ink-3">{f.label}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-snug">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </header>

          {a.sections.map((section) => (
            <section
              key={section.n}
              id={`s${section.n}`}
              aria-labelledby={`s${section.n}-h`}
              className={
                section.breath
                  ? "border-rule scroll-mt-20 border-t py-24 sm:py-36"
                  : "border-rule scroll-mt-20 border-t py-14 sm:py-20"
              }
            >
              {section.breath ? (
                <div className="mx-auto max-w-[38rem] text-center">
                  <h2
                    id={`s${section.n}-h`}
                    className="u-display text-[clamp(1.9rem,5vw,3.5rem)]"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-10 [&_p]:mx-auto [&_p]:text-center">
                    <Blocks blocks={section.blocks} />
                  </div>
                </div>
              ) : (
                <div className="grid gap-x-14 gap-y-4 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="flex items-baseline gap-4 lg:block">
                      <span className="u-meta text-ink-3 tabular-nums">
                        {section.n}
                      </span>
                      <h2
                        id={`s${section.n}-h`}
                        className="u-display text-[clamp(1.5rem,3vw,2.125rem)] lg:mt-3"
                      >
                        {section.heading}
                      </h2>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <Blocks blocks={section.blocks} />
                  </div>
                </div>
              )}
            </section>
          ))}

          {project ? (
            <nav
              aria-label="Related project"
              className="border-rule border-t py-10 sm:py-14"
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <span className="u-meta text-ink-3">The project</span>
                <span className="mt-3 flex items-baseline gap-4 sm:gap-6">
                  <span className="u-meta text-ink-3 tabular-nums">
                    {project.n}
                  </span>
                  <span className="u-display group-hover:text-ink-2 text-[clamp(1.75rem,5vw,3.5rem)] transition-colors">
                    {project.title}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-3 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </nav>
          ) : null}
        </div>
      </main>
    </>
  );
}
