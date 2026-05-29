import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/product/gold-drop-earrings",
        destination: "/product/gold-drop-necklace",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
