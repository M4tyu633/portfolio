import type { MetadataRoute } from "next";
import { projects, site } from "@/content/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    // One entry per project that has a `caseStudy` in data.ts. The others have
    // no page to list.
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${site.url}/projects/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
