/** @type {import('next').NextConfig} */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const nextConfig = {
  webpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      // Hot Reload
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    if (config?.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json'),
          extensions: config.resolve.extensions,
        }),
      ];
      return config;
    }

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
