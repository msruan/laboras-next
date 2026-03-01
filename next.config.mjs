/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivityPosition: 'bottom-right'
  },
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
    typedRoutes: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
