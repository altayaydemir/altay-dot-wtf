/* eslint-disable */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['cdn-images-1.medium.com'],
  },

  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/posts/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ]
  },
})
