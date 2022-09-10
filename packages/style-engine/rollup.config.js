import typescript from "@rollup/plugin-typescript";

// Rollup build only for ESM modules (for tree-shaking)
/** @type {import('rollup').RollupOptions} */
const config = {
    input: "./src/index.ts",
    output: {
        dir: "dist/esm",
        format: "esm",
        preserveModules: true,
    },
    plugins: [typescript()],
};

export default config;
