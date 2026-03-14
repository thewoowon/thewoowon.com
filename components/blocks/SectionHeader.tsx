import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeader({
  title,
  href,
  linkLabel = "전체 보기",
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[#525252]">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-xs text-[#525252] transition-colors hover:text-[#e5e5e5]"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
