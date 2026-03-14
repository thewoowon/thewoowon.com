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
    jobTitle: "AI · 금융 · 엔지니어링",
    description:
      "AI·금융·연구·제품·엔지니어링이 교차하는 고밀도 개인 연구소를 운영합니다.",
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
