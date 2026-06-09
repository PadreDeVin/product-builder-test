/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Disable cache in production to stay under Cloudflare's 25MB file limit
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
