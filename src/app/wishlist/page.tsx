"use client";

import Link from "next/link";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const { items, count } = useWishlist();
  const wishlistProducts = allProducts.filter((p) => items.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Wishlist</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">Wishlist</h1>
        <p className="text-sm text-[#746d63] mt-2">
          {count} {count === 1 ? "item" : "items"} saved for later.
        </p>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-[#ede8e3]">
          <p className="text-sm text-[#746d63] mb-4">Your wishlist is empty.</p>
          <Link
            href="/category/all"
            className="inline-block px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
          >
            Browse Jewelry
          </Link>
        </div>
      )}
    </div>
  );
}
