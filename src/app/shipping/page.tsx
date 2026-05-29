import Link from "next/link";
import type { Metadata } from "next";
import { paymentMethods, shippingOptions } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Shipping, Returns & Payment",
  description:
    "Review Swana Gems shipping options, returns policy, order tracking, and secure payment methods.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Shipping & Payment</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-4">
          Shipping, Returns & Payment
        </h1>
        <p className="text-sm text-[#746d63] leading-relaxed mb-10 max-w-2xl">
          Clear delivery options, secure payment methods, and customer-friendly
          returns for a standard jewelry ecommerce checkout.
        </p>

        <div className="space-y-10 text-sm text-[#746d63] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">
              Shipping Options
            </h2>
            <div className="divide-y divide-[#ede8e3] border-y border-[#ede8e3]">
              {shippingOptions.map((option) => (
                <div
                  key={option.name}
                  className="py-4 flex justify-between items-start gap-4"
                >
                  <div>
                    <p className="text-[#0a0a0a] font-medium">{option.name}</p>
                    <p className="text-xs">
                      {option.estimate} via {option.carrier}
                    </p>
                  </div>
                  <p className="text-[#0a0a0a] font-medium">{option.price}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">
              Payment Methods
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <div key={method.name} className="border border-[#ede8e3] p-4">
                  <p className="text-[#0a0a0a] font-medium">{method.name}</p>
                  <p className="text-xs mt-1">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">
              Processing Time
            </h2>
            <p>
              Orders are processed within 1-2 business days. During peak seasons
              and promotional periods, processing may take slightly longer. You
              will receive a confirmation email once your order ships.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">
              Returns
            </h2>
            <p>
              Eligible unworn items can be returned within 30 days of delivery.
              Personalized and final-sale items cannot be returned unless they
              arrive damaged or defective.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">
              International Shipping
            </h2>
            <p>
              We ship to select international destinations. International orders
              may be subject to customs duties, taxes, and fees, which are the
              responsibility of the recipient. Delivery times vary by location.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Tracking</h2>
            <p>
              Once your order ships, you will receive a tracking number via
              email. You can also track your order through your account
              dashboard.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
