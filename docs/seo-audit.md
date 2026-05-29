# SEO and Ecommerce QA Audit

Date: 2026-05-28

## Summary

The site now has the core SEO and ecommerce data foundations expected for a small Next.js ecommerce storefront:

- Server-rendered or statically generated pages for primary catalog routes.
- Unique metadata for major pages, product pages, category pages, and policy pages.
- Product JSON-LD on each product page.
- Breadcrumb JSON-LD on product and category pages.
- Generated `robots.txt` and `sitemap.xml`.
- Generated Google Merchant Center XML feed at `/merchant-feed.xml`.
- Checkout and cart pages marked `noindex`.
- Product images on product cards, product detail, cart, and checkout rendered with real `img` output through `next/image`.

## Current Passes

### SEO Basics

- Unique title and description are defined for important static pages.
- Product, category, and collection routes use dynamic metadata.
- Product and category canonical URLs are set.
- `robots.txt` allows public pages and disallows private checkout/account paths.
- `sitemap.xml` includes static, category, product, and collection URLs.
- Header logo no longer uses an `h1`, so pages are not polluted by a repeated global heading.
- Homepage hero now uses the page-level `h1`.

### JavaScript SEO

- The project uses Next.js App Router with static generation for product, category, and collection routes.
- Product titles, descriptions, prices, stock status, and SKU data are rendered in HTML.
- Main internal navigation uses standard links.
- Product detail pages return real 404 behavior via `notFound()` for unknown product slugs.

### Ecommerce Structured Data

- Product pages include Product JSON-LD with `name`, `image`, `description`, `brand`, `sku`, `mpn`, `material`, `offers.price`, `offers.priceCurrency`, `offers.availability`, `offers.url`, shipping details, and return policy.
- Product Schema values are driven from the same `src/data/products.ts` source used by the visible page.
- Category pages include `CollectionPage` and `ItemList` JSON-LD.
- Product and category pages include `BreadcrumbList` JSON-LD.

### Merchant Center Feed

- `/merchant-feed.xml` is generated from `src/data/products.ts`.
- Feed includes stable id, title, description, link, image link, availability, price, brand, mpn, condition, Google product category, product type, and shipping.
- Feed URLs and product canonical URLs are based on the same site URL helper.

### Ecommerce Conversion

- Cart and checkout flows exist as conventional ecommerce pages.
- Checkout exposes shipping options, payment options, order summary, and trust signals.
- Product pages show price, stock, SKU, material, shipping, returns, warranty, and add-to-cart CTA.

## Remaining Recommendations Before Production

- Replace placeholder brand/product claims with verified business facts.
- Add real GTIN values where available. If products do not have GTINs, keep MPN/SKU stable.
- Connect real payment processing such as Stripe Checkout, PayPal, Shopify, or another commerce backend.
- Connect real shipping/tax calculation for target markets.
- Add inventory synchronization so feed, schema, and visible stock stay consistent.
- Submit `/sitemap.xml` and `/merchant-feed.xml` in Google Search Console and Merchant Center.
- Validate product pages with Google Rich Results Test and Schema Markup Validator after deployment.
- Run PageSpeed Insights on deployed URLs to confirm LCP, INP, and CLS.
- Add real product reviews only after collecting verified customer reviews.

## Files Added or Updated

- `src/lib/site.ts`
- `src/lib/seo.ts`
- `src/lib/commerce.ts`
- `src/data/products.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/merchant-feed.xml/route.ts`
- `src/app/product/[slug]/page.tsx`
- `src/app/category/[slug]/page.tsx`
- `src/app/cart/page.tsx`
- `src/app/checkout/page.tsx`
- `src/components/ProductCard.tsx`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
