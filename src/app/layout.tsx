import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/lib/wishlist-context";
import { CartProvider } from "@/lib/cart-context";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Swana Gems | Fine Jewelry & Personalized Gifts",
    template: "%s | Swana Gems",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: "Swana Gems | Fine Jewelry & Personalized Gifts",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero/HeroBanner_d_2x.jpg",
        width: 1440,
        height: 720,
        alt: "Swana Gems fine jewelry collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swana Gems | Fine Jewelry & Personalized Gifts",
    description: siteConfig.description,
    images: ["/images/hero/HeroBanner_d_2x.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-[#0a0a0a] focus:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
        >
          Skip to content
        </a>
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
