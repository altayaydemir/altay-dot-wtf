// eslint-disable-next-line no-undef
module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },

  images: {
    domains: ['books.google.com'],
  },
}
