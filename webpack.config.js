const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.js",
    contentScript: "./src/contentScript.js",
    devtools: "./src/devtools.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
