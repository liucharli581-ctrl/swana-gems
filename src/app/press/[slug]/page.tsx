import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/press" className="hover:text-[#0a0a0a] transition-colors">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">{post.title}</span>
      </nav>

      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <p className="text-xs tracking-[0.15em] uppercase text-[#ada297] mb-3">
            {post.category} &middot; {post.date}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-sm prose-gray max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-sm text-[#746d63] leading-relaxed mb-5">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-[#ede8e3]">
          <Link
            href="/press"
            className="text-xs tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] hover:border-[#746d63] transition-colors"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
