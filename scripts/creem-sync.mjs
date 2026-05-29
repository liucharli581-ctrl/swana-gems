#!/usr/bin/env node

/**
 * Bulk upload products to Creem.
 * Usage: node scripts/creem-sync.mjs
 *
 * Requires env: CREEM_API_KEY
 * Optional: CREEM_MODE=test (default) or production
 */

const CREEM_API_KEY = process.env.CREEM_API_KEY;
const IS_PROD = process.env.CREEM_MODE === "production";
const BASE_URL = IS_PROD
  ? "https://api.creem.io/v1/products"
  : "https://test-api.creem.io/v1/products";

const products = [
  { id: "n1", name: "Elisa Pendant Necklace", price: 4250, description: "A signature pendant necklace with a polished chain and luminous stone detail for everyday styling." },
  { id: "n2", name: "Silver Bar Pendant", price: 3450, description: "A sleek sterling silver bar pendant on a fine cable chain. Minimalist design." },
  { id: "n3", name: "Signature Chain Necklace", price: 3800, description: "A delicate chain necklace with a subtle pendant drop, designed for everyday elegance." },
  { id: "n4", name: "Amethyst Pendant Necklace", price: 4600, description: "A vibrant amethyst crystal pendant set in a gold-tone bezel on a delicate chain." },
  { id: "e1", name: "Classic Hoop Earrings", price: 2750, description: "Lightweight hoop earrings with a polished finish designed for daily wear." },
  { id: "e2", name: "Gold Drop Necklace", price: 3200, description: "Elegant gold drop necklace with a warm gold finish. Lightweight for everyday wear." },
  { id: "b1", name: "Friendship Bracelet Set", price: 2250, description: "A stackable bracelet set made for gifting, layering, and everyday color." },
  { id: "b2", name: "Diamond Tennis Bracelet", price: 30000, description: "A refined tennis bracelet with bright stone settings and a secure clasp." },
  { id: "r1", name: "Tatum Band Ring", price: 3250, description: "A slim band ring with a clean profile for stacking or wearing solo." },
  { id: "d1", name: "Shell Pendant Necklace", price: 6800, description: "An elegant shell pendant on a gold-tone chain. Lightweight and effortlessly sophisticated." },
  { id: "d2", name: "Crystal Drop Necklace", price: 6800, description: "An elegant crystal drop necklace with a delicate chain. Elevated demi-fine quality." },
];

async function createProduct(product) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "x-api-key": CREEM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: product.name,
      price: product.price,
      currency: "USD",
      billing_type: "onetime",
      description: product.description,
      tax_mode: "exclusive",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create ${product.name}: ${error}`);
  }

  return await response.json();
}

async function main() {
  if (!CREEM_API_KEY) {
    console.error("Error: CREEM_API_KEY environment variable is required");
    console.error("Usage: CREEM_API_KEY=ck_xxx node scripts/creem-sync.mjs");
    process.exit(1);
  }

  console.log(`\n🔵 Creem Product Sync (${IS_PROD ? "PRODUCTION" : "TEST"} mode)\n`);

  const results = [];

  for (const product of products) {
    process.stdout.write(`  Creating ${product.name} (\$${(product.price / 100).toFixed(2)})... `);
    try {
      const result = await createProduct(product);
      console.log(`✅ ${result.id}`);
      results.push({ id: product.id, creemId: result.id });
    } catch (error) {
      console.log(`❌ ${error.message}`);
    }
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\n📋 Update your src/data/creem-products.ts with:\n");
  console.log("export const creemProductIds: Record<string, string> = {");
  for (const r of results) {
    console.log(`  "${r.id}": "${r.creemId}",`);
  }
  console.log("};");
  console.log("");
}

main().catch(console.error);
