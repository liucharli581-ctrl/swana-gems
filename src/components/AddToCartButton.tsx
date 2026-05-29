"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartButton({ productId, price }: { productId: string; price: string }) {
  const { addItem, getQuantity } = useCart();
  const [added, setAdded] = useState(false);
  const qty = getQuantity(productId);

  const handleClick = () => {
    addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full sm:w-auto px-10 py-3.5 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors text-center"
    >
      {added ? "Added! ✓" : `Add to Cart — ${price}`}
    </button>
  );
}
