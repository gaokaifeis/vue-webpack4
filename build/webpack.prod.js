const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  }
}

module.exports = merge(prodConfig, common)