const path = require("path");
const webpack = require("webpack");
modules.exports = {
  resolve: {
    fallback: {
    //   fs: false, // Or provide a browser-compatible alternative if necessary
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      // Install 'path-browserify' if not already installed
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^fs$/,
      }),
    ],
  },
};
