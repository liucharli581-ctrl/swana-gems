import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f9f8f7]">
      {/* Background gradient */}
      <div className="absolute inset-0 ks-gradient-vertical opacity-30" />

      <div className="relative max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[70vh] lg:min-h-[80vh]">
          {/* Content side */}
          <div className="flex items-center justify-center px-6 lg:px-16 py-16 lg:py-24">
            <div className="max-w-lg text-center lg:text-left">
              <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-4">
                Summer 2026 Collection
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a0a0a] leading-tight mb-6">
                Jewelry for
                <br />
                <span className="italic">Everyday Moments</span>
              </h1>
              <p className="text-[#746d63] text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Handcrafted pieces designed to be worn, layered, and loved —
                from morning coffee to evening out.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/category/all"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  href="/new-arrivals"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-[#0a0a0a] text-[#0a0a0a] text-sm tracking-[0.1em] uppercase hover:bg-[#0a0a0a] hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative min-h-[50vh] lg:min-h-full">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/images/hero/HeroBanner_d_2x.jpg)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#746d63]">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-[#ada297] animate-pulse" />
      </div>
    </section>
  );
}
