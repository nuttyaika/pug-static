const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

// mode setting
const MODE = 'development';

// directory and files
const buildDir = './build';
const sourceDir = './app';
const EntryFile = sourceDir + '/scripts/index.js';

module.exports = {
  mode: MODE,
  entry: EntryFile,
  output: {
    path: path.join(__dirname, buildDir),
    filename: "[hash].js"
  },
  devtool: 'source-map',

  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    contentBase: buildDir
  },

  module: {
    rules: [
      // styles
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              require('cssnano')({
                preset: 'default',
              }),
              require('autoprefixer')({
                grid: true,
                browsers: ['IE 11', 'last 2 versions']
              })
            ]
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }],
      },
      // images
      {
        test: /\.(gif|png|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: './images/[name].[ext]'
        }
      },
      // fonts
      {
        test: /\.(eot|ttf|woff)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      // pages
      {
        test: /\.pug$/,
        loaders: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].hash.css'
    }),
    new HtmlWebpackPlugin({
      template: sourceDir + '/index.pug'
    }),
    new CleanWebpackPlugin([buildDir]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/'
    }),
    new CopyWebpackPlugin([
      {
        from: './app/images/',
        to: 'images/'
      },
    ])
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
