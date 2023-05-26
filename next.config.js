/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(webpackConfig) {
    return {
      ...webpackConfig,
      optimization: {
        minimize: false
      }
    };
  }
}

module.exports = nextConfig
