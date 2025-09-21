const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      // Polyfill Node.js modules for the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
      };

      // Ignore 'fs' module (Node-only, not needed in browser)
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^fs$/ }));

      return config;
    },
  },
};
