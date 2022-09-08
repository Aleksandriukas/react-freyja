const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "native.bundle.js",
        library: {
            type: "commonjs",
        },
    },
    externals: {
        react: "react",
        ["react-native"]: "react-native",
    },
    resolve: {
        extensions: [".native.ts", ".native.tsx", ".ts", ".tsx", "..."],
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: ["module:metro-react-native-babel-preset"],
                        },
                    },
                    "ts-loader",
                ],
            },
        ],
    },
};

module.exports = config;
