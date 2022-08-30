#!/usr/bin/env zxpp

import { accessSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { generateDtsBundle } from "dts-bundle-generator";

const safeWriteFileSync = (filePath: string, content: string) => {
    const directory = path.dirname(filePath);
    try {
        accessSync(directory);
    } catch {
        mkdirSync(path.dirname(filePath), { recursive: true });
    }

    writeFileSync(filePath, content);
};

const outputFile = path.resolve(__dirname, "..", "dist", "index.d.ts");

generateDtsBundle([
    {
        filePath: path.resolve(__dirname, "..", "src", "index.web.ts"),
        libraries: {
            importedLibraries: [
                "react",
                "react-native",
                "node",
                "prop-types",
                "scheduler",
                "@react-freyja/theme",
            ],
        },
    },
]).map((bundle) => safeWriteFileSync(outputFile, bundle));

console.log(`${outputFile} has been generated.`);
