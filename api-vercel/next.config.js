/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'js'],
  webpack(config) {
    config.resolve.alias['@/api'] = './api-vercel/api'
    return config
  },
}

export default nextConfig
