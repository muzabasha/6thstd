import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Vercel deployment
  // Remove `output: 'export'` if you want server-side rendering on Vercel
  // (Vercel supports both; this config leaves it as a standard Next.js app)
  images: {
    unoptimized: true, // required for static export
  },
  // Allow JSON imports
  experimental: {},
};

export default nextConfig;
