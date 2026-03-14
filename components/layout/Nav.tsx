"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#0e0e0e]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[#fafafa] transition-opacity hover:opacity-70"
        >
          {siteConfig.handle}
        </Link>

        <ul className="flex items-center gap-6">
          {siteConfig.nav.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-colors ${
                    active
                      ? "text-[#fafafa]"
                      : "text-[#737373] hover:text-[#e5e5e5]"
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
