/**
 * Webpack development configuration.
 * 
 * This configuration merges the common webpack settings with development-specific options:
 * - Sets mode to 'development' for better debugging and unminified output.
 * - Enables file watching for automatic rebuilds on file changes.
 * - Uses 'inline-source-map' for easier debugging with source maps embedded in the bundle.
 * - Configures the development server to serve static files from the './uploads/Builds' directory.
 * 
 * @module webpack.dev
 */
//webpack.config.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    static: './uploads',
  },
});