import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { daruma, franklin } from "@/app/fonts";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import Blocks from "@/components/ui/Blocks";
import ProjectHero from "@/components/work/ProjectHero";
import { achievementBySlug } from "@/content/achievements";
import { projectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";
import type { DisplayId, Project } from "@/content/types";

/* ⚠ Projects with a BESPOKE route are excluded here. A flagship world cannot be
 * laid out by the same component that lays out every other project, so it gets
 * its own static segment under `/work/<slug>/` and that segment wins over this
 * dynamic one. Listing it here as well would prerender two pages for one path.
 *
 * Everything else still uses this shell, which is the right answer for a
 * project whose case study is prose and figures rather than a world. */
const BESPOKE = new Set(["tumbang-preso"]);

export function generateStaticParams() {
  return projects
    .filter((p) => !BESPOKE.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: `${site.url}/work/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${site.name}`,
      description: project.oneLiner,
      url: `${site.url}/work/${project.slug}`,
      type: "article",
    },
  };
}

/** The page's one display family, applied at the root. Two of the six projects
 *  deliberately have none: they are instruments, drawn in the utility face. */
function displayClass(display: DisplayId) {
  if (display === "daruma") return daruma.variable;
  if (display === "franklin") return franklin.variable;
  return "";
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const related = project.related?.map(achievementBySlug).filter(Boolean) ?? [];

  return (
    <div
      data-world={project.world}
      data-display={project.display}
      className={`${displayClass(project.display)} bg-ground text-ink`}
    >
      <WorldSync world={project.world} />
      <Nav tick={{ n: project.n, title: project.title }} />

      <main id="main" className="flex-1">
        <ProjectHero project={project} />

        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          {project.sections.map((section) => (
            <section
              key={section.n}
              id={`s${section.n}`}
              aria-labelledby={`s${section.n}-h`}
              className={
                section.breath
                  ? "border-rule scroll-mt-20 border-t py-24 sm:py-40"
                  : "border-rule scroll-mt-20 border-t py-14 sm:py-20"
              }
            >
              {section.breath ? (
                /* ---------------------------------------------------------
                 * The rhythm break. One section per case study at most, and
                 * only when the content earns it: no figure, no ledger, no
                 * column beside it, and a great deal of air. On this site it
                 * is the flood.
                 * ------------------------------------------------------- */
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
                      <span className="u-meta text-accent tabular-nums">
                        {section.n}
                      </span>
                      <h2
                        id={`s${section.n}-h`}
                        className="u-display mt-0 text-[clamp(1.5rem,3vw,2.125rem)] lg:mt-3"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    {section.standfirst ? (
                      <p className="text-ink-3 mt-3 hidden text-[0.875rem] leading-relaxed lg:block">
                        {section.standfirst}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    {section.standfirst ? (
                      <p className="text-ink-3 text-[0.9375rem] leading-relaxed lg:hidden">
                        {section.standfirst}
                      </p>
                    ) : null}
                    <Blocks blocks={section.blocks} />
                  </div>
                </div>
              )}
            </section>
          ))}

          <Colophon project={project} related={related} />

          <nav
            aria-label="Next project"
            className="border-rule border-t py-10 sm:py-14"
          >
            <Link href={`/work/${next.slug}`} className="group block">
              <span className="u-meta text-ink-3">Next in the archive</span>
              <span className="mt-3 flex items-baseline gap-4 sm:gap-6">
                <span className="u-meta text-ink-3 tabular-nums">{next.n}</span>
                <span className="u-display group-hover:text-ink-2 text-[clamp(1.75rem,5vw,3.5rem)] transition-colors">
                  {next.title}
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
        </div>
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * The colophon. Technologies live HERE, once, as metadata at the end, rather
 * than as seventeen capsules wrapped around the project at the top.
 * ------------------------------------------------------------------------ */
function Colophon({
  project,
  related,
}: {
  project: Project;
  related: (ReturnType<typeof achievementBySlug> | undefined)[];
}) {
  const links = Object.entries(project.links ?? {}).filter(([, v]) => v);

  return (
    <section
      aria-labelledby="colophon"
      className="border-rule grid gap-x-14 gap-y-8 border-t py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)]"
    >
      <h2 id="colophon" className="u-meta text-ink-3">
        Colophon
      </h2>

      <div>
        <div className="u-meta text-ink-3">Built with</div>
        <p className="mt-2 font-mono text-[0.875rem] leading-relaxed">
          {project.built.join(" · ")}
        </p>
      </div>

      <div className="space-y-5">
        {links.length ? (
          <div>
            <div className="u-meta text-ink-3">Go and look</div>
            <ul className="mt-2 space-y-1.5">
              {links.map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-ink hover:bg-ink hover:text-ground border-b pb-0.5 text-[0.9375rem] transition-colors"
                  >
                    {LINK_LABELS[key] ?? key}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {related.length ? (
          <div>
            <div className="u-meta text-ink-3">Related</div>
            <ul className="mt-2 space-y-1.5">
              {related.map((a) =>
                a ? (
                  <li key={a.slug}>
                    <Link
                      href={`/achievements/${a.slug}`}
                      className="border-ink hover:bg-ink hover:text-ground border-b pb-0.5 text-[0.9375rem] transition-colors"
                    >
                      {a.title}: {a.result}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

const LINK_LABELS: Record<string, string> = {
  demo: "Live demo",
  download: "Download the build",
  trailer: "Trailer",
  gameplay: "Gameplay footage",
};
