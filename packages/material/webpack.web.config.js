const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "web.bundle.js",
        library: {
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
        extensions: [".web.ts", ".web.tsx", ".ts", ".tsx", "..."],
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
