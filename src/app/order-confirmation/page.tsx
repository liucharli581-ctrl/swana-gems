import Link from "next/link";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ product_id?: string }>;
}) {
  const { product_id } = await searchParams;

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16 lg:py-24 text-center">
      <div className="max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-sm text-[#746d63] mb-8 leading-relaxed">
          Your payment has been processed successfully. You will receive an email confirmation shortly with your order details and tracking information.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/category/all"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#0a0a0a] text-[#0a0a0a] text-sm tracking-[0.1em] uppercase hover:bg-[#0a0a0a] hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
