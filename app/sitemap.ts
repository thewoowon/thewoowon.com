import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/now`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllPosts("projects").map(
    (post) => ({
      url: `${base}/projects/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const writingRoutes: MetadataRoute.Sitemap = getAllPosts("writing").map(
    (post) => ({
      url: `${base}/writing/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
