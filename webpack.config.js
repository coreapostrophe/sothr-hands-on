const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ProvidePlugin} = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = ({package_name}) => ({
  entry: `./web/${package_name}`,
  output: {
    path: path.resolve(__dirname, `./web/${package_name}/dist`),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./web/${package_name}/index.html`,
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, `crates/${package_name}`),
      extraArgs: '--target web',
      outDir: path.resolve(__dirname, `crates/${package_name}/pkg`)
    }),
    new ProvidePlugin({
      TextDecoder: ['text-encoding', 'TextDecoder'],
      TextEncoder: ['text-encoding', 'TextEncoder'],
    }),
  ],
  mode: 'development',
  resolve: {
    alias: {
      crates: path.resolve(__dirname, 'crates'),
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
});
