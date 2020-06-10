const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.js",
    contentScript: "./src/contentScript.js",
    devtools: "./src/devtools.js",
    elementsPanel: "./src/elementsPanel.js",
    globals: "./src/globals.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  devtool: "cheap-module-source-map",
};
