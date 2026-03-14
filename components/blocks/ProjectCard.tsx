import Link from "next/link";
import { Post } from "@/lib/mdx";
import { formatDateShort } from "@/lib/date";

const STATUS_LABEL: Record<string, string> = {
  shipped: "출시",
  wip: "진행 중",
  archived: "아카이브",
};

export default function ProjectCard({ post }: { post: Post }) {
  const { slug, frontmatter: fm } = post;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-[#1e1e1e] bg-[#111] p-5 transition-all duration-200 hover:border-[#2e2e2e] hover:bg-[#161616]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-[#e5e5e5] group-hover:text-[#fafafa] transition-colors">
          {fm.title}
        </h3>
        <span className="shrink-0 text-xs text-[#525252]">
          {fm.status ? STATUS_LABEL[fm.status] : ""}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-[#737373]">{fm.description}</p>

      <div className="flex items-center justify-between">
        {fm.stack && (
          <div className="flex flex-wrap gap-1.5">
            {fm.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded bg-[#1e1e1e] px-1.5 py-0.5 text-[10px] text-[#525252]"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <span className="text-[10px] text-[#525252]">
          {formatDateShort(fm.date)}
        </span>
      </div>
    </Link>
  );
}
