"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { allProducts, getProductBySlug } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { stripPrice } from "@/lib/site";
import { shippingOptions } from "@/lib/commerce";

function CartContent() {
  const searchParams = useSearchParams();
  const { items, addItem, updateQuantity, removeItem, count } = useCart();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const add = searchParams.get("add");
    if (add) {
      const product = getProductBySlug(add);
      if (product) {
        addItem(product.id);
      }
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartProducts = items
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      return product ? { ...product, cartQuantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (sum, p) => sum + stripPrice(p!.price) * p!.cartQuantity,
    0
  );
  const shipping = subtotal >= 50 ? 0 : 6.95;
  const estimatedTotal = subtotal + shipping;

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-10">
      <section>
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">
          Shopping Bag
        </h1>

        {!hydrated ? (
          <div className="py-10 text-center text-sm text-[#746d63]">Loading...</div>
        ) : cartProducts.length > 0 ? (
          <div className="border-y border-[#ede8e3] divide-y divide-[#ede8e3]">
            {cartProducts.map((p) => (
              <div key={p!.id} className="py-6 flex gap-5">
                <div className="w-28 sm:w-36 aspect-square bg-[#ede8e3] flex-shrink-0 relative overflow-hidden p-2">
                  <Image
                    src={p!.image}
                    alt={p!.name}
                    fill
                    sizes="144px"
                    className="object-contain object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.15em] uppercase text-[#746d63] mb-1">
                        {p!.category}
                      </p>
                      <h2 className="font-serif text-xl text-[#0a0a0a]">
                        {p!.name}
                      </h2>
                    </div>
                    <p className="text-sm font-medium text-[#0a0a0a] whitespace-nowrap">
                      {p!.price}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-4 text-xs text-[#746d63]">
                    <div className="flex items-center border border-[#d4cfc8]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(p!.id, p!.cartQuantity - 1)}
                        className="px-2.5 py-1.5 hover:bg-[#f9f8f7] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 py-1.5 border-x border-[#d4cfc8] text-[#0a0a0a] min-w-[2rem] text-center">
                        {p!.cartQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(p!.id, p!.cartQuantity + 1)}
                        className="px-2.5 py-1.5 hover:bg-[#f9f8f7] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <Link
                      href="/category/all"
                      className="border-b border-[#746d63] hover:text-[#0a0a0a]"
                    >
                      Continue shopping
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(p!.id)}
                      className="border-b border-[#746d63] hover:text-[#0a0a0a] ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#ede8e3] p-8 text-center">
            <p className="text-sm text-[#746d63] mb-4">
              Your shopping bag is empty.
            </p>
            <Link
              href="/category/all"
              className="inline-block px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
            >
              Shop Jewelry
            </Link>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-serif text-2xl text-[#0a0a0a] mb-4">Shipping Options</h2>
          <div className="divide-y divide-[#ede8e3] border-y border-[#ede8e3]">
            {shippingOptions.map((option) => (
              <div key={option.name} className="py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#0a0a0a]">{option.name}</p>
                  <p className="text-xs text-[#746d63]">{option.estimate} via {option.carrier}</p>
                </div>
                <p className="text-sm text-[#0a0a0a]">{option.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="lg:sticky lg:top-32 h-fit border border-[#e0dbd4] p-6">
        <h2 className="font-serif text-2xl text-[#0a0a0a] mb-5">Order Summary</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-[#746d63]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#746d63]">
            <span>Estimated shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="pt-4 border-t border-[#ede8e3] flex justify-between text-[#0a0a0a] font-medium">
            <span>Estimated total</span>
            <span>${estimatedTotal.toFixed(2)}</span>
          </div>
        </div>

        <Link
          href={hydrated && count > 0 ? "/checkout" : "#"}
          className={`mt-6 block w-full px-8 py-3.5 text-sm tracking-[0.1em] uppercase text-center transition-colors ${
            count > 0
              ? "bg-[#0a0a0a] text-white hover:bg-[#3c3c3c]"
              : "bg-[#ede8e3] text-[#ada297] cursor-not-allowed"
          }`}
        >
          Secure Checkout
        </Link>

        <div className="mt-5 pt-5 border-t border-[#ede8e3]">
          <label className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-2">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 px-3 py-2.5 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]"
            />
            <button type="button" className="px-4 py-2.5 bg-[#0a0a0a] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors">
              Apply
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Shopping Bag</span>
      </nav>

      <Suspense fallback={<div className="py-10 text-center text-sm text-[#746d63]">Loading...</div>}>
        <CartContent />
      </Suspense>
    </div>
  );
}
