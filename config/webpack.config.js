const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require("path")

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./client/index.html",
  filename: "./index.html"
})
module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}
