// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   typescript: {
//     ignoreBuildErrors: true
//   },
//   eslint: {
//     ignoreDuringBuilds: true
//   },
//   images: {
//     domains: ['source.unsplash.com','https://picsum.photos','cdn.dummyjson.com','bambooindia.com'],
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['source.unsplash.com','https://picsum.photos','cdn.dummyjson.com','bambooindia.com'],
  }
};

module.exports = nextConfig;