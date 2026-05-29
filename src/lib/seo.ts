import { absoluteUrl } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  href: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function merchantAvailability(availability: string) {
  if (availability === "out_of_stock") return "out of stock";
  if (availability === "preorder") return "preorder";
  return "in stock";
}

export function schemaAvailability(availability: string) {
  if (availability === "out_of_stock") return "https://schema.org/OutOfStock";
  if (availability === "preorder") return "https://schema.org/PreOrder";
  return "https://schema.org/InStock";
}
