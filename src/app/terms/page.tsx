import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the Swana Gems terms of service for website use, orders, pricing, returns, and customer responsibilities.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Terms of Service</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Terms of Service</h1>
        <p className="text-xs text-[#746d63] mb-8">Last updated: May 2026</p>

        <div className="space-y-6 text-sm text-[#746d63] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">General</h2>
            <p>By using the Swana Gems website and purchasing our products, you agree to these terms of service. Please read them carefully before making a purchase.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Products & Pricing</h2>
            <p>All prices are listed in US dollars and are subject to change without notice. We reserve the right to modify or discontinue products at any time. Images are for illustration purposes; actual products may vary slightly.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Orders & Payment</h2>
            <p>By placing an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel orders at our discretion. Payment is due at the time of purchase.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Shipping & Returns</h2>
            <p>Shipping and return policies are outlined on our Shipping and FAQ pages. Please review these before making a purchase. Personalized items are final sale unless there is a manufacturing defect.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Intellectual Property</h2>
            <p>All content on this website — including designs, logos, text, and images — is the property of Swana Gems and may not be reproduced without written permission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Limitation of Liability</h2>
            <p>Swana Gems shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Contact</h2>
            <p>For questions about these terms, please contact us at legal@swanagems.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
