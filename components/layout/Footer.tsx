import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-10">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
        <span className="text-xs text-[#525252]">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#525252] transition-colors hover:text-[#e5e5e5]"
          >
            GitHub
          </Link>
          <Link
            href="/rss.xml"
            className="text-xs text-[#525252] transition-colors hover:text-[#e5e5e5]"
          >
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
