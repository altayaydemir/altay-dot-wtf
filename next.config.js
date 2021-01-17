// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
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
