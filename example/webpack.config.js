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
  optimization: {
    minimize: false,
  },
};
