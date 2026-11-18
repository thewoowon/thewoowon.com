export const siteConfig = {
  name: "우원",
  handle: "thewoowon",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewoowon.com",
  title: "우원 — Frontend / Product Engineer",
  description:
    "금융 앱 광고·리워드, 치과 EMR, 1인 운영 서비스를 만들고 운영해 온 5년 차 프론트엔드 중심 풀스택 개발자 우원(thewoowon)입니다.",
  github: "https://github.com/thewoowon",
  email: "thewoowon@gmail.com",
  nav: [
    { label: "프로젝트", href: "/projects" },
    { label: "연구", href: "/research" },
    { label: "Boundary-First", href: "/boundary-first" },
    { label: "어바웃", href: "/about" },
    { label: "지금", href: "/now" },
  ],
  repos: {
    boundaryFirst: "https://github.com/thewoowon/boundary-first-frontend-templates",
  },
} as const;
