import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // Optionally, you can also use remotePatterns for more specific control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dhrldqxg9/image/upload/**',
      },
    ],
  },
  webpack: (config) => {
    // Add alias for @ symbol
    config.resolve.alias['@'] = path.resolve('src');
    
    return config;
  },
};

export default nextConfig;
