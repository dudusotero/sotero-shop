/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.swell.store', 'gravatar.com', 'cdn.schema.io'],
  },
}

module.exports = nextConfig
