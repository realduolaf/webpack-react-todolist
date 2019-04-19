const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.tsx"],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      RootDir: path.resolve(__dirname),
      Src: path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      chunksSortMode: "none",
      title: "Myy-Todo_List"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  }
};
