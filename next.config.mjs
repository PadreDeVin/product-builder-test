/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for Cloudflare Pages if not using SSR
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
