/* eslint-disable */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['books.google.com'],
  },
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/documents/cv.pdf',
        permanent: true,
      },
    ]
  },
})
