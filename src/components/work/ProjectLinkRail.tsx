import type { Project, ProjectLink, ProjectLinks } from "@/content/types";

/* ===========================================================================
 * THE UTILITY RAIL.
 *
 * Every way to reach the actual artifact, in one compact row, in a fixed order
 * of usefulness: the running thing, then the source, then the recordings, then
 * the build. It appears twice on a case study — once beside the hero, once at
 * the end — and once on the archive stage, and it is the same component every
 * time so the two can never disagree.
 *
 * ⚠ Not six giant call-to-action buttons. A project with five links would then
 * have five equally loud rectangles and the reader would have to pick one
 * blind. These are typed rows with one hairline each.
 *
 * ⚠ A link only exists here if it exists in `links`, and `links` only holds
 * URLs that were checked. There is no placeholder state: a project with nothing
 * to link renders nothing at all.
 * ======================================================================== */

const ORDER: (keyof ProjectLinks)[] = [
  "demo",
  "repo",
  "gameplay",
  "trailer",
  "download",
];

const LABELS: Record<keyof ProjectLinks, string> = {
  demo: "Open the live product",
  repo: "Read the source",
  gameplay: "Watch a full round",
  trailer: "Watch the trailer",
  download: "Download the build",
};

export function projectLinks(project: Project): ProjectLink[] {
  const links = project.links;
  if (!links) return [];
  return ORDER.filter((k) => links[k]).map((k) => ({
    key: k,
    label: project.linkLabels?.[k] ?? LABELS[k],
    href: links[k]!,
  }));
}

export default function ProjectLinkRail({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const links = projectLinks(project);
  if (links.length === 0) return null;

  return (
    <ul className={`link-rail ${className}`}>
      {links.map((l) => (
        <li key={l.key}>
          <a href={l.href} target="_blank" rel="noopener noreferrer">
            <span>{l.label}</span>
            <span aria-hidden className="link-rail-mark">
              &#8599;
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
