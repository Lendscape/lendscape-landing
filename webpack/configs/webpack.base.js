/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const config = require("./nFrame.config");
const displayConsoleMessage = require("./nFrame.message");

// Combines the config entrypoints with the blocks in SCSS
// This allows for code splitting and generation of seperate partials
const ENTRYPOINTS_MAIN = {
  ...config.ENTRYPOINTS,
};

module.exports = {
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  entry: ENTRYPOINTS_MAIN,
  output: {
    chunkFilename: "[name].js?v=[contenthash]",
    path: path.resolve(__dirname, config.OUTPUT_DIR),
    filename: "[name].js?v=[contenthash]",
    publicPath: config.OUTPUT_DIR,
  },
  node: {
    __filename: false,
    __dirname: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)(s|sx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: "./postcss.config.js",
              },
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
        sideEffects: true,
      },
      // All output ".ts/.js" files will have any sourcemaps re-processed by "source-map-loader".
      {
        enforce: "pre",
        test: /\.(t|j)(s|sx)$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css?v=[contenthash]",
      chunkFilename: "[name].css?v=[contenthash]",
      ignoreOrder: false,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: "TypeScript Checker",
      excludeWarnings: false,
      skipSuccessful: true,
    }),
  ],
};
