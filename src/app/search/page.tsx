import Link from "next/link";
import type { Metadata } from "next";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Swana Gems for fine jewelry, personalized gifts, necklaces, earrings, bracelets, and rings.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").toLowerCase().trim();

  const results = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Search</span>
      </nav>

      <div className="mb-8 max-w-lg">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] mb-6">Search</h1>
        <form action="/search" method="GET">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search jewelry..."
              className="flex-1 px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {query && (
        <p className="text-sm text-[#746d63] mb-6">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16 border border-[#ede8e3]">
          <p className="text-sm text-[#746d63] mb-2">No results found.</p>
          <p className="text-xs text-[#746d63] mb-6">
            Try a different search term or browse our categories.
          </p>
          <Link
            href="/category/all"
            className="inline-block px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
          >
            Browse All Jewelry
          </Link>
        </div>
      ) : null}
    </div>
  );
}
