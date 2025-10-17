/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'js'],
  experimental: {
    appDir: false,
  },
  // 👇 aquí rediriges la carpeta "api-vercel/api" como "pages/api"
  webpack(config) {
    config.resolve.alias['@/api'] = './api-vercel/api'
    return config
  },
}

export default nextConfig
