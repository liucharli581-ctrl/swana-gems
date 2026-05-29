import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/data/products";
import ProductFilter from "@/components/ProductFilter";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const title = slug === "all" ? "All Jewelry" : category?.name ?? "Category";

  return {
    title,
    description: `Shop our ${title.toLowerCase()} collection at Swana Gems. Handcrafted fine jewelry designed for timeless elegance.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title,
      description: `Shop our ${title.toLowerCase()} collection at Swana Gems.`,
      url: absoluteUrl(`/category/${slug}`),
      images: category ? [{ url: category.image, alt: title }] : undefined,
    },
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.href.replace("/category/", "") }));
}

const categoryInfo: Record<
  string,
  { description: string; intro: string; faqs: { q: string; a: string }[] }
> = {
  necklaces: {
    description:
      "Necklaces make a statement close to the heart. From everyday pendants to layered chains, our necklace collection is designed to complement any neckline and express your personal style.",
    intro:
      "Whether you are looking for a signature pendant to wear daily or a layered look for a special occasion, our necklace collection blends timeless design with modern versatility. Each piece is crafted with quality materials and finished with attention to detail.",
    faqs: [
      {
        q: "What necklace lengths do you offer?",
        a: "Our necklaces typically range from 16 to 24 inches. Short styles (16-18 inches) sit at the collarbone, while longer styles (20-24 inches) layer beautifully over tops and dresses.",
      },
      {
        q: "Can I wear your necklaces everyday?",
        a: "Yes. Our pieces are designed for daily wear. We recommend removing them before swimming, showering, or exercising to preserve the finish. See our Care Guide for more tips.",
      },
      {
        q: "Do you offer matching earrings or bracelets?",
        a: "Many of our necklace styles have matching pieces within the same collection. Browse the category or check the product page for mix-and-match suggestions.",
      },
    ],
  },
  earrings: {
    description:
      "Earrings frame the face and elevate any look. Our earring collection includes classic hoops, stylish drops, and versatile studs designed for every occasion.",
    intro:
      "From understated studs that work for the office to statement hoops that shine on the weekend, our earring collection has something for every style and occasion. Lightweight materials and secure backings ensure comfortable all-day wear.",
    faqs: [
      {
        q: "Are your earrings suitable for sensitive ears?",
        a: "Our earrings are made with gold-tone plated brass or sterling silver bases. If you have sensitive ears, we recommend our demi-fine vermeil collection which uses sterling silver with a thick gold overlay.",
      },
      {
        q: "What type of backing do your earrings use?",
        a: "Most of our stud and post earrings use friction backs for a secure fit. Hoop earrings feature hinged closures with friction posts.",
      },
      {
        q: "Do you offer gift wrapping for earrings?",
        a: "All orders arrive in our signature gift packaging, making them ready for gifting. You can also add a personalized message at checkout.",
      },
    ],
  },
  bracelets: {
    description:
      "Bracelets add the perfect finishing touch to any outfit. Shop stackable sets, tennis bracelets, and everyday bangles that layer beautifully together.",
    intro:
      "Whether you prefer the sparkle of a tennis bracelet or the casual charm of a friendship set, our bracelet collection is made for stacking, layering, and expressing your personal style. Mix metals and textures to create a look that is uniquely yours.",
    faqs: [
      {
        q: "Can I wear multiple bracelets together?",
        a: "Absolutely. Our stackable designs are made to mix and match. Layer different metals, textures, and styles for a curated look. Start with a classic piece and build from there.",
      },
      {
        q: "How do I find the right bracelet size?",
        a: "Our standard bracelet length is 7 inches, which fits most wrists. If you prefer a looser fit, consider styles with adjustable chains or extender links.",
      },
      {
        q: "Are your bracelets water resistant?",
        a: "We recommend removing bracelets before washing hands, swimming, or showering to protect the finish and stones. Wipe with a soft cloth after wear to keep them looking their best.",
      },
    ],
  },
  rings: {
    description:
      "Rings say something about you. Our ring collection features slim bands, stackable styles, and standout pieces for every finger and every occasion.",
    intro:
      "From delicate everyday bands to bold statement rings, our collection is designed to mix, stack, and shine. Each piece is crafted with care and finished to complement both gold and silver tones in your wardrobe.",
    faqs: [
      {
        q: "How do I find my ring size?",
        a: "Visit our Size Guide for detailed instructions on measuring at home. You can measure an existing ring or use a strip of paper to measure your finger circumference.",
      },
      {
        q: "Can I stack your rings together?",
        a: "Many of our rings are designed for stacking. Slim bands pair beautifully together and can be combined with your existing jewelry for a personalized look.",
      },
      {
        q: "Do your rings tarnish over time?",
        a: "With proper care, your rings will maintain their finish. Avoid contact with lotions, perfumes, and water. Store in a dry place when not wearing. See our Care Guide for detailed instructions.",
      },
    ],
  },
  "demi-fine": {
    description:
      "Demi-fine jewelry bridges the gap between fashion and fine. Our demi-fine collection uses premium materials like gold vermeil and sterling silver for elevated everyday elegance.",
    intro:
      "Our demi-fine collection is for those who appreciate quality craftsmanship without the fine jewelry price tag. Each piece features superior materials — including gold vermeil over sterling silver — and is designed to be worn and loved for years.",
    faqs: [
      {
        q: "What is gold vermeil?",
        a: "Gold vermeil is a thick layer of gold bonded over sterling silver. It offers the look and feel of fine gold jewelry at a more accessible price point and is more durable than standard gold plating.",
      },
      {
        q: "How do I care for vermeil jewelry?",
        a: "Gold vermeil can be gently polished with a soft jewelry cloth to restore its shine. Avoid abrasive cleaners and remove before swimming or showering. Store in a pouch away from other pieces.",
      },
      {
        q: "Is demi-fine suitable for everyday wear?",
        a: "Yes. Demi-fine pieces are designed for regular wear. The thick gold overlay on our vermeil pieces provides durability that holds up well to daily use with proper care.",
      },
    ],
  },
  all: {
    description:
      "Explore the complete Swana Gems collection. From necklaces and earrings to bracelets and rings, find fine jewelry and personalized gifts for every moment.",
    intro:
      "Browse our full collection of handcrafted jewelry. Whether you are shopping for yourself or searching for a meaningful gift, each piece is designed with quality and style in mind. Discover necklace pendants, hoop earrings, stackable bracelets, band rings, and more.",
    faqs: [
      {
        q: "What types of jewelry do you offer?",
        a: "We offer necklaces, earrings, bracelets, rings, and demi-fine jewelry. You can also explore our personalized collections including birthstone, charm, engraving, and initials pieces.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "All orders arrive in our signature Swana Gems gift packaging. You can add a complimentary personalized message at checkout.",
      },
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy on eligible unworn items. Personalized and final sale items are not eligible for return. See our Shipping page for full details.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-8 business days via USPS or UPS. Express and overnight options are also available. Free standard shipping on orders over $50.",
      },
    ],
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const title = slug === "all" ? "All Jewelry" : category.name;
  const info = categoryInfo[slug] ?? categoryInfo.all;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: title, href: `/category/${slug}` },
  ]);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: absoluteUrl(`/category/${slug}`),
    description: `Shop ${title.toLowerCase()} from Swana Gems.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(product.href),
        name: product.name,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: info.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={faqJsonLd} />
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">{title}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a]">
          {title}
        </h1>
        <p className="text-sm text-[#746d63] leading-relaxed max-w-2xl">
          {info.description}
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <ProductFilter
            products={products}
            categories={categories}
            currentSlug={slug}
            currentTitle={title}
          />

          {/* Category intro */}
          <section className="mt-16 max-w-3xl mx-auto border-t border-[#ede8e3] pt-10">
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-4">
              About {title}
            </h2>
            <p className="text-sm text-[#746d63] leading-relaxed">
              {info.intro}
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-10 max-w-3xl mx-auto">
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-[#ede8e3] border-y border-[#ede8e3]">
              {info.faqs.map((faq, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex items-center justify-between cursor-pointer text-sm text-[#0a0a0a] font-medium list-none">
                    {faq.q}
                    <span className="text-[#746d63] text-lg group-open:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-[#746d63] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#746d63]">No products found in this category.</p>
          <Link
            href="/category/all"
            className="inline-block mt-4 text-sm tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] transition-colors"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
