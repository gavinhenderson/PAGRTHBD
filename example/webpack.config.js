const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve("./entry.js"),
  module: {
    rules: [
      {
        test: /test\.backend\.js$/,
        loader: path.resolve("../src/loader/dist/loader"),
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [new HtmlWebpackPlugin()],
  optimization: {
    minimize: false,
  },
};
