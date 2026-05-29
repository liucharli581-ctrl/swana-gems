"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { categories } from "@/data/products";
import { ChevronLeft, ChevronRight } from "@/components/icons";

export default function CategorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-3">
            Shop by Category
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">
            Our Collections
          </h2>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Slider */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-4 px-4"
          >
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="flex-shrink-0 group/card"
              >
                <div className="w-48 lg:w-64">
                  <div className="aspect-square overflow-hidden bg-[#f9f8f7] relative">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover/card:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/20 transition-colors" />
                  </div>
                  <p className="mt-4 text-center text-base tracking-wide text-[#3c3c3c] group-hover/card:text-[#0a0a0a] transition-colors">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
