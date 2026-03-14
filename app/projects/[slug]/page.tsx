import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, getSlugs } from "@/lib/mdx";
import { formatDate } from "@/lib/date";
import { projectSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter: fm } = getPost("projects", slug);
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `${siteConfig.url}/projects/${slug}` },
      openGraph: {
        title: `${fm.title} — ${siteConfig.name}`,
        description: fm.description,
        url: `${siteConfig.url}/projects/${slug}`,
        type: "article",
        publishedTime: fm.date,
      },
    };
  } catch {
    return { title: "프로젝트" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPost("projects", slug);
  } catch {
    notFound();
  }

  const { frontmatter: fm, content } = post;

  return (
    <article className="flex flex-col gap-10 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema(slug, fm)),
        }}
      />

      {/* ─── 헤더 ─── */}
      <header className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{formatDate(fm.date)}</span>
          {fm.status && (
            <>
              <span>·</span>
              <span>
                {fm.status === "shipped"
                  ? "출시"
                  : fm.status === "wip"
                  ? "진행 중"
                  : "아카이브"}
              </span>
            </>
          )}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          {fm.title}
        </h1>
        <p className="text-sm text-subtle">{fm.description}</p>

        {fm.stack && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {fm.stack.map((s) => (
              <span
                key={s}
                className="rounded bg-surface px-2 py-0.5 text-xs text-muted"
              >
                {s}
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
            프로젝트 링크 →
          </a>
        )}
      </header>

      {/* ─── 본문 ─── */}
      <div className="prose prose-sm max-w-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
