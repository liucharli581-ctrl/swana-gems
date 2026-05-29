import Link from "next/link";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Guide",
  description: "Find the perfect jewelry gift for every occasion. Personalized and curated gift ideas at Swana Gems.",
};

const giftCategories = [
  { title: "Under $40", filter: (p: typeof allProducts[0]) => {
    const price = parseFloat(p.price.replace(/[$,]/g, ""));
    return price > 0 && price < 40;
  }},
  { title: "$40 – $100", filter: (p: typeof allProducts[0]) => {
    const price = parseFloat(p.price.replace(/[$,]/g, ""));
    return price >= 40 && price <= 100;
  }},
  { title: "Premium", filter: (p: typeof allProducts[0]) => {
    const price = parseFloat(p.price.replace(/[$,]/g, ""));
    return price > 100;
  }},
  { title: "Best Sellers", filter: (p: typeof allProducts[0]) => p.badge === "Best Seller" },
];

export default function GiftsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Gifts</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">Gift Guide</h1>
        <p className="text-sm text-[#746d63] mt-2 max-w-xl">
          Find the perfect piece for every occasion. From timeless classics to personalized treasures.
        </p>
      </div>

      <div className="space-y-12">
        {giftCategories.map((cat) => {
          const items = allProducts.filter(cat.filter);
          if (items.length === 0) return null;
          return (
            <section key={cat.title}>
              <h2 className="font-serif text-2xl text-[#0a0a0a] mb-6">{cat.title}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Personalization CTA */}
      <section className="mt-16 bg-[#ede8e3] p-8 lg:p-12 text-center">
        <h2 className="font-serif text-2xl text-[#0a0a0a] mb-3">Make It Personal</h2>
        <p className="text-sm text-[#746d63] mb-6 max-w-lg mx-auto">
          Add a personal touch with engraving, birthstones, or custom charm combinations.
        </p>
        <Link href="/collection/birthstone" className="inline-block px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors">
          Explore Personalization
        </Link>
      </section>
    </div>
  );
}
