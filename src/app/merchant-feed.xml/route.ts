import { allProducts } from "@/data/products";
import { absoluteUrl, escapeXml, stripPrice } from "@/lib/site";
import { merchantAvailability } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const items = allProducts
    .map((product) => {
      const price = `${stripPrice(product.price).toFixed(2)} USD`;

      return `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(`${product.brand} ${product.name}`)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(absoluteUrl(product.href))}</g:link>
      <g:image_link>${escapeXml(absoluteUrl(product.image))}</g:image_link>
      <g:availability>${escapeXml(merchantAvailability(product.availability))}</g:availability>
      <g:price>${escapeXml(price)}</g:price>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:mpn>${escapeXml(product.mpn)}</g:mpn>
      <g:condition>${escapeXml(product.condition)}</g:condition>
      <g:google_product_category>${escapeXml(product.googleProductCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(product.productType)}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>${stripPrice(product.price) >= 50 ? "0.00" : "6.95"} USD</g:price>
      </g:shipping>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Swana Gems Product Feed</title>
    <link>${escapeXml(absoluteUrl("/"))}</link>
    <description>Product feed for Swana Gems jewelry.</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
