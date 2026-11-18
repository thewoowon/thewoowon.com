import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /r/* 는 회사에 개별 전달하는 이력서 경로 — 색인 대상이 아니다.
    rules: { userAgent: "*", allow: "/", disallow: "/r/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
