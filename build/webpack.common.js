const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const fs = require('fs')


const makePlugins = (configs) => {
  const plugins = [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]

  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: `${item}.html`,
        chunks: ['runtime', `vendors~${item}`, item]
      })
    )
  })
  
  const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
  files.forEach(file => {
    // console.log(/.*\.dll\.js/.test(file), /.*\.manifest\.json/.test(file))
    if(/.*\.dll\.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll/', file)
      }))
    }
    if(/.*\.manifest\.json/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll/', file)
      }))
    }
  })

  return plugins
}

const commonConfig = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            //  placeholder 占位符
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all'
    }
  }
}

commonConfig.plugins = makePlugins(commonConfig)

module.exports = commonConfig
