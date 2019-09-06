const path = require('path')
const webpack = require('webpack')
// const merge = require('webpack-merge')
// const common = require('./webpack.common')

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue']
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}