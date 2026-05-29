"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface ProductFilterProps {
  products: Product[];
  categories: { name: string; href: string }[];
  currentSlug: string;
  currentTitle: string;
}

const PRICE_RANGES = [
  { label: "Under $30", min: 0, max: 30 },
  { label: "$30 – $50", min: 30, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100+", min: 100, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[$,]/g, ""));
}

export default function ProductFilter({
  products,
  categories,
  currentSlug,
  currentTitle,
}: ProductFilterProps) {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Price filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        const price = parsePrice(p.price);
        return selectedPriceRanges.some((i) => {
          const range = PRICE_RANGES[i];
          return price >= range.min && price < range.max;
        });
      });
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "newest":
        result.sort((a, b) => {
          const order = ["n", "e", "b", "r", "d"];
          const ai = order.indexOf(a.id[0]);
          const bi = order.indexOf(b.id[0]);
          return ai - bi;
        });
        break;
    }

    return result;
  }, [products, selectedPriceRanges, sortBy]);

  return (
    <div>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex lg:hidden items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-4 py-2 px-3 border border-[#d4cfc8] w-fit"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
        {/* Sidebar filters - collapsible on mobile */}
        <div className={`lg:w-56 flex-shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          {/* Category */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-[#0a0a0a] font-medium mb-3">
              Category
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const catSlug = cat.href.replace("/category/", "");
                const isActive = catSlug === currentSlug;
                return (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className={`block text-sm py-1 transition-colors ${
                      isActive
                        ? "text-[#0a0a0a] font-medium"
                        : "text-[#746d63] hover:text-[#0a0a0a]"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-[#0a0a0a] font-medium mb-3">
              Price
            </h3>
            <div className="space-y-2">
              {PRICE_RANGES.map((range, index) => (
                <label
                  key={range.label}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(index)}
                    onChange={() => togglePriceRange(index)}
                    className="w-4 h-4 border-[#d4cfc8] text-[#0a0a0a] focus:ring-[#0a0a0a]"
                  />
                  <span className="text-sm text-[#746d63] group-hover:text-[#0a0a0a] transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#ede8e3]">
            <p className="text-xs text-[#746d63]">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs text-[#0a0a0a] bg-transparent border border-[#d4cfc8] px-3 py-1.5 focus:outline-none focus:border-[#0a0a0a] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-[#746d63] mb-2">No products match your filters.</p>
              <button
                onClick={() => setSelectedPriceRanges([])}
                className="text-xs tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
