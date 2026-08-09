import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chip8Embed from "@/components/Chip8Embed";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  IconDownload,
  IconExternal,
  IconFilm,
  IconPlay,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { projects, site } from "@/content/data";

/* Only projects with a `caseStudy` in data.ts get a page. Anything else 404s,
 * which is also why Projects.tsx only links the ones that have one. */
const studies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return studies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = studies.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} · ${site.title}`;
  const description = project.caseStudy!.intro;
  const url = `${site.url}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = studies.find((p) => p.slug === slug);
  if (!project) notFound();

  const study = project.caseStudy!;
  const { demo, download, trailer, gameplay, more } = project.links ?? {};
  const links = [
    { href: demo, label: "Live demo", icon: <IconExternal /> },
    { href: download, label: "Download the game", icon: <IconDownload /> },
    { href: trailer, label: "Trailer", icon: <IconPlay /> },
    { href: gameplay, label: "Gameplay", icon: <IconFilm /> },
    { href: more, label: "Read more", icon: <IconExternal /> },
  ].flatMap(({ href, ...rest }) => (href ? [{ href, ...rest }] : []));

  return (
    <>
      <Header />
      <main className="flex-1 px-5 pt-32 pb-24 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/#projects"
              className="text-muted hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
            >
              <span aria-hidden>&larr;</span> All projects
            </Link>

            <p className="text-accent mt-8 mb-3 text-xs font-medium tracking-[0.2em] uppercase">
              More info · {project.year}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {project.title}
            </h1>

            {project.award && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                {project.award}
              </p>
            )}

            <p className="text-muted mt-6 text-base leading-relaxed sm:text-lg">
              {study.intro}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-border text-muted rounded-full border px-3 py-1 text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                {links.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-accent inline-flex items-center gap-2 transition-colors"
                  >
                    <span className="h-4 w-4">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          {study.embed === "chip8" ? (
            <Reveal className="mt-12">
              <Chip8Embed />
            </Reveal>
          ) : (
            <Reveal className="mt-12">
              <div
                className={`border-border relative aspect-16/10 overflow-hidden rounded-2xl border ${
                  project.fit === "contain" ? "bg-surface p-6" : "bg-background"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className={
                    project.fit === "contain"
                      ? "object-contain"
                      : "object-cover"
                  }
                  priority
                />
              </div>
            </Reveal>
          )}

          {study.facts.length > 0 && (
            <Reveal className="mt-12">
              <dl className="border-border bg-surface/40 grid gap-x-8 gap-y-4 rounded-2xl border p-6 sm:grid-cols-2 sm:p-8">
                {study.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-muted text-xs tracking-[0.14em] uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          <div className="mt-14 space-y-12">
            {study.sections.map((section) => (
              <Reveal as="section" key={section.heading}>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-muted text-sm leading-relaxed sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="border-border mt-16 border-t pt-8">
            <Link
              href="/#projects"
              className="text-muted hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
            >
              <span aria-hidden>&larr;</span> Back to all projects
            </Link>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
