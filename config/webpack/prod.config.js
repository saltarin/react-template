const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  module: {
  },
  optimization: {
    minimize: true
  }
});