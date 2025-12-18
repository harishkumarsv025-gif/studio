import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
      '9000-firebase-studio-1765985090180.cluster-mwsteha33jfdowtvzffztbjcj6.cloudworkstations.dev',
      '6000-firebase-studio-1765985090180.cluster-mwsteha33jfdowtvzffztbjcj6.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
