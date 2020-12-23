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
        source: '/blog',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/articles/:path*',
        permanent: true,
      },
      {
        source: '/chat',
        destination: 'https://whereby.com/aydemir',
        permanent: false,
      },
    ]
  },
})
