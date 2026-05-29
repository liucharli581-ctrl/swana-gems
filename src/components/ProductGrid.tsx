"use client";

import Link from "next/link";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid() {
  return (
    <section className="py-16 lg:py-20 bg-[#f9f8f7]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-3">
            Curated for You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">
            Featured Favorites
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/category/all"
            className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] hover:border-[#746d63] transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
