import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

/**
 * robots.txt — explicitly allow Google + AI crawlers.
 * No asset blocking (CSS/JS allowed for rendering).
 */
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const AI_BOTS = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Googlebot",
    "Google-Extended",
    "Bingbot",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [] },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
