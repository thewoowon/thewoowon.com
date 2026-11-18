import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // 2026-11 블로그(/writing)·RSS 제거, 일부 페이지 통합. 옛 링크가 깨지지 않도록 영구 이동.
  async redirects() {
    return [
      { source: "/writing", destination: "/projects", permanent: true },
      { source: "/writing/:slug*", destination: "/projects", permanent: true },
      { source: "/rss.xml", destination: "/", permanent: true },
      { source: "/projects/trust", destination: "/projects/ai-llm-hackathons", permanent: true },
      { source: "/research/ai-assurance-korean-finance", destination: "/research", permanent: true },
    ];
  },
};

export default nextConfig;
