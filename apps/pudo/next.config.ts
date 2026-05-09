import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@meest/ui', '@meest/types'],
};

export default nextConfig;
