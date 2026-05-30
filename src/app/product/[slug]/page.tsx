import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, allProducts } from "@/data/products";
import { getProductDetail, reviewStats } from "@/data/product-detail";
import ProductCard from "@/components/ProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, stripPrice } from "@/lib/site";
import { breadcrumbJsonLd, schemaAvailability } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description.length > 155
      ? `${product.description.slice(0, 152)}...`
      : product.description,
    alternates: { canonical: product.href },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      url: absoluteUrl(product.href),
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.href.replace("/product/", "") }));
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          className={`${cls} ${star <= rating ? "text-[#f1e02b]" : "text-[#d4cfc8]"}`}
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewStars({ rating }: { rating: number }) {
  const pct = (rating / 5) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-24 h-4">
        <div className="absolute inset-0 flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 text-[#d4cfc8]" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <div
          className="absolute inset-0 flex gap-0.5 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-[#f1e02b]" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-3 text-[#0a0a0a]">{stars}</span>
      <div className="flex-1 h-2 bg-[#ede8e3] rounded-full overflow-hidden">
        <div className="h-full bg-[#f1e02b] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-[#746d63]">{count}</span>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const detail = getProductDetail(product.id);

  const categoryHref = `/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`;
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const total = reviewStats.total;
  const dist = reviewStats.distribution;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: absoluteUrl(product.image),
    description: product.description,
    sku: product.sku,
    mpn: product.mpn,
    material: product.material,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(product.href),
      priceCurrency: "USD",
      price: stripPrice(product.price),
      availability: schemaAvailability(product.availability),
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "USD" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 8, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewStats.average,
      reviewCount: reviewStats.total,
      bestRating: 5,
    },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: product.category, href: categoryHref },
    { name: product.name, href: product.href },
  ]);

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(product.href),
    review: detail.reviews.slice(0, 3).map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.content,
    })),
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <JsonLd data={productJsonLd} />
      <JsonLd data={reviewJsonLd} />
      <JsonLd data={breadcrumbs} />

      {/* Breadcrumb */}
      <nav className="text-xs text-[#746d63] tracking-wide mb-8">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href={categoryHref} className="hover:text-[#0a0a0a] transition-colors">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">{product.name}</span>
      </nav>

      {/* ─── Product Detail ─── */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-14 mb-20">
        <ProductImageGallery
          images={[
            { src: product.image, alt: `${product.name} - Model` },
            ...(product.hoverImage && product.hoverImage !== product.image
              ? [{ src: product.hoverImage, alt: `${product.name} - Product Detail` }]
              : []),
          ]}
          productName={product.name}
        />

        <div className="flex flex-col">
          {product.badge && (
            <span className="inline-block bg-[#f1e02b] text-[#0a0a0a] text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 font-medium w-fit mb-4">
              {product.badge}
            </span>
          )}
          <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-2">
            {product.category}
          </p>
          <h1 className="font-serif text-3xl lg:text-4xl text-[#0a0a0a] mb-2">
            {product.name}
          </h1>

          {/* Star rating in detail */}
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={4} size="sm" />
            <span className="text-xs text-[#746d63]">
              {reviewStats.average} ({reviewStats.total.toLocaleString()} reviews)
            </span>
          </div>

          <p className="text-2xl font-medium text-[#0a0a0a] mb-6">
            {product.price}
          </p>

          <p className="text-sm text-[#746d63] leading-relaxed mb-8">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-3 text-sm mb-8 border-t border-[#ede8e3] pt-6">
            <div>
              <dt className="text-xs tracking-[0.12em] uppercase text-[#746d63]">Material</dt>
              <dd className="text-[#0a0a0a]">{product.material}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.12em] uppercase text-[#746d63]">SKU</dt>
              <dd className="text-[#0a0a0a]">{product.sku}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.12em] uppercase text-[#746d63]">Stock</dt>
              <dd className="text-[#0a0a0a]">
                {product.availability === "in_stock" ? "In stock" : "Out of stock"}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.12em] uppercase text-[#746d63]">Condition</dt>
              <dd className="text-[#0a0a0a]">New</dd>
            </div>
          </dl>

          <AddToCartButton productId={product.id} price={product.price} />

          <div className="mt-6 space-y-2 text-sm text-[#746d63]">
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              Free shipping on orders $50+
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              Easy 30-day returns
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              Secure checkout with SSL encryption
            </p>
          </div>
        </div>
      </div>

      {/* ─── Customer Photos ─── */}
      {detail.customerPhotos.length > 0 && (
        <section className="mb-20">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-2">Real People, Real Style</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-[#0a0a0a]">
              As Seen On Our Customers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {detail.customerPhotos.map((photo) => (
              <div key={photo.id} className="aspect-[4/5] bg-[#ede8e3] overflow-hidden relative group">
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-xs tracking-wide">{photo.author}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <span className="text-xs text-[#746d63]">
              Tag <span className="text-[#0a0a0a] font-medium">@swana.gems</span> on Instagram for a chance to be featured
            </span>
          </div>
        </section>
      )}

      {/* ─── You May Also Like ─── */}
      {related.length > 0 && (
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl lg:text-3xl text-[#0a0a0a]">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section className="mb-20 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl lg:text-3xl text-[#0a0a0a]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#746d63] mt-2">
            Please see below for answers to frequently asked questions.
          </p>
        </div>
        <div className="divide-y divide-[#ede8e3] border-y border-[#ede8e3]">
          {detail.faqs.map((faq, i) => (
            <details key={i} className="group py-5">
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

      {/* ─── Reviews ─── */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl lg:text-3xl text-[#0a0a0a]">
            Customer Reviews
          </h2>
        </div>

        {/* Rating summary */}
        <div className="grid md:grid-cols-[280px_1fr] gap-8 mb-10 pb-8 border-b border-[#ede8e3]">
          <div className="text-center md:text-left">
            <div className="text-5xl font-serif text-[#0a0a0a] mb-2">{reviewStats.average}</div>
            <StarRating rating={4} size="lg" />
            <p className="text-xs text-[#746d63] mt-2">
              {total.toLocaleString()} Reviews
            </p>
          </div>
          <div className="space-y-1.5">
            {[5, 4, 3, 2, 1].map((stars) => (
              <RatingBar
                key={stars}
                stars={stars}
                count={dist[stars as keyof typeof dist]}
                total={total}
              />
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="space-y-6">
          {detail.reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-[#ede8e3]">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} size="sm" />
                {review.verified && (
                  <span className="text-[10px] text-[#746d63] uppercase tracking-wide border border-[#d4cfc8] px-1.5 py-0.5">
                    Verified
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-[#0a0a0a] mb-1">{review.title}</h3>
              <p className="text-sm text-[#746d63] leading-relaxed">{review.content}</p>
              <p className="text-xs text-[#ada297] mt-2">
                {review.author} &middot; {review.date}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            type="button"
            className="px-8 py-3 border border-[#0a0a0a] text-[#0a0a0a] text-sm tracking-[0.1em] uppercase hover:bg-[#0a0a0a] hover:text-white transition-colors"
          >
            Write a Review
          </button>
        </div>
      </section>
    </div>
  );
}
