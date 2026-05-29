import { Product, Category } from "@/types";

export const categories: Category[] = [
  { name: "Necklaces", href: "/category/necklaces", image: "/images/categories/necklaces.webp" },
  { name: "Earrings", href: "/category/earrings", image: "/images/categories/earrings.webp" },
  { name: "Bracelets", href: "/category/bracelets", image: "/images/categories/bracelets.webp" },
  { name: "Rings", href: "/category/rings", image: "/images/categories/rings.webp" },
  { name: "Demi-Fine Jewelry", href: "/category/demi-fine", image: "/images/categories/demi-fine.webp" },
  { name: "All Jewelry", href: "/category/all", image: "/images/categories/all.webp" },
];

const jewelryCategory = "Apparel & Accessories > Jewelry";

export const allProducts: Product[] = [
  /* ─── Necklaces ─── */
  {
    id: "n1",
    name: "Elisa Pendant Necklace",
    category: "Necklaces",
    price: "$42.50",
    description: "A signature pendant necklace with a polished chain and luminous stone detail for everyday styling.",
    image: "/images/products/elisa-pendant-hover.webp",
    hoverImage: "/images/products/elisa-pendant.webp",
    href: "/product/elisa-pendant-necklace",
    sku: "SG-N-ELISA-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold-tone plated brass, stone accent",
    mpn: "ELISA-PENDANT",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Pendant Necklaces",
    badge: "Best Seller",
  },
  {
    id: "n2",
    name: "Silver Bar Pendant",
    category: "Necklaces",
    price: "$34.50",
    description: "A sleek sterling silver bar pendant on a fine cable chain. Minimalist design that transitions effortlessly from desk to dinner.",
    image: "/images/products/silver-bar-model.webp",
    hoverImage: "/images/products/silver-bar-model-hover.webp",
    href: "/product/silver-bar-pendant",
    sku: "SG-N-SILVER-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Sterling silver",
    mpn: "SILVER-BAR",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Pendant Necklaces",
    badge: "New",
  },
  {
    id: "n3",
    name: "Signature Chain Necklace",
    category: "Necklaces",
    price: "$38.00",
    description: "A delicate chain necklace with a subtle pendant drop, designed for everyday elegance and easy layering.",
    image: "/images/products/signature-chain-model.webp",
    hoverImage: "/images/products/signature-chain.webp",
    href: "/product/signature-chain-necklace",
    sku: "SG-N-SIGN-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold-tone plated brass",
    mpn: "SIGNATURE-CHAIN",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Chain Necklaces",
    badge: "Best Seller",
  },
  {
    id: "n4",
    name: "Amethyst Pendant Necklace",
    category: "Necklaces",
    price: "$46.00",
    description: "A vibrant amethyst crystal pendant set in a gold-tone bezel on a delicate chain. Adds a pop of color to any outfit.",
    image: "/images/products/amethyst-pendant.webp",
    hoverImage: "/images/products/amethyst-pendant-hover.webp",
    href: "/product/amethyst-pendant-necklace",
    sku: "SG-N-AMETHYST-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold-tone plated brass, amethyst crystal",
    mpn: "AMETHYST-PENDANT",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Pendant Necklaces",
    badge: "New",
  },

  /* ─── Earrings ─── */
  {
    id: "e1",
    name: "Classic Hoop Earrings",
    category: "Earrings",
    price: "$27.50",
    description: "Lightweight hoop earrings with a polished finish designed for daily wear and easy gifting.",
    image: "/images/products/classic-hoop-main.webp",
    hoverImage: "/images/products/classic-hoop-hover.webp",
    href: "/product/classic-hoop-earrings",
    sku: "SG-E-HOOP-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold-tone plated brass",
    mpn: "CLASSIC-HOOP",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Earrings > Hoop Earrings",
    badge: "Best Seller",
  },
  {
    id: "e2",
    name: "Gold Drop Necklace",
    category: "Necklaces",
    price: "$32.00",
    description: "Elegant gold drop necklace with a warm gold finish. Lightweight enough for everyday wear with enough presence for evenings out.",
    image: "/images/products/gold-drop-model.webp",
    hoverImage: "/images/products/gold-drop-model-hover.webp",
    href: "/product/gold-drop-necklace",
    sku: "SG-N-DROP-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold-tone plated brass",
    mpn: "GOLD-DROP-01",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Pendant Necklaces",
    badge: "Trending",
  },

  /* ─── Bracelets ─── */
  {
    id: "b1",
    name: "Friendship Bracelet Set",
    category: "Bracelets",
    price: "$22.50",
    description: "A stackable bracelet set made for gifting, layering, and everyday color.",
    image: "/images/products/friendship-bracelet.webp",
    hoverImage: "/images/products/friendship-bracelet-hover.webp",
    href: "/product/friendship-bracelet",
    sku: "SG-B-FRIEND-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Mixed cord and plated metal accents",
    mpn: "FRIENDSHIP-SET",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Bracelets > Friendship Bracelets",
    badge: "Trending",
  },
  {
    id: "b2",
    name: "Diamond Tennis Bracelet",
    category: "Bracelets",
    price: "$300",
    description: "A refined tennis bracelet with bright stone settings and a secure clasp for special occasions.",
    image: "/images/products/diamond-tennis-bracelet.webp",
    hoverImage: "/images/products/diamond-tennis-bracelet-hover.webp",
    href: "/product/diamond-tennis-bracelet",
    sku: "SG-B-TENNIS-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Sterling silver, lab-grown diamond accents",
    mpn: "DIAMOND-TENNIS",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Bracelets > Tennis Bracelets",
    badge: "Best Seller",
  },

  /* ─── Rings ─── */
  {
    id: "r1",
    name: "Tatum Band Ring",
    category: "Rings",
    price: "$32.50",
    description: "A slim band ring with a clean profile for stacking or wearing solo.",
    image: "/images/products/tatum-band-ring.webp",
    hoverImage: "/images/products/tatum-band-ring-hover.webp",
    href: "/product/tatum-band-ring",
    sku: "SG-R-TATUM-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold-tone plated brass",
    mpn: "TATUM-BAND",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Rings > Band Rings",
    badge: "New",
  },

  /* ─── Demi-Fine Jewelry ─── */
  {
    id: "d1",
    name: "Shell Pendant Necklace",
    category: "Demi-Fine Jewelry",
    price: "$68.00",
    description: "An elegant shell pendant on a gold-tone chain. Lightweight, natural, and effortlessly sophisticated for elevated everyday style.",
    image: "/images/products/shell-pendant.webp",
    hoverImage: "/images/products/shell-pendant-hover.webp",
    href: "/product/shell-pendant-necklace",
    sku: "SG-D-SHELL-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold vermeil over sterling silver, natural shell",
    mpn: "SHELL-PENDANT",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Pendant Necklaces",
    badge: "Best Seller",
  },
  {
    id: "d2",
    name: "Crystal Drop Necklace",
    category: "Demi-Fine Jewelry",
    price: "$68.00",
    description: "An elegant crystal drop necklace with a delicate chain. Elevated demi-fine quality for special moments and sophisticated everyday style.",
    image: "/images/products/crystal-drop-model.webp",
    hoverImage: "/images/products/crystal-drop-model-hover.webp",
    href: "/product/crystal-drop-necklace",
    sku: "SG-D-CRYSTAL-001",
    brand: "Swana Gems",
    availability: "in_stock",
    condition: "new",
    material: "Gold vermeil over sterling silver, crystal",
    mpn: "CRYSTAL-DROP",
    googleProductCategory: jewelryCategory,
    productType: "Jewelry > Necklaces > Pendant Necklaces",
    badge: "New",
  },
];

export const featuredProducts: Product[] = allProducts.filter((p) => p.badge);

export function getProductsByCategory(slug: string): Product[] {
  const categoryMap: Record<string, string> = {
    necklaces: "Necklaces",
    earrings: "Earrings",
    bracelets: "Bracelets",
    rings: "Rings",
    "demi-fine": "Demi-Fine Jewelry",
    all: "All Jewelry",
  };
  const catName = categoryMap[slug];
  if (!catName || catName === "All Jewelry") return allProducts;
  return allProducts.filter((p) => p.category === catName);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => {
    const catSlug = c.href.replace("/category/", "");
    return catSlug === slug;
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => {
    const productSlug = p.href.replace("/product/", "");
    return productSlug === slug;
  });
}

export const personalizationItems = [
  { name: "Birthstone", description: "Personalize with meaningful gemstones", image: "/images/personalization/birthstone.webp", href: "/collection/birthstone" },
  { name: "Charms", description: "Build your own charm jewelry", image: "/images/personalization/charms.webp", href: "/collection/charms" },
  { name: "Engraving", description: "Add a personal message", image: "/images/personalization/engraving.webp", href: "/collection/engraving" },
  { name: "Initials", description: "Monogrammed jewelry", image: "/images/personalization/initials.webp", href: "/collection/initials" },
];
