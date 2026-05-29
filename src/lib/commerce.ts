export const paymentMethods = [
  {
    name: "Credit or debit card",
    description: "Visa, Mastercard, American Express, and Discover.",
  },
  {
    name: "Express wallets",
    description: "Apple Pay, Google Pay, and Shop Pay where available.",
  },
  {
    name: "PayPal",
    description: "Pay securely with a PayPal account or guest checkout.",
  },
  {
    name: "Gift card",
    description: "Redeem Swana Gems gift cards during checkout.",
  },
];

export const shippingOptions = [
  {
    name: "Standard Shipping",
    estimate: "5-8 business days",
    price: "Free on orders $50+",
    carrier: "USPS or UPS",
  },
  {
    name: "Express Shipping",
    estimate: "2-3 business days",
    price: "$12.95",
    carrier: "UPS",
  },
  {
    name: "Overnight Shipping",
    estimate: "1 business day",
    price: "$24.95",
    carrier: "UPS",
  },
];

export const checkoutTrustSignals = [
  "SSL encrypted checkout",
  "Order tracking after fulfillment",
  "30-day returns on eligible items",
  "Personalized items are final sale",
];
