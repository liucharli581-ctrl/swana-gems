import Link from "next/link";
import type { Metadata } from "next";
import { allProducts } from "@/data/products";
import { stripPrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order History",
  description: "View your past Swana Gems orders, check order status, and track shipments.",
  robots: { index: false, follow: true },
};

export default function OrderHistoryPage() {
  const sampleOrders = [
    {
      id: "SG-A1B2C3D4",
      date: "May 15, 2026",
      status: "Delivered",
      items: [allProducts[0]],
      total: stripPrice(allProducts[0].price),
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">My Orders</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] mb-8">My Orders</h1>

        {sampleOrders.length > 0 ? (
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div key={order.id} className="border border-[#ede8e3] p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#746d63]">
                      Order placed:{" "}
                      <span className="text-[#0a0a0a]">{order.date}</span>
                    </p>
                    <p className="text-xs text-[#746d63] mt-1">
                      Order #:{" "}
                      <span className="text-[#0a0a0a]">{order.id}</span>
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-[#f9f8f7] text-[#0a0a0a] border border-[#e0dbd4]">
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-[#ede8e3] pt-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 aspect-[3/4] bg-[#ede8e3]" />
                      <div className="flex-1">
                        <Link
                          href={item.href}
                          className="text-sm text-[#0a0a0a] hover:text-[#746d63] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#746d63]">Qty 1</p>
                      </div>
                      <p className="text-sm text-[#0a0a0a]">{item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#ede8e3] pt-3 mt-3 flex items-center justify-between">
                  <p className="text-sm text-[#0a0a0a] font-medium">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <button
                    type="button"
                    className="text-xs tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] transition-colors"
                  >
                    View Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[#ede8e3]">
            <p className="text-sm text-[#746d63] mb-4">No orders yet.</p>
            <Link
              href="/category/all"
              className="inline-block px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
