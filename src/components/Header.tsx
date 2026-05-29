"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountIcon, SearchIcon, CartIcon, HeartIcon } from "@/components/icons";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/data/products";

const topNavLinks = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Gifts", href: "/gifts" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top utility bar */}
      <div className="hidden lg:block bg-[#f9f8f7] text-center text-xs text-[#746d63] py-2 tracking-wide">
        Free shipping on orders $50+ | Easy 30-day returns
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2.5 -ml-2.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="block font-serif text-2xl lg:text-3xl tracking-[0.15em] text-[#0a0a0a]">
              SWANA GEMS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-[#3c3c3c] hover:text-[#0a0a0a] transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <Link href="/search" className="hidden sm:block p-2.5" aria-label="Search">
              <SearchIcon />
            </Link>
            <Link href="/account/login" className="hidden sm:block p-2.5" aria-label="Account">
              <AccountIcon />
            </Link>
            <Link href="/wishlist" className="hidden sm:block p-2.5 relative" aria-label="Wishlist">
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d83105] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="p-2.5 relative" aria-label="Cart">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#f1e02b] text-[#0a0a0a] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-6 py-3 border-t border-gray-100">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-xs tracking-[0.1em] text-[#746d63] hover:text-[#0a0a0a] uppercase transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white relative z-50">
          <div className="px-4 py-4 space-y-4">
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm tracking-wide text-[#3c3c3c] py-2 uppercase"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs tracking-[0.1em] text-[#746d63] uppercase mb-3">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-[#3c3c3c] py-1.5"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
