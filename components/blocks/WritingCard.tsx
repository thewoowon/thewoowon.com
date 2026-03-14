import Link from "next/link";
import { Post } from "@/lib/mdx";
import { formatDate } from "@/lib/date";

export default function WritingCard({ post }: { post: Post }) {
  const { slug, frontmatter: fm } = post;
  return (
    <Link
      href={`/writing/${slug}`}
      className="group flex items-start justify-between gap-6 border-b border-[#1a1a1a] py-4 transition-colors last:border-0 hover:border-[#2a2a2a]"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-[#e5e5e5] group-hover:text-[#fafafa] transition-colors">
          {fm.title}
        </h3>
        <p className="text-xs text-[#525252]">{fm.description}</p>
      </div>
      <span className="shrink-0 text-xs text-[#525252]">
        {formatDate(fm.date)}
      </span>
    </Link>
  );
}
