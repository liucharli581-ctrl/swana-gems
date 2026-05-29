import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Swana Gems account for faster checkout, order tracking, and exclusive offers.",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-16">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/account/login" className="hover:text-[#0a0a0a] transition-colors">Sign In</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Create Account</span>
      </nav>

      <div className="max-w-md mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] mb-2">Create Account</h1>
        <p className="text-sm text-[#746d63] mb-8">
          Join Swana Gems for a faster checkout experience and exclusive benefits.
        </p>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">First name</span>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
            </label>
            <label className="block">
              <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">Last name</span>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
            </label>
          </div>
          <label className="block">
            <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">Email</span>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
            />
          </label>
          <label className="block">
            <span className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">Password</span>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
            />
          </label>

          <p className="text-xs text-[#746d63]">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5">Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#746d63]">
          Already have an account?{" "}
          <Link href="/account/login" className="text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
