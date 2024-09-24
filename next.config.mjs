/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-to-uploads.s3.amazonaws.com",
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
