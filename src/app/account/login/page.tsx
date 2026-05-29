import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Swana Gems account to view orders, manage your profile, and check out faster.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-16">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Sign In</span>
      </nav>

      <div className="max-w-md mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] mb-2">Sign In</h1>
        <p className="text-sm text-[#746d63] mb-8">
          Sign in to access your orders, saved items, and faster checkout.
        </p>

        <form className="space-y-5">
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

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#0a0a0a]" />
              <span className="text-[#746d63]">Remember me</span>
            </label>
            <Link href="/account/login" className="text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#746d63]">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
