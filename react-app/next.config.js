/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true,
    },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

// const withTranspilation = require("next-transpile-modules")([
//   "@doubledice/platform"
// ])

// module.exports = nextConfig;

