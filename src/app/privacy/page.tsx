import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Swana Gems collects, uses, protects, and manages customer information for ecommerce orders and services.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Privacy Policy</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Privacy Policy</h1>
        <p className="text-xs text-[#746d63] mb-8">Last updated: May 2026</p>

        <div className="space-y-6 text-sm text-[#746d63] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Information We Collect</h2>
            <p>When you make a purchase or create an account, we collect personal information such as your name, email address, shipping address, and payment details. We also collect browsing information through cookies and similar technologies to improve your shopping experience.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Process and fulfill your orders</li>
              <li>Communicate about your order or account</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and product offerings</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Information Sharing</h2>
            <p>We do not sell your personal information. We may share information with trusted third-party service providers who assist with payment processing, shipping, and marketing, subject to strict confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by contacting us or updating your account preferences.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Contact</h2>
            <p>If you have questions about this privacy policy, please contact us at privacy@swanagems.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
