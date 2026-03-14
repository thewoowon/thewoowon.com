import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, getSlugs } from "@/lib/mdx";
import { formatDate, isoDate } from "@/lib/date";
import { articleSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSlugs("writing").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter: fm } = getPost("writing", slug);
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `${siteConfig.url}/writing/${slug}` },
      openGraph: {
        title: `${fm.title} — ${siteConfig.name}`,
        description: fm.description,
        url: `${siteConfig.url}/writing/${slug}`,
        type: "article",
        publishedTime: isoDate(fm.date),
        tags: fm.tags,
      },
    };
  } catch {
    return { title: "글" };
  }
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPost("writing", slug);
  } catch {
    notFound();
  }

  const { frontmatter: fm, content } = post;

  return (
    <article className="flex flex-col gap-10 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(slug, fm)),
        }}
      />

      {/* ─── 헤더 ─── */}
      <header className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex items-center gap-2 text-xs text-muted">
          <time dateTime={isoDate(fm.date)}>{formatDate(fm.date)}</time>
          {fm.category && (
            <>
              <span>·</span>
              <span>{fm.category}</span>
            </>
          )}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          {fm.title}
        </h1>
        <p className="text-sm text-subtle">{fm.description}</p>

        {fm.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {fm.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-surface px-2 py-0.5 text-xs text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ─── 본문 ─── */}
      <div className="prose prose-sm max-w-none">
        <MDXRemote source={content} />
      </div>

      {/* ─── 하단 ─── */}
      <footer className="border-t border-border pt-8">
        <p className="text-xs text-muted">
          글이 도움이 됐다면{" "}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text transition-colors hover:text-text-high"
          >
            GitHub
          </a>
          에서 이야기 나눠요.
        </p>
      </footer>
    </article>
  );
}
