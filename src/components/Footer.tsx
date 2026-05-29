"use client";

import { useState } from "react";
import Link from "next/link";

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Jewelry", href: "/category/all" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Gifts", href: "/gifts" },
    ],
  },
  customer: {
    title: "Customer Service",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Care Guide", href: "/care-guide" },
    ],
  },
  company: {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Press", href: "/press" },
    ],
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubStatus("success");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs tracking-[0.15em] uppercase text-[#ada297] mb-2">
              Stay Inspired
            </p>
            <h3 className="font-serif text-2xl lg:text-3xl mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-sm text-[#ada297] mb-6">
              Subscribe to receive exclusive offers, new arrivals, and insider access.
            </p>

            {subStatus === "success" ? (
              <p className="text-sm text-[#f1e02b]">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#f1e02b] transition-colors"
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="px-6 py-3 bg-[#f1e02b] text-[#0a0a0a] text-sm tracking-[0.1em] uppercase font-medium hover:bg-[#f1e02b]/90 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {subStatus === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
            {subStatus === "error" && (
              <p className="text-sm text-red-400 mt-2">Something went wrong. Try again.</p>
            )}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <h3 className="font-serif text-2xl tracking-[0.15em] mb-4">
                SWANA GEMS
              </h3>
            </Link>
            <p className="text-sm text-[#ada297] leading-relaxed max-w-xs">
              Discover Swana Gems - handcrafted fine jewelry and accessories
              designed for those who appreciate timeless elegance and quality craft.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "Facebook", "Pinterest", "TikTok"].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  className="text-[#ada297] hover:text-[#f1e02b] transition-colors text-xs tracking-wide uppercase"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h4 className="text-xs tracking-[0.15em] uppercase text-[#ada297] mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#746d63]">
            &copy; {new Date().getFullYear()} Swana Gems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#746d63] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#746d63] hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-xs text-[#746d63] hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
