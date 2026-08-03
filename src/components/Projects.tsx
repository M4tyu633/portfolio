"use client";

import Image from "next/image";
import { useState } from "react";
import { projectFilters, projects, type Project } from "@/content/data";
import { IconExternal, IconFilm, IconPlay } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ALL = "All";

/* Derived from static data, so it's computed once at module load rather than
 * memoised per render. */
const TAGS = (() => {
  const used = new Set(projects.flatMap((p) => p.tags));

  // Curated list from data.ts, minus anything that no longer matches a
  // project — a filter that always returns nothing is worse than no filter.
  const curated = projectFilters.filter((t) => used.has(t));
  if (curated.length > 0) return [ALL, ...curated];

  // Fallback: tags that appear on more than one project.
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [
    ALL,
    ...[...counts.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t),
  ];
})();

export default function Projects() {
  const [filter, setFilter] = useState(ALL);

  const tags = TAGS;
  const shown =
    filter === ALL ? projects : projects.filter((p) => p.tags.includes(filter));

  // The alternating big-row layout only makes sense on the unfiltered list.
  const featured = filter === ALL ? shown.filter((p) => p.featured) : [];
  const rest = filter === ALL ? shown.filter((p) => !p.featured) : shown;

  return (
    <section id="projects" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          sub="Hackathon builds, coursework that got out of hand, and one game about a tin can."
        />

        {tags.length > 1 && (
          <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                aria-pressed={filter === tag}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  filter === tag
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </Reveal>
        )}

        {featured.length > 0 && (
          <div className="mt-10 space-y-8">
            {featured.map((project, i) => (
              <FeaturedCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
              featured.length > 0 ? "mt-8" : "mt-10"
            }`}
          >
            {rest.map((project, i) => (
              // key includes the filter so cards re-run their reveal on change
              <SmallCard
                key={`${filter}-${project.title}`}
                project={project}
                index={i}
              />
            ))}
          </div>
        )}

        {shown.length === 0 && (
          <p className="text-muted mt-10 text-center">
            Nothing tagged “{filter}” yet.
          </p>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const contain = project.fit === "contain";

  return (
    <Reveal as="article">
      <div className="group border-border bg-surface/40 hover:border-accent/40 grid overflow-hidden rounded-3xl border transition-colors lg:grid-cols-2">
        {/* Fixed 16:10 and vertically centred, rather than stretching to match
            the text column. Letting it stretch meant the crop depended on how
            long the blurb was: GlycoSwarm's long description made its column
            tall enough to cut ~14% off the sides of a dashboard screenshot.
            The project screenshots are all 16:10, so at this aspect they fill
            the frame exactly, with nothing cropped and no letterboxing. */}
        <div
          className={`relative aspect-16/10 self-center overflow-hidden ${
            flip ? "lg:order-last" : ""
          } ${contain ? "bg-surface p-6 sm:p-8" : "bg-background"}`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`transition-transform duration-500 group-hover:scale-105 ${
              contain ? "object-contain" : "object-cover"
            }`}
          />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-accent text-xs font-medium tracking-[0.18em] uppercase">
              Featured
            </span>
            <span className="text-muted text-xs">{project.year}</span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h3>

          {project.award && <AwardRibbon award={project.award} />}

          <p className="text-muted mt-4 text-sm leading-relaxed sm:text-base">
            {project.blurb}
          </p>

          <TagRow tags={project.tags} />
          <LinkRow project={project} />
        </div>
      </div>
    </Reveal>
  );
}

function SmallCard({ project, index }: { project: Project; index: number }) {
  const contain = project.fit === "contain";

  return (
    <Reveal as="article" delay={index * 70}>
      <div className="group border-border bg-surface/40 hover:border-accent/50 flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1">
        <div
          className={`relative aspect-16/10 overflow-hidden ${
            contain ? "bg-surface p-4" : "bg-background"
          }`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`transition-transform duration-500 group-hover:scale-105 ${
              contain ? "object-contain" : "object-cover"
            }`}
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <span className="text-muted shrink-0 text-xs">{project.year}</span>
          </div>

          {project.award && <AwardRibbon award={project.award} />}

          <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">
            {project.blurb}
          </p>

          <TagRow tags={project.tags} />
          <LinkRow project={project} />
        </div>
      </div>
    </Reveal>
  );
}

/* Gold rather than the site accent — an award should not read as just another
 * label, and amber clears 4.5:1 on both the light and dark surfaces. */
function AwardRibbon({ award }: { award: string }) {
  return (
    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
      {award}
    </p>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border-border text-muted rounded-full border px-3 py-1 text-xs"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/* Ordered deliberately: the thing you can actually click into first, then the
 * things you can only watch. Anything without a URL drops out. */
function LinkRow({ project }: { project: Project }) {
  const { demo, trailer, gameplay, more } = project.links ?? {};

  // flatMap rather than filter: it narrows `href` to a string for free, where
  // a filter would need a type predicate to do the same.
  const links = [
    { href: demo, label: "Live demo", icon: <IconExternal /> },
    { href: trailer, label: "Trailer", icon: <IconPlay /> },
    { href: gameplay, label: "Gameplay", icon: <IconFilm /> },
    { href: more, label: "Read more", icon: <IconExternal /> },
  ].flatMap(({ href, ...rest }) => (href ? [{ href, ...rest }] : []));

  if (links.length === 0) return null;

  return (
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
  );
}
