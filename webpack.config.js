/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  watch: isDevelopment,
  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['node_modules'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['*', '.js', '.vue'],
  },
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: isDevelopment ? 'app.js' : 'app.[contenthash].js',
    path: isDevelopment
      ? path.resolve(__dirname, 'dist')
      : path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js\vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: false,
          failOnWarning: true,
        },
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            sourceMap: isDevelopment,
            extract: false,
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'img',
              publicPath: 'img',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: './dist',
      files: ['./dist'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: isDevelopment
          ? JSON.stringify(process.env.DEV_URL)
          : JSON.stringify(process.env.PROD_URL),
      },
    }),
  ],
  optimization: isDevelopment
    ? {}
    : {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false,
              },
            },
          }),
        ],
      },
};
/* eslint-enable */
