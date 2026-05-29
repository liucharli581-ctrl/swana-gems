export interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  verified: boolean;
}

export interface CustomerPhoto {
  id: string;
  image: string;
  alt: string;
  author: string;
}

export interface ProductDetail {
  reviews: Review[];
  customerPhotos: CustomerPhoto[];
  faqs: { q: string; a: string }[];
}

export const reviewStats = {
  average: 4.4,
  total: 11697,
  distribution: {
    5: 9226,
    4: 671,
    3: 486,
    2: 368,
    1: 946,
  },
};

function sampleReviews(productName: string): Review[] {
  const reviews: Review[] = [
    {
      id: "r1",
      rating: 5,
      title: `Absolutely love this ${productName.toLowerCase()}!`,
      content:
        "I've received so many compliments on this piece. The quality is outstanding and it looks even better in person. Perfect for both casual and formal occasions. Definitely my new go-to accessory.",
      author: "Sarah M.",
      date: "May 15, 2026",
      verified: true,
    },
    {
      id: "r2",
      rating: 5,
      title: "Perfect gift that impressed",
      content:
        "Bought this as a birthday gift for my sister and she hasn't taken it off since. The packaging was beautiful and the piece itself is stunning. Will definitely be purchasing more from Swana Gems.",
      author: "Jessica T.",
      date: "May 10, 2026",
      verified: true,
    },
    {
      id: "r3",
      rating: 4,
      title: "Beautiful design, great value",
      content:
        "The craftsmanship is really impressive for the price point. The gold tone is warm and doesn't look cheap at all. My only minor complaint is the chain could be slightly longer, but overall very happy.",
      author: "Amanda K.",
      date: "May 2, 2026",
      verified: true,
    },
    {
      id: "r4",
      rating: 5,
      title: "Elegant and versatile piece",
      content:
        "This piece transitions effortlessly from day to night. I wear it to the office and then out to dinner. The detailing is exquisite and it pairs well with both gold and silver accessories.",
      author: "Rachel L.",
      date: "April 28, 2026",
      verified: true,
    },
    {
      id: "r5",
      rating: 5,
      title: "My new everyday staple",
      content:
        "I was looking for something I could wear daily without worrying about it, and this is perfect. It's lightweight, comfortable, and adds just the right amount of elegance to any outfit.",
      author: "Emily R.",
      date: "April 20, 2026",
      verified: true,
    },
  ];
  return reviews;
}

const customerPhotoPool: CustomerPhoto[] = [
  {
    id: "cp1",
    image: "/images/products/customer-photo-1.jpg",
    alt: "Customer wearing jewelry in natural outdoor setting",
    author: "Sarah M.",
  },
  {
    id: "cp2",
    image: "/images/products/customer-photo-2.jpg",
    alt: "Customer styling jewelry with casual outfit",
    author: "Jessica T.",
  },
  {
    id: "cp3",
    image: "/images/products/customer-photo-3.jpg",
    alt: "Customer wearing piece at home",
    author: "Amanda K.",
  },
  {
    id: "cp4",
    image: "/images/products/customer-photo-4.jpg",
    alt: "Customer accessorizing for evening look",
    author: "Rachel L.",
  },
];

// Assign 3 customer photos per product (cycling through the pool)
function pickPhotos(productId: string): CustomerPhoto[] {
  const index = Number(productId.replace(/[^0-9]/g, "")) || 0;
  const photos = [];
  for (let i = 0; i < 3; i++) {
    const idx = (index + i) % customerPhotoPool.length;
    photos.push(customerPhotoPool[idx]);
  }
  return photos;
}

export function getProductDetail(productId: string): ProductDetail {
  const product_names: Record<string, string> = {
    n1: "Elisa Pendant Necklace",
    n2: "Silver Bar Pendant",
    n3: "Signature Chain Necklace",
    n4: "Amethyst Pendant Necklace",
    e1: "Classic Hoop Earrings",
    e2: "Gold Drop Earrings",
    b1: "Friendship Bracelet Set",
    b2: "Diamond Tennis Bracelet",
    r1: "Tatum Band Ring",
    d1: "Vermeil Hoop Earrings",
    d2: "Crystal Drop Necklace",
  };
  const name = product_names[productId] ?? "this piece";

  return {
    reviews: sampleReviews(name),
    customerPhotos: pickPhotos(productId),
    faqs: [
      {
        q: "Return Policy",
        a: "Eligible, unworn, unused online purchases must be returned by mail with product in its original packaging with tags within 30 days of receipt for a full refund. Personalized items, engraved pieces, gift cards, and items marked as Final Sale are not eligible for return or exchange. Coupon or discount codes are eligible for one-time redemption and cannot be reused if the item is returned.",
      },
      {
        q: "Jewelry Care",
        a: "To keep your piece looking beautiful, avoid contact with water, perfumes, lotions, and harsh chemicals. Store in a soft pouch or jewelry box when not wearing. Gently polish with a soft, lint-free cloth after each wear. For plated pieces, avoid abrasive cleaners that may wear the finish over time.",
      },
      {
        q: "Shipping",
        a: "Standard shipping takes 5-8 business days via USPS or UPS. Express shipping (2-3 business days, $12.95) and overnight (1 business day, $24.95) options are available. Free standard shipping on orders over $50 within the continental US. International shipping available to select countries.",
      },
      {
        q: "Gift Wrap",
        a: "All orders are beautifully packaged in our signature Swana Gems gift boxes, ready for gifting. You can add a complimentary personalized message at checkout. For an additional fee, select our premium wrap option including a satin ribbon and hand-written note card.",
      },
    ],
  };
}
