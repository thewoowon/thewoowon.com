export const siteConfig = {
  name: "우원",
  handle: "thewoowon",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewoowon.com",
  title: "우원 — 금융 AI · 제품 엔지니어링",
  description:
    "KB국민은행에서 광고·리워드 수익화 시스템을 설계하는 프론트엔드 엔지니어이자, 금융 리스크가 어디서·왜 틀렸는지 역추적하는 금융 AI 연구자. 우원(thewoowon).",
  github: "https://github.com/thewoowon",
  email: "thewoowon@gmail.com",
  nav: [
    { label: "프로젝트", href: "/projects" },
    { label: "연구", href: "/research" },
    { label: "Boundary-First", href: "/boundary-first" },
    { label: "글", href: "/writing" },
    { label: "어바웃", href: "/about" },
    { label: "지금", href: "/now" },
  ],
  repos: {
    boundaryFirst: "https://github.com/thewoowon/boundary-first-frontend-templates",
  },
} as const;
