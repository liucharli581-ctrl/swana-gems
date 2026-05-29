import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover the story behind Swana Gems - handcrafted fine jewelry designed for timeless elegance.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">About</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Our Story</h1>

        <div className="aspect-[2/1] bg-[#ede8e3] mb-8 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url(/images/hero/HeroBanner_d_2x.jpg)" }}
          />
        </div>

        <div className="space-y-5 text-sm text-[#746d63] leading-relaxed">
          <p>
            At Swana Gems, we believe jewelry is more than an accessory — it is an expression of who you are.
            Founded with a passion for timeless design and exceptional craftsmanship, we create pieces that
            celebrate life&apos;s everyday moments and extraordinary milestones alike.
          </p>
          <p>
            Every Swana Gems piece is thoughtfully designed in-house and crafted with care. From our classic
            everyday essentials to our demi-fine collections, we are committed to quality that lasts — both in
            style and substance.
          </p>
          <p>
            We source our materials responsibly, working with trusted partners who share our values of ethical
            production and environmental stewardship. Our gemstones are carefully selected, our metals are
            chosen for lasting beauty, and every piece is finished with the attention it deserves.
          </p>
          <p>
            Whether you are treating yourself or finding the perfect gift, we invite you to explore our world —
            and find something that speaks to you.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-[#e0dbd4]">
          <div>
            <h3 className="font-serif text-lg text-[#0a0a0a] mb-2">Designed with Purpose</h3>
            <p className="text-xs text-[#746d63] leading-relaxed">Every piece is thoughtfully created to be worn, loved, and passed down.</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#0a0a0a] mb-2">Ethically Crafted</h3>
            <p className="text-xs text-[#746d63] leading-relaxed">We are committed to responsible sourcing and sustainable practices.</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#0a0a0a] mb-2">Exceptional Quality</h3>
            <p className="text-xs text-[#746d63] leading-relaxed">From material selection to final polish, quality is our hallmark.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
