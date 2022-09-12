const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", "..."],
        alias: {
            react: path.resolve(__dirname, "node_modules", "react"),
        },
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    optimization: {
        usedExports: true,
        innerGraph: true,
        sideEffects: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devtool: false,
};

module.exports = config;
