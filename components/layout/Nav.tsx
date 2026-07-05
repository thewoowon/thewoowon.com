"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-hairline bg-bg/90 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-6">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-tight text-text-high transition-opacity hover:opacity-70"
        >
          {siteConfig.handle}
        </Link>

        <ul className="flex min-w-0 flex-1 items-center justify-end gap-4 overflow-x-auto whitespace-nowrap sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {siteConfig.nav.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  className={`text-sm transition-colors ${
                    active ? "text-text-high" : "text-subtle hover:text-text"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
