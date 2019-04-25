const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const PROD = process.env.NODE_ENV === "production";

module.exports = {
  mode: PROD ? "production" : "development",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        include: [path.resolve(__dirname, "src")],
        use: [
          "babel-loader",
          {
            loader: "linaria/loader",
            options: {
              sourceMap: PROD
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        exclude: [path.resolve(__dirname, "src")],
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "./public/index.html")
    })
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  optimization: {
    minimizer: PROD ? [new TerserPlugin()] : []
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 1234
  }
};
