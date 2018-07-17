const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpack = require('./webpack.base')
const { styleLoaders } = require('./tools')
const path = require('path')
const ChromeReloadPlugin = require('wcer')

module.exports = merge(baseWebpack, {
  watch: true,
  module: { rules: styleLoaders({ sourceMap: false }) },
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new FriendlyErrorsPlugin(),
    new ChromeReloadPlugin({
      port: 9090, // optional, default: 9090
      manifest: path.join(__dirname, '..', 'src', 'manifest.js')
    })
  ]
})
