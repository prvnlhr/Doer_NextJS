/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/de9q4gaee/image/upload/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default withPWA({
  dest: "public", // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);
