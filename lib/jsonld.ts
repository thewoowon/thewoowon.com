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
    jobTitle: "금융 AI · 제품 엔지니어",
    description:
      "KB국민은행 스타뱅킹에서 광고·리워드 프론트엔드를 만들고, 금융 리스크·AI 감독 문제를 연구합니다.",
  };
}

export function articleSchema(slug: string, fm: Frontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.date,
    author: {
      "@type": "Person",
      name: PERSON_NAME,
      url: PERSON_URL,
    },
    url: `${SITE_URL}/writing/${slug}`,
    mainEntityOfPage: `${SITE_URL}/writing/${slug}`,
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
