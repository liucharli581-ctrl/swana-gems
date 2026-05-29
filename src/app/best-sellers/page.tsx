import Link from "next/link";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "Shop our most-loved jewelry pieces. Curated best sellers and customer favorites at Swana Gems.",
};

export default function BestSellersPage() {
  const items = allProducts.filter((p) => p.badge === "Best Seller");

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Best Sellers</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">Best Sellers</h1>
        <p className="text-sm text-[#746d63] mt-2">Our most-loved pieces, curated for you</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#746d63]">No best sellers at this time.</p>
          <Link href="/category/all" className="inline-block mt-4 text-sm tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] transition-colors">
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
