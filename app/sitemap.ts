import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

/** Dynamic sitemap — 5 canonical URLs, static-export safe. */
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services/", priority: 0.9 },
    { path: "/portfolio/", priority: 0.9 },
    { path: "/about/", priority: 0.8 },
    { path: "/contact/", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
