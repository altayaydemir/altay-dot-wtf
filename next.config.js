/* eslint-disable */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['books.google.com', 'cdn-images-1.medium.com'],
  },
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/documents/cv.pdf',
        permanent: false,
      },
      {
        source: '/chat',
        destination: 'https://whereby.com/aydemir',
        permanent: false,
      }
    ]
  },
})
