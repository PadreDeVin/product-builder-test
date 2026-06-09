/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to support API Routes on Cloudflare Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
