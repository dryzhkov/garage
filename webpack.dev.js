const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");

common.plugins.push(
  new Dotenv({
    path: "./.env-dev", // Path to .env file (this is the default)
    safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
  })
);

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map"
});
