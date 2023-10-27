const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
/**
 * A fork of 'next-pwa' that has app directory support
 * @see https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1332258575
 */
 const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  images: {},
  transpilePackages: ['core', 'ui', '@react-three/postprocessing'],
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  },
}

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en', 'jp'],
    defaultLocale: 'en',
  }
}

const KEYS_TO_OMIT = ['webpackDevMiddleware', 'configOrigin', 'target', 'analyticsId', 'webpack5', 'amp', 'assetPrefix']

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [
    [withPWA], 
    [
      withBundleAnalyzer, {
        images: {
          remotePatterns: [
            {
              hostname:"i.scdn.co**"
            }
          ],
        }
      }
    ],
    [
      withSentryConfig,
      module.exports,
      {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options
        // Suppresses source map uploading logs during build
        silent: true,
        org: "tessellator-1b14aace8",
        project: "javascript-nextjs",
      },
      {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,
        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,
        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: "/monitoring",
        // Hides source maps from generated client bundles
        hideSourceMaps: true,
        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,
      }
    ]
  ]

  const wConfig = plugins.reduce((acc, [plugin, config]) => plugin({ ...acc, ...config }), {
    ...defaultConfig,
    ...nextConfig,
  })

  const finalConfig = {}
  Object.keys(wConfig).forEach((key) => {
    if (!KEYS_TO_OMIT.includes(key)) {
      finalConfig[key] = wConfig[key]
    }
  })

  return finalConfig
}
