import Link from "next/link";

const promoCards = [
  {
    title: "Best Sellers",
    subtitle: "Our Most-Loved Pieces",
    image: "/images/promo/bestsellers.webp",
    href: "/best-sellers",
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh Designs for the Season",
    image: "/images/promo/new-arrivals.webp",
    href: "/new-arrivals",
  },
];

export default function PromoBanner() {
  return (
    <section className="py-16 lg:py-20 bg-[#f9f8f7]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {promoCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden bg-[#ede8e3]"
            >
              <div className="aspect-[4/3] lg:aspect-[3/2]">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-xs tracking-[0.15em] uppercase text-[#f1e02b] mb-1">
                  {card.subtitle}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">
                  {card.title}
                </h3>
                <span className="inline-flex items-center text-sm tracking-[0.1em] uppercase text-white border-b border-white pb-0.5 group-hover:text-[#f1e02b] group-hover:border-[#f1e02b] transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
