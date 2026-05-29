import Link from "next/link";
import { personalizationItems } from "@/data/products";

export default function Personalization() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-3">
            Make It Yours
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">
            Personalization
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {personalizationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group/card relative overflow-hidden"
            >
              <div className="aspect-square bg-[#f9f8f7] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover/card:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="font-serif text-xl lg:text-2xl text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-white/80 hidden lg:block">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
