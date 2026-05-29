import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Learn about Swana Gems responsible sourcing, materials, packaging, and sustainability commitments.",
};

export default function SustainabilityPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Sustainability</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Sustainability</h1>
        <p className="text-sm text-[#746d63] mb-10">At Swana Gems, we believe that beautiful jewelry should not come at the cost of our planet or its people.</p>

        <div className="space-y-10">
          <section>
            <div className="aspect-[2/1] bg-[#ede8e3] mb-6" />
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Responsible Sourcing</h2>
            <p className="text-sm text-[#746d63] leading-relaxed">
              We carefully select our materials and partners with sustainability in mind. Our gemstones are sourced
              from suppliers who adhere to ethical mining practices, and our metals are chosen for both beauty and
              responsible production. We prioritize traceability throughout our supply chain.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Sustainable Packaging</h2>
            <p className="text-sm text-[#746d63] leading-relaxed">
              Our packaging is designed to be beautiful and sustainable. We use recyclable materials whenever possible
              and are continuously working to reduce waste. Our gift boxes are made from FSC-certified paper, and we
              minimize plastic in all packaging components.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Longevity & Quality</h2>
            <p className="text-sm text-[#746d63] leading-relaxed">
              The most sustainable jewelry is the piece you wear forever. We design for durability and timeless style,
              creating pieces that transcend trends. Our quality craftsmanship means fewer replacements and less waste.
              We also offer repair services to extend the life of your cherished pieces.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Our Commitment</h2>
            <p className="text-sm text-[#746d63] leading-relaxed">
              We are committed to continuous improvement in our sustainability practices. This includes exploring
              recycled metals, supporting community development programs in sourcing regions, and reducing our carbon
              footprint across operations. We believe transparency is key and will continue to share our progress.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
