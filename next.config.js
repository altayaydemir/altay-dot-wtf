/* eslint-disable */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const getRedirects = () => {
  let redirects = [
    {
      source: '/cv',
      destination: '/documents/cv.pdf',
      permanent: false,
    },
    {
      source: '/chat',
      destination: 'https://whereby.com/aydemir',
      permanent: false,
    },
  ]

  if (process.env.NODE_ENV === 'production') {
    redirects = redirects.concat([
      {
        source: '/private/:path*',
        destination: '/',
        permanent: true,
      },
    ])
  }

  return redirects
}

module.exports = withBundleAnalyzer({
  images: {
    domains: ['books.google.com', 'cdn-images-1.medium.com'],
  },

  async redirects() {
    return getRedirects()
  },
})
