/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true,
    },
  compiler: {
    styledComponents: true,
  },
}

const withTranspilation = require("next-transpile-modules")

module.exports = withTranspilation(nextConfig)

