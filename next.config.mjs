/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://wikied-api.vercel.app/7-3/:path*', // API URL
      },
    ];
  },
};

export default nextConfig;
