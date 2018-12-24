var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index"],
  output: {
    path: path.join(__dirname, "server/public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
