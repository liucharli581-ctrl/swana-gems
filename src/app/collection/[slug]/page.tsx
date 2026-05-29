import Link from "next/link";
import { notFound } from "next/navigation";
import { personalizationItems } from "@/data/products";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = personalizationItems.find((i) => i.href === `/collection/${slug}`);

  return {
    title: `${item?.name ?? "Personalization"} Collection`,
    description: item?.description ?? "Personalized jewelry from Swana Gems.",
    alternates: {
      canonical: `/collection/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return personalizationItems.map((item) => ({
    slug: item.href.replace("/collection/", ""),
  }));
}

const collectionDescriptions: Record<string, { title: string; description: string }> = {
  birthstone: {
    title: "Birthstone Collection",
    description:
      "Celebrate life's moments with personalized birthstone jewelry. Each piece features genuine gemstones that hold special meaning.",
  },
  charms: {
    title: "Charm Collection",
    description:
      "Build a story that's uniquely yours. Mix and match charms to create a piece that reflects your personality and journey.",
  },
  engraving: {
    title: "Engraving Collection",
    description:
      "Add a personal message, date, or name to make each piece truly one-of-a-kind. Our skilled artisans bring your words to life.",
  },
  initials: {
    title: "Initials Collection",
    description:
      "Monogrammed jewelry that speaks volumes. Elegant initial pieces designed to be worn and cherished everyday.",
  },
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = personalizationItems.find((i) => i.href === `/collection/${slug}`);
  if (!item) notFound();

  const info = collectionDescriptions[slug] || {
    title: item.name,
    description: item.description,
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: info.title,
    url: absoluteUrl(item.href),
    description: info.description,
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">{info.title}</span>
      </nav>

      <div className="relative aspect-[2/1] lg:aspect-[3/1] bg-[#ede8e3] overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <h1 className="font-serif text-3xl lg:text-5xl text-white mb-2">
            {info.title}
          </h1>
          <p className="text-sm text-white/80 max-w-xl">{info.description}</p>
        </div>
      </div>

      <div className="text-center py-16">
        <p className="text-[#746d63] mb-4">This collection is coming soon.</p>
        <p className="text-sm text-[#746d63] mb-8">
          Sign up to be notified when new pieces arrive.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-[#0a0a0a] text-sm focus:outline-none"
          />
          <button className="px-6 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors">
            Notify Me
          </button>
        </div>
      </div>
    </div>
    </>
  );
}