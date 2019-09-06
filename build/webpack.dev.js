const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
    // hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // 前面会加上publicpath的路径
    // publicPath: './',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  }
}

module.exports = merge(devConfig, common)
