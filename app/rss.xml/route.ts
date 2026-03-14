import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts("writing");
  const base = siteConfig.url;

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <link>${base}/writing/${post.slug}</link>
      <guid isPermaLink="true">${base}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} — 글</title>
    <link>${base}/writing</link>
    <description>${siteConfig.description}</description>
    <language>ko</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
