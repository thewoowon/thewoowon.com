import { Frontmatter } from "./mdx";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewoowon.com";
const PERSON_NAME = "우원";
const PERSON_URL = SITE_URL;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    url: PERSON_URL,
    sameAs: [
      "https://github.com/thewoowon",
    ],
    jobTitle: "Frontend / Product Engineer",
    description:
      "금융 앱 광고·리워드, 치과 EMR, 1인 운영 서비스를 만들고 운영해 온 5년 차 프론트엔드 중심 풀스택 개발자입니다.",
  };
}

export function projectSchema(slug: string, fm: Frontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: fm.title,
    description: fm.description,
    dateCreated: fm.date,
    author: {
      "@type": "Person",
      name: PERSON_NAME,
      url: PERSON_URL,
    },
    url: `${SITE_URL}/projects/${slug}`,
  };
}

export function researchSchema(slug: string, fm: Frontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": fm.kind === "essay" || fm.kind === "policy" ? "Article" : "ScholarlyArticle",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.date,
    ...(fm.venue ? { publisher: { "@type": "Organization", name: fm.venue } } : {}),
    author: {
      "@type": "Person",
      name: PERSON_NAME,
      url: PERSON_URL,
    },
    url: `${SITE_URL}/research/${slug}`,
    mainEntityOfPage: `${SITE_URL}/research/${slug}`,
  };
}
