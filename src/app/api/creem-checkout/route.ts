import { allProducts } from "@/data/products";
import { creemProductIds } from "@/data/creem-products";

const CREEM_API_KEY = process.env.CREEM_API_KEY;

export async function POST(request: Request) {
  try {
    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return Response.json({ error: "Product ID is required" }, { status: 400 });
    }

    const creemProductId = creemProductIds[productId];
    if (!creemProductId) {
      return Response.json({ error: "Product not configured for Creem payment" }, { status: 400 });
    }

    const product = allProducts.find((p) => p.id === productId);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Creem API: create checkout session
    const isTestKey = CREEM_API_KEY?.startsWith("creem_test");
    const response = await fetch(
      isTestKey
        ? "https://test-api.creem.io/v1/checkouts"
        : "https://api.creem.io/v1/checkouts",
      {
        method: "POST",
        headers: {
          "x-api-key": CREEM_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: creemProductId,
          units: quantity,
          success_url: `${origin}/order-confirmation?product_id=${product.id}`,
          request_id: `order-${product.id}-${Date.now()}`,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[Creem] API error:", error);
      return Response.json({ error: "Payment service error" }, { status: 502 });
    }

    const data = await response.json();

    return Response.json({
      checkout_url: data.checkout_url,
      id: data.id,
    });
  } catch (error) {
    console.error("[Creem] Error:", error);
    return Response.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
