"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { SearchIcon } from "@/components/icons";

const allCategories = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Blog</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-4">Blog</h1>
        <p className="text-sm text-[#746d63] max-w-xl leading-relaxed mb-6">
          Brand stories, jewelry care guides, trend insights, and gifting inspiration from the Swana Gems team.
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blog..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] bg-transparent"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ada297]">
            <SearchIcon className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Category filter */}
      <div className="max-w-3xl mx-auto mb-10 flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-[0.1em] uppercase px-4 py-2 transition-colors ${
              activeCategory === cat
                ? "bg-[#0a0a0a] text-white"
                : "bg-[#f9f8f7] text-[#746d63] hover:bg-[#ede8e3]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-xs text-[#746d63]">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          {searchQuery.trim() && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Featured Post */}
      {featured && (
        <section className="max-w-3xl mx-auto mb-10">
          <Link href={`/press/${featured.slug}`} className="block group">
            <div className="bg-[#f9f8f7] p-8 lg:p-10">
              <p className="text-xs tracking-[0.15em] uppercase text-[#ada297] mb-3">
                {featured.category} &middot; {featured.date}
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl text-[#0a0a0a] mb-3 group-hover:text-[#746d63] transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-[#746d63] leading-relaxed mb-4">
                {featured.excerpt}
              </p>
              <span className="text-xs tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 group-hover:text-[#746d63] group-hover:border-[#746d63] transition-colors">
                Read More
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Blog List */}
      {rest.length > 0 && (
        <section className="max-w-3xl mx-auto">
          <div className="space-y-0 divide-y divide-[#ede8e3]">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/press/${post.slug}`}
                className="block py-5 first:pt-0 group"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-[#ada297] mb-1">
                  {post.category} &middot; {post.date}
                </p>
                <h2 className="text-sm text-[#0a0a0a] font-medium group-hover:text-[#746d63] transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="text-xs text-[#746d63] leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <section className="max-w-3xl mx-auto text-center py-16">
          <p className="text-sm text-[#746d63] mb-2">No posts found.</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="text-xs tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] transition-colors"
          >
            Clear filters
          </button>
        </section>
      )}
    </div>
  );
}
