const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
    entry: {
        web: "./src/index.web.ts",
        native: "./src/index.native.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        library: {
            name: "react-freyja",
            type: "umd",
        },
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "_",
        },
        ["react-native"]: {
            commonjs: "react-native",
            commonjs2: "react-native",
            amd: "react-native",
            root: "_",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", "..."],
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
};

module.exports = config;
