/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables ESLint errors from blocking build
  },
};

module.exports = nextConfig;
