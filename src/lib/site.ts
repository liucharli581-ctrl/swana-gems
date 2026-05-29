export const siteConfig = {
  name: "Swana Gems",
  url: process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    ?? "https://www.swanagems.com",
  description:
    "Shop Swana Gems for fine jewelry, personalized gifts, necklaces, earrings, bracelets, rings, and everyday pieces with secure checkout and reliable shipping.",
  keywords: [
    "fine jewelry",
    "personalized jewelry",
    "necklaces",
    "earrings",
    "bracelets",
    "rings",
    "gifts",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function stripPrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function escapeXml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
