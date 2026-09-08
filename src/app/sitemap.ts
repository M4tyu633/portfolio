import type { MetadataRoute } from "next";
import { achievementPages } from "@/content/achievements";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    page("", 1),
    page("/work", 0.9),
    page("/achievements", 0.8),
    page("/about", 0.7),
    ...projects.map((p) => page(`/work/${p.slug}`, 0.8)),
    ...achievementPages.map((a) => page(`/achievements/${a.slug}`, 0.6)),
  ];
}
