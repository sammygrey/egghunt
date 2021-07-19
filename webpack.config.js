const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: "./app/src/js/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CopyWebpackPlugin({patterns: [
        {from: "./app/public/index.html", to: "index.html"},
        {from: "./app/public/images/egg.gif", to: "egg.gif"},
        {from: "./app/public/style.css", to: "style.css"},
        {from: "./app/src/js/index.js", to: "index.js"},
        {from: "./app/public/images/cursor.png", to: "cursor.png"}
        ]}),
        new NodePolyfillPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    },
};