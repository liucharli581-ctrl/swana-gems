"use client";

import { useState } from "react";

export default function PlaceOrderButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/creem-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert("Failed to create checkout session. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePlaceOrder}
      disabled={loading}
      className="mt-6 block w-full px-8 py-3.5 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors text-center disabled:opacity-50"
    >
      {loading ? "Redirecting to payment..." : "Place Order"}
    </button>
  );
}
