import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { allProducts, getProductBySlug } from "@/data/products";
import PlaceOrderButton from "@/components/PlaceOrderButton";
import {
  checkoutTrustSignals,
  paymentMethods,
  shippingOptions,
} from "@/lib/commerce";
import { stripPrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description:
    "Complete your Swana Gems order with secure payment and shipping options.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item } = await searchParams;
  const product = item ? getProductBySlug(item) : allProducts[0];
  const subtotal = product ? stripPrice(product.price) : 0;

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/cart" className="hover:text-[#0a0a0a] transition-colors">
          Shopping Bag
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Checkout</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_420px] gap-10">
        <form className="space-y-10">
          <section>
            <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">
              Secure Checkout
            </h1>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">
                  Email
                </span>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]"
                />
              </label>
              <label className="block">
                <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">
                  Phone
                </span>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0a0a0a] mb-4">
              Shipping Address
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "First name",
                "Last name",
                "Address",
                "Apartment, suite, etc.",
                "City",
                "State",
                "ZIP code",
                "Country",
              ].map((label) => (
                <label key={label} className="block">
                  <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">
                    {label}
                  </span>
                  <input className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]" />
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0a0a0a] mb-4">
              Delivery Method
            </h2>
            <div className="divide-y divide-[#ede8e3] border border-[#ede8e3]">
              {shippingOptions.map((option, index) => (
                <label
                  key={option.name}
                  className="flex items-start gap-3 p-4 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="shipping"
                    defaultChecked={index === 0}
                    className="mt-1"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-[#0a0a0a]">
                      {option.name}
                    </span>
                    <span className="block text-xs text-[#746d63]">
                      {option.estimate} via {option.carrier}
                    </span>
                  </span>
                  <span className="text-sm text-[#0a0a0a]">{option.price}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0a0a0a] mb-4">
              Payment
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {paymentMethods.map((method, index) => (
                <label
                  key={method.name}
                  className="border border-[#ede8e3] p-4 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={index === 0}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-[#0a0a0a]">
                    {method.name}
                  </span>
                  <span className="block text-xs text-[#746d63] mt-1">
                    {method.description}
                  </span>
                </label>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                placeholder="Card number"
                className="sm:col-span-2 px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]"
              />
              <input
                placeholder="MM / YY"
                className="px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]"
              />
              <input
                placeholder="CVC"
                className="px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </section>
        </form>

        <aside className="lg:sticky lg:top-32 h-fit border border-[#e0dbd4] p-6">
          <h2 className="font-serif text-2xl text-[#0a0a0a] mb-5">
            Order Summary
          </h2>
          {product && (
            <div className="flex gap-4 pb-5 border-b border-[#ede8e3]">
              <div className="w-20 aspect-square bg-[#ede8e3] flex-shrink-0 relative overflow-hidden p-1.5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-contain object-center"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#0a0a0a]">{product.name}</p>
                <p className="text-xs text-[#746d63] mt-1">Qty 1</p>
              </div>
              <p className="text-sm text-[#0a0a0a]">{product.price}</p>
            </div>
          )}

          <div className="space-y-3 text-sm mt-5">
            <div className="flex justify-between text-[#746d63]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#746d63]">
              <span>Shipping</span>
              <span>{subtotal >= 50 ? "Free" : "$6.95"}</span>
            </div>
            <div className="pt-4 border-t border-[#ede8e3] flex justify-between text-[#0a0a0a] font-medium">
              <span>Total</span>
              <span>${(subtotal >= 50 ? subtotal : subtotal + 6.95).toFixed(2)}</span>
            </div>
          </div>

          {product && <PlaceOrderButton productId={product.id} />}

          <ul className="mt-5 space-y-2">
            {checkoutTrustSignals.map((signal) => (
              <li key={signal} className="text-xs text-[#746d63]">
                {signal}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
