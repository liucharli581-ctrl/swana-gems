import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jewelry Care Guide",
  description:
    "Learn how to clean, store, and care for Swana Gems jewelry so each piece keeps its shine.",
};

export default function CareGuidePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Care Guide</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Jewelry Care Guide</h1>
        <p className="text-sm text-[#746d63] mb-10">With proper care, your Swana Gems pieces will remain beautiful for years to come.</p>

        <div className="space-y-8 text-sm text-[#746d63] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Everyday Care</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Put jewelry on last when getting dressed — after applying lotions, perfumes, and makeup.</li>
              <li>Remove jewelry before swimming, showering, or exercising.</li>
              <li>Avoid exposure to harsh chemicals including chlorine, bleach, and household cleaners.</li>
              <li>Remove rings before washing hands or applying hand sanitizer.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Cleaning</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gently wipe with a soft, lint-free cloth after each wear to remove oils and residue.</li>
              <li>For a deeper clean, use warm water and mild soap with a soft toothbrush.</li>
              <li>Dry thoroughly before storing.</li>
              <li>Avoid ultrasonic cleaners for delicate or gemstone pieces.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Storage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Store pieces individually in a soft pouch or a jewelry box with compartments.</li>
              <li>Keep sterling silver in an anti-tarnish pouch or bag.</li>
              <li>Avoid storing jewelry in humid environments like bathrooms.</li>
              <li>Necklaces and chains should be clasped and hung or laid flat to prevent tangling.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Material-Specific Care</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-[#0a0a0a] font-medium mb-1">Gold & Gold Vermeil</h3>
                <p>Gold vermeil may naturally tarnish over time. Polish gently with a jewelry cloth to restore shine. Avoid abrasive materials.</p>
              </div>
              <div>
                <h3 className="text-[#0a0a0a] font-medium mb-1">Sterling Silver</h3>
                <p>Silver naturally tarnishes with exposure to air. Regular wear actually helps slow tarnishing. Use a silver polishing cloth for cleaning.</p>
              </div>
              <div>
                <h3 className="text-[#0a0a0a] font-medium mb-1">Gemstones</h3>
                <p>Some gemstones are porous and sensitive to heat and light. Avoid prolonged sun exposure and harsh chemicals. Clean gently with a damp cloth.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
