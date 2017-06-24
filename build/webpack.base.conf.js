var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin');


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let extractCss = new ExtractTextPlugin(
    'style/[name].css'
);

let extractScss = new ExtractTextPlugin(
    'style/[name].scss.css'
);

module.exports = {
  entry: {
    vue: 'vue',
    app: './src/main.js',
    jq: './src/assets/js/jq.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
      modules: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
          'node_modules'
      ],
      extensions: ['.js', '.vue', 'scss'],
      alias: {
          'vue$': 'vue/dist/vue.min.js',
          'common': 'assets/js',
          'component': 'components',
          'plugin': 'plugins',
          'viewCss': 'assets/css',
          'jquery': 'assets/js/jq.js'
      }
  },
  resolveLoader: {
      moduleExtensions: ['-loader']
  },
  // // webpack不处理echarts
  // externals: [
  //     {
  //         '/static/echarts/echarts.js':'echarts'
  //     }
  // ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        // loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-echarts')],
        exclude: /node_modules(?![\\/]vue-echarts[\\/])/
       },
        // options: {
        //   formatter: require('eslint-friendly-formatter')
        // }
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
    //   {
    //     test: /\.scss$/,
    //     loader: extractScss.extract({
    //         fallback: 'vue-loader',
    //         use: [
    //             {
    //                 loader: 'css'
    //             },
    //             {
    //                 loader: 'sass'
    //             }
    //         ]
    //     })
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: extractCss.extract({
    //         fallback: 'vue-style',
    //         use: [
    //             {
    //                 loader: 'css'
    //             }
    //         ]
    //     })
    //   },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        exclude: /node_modules/
      },
      {
        test: /iview.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    //   {
    //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    //     loader: 'url-loader',
    //     options: {
    //       limit: 10000,
    //       name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    //     }
    //   }
    ]
  }
}
