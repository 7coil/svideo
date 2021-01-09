const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const ffprobe = require("ffmpeg-ffprobe-static");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new CopyPlugin({
    patterns: [
      {
        from: ffprobe.ffmpegPath,
        to: path.basename(ffprobe.ffmpegPath)
      },
      {
        from: './src/template.json',
        to: 'template.json'
      },
      {
        from: './src/background.svg',
        to: 'background.svg'
      }
    ]
  })],
};
