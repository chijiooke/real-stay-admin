const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // experimental: {
  //   appDir: true, // optional; usually enabled by default
  // },
};

export default nextConfig;
