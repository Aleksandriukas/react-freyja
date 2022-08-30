const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
    entry: {
        web: "./src/index.web.ts",
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
