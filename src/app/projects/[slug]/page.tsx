import { permanentRedirect } from "next/navigation";
import { projects } from "@/content/projects";

/* The case studies used to live at /projects/<slug>. They are at /work/<slug>
 * now. Anything already linking to the old path, including whatever is cached
 * in a search index, lands on the right page rather than on a 404. */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function LegacyProjectRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/work/${slug}`);
}
