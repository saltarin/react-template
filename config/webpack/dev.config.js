const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.tsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  }
});