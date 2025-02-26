import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'bzpwilmfailwdentijqh.supabase.co',
        port: '',
        pathname: '/**',
        search: ''
      }
    ]
  }
};

export default nextConfig;
