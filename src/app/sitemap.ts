import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";
import { BLOG_POSTS } from "@/lib/constants/blog";
import { canonicalUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: canonicalUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: canonicalUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: canonicalUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: canonicalUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: canonicalUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: canonicalUrl("/delete-account"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
