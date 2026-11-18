import Link from "next/link";
import { Post } from "@/lib/mdx";
import { formatDateShort } from "@/lib/date";

const STATUS_LABEL: Record<string, string> = {
  shipped: "출시",
  wip: "진행 중",
  archived: "서비스 종료",
};

export default function ProjectCard({ post }: { post: Post }) {
  const { slug, frontmatter: fm } = post;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-hairline bg-raised p-5 transition-all duration-200 hover:border-border hover:bg-surface"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-text transition-colors group-hover:text-text-high">
          {fm.title}
        </h3>
        <span className="shrink-0 text-xs text-muted">
          {fm.status ? STATUS_LABEL[fm.status] : ""}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-subtle">{fm.description}</p>

      <div className="flex items-center justify-between">
        {fm.stack && (
          <div className="flex flex-wrap gap-1.5">
            {fm.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <span className="text-[10px] text-muted">{formatDateShort(fm.date)}</span>
      </div>
    </Link>
  );
}
