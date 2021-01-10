import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ffprobe from 'ffmpeg-ffprobe-static';
import { basename, resolve } from 'path';

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  target: "node",
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: ffprobe.ffmpegPath,
          to: basename(ffprobe.ffmpegPath),
        },
        {
          from: "./src/template.json",
          to: "template.json",
        },
        {
          from: "./src/background.svg",
          to: "background.svg",
        },
      ],
    }),
  ],
};
