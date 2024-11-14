/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ADMIN_NEXT: process.env.ADMIN_NEXT
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            pathname: `/**`,
          }
        ]
      }
};

export default nextConfig;
