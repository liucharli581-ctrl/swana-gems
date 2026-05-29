import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Read the Swana Gems accessibility statement and contact information for website accessibility support.",
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Accessibility</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-6">Accessibility</h1>
        <p className="text-sm text-[#746d63] mb-10">
          Swana Gems is committed to ensuring digital accessibility for all people, including those with disabilities.
          We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>

        <div className="space-y-6 text-sm text-[#746d63] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Our Commitment</h2>
            <p>
              We strive to make our website accessible and usable for everyone, regardless of technology or ability.
              Our goal is to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Accessibility Features</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Semantic HTML structure for screen reader compatibility</li>
              <li>Keyboard navigation support throughout the site</li>
              <li>Descriptive alt text for all product images</li>
              <li>Sufficient color contrast for readability</li>
              <li>Responsive design for various screen sizes and zoom levels</li>
              <li>Clear and consistent navigation patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Ongoing Improvements</h2>
            <p>
              Accessibility is an ongoing effort. We regularly review our website to identify and address
              accessibility barriers. As we continue to develop and update our site, we are committed to
              maintaining and improving accessibility.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter any barriers or
              have suggestions for improvement, please contact us.
            </p>
            <p className="mt-4">
              Email: <span className="text-[#0a0a0a]">accessibility@swanagems.com</span>
            </p>
            <p>
              Phone: <span className="text-[#0a0a0a]">+1 (800) 123-4567</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
