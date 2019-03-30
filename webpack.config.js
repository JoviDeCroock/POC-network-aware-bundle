const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modules = require('webpack-modules');

function makeConfig(latency) {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === 'production';
  // Build plugins
  const plugins = [
    new modules(),
    new webpack.DefinePlugin({
      'process.env.LIBRARY': JSON.stringify(latency === 'low' ? 'preact' : 'react'),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    })
  ];

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  // Return configuration
  return {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'none',
    entry: {
      main: './src/index.js'
    },
    context: path.resolve(__dirname, './'),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      hot: true,
      inline: true,
      publicPath: '/',
      clientLogLevel: 'none',
      open: true,
      overlay: true,
    },
    stats: 'normal',
    output: {
      chunkFilename: `[name]${latency === 'low' ? '.preact.js' : '.js'}`,
      filename: isProduction ? `[name]${latency === 'low' ? '.preact.js' : '.js'}` : `[name]${latency === 'low' ? '.preact.js' : '.js'}`,
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({ inject: false, template: './index.html' }),
      ...plugins
    ].filter(Boolean),
    module: {
      rules: [
        {
          // Support preact.
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.js/,
          include: [
            path.resolve(__dirname, "src"),
          ],
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
      ],
    },
    resolve: {
      mainFields: ['module', 'main', 'browser'],
      alias: latency === 'low' ? {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      } : {},
    },
  };
};

module.exports = process.env.NODE_ENV === 'production' ?
  [makeConfig('high'), makeConfig('low')] :
  makeConfig('high');
