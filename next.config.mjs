/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/de9q4gaee/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
