const path = require("path");
const ROOT = __dirname;

module.exports = {
  mode: "production",
  entry: path.resolve(ROOT, "src", "index.ts"),
  output: {
    path: path.resolve(ROOT, "dist"),
    filename: "audio-loopback-extension.js",
    library: {
      type: "umd",
      name: "AudioLoopbackExtension"
    }
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        include: path.resolve(ROOT, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
}
