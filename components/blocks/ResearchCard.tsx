import Link from "next/link";
import { Post } from "@/lib/mdx";

const KIND_LABEL: Record<string, string> = {
  paper: "논문",
  essay: "에세이",
  policy: "정책·거버넌스",
};

export default function ResearchCard({ post }: { post: Post }) {
  const { slug, frontmatter: fm } = post;
  return (
    <Link
      href={`/research/${slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-hairline bg-raised p-5 transition-all duration-200 hover:border-border hover:bg-surface"
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted">
        {fm.kind && <span>{KIND_LABEL[fm.kind] ?? fm.kind}</span>}
        {fm.venue && (
          <>
            <span>·</span>
            <span className="normal-case tracking-normal">{fm.venue}</span>
          </>
        )}
      </div>

      <h3 className="text-sm font-semibold leading-snug text-text transition-colors group-hover:text-text-high">
        {fm.title}
      </h3>

      <p className="text-xs leading-relaxed text-subtle">{fm.description}</p>

      {fm.results && fm.results.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {fm.results.slice(0, 3).map((r) => (
            <span
              key={r}
              className="rounded bg-surface px-1.5 py-0.5 text-[10px] tabular-nums text-subtle"
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
