import { materialTheme, ThemeContextProvider } from "@react-freyja/material";
import { WebStyleEngine } from "@react-freyja/style-engine";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.querySelector("#root")!);

const engine = new WebStyleEngine();
const getComponentClassName = engine.compile(materialTheme);

root.render(
    <ThemeContextProvider value={getComponentClassName}>
        <App />
    </ThemeContextProvider>
);
