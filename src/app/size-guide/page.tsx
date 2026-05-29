import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Find Swana Gems ring sizing, necklace length, bracelet fit, and measurement guidance before checkout.",
};

const ringSizes = [
  { us: "4", circumference: "46.8mm", diameter: "14.9mm" },
  { us: "4.5", circumference: "48.0mm", diameter: "15.3mm" },
  { us: "5", circumference: "49.3mm", diameter: "15.7mm" },
  { us: "5.5", circumference: "50.5mm", diameter: "16.1mm" },
  { us: "6", circumference: "51.8mm", diameter: "16.5mm" },
  { us: "6.5", circumference: "53.1mm", diameter: "16.9mm" },
  { us: "7", circumference: "54.4mm", diameter: "17.3mm" },
  { us: "7.5", circumference: "55.7mm", diameter: "17.7mm" },
  { us: "8", circumference: "57.0mm", diameter: "18.1mm" },
  { us: "8.5", circumference: "58.3mm", diameter: "18.5mm" },
  { us: "9", circumference: "59.5mm", diameter: "19.0mm" },
  { us: "9.5", circumference: "60.8mm", diameter: "19.4mm" },
  { us: "10", circumference: "62.1mm", diameter: "19.8mm" },
];

export default function SizeGuidePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Size Guide</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Size Guide</h1>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Ring Size Chart</h2>
          <p className="text-sm text-[#746d63] mb-6">Measure a ring you already own or use the chart below to find your perfect fit.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#0a0a0a]">
                  <th className="text-left py-3 text-[#0a0a0a] font-medium">US Size</th>
                  <th className="text-left py-3 text-[#0a0a0a] font-medium">Circumference</th>
                  <th className="text-left py-3 text-[#0a0a0a] font-medium">Diameter</th>
                </tr>
              </thead>
              <tbody>
                {ringSizes.map((s) => (
                  <tr key={s.us} className="border-b border-[#ede8e3]">
                    <td className="py-3 text-[#0a0a0a]">{s.us}</td>
                    <td className="py-3 text-[#746d63]">{s.circumference}</td>
                    <td className="py-3 text-[#746d63]">{s.diameter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">How to Measure</h2>
          <div className="space-y-4 text-sm text-[#746d63] leading-relaxed">
            <div>
              <h3 className="text-[#0a0a0a] font-medium mb-1">Method 1: Measure an Existing Ring</h3>
              <p>Select a ring that fits the intended finger. Measure the inside diameter in millimeters and match it to the chart above.</p>
            </div>
            <div>
              <h3 className="text-[#0a0a0a] font-medium mb-1">Method 2: Measure Your Finger</h3>
              <p>Wrap a piece of string or paper around the base of your finger. Mark where it overlaps, then measure the length against a ruler. Match the measurement to the circumference column.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Bracelet & Necklace Sizing</h2>
          <div className="space-y-3 text-sm text-[#746d63]">
            <div className="flex justify-between py-3 border-b border-[#ede8e3]">
              <span className="text-[#0a0a0a]">Bracelet (Standard)</span>
              <span>7 inches</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#ede8e3]">
              <span className="text-[#0a0a0a]">Necklace (Short)</span>
              <span>16–18 inches</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#ede8e3]">
              <span className="text-[#0a0a0a]">Necklace (Medium)</span>
              <span>20–24 inches</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#ede8e3]">
              <span className="text-[#0a0a0a]">Necklace (Long)</span>
              <span>30–36 inches</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
