var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'server/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    // rules: [{
    //   test: /\.tsx?$/,
    //   use: [
    //     {
    //       loader: "awesome-typescript-loader"
    //     }
    //   ],
    //   exclude: /node_modules/,
    //   // include: path.join(__dirname, 'src')
    // }]
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: false,
        template: './src/index.html',
        filename: './index.html'
    })
  ]
};
