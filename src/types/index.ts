export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  hoverImage?: string;
  href: string;
  sku: string;
  brand: string;
  availability: "in_stock" | "out_of_stock" | "preorder";
  condition: "new" | "used" | "refurbished";
  material: string;
  mpn: string;
  googleProductCategory: string;
  productType: string;
  badge?: string;
}

export interface Category {
  name: string;
  href: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
