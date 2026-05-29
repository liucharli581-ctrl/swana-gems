"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@/components/icons";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const hasHover = !!product.hoverImage;
  const { isWishlisted, addItem, removeItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  return (
    <Link
      href={product.href}
      className="group/card block"
      aria-label={`${product.name} - ${product.price}`}
    >
      <div className="aspect-square bg-[#f5f0eb] relative overflow-hidden">
        {/* Front image (default) */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            hasHover
              ? "opacity-100 group-hover/card:opacity-0"
              : "opacity-100"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
            className="object-contain object-center p-2 transition-transform duration-700 group-hover/card:scale-105"
          />
        </div>

        {/* Hover / flip image */}
        {hasHover && (
          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500">
            <Image
              src={product.hoverImage!}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
              className="object-contain object-center p-2 transition-transform duration-700 group-hover/card:scale-105"
            />
          </div>
        )}

        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#f1e02b] text-[#0a0a0a] text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 font-medium">
            {product.badge}
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all hover:scale-110 ${
            wishlisted
              ? "bg-white text-[#d83105]"
              : "bg-white/80 text-[#3c3c3c] opacity-0 group-hover/card:opacity-100"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon className="w-4 h-4" filled={wishlisted} />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm text-[#3c3c3c] tracking-wide">{product.name}</p>
        <p className="text-xs text-[#746d63] tracking-wide">{product.category}</p>
        <p className="text-sm font-medium text-[#0a0a0a]">{product.price}</p>
      </div>
    </Link>
  );
}
