import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import { personSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "우원",
    "thewoowon",
    "SW 엔지니어",
    "금융 AI",
    "포트폴리오",
    "블로그",
    "연구",
    "제품",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.handle}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
      </head>
      <body className="antialiased">
        <Nav />
        <main className="mx-auto min-h-screen max-w-3xl px-6 pt-24 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
