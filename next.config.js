/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    reactStrictMode: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.swell.store',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.schema.io',
      },
    ],
  },
}

module.exports = nextConfig
