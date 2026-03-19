export const siteConfig = {
  name: "우원",
  handle: "thewoowon",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewoowon.com",
  title: "우원 — AI · 금융 · 엔지니어링",
  description:
    "AI·금융·연구·제품·엔지니어링이 교차하는 고밀도 개인 연구소. 깊이 생각하고, 실제로 만들고, 구조로 문제를 푼다.",
  ogImage: "/og-default.png",
  github: "https://github.com/thewoowon",
  email: "thewoowon@gmail.com",
  nav: [
    { label: "프로젝트", href: "/projects" },
    { label: "글", href: "/writing" },
    { label: "어바웃", href: "/about" },
    { label: "지금", href: "/now" },
  ],
} as const;
