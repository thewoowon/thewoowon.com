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
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-xs text-muted transition-colors hover:text-text"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
