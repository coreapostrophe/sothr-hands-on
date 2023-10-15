const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ProvidePlugin} = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = ({package_name}) => ({
  entry: `./web/${package_name}`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./web/${package_name}/index.html`,
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, package_name),
      extraArgs: '--target web',
    }),
    // Have this example work in Edge which doesn't ship `TextEncoder` or
    // `TextDecoder` at this time.
    new ProvidePlugin({
      TextDecoder: ['text-encoding', 'TextDecoder'],
      TextEncoder: ['text-encoding', 'TextEncoder'],
    }),
  ],
  mode: 'development',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
});
