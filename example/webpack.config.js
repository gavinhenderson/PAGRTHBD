const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve("./entry.js"),
  module: {
    rules: [
      {
        test: /test\.backend\.js$/,
        loader: path.resolve("../dist/loader/loader"),
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
