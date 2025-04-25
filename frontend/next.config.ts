import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
