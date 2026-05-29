import HeroCarousel from "@/components/HeroCarousel";
import ValuesBanner from "@/components/ValuesBanner";
import CategorySlider from "@/components/CategorySlider";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import Personalization from "@/components/Personalization";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    image: absoluteUrl("/images/hero/HeroBanner_d_2x.jpg"),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@swanagems.com",
      telephone: "+1-800-123-4567",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      "https://instagram.com",
      "https://facebook.com",
      "https://pinterest.com",
      "https://tiktok.com",
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <HeroCarousel />
      <ValuesBanner />
      <CategorySlider />
      <ProductGrid />
      <PromoBanner />
      <Personalization />
    </>
  );
}
