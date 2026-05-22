/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // When real photos arrive, drop them in /public/images and they'll be
    // optimized automatically by next/image. Remote images would go in
    // remotePatterns below.
    remotePatterns: [],
  },
};

export default nextConfig;
