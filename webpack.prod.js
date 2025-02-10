const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // إضافة MiniCssExtractPlugin

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,  // استخدام MiniCssExtractPlugin في بيئة الإنتاج لاستخراج الأنماط
          'css-loader',
          'sass-loader',
          'style-loader',  // استخدام style-loader في بيئة التطوير

        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW(),
    new MiniCssExtractPlugin({  // إضافة MiniCssExtractPlugin
      filename: 'styles.css'  // اسم ملف CSS الذي سيتم إنشاؤه في مجلد dist
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3001,
    allowedHosts: 'all'
  }
}
