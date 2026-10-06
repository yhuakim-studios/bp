import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/prescription", "/services", "/branches", "/about", "/health-hub", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...articles.map((a) => ({ url: `${site.url}/health-hub/${a.slug}`, lastModified: a.date, priority: 0.6 })),
  ];
}
