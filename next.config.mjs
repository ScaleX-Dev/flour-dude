/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },
  compress: true
};

export default nextConfig;
