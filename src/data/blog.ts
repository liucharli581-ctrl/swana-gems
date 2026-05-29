export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "swana-gems-redefining-everyday-elegance",
    title: "Swana Gems: Redefining Everyday Elegance for a New Generation",
    excerpt: "How we are striking a rare balance between heirloom quality and everyday accessibility.",
    content: `
      At Swana Gems, we believe jewelry should be more than an occasional indulgence — it should be a part of your everyday story. Our approach to demi-fine jewelry bridges the gap between luxury craftsmanship and everyday wearability.

      Every piece in our collection is designed with intention: quality materials that hold up to daily wear, thoughtful details that catch the light, and timeless silhouettes that transition seamlessly from desk to dinner.

      We work directly with skilled artisans to ensure every piece meets our standards for quality and finish. By keeping our supply chain streamlined, we are able to offer elevated designs at approachable price points — without compromising on the materials or the craft.

      From our best-selling Elisa Pendant to the personalized birthstone collections, each Swana Gems piece is designed to be worn, layered, and loved for years to come.
    `,
    date: "May 2026",
    category: "Brand Story",
  },
  {
    slug: "jewelry-brands-shaping-2026",
    title: "The Jewelry Brands Shaping 2026",
    excerpt: "From personalized pendants to stackable staples, these are the names redefining how we accessorize.",
    content: `
      The jewelry landscape is evolving. A new wave of brands is redefining what jewelry means — shifting away from the notion that fine jewelry is reserved for special occasions and toward a more everyday, personal approach.

      Swana Gems is proud to be part of this movement. Our focus on personalization — from birthstone pieces to engravable designs — reflects a broader shift in how people shop for jewelry. Today's customers want pieces that tell a story, that reflect their identity, and that can be layered and mixed to create their own unique look.

      We believe the future of jewelry is personal, accessible, and designed for real life.
    `,
    date: "April 2026",
    category: "Industry",
  },
  {
    slug: "why-demi-fine-jewelry-is-having-a-moment",
    title: "Why Demi-Fine Jewelry Is Having a Moment",
    excerpt: "Quality craftsmanship at approachable price points is driving a shift in how women buy jewelry.",
    content: `
      Demi-fine jewelry occupies a sweet spot in the market: pieces that use quality materials like gold vermeil and sterling silver, with thoughtful design and craftsmanship, at a fraction of the cost of fine jewelry.

      Several factors are driving this trend. First, customers are becoming more educated about materials and construction — they want pieces that last, but they are not necessarily ready to invest in high-end fine jewelry for every piece in their collection.

      Second, the way people wear jewelry has changed. Stacking, layering, and mixing metals means customers are buying more pieces and wearing them more often. Demi-fine jewelry offers the perfect balance of quality and affordability for this new approach to accessorizing.

      At Swana Gems, our demi-fine collection uses gold vermeil over sterling silver and natural gemstones — delivering fine jewelry quality at accessible price points.
    `,
    date: "March 2026",
    category: "Trends",
  },
  {
    slug: "art-of-personalized-gifting",
    title: "The Art of Personalized Gifting: How Swana Gems Is Leading the Way",
    excerpt: "With birthstone pieces, engravable designs, and custom charm combinations, personalization has become our signature.",
    content: `
      There is something special about a gift that was made just for you. Personalized jewelry has become one of the most popular gifting categories, and at Swana Gems, we have made it a cornerstone of our brand.

      Our birthstone collection allows customers to choose gemstones that represent meaningful people and milestones. Our engraving service adds a handwritten touch to pendants and bracelets. And our charm collection lets customers build custom combinations that tell their unique story.

      What sets our personalization apart is the quality. Each personalized piece goes through the same rigorous quality checks as our core collection, ensuring that custom pieces meet the same standards our customers expect.

      Whether it is a birthstone necklace for a new mother or an engraved bracelet for a best friend, personalized jewelry turns a beautiful piece into something truly unforgettable.
    `,
    date: "February 2026",
    category: "Personalization",
  },
  {
    slug: "dtc-jewelry-brands-finding-footing",
    title: "DTC Jewelry Brands Find Their Footing in a Changing Retail Landscape",
    excerpt: "Swana Gems has carved out a distinct niche by prioritizing quality materials and meaningful design at accessible price points.",
    content: `
      The direct-to-consumer jewelry space has seen tremendous growth over the past few years, with brands rethinking everything from supply chain to customer experience. Swana Gems has carved out its niche by focusing on three core principles: quality materials, meaningful design, and exceptional customer experience.

      By designing and producing our collections with a streamlined approach, we are able to offer pieces that compete with traditional fine jewelry in quality while remaining accessible to a broader audience.

      Our customers tell us they appreciate the transparency — knowing exactly what materials go into each piece, where it is made, and how to care for it. This trust has been the foundation of our growth.
    `,
    date: "January 2026",
    category: "Brand Story",
  },
  {
    slug: "best-jewelry-to-gift-this-season",
    title: "The Best Jewelry to Gift and Keep This Season",
    excerpt: "From stackable rings to personalized necklaces, these are the pieces that earn a permanent spot in your rotation.",
    content: `
      Whether you are shopping for a loved one or treating yourself, the right piece of jewelry can make any moment feel special. Our curated gift guide features pieces that have been customer favorites for their versatility, quality, and meaning.

      Stackable rings are perfect for milestone gifts — each ring can represent a different memory or achievement. Personalized necklaces make thoughtful gifts for close friends and family, with birthstone and initial options adding a personal touch.

      For those who appreciate understated elegance, our demi-fine collection offers elevated everyday pieces that work for any occasion. And for the jewelry lover who has everything, our charm collection allows for endless customization and layering possibilities.
    `,
    date: "December 2025",
    category: "Gift Guide",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
