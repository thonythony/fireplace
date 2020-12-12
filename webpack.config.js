const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  // entry: [
  //   path.resolve(__dirname, "src/index.ts"),
  //   path.resolve(__dirname, "src/index.html"),
  // ],
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          //Note:- No wildcard is specified hence will copy all files and folders
          from: "src/assets", //Will resolve to RepoDir/src/assets
          to: "assets", //Copies all files from above dest to dist/assets
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    sourceMapFilename: "bundle.map",
  },
};
