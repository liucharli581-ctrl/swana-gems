import type { MetadataRoute } from "next";
import { allProducts, categories, personalizationItems } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/new-arrivals",
  "/best-sellers",
  "/gifts",
  "/shipping",
  "/faq",
  "/contact",
  "/about",
  "/size-guide",
  "/care-guide",
  "/privacy",
  "/terms",
  "/accessibility",
  "/sustainability",
  "/press",
  "/search",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified,
      changeFrequency: route === "/" ? "daily" : "monthly",
      priority: route === "/" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(category.href),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [absoluteUrl(category.image)],
    })),
    ...allProducts.map((product) => ({
      url: absoluteUrl(product.href),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [absoluteUrl(product.image)],
    })),
    ...personalizationItems.map((item) => ({
      url: absoluteUrl(item.href),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [absoluteUrl(item.image)],
    })),
  ];

  return routes as MetadataRoute.Sitemap;
}
