#!/usr/bin/env zxpp

// TODO configure esbuild build
import path from "path";
import { build } from "esbuild";

const outdirPath = path.resolve(__dirname, "..", "dist");

build({
    entryPoints: [path.resolve(__dirname, "..", "src", "index.ts")],
    outdir: outdirPath,
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: "esm",
    target: ["esnext"],
}).then(() => {
    console.log("Built with esbuild" + outdirPath);
});
