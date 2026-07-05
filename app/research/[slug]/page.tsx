import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { getPost, getSlugs } from "@/lib/mdx";
import { formatDate, isoDate } from "@/lib/date";
import { researchSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

const KIND_LABEL: Record<string, string> = {
  paper: "논문",
  essay: "에세이",
  policy: "정책·거버넌스",
};

export async function generateStaticParams() {
  return getSlugs("research").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter: fm } = getPost("research", slug);
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `${siteConfig.url}/research/${slug}` },
      openGraph: {
        title: `${fm.title} — ${siteConfig.name}`,
        description: fm.description,
        url: `${siteConfig.url}/research/${slug}`,
        type: "article",
        publishedTime: isoDate(fm.date),
        tags: fm.tags,
      },
    };
  } catch {
    return { title: "연구" };
  }
}

export default async function ResearchPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPost("research", slug);
  } catch {
    notFound();
  }

  const { frontmatter: fm, content } = post;

  return (
    <article className="flex flex-col gap-10 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(researchSchema(slug, fm)),
        }}
      />

      {/* ─── 헤더 ─── */}
      <header className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {fm.kind && <span>{KIND_LABEL[fm.kind] ?? fm.kind}</span>}
          {fm.venue && (
            <>
              <span>·</span>
              <span>{fm.venue}</span>
            </>
          )}
          <span>·</span>
          <time dateTime={isoDate(fm.date)}>{formatDate(fm.date)}</time>
        </div>
        <h1 className="text-2xl font-semibold leading-snug tracking-tight text-text-high">
          {fm.title}
        </h1>
        <p className="text-sm leading-relaxed text-subtle">{fm.description}</p>

        {fm.results && fm.results.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {fm.results.map((r) => (
              <span
                key={r}
                className="rounded bg-surface px-2 py-0.5 text-xs tabular-nums text-accent"
              >
                {r}
              </span>
            ))}
          </div>
        )}

        {fm.link && (
          <a
            href={fm.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-xs text-text transition-colors hover:text-text-high"
          >
            원문 / PDF →
          </a>
        )}
      </header>

      {/* ─── 본문 ─── */}
      <div className="prose prose-sm max-w-none">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </div>
    </article>
  );
}
