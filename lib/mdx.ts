import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentType = "projects" | "writing";

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  // projects only
  stack?: string[];
  link?: string;
  status?: "shipped" | "wip" | "archived";
  // writing only
  category?: string;
  published?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export function getSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(type: ContentType, slug: string): Post {
  const filePath = path.join(CONTENT_ROOT, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
  };
}

export function getAllPosts(type: ContentType): Post[] {
  return getSlugs(type)
    .map((slug) => getPost(type, slug))
    .filter((p) => p.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}
