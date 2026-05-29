import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to common Swana Gems questions about jewelry, shipping, returns, personalization, sizing, and order support.",
};

const faqs = [
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy from the date of delivery. Items must be unworn, in original condition, and in original packaging. Personalized items are final sale.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5–8 business days. Express shipping (2–3 days) and overnight (1 day) options are also available. See our Shipping page for full details.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes, we offer free standard shipping on all orders over $50 within the continental United States.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team as soon as possible for assistance.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to select countries. International shipping rates and delivery times vary by destination. Customs duties and taxes are the responsibility of the recipient.",
  },
  {
    q: "How do I care for my jewelry?",
    a: "To keep your jewelry looking its best, avoid contact with water, perfumes, and lotions. Store pieces separately in a soft pouch or jewelry box. See our Care Guide for detailed instructions.",
  },
  {
    q: "Are your materials ethically sourced?",
    a: "Yes, we are committed to responsible sourcing. Our gemstones and metals are carefully selected from trusted partners who share our values of ethical production.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes, all orders are beautifully packaged in our signature Swana Gems gift boxes, ready for gifting. You can also add a personalized message at checkout.",
  },
  {
    q: "Can I engrave or personalize a piece?",
    a: "Absolutely! Many of our pieces can be personalized with engraving, birthstones, or charm combinations. Visit our Personalization page to explore options.",
  },
  {
    q: "How do I find my ring size?",
    a: "Refer to our Size Guide for detailed instructions on measuring your ring size at home. You can also visit a local jeweler for an accurate measurement.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">FAQ</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-2">Frequently Asked Questions</h1>
        <p className="text-sm text-[#746d63] mb-10">Find answers to common questions about our products, shipping, and policies.</p>

        <div className="space-y-0 divide-y divide-[#ede8e3]">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer text-sm text-[#0a0a0a] font-medium list-none">
                {faq.q}
                <span className="text-[#746d63] text-lg group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#746d63] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 p-6 bg-[#f9f8f7] text-center">
          <p className="text-sm text-[#746d63] mb-2">Still have questions?</p>
          <Link href="/contact" className="text-sm tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 hover:text-[#746d63] transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
    </>);
}
