const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defineWebpackConstants } = require('../../config/env');

const webpackConstants = defineWebpackConstants();
const rootPath = path.resolve(__dirname, '../..');
const publicPath = process.env.PATH_STATIC + '/';

module.exports = {
  entry: {
    app: path.join(rootPath, 'src/index.tsx')
  },
  output: {
    path: path.join(rootPath, 'dist'),
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new DefinePlugin(webpackConstants),
    new HtmlWebpackPlugin({
      title: 'React Template',
      hash: true,
      template: path.join(rootPath, 'public/index.html')
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': rootPath
    }
  },
  optimization: {
    runtimeChunk:true,
    splitChunks: {
      chunks: 'all',
    }
  }
}