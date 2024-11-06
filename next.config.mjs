/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media2.dev.to",
        pathname: "/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
