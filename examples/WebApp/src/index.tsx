import { ThemeContextProvider } from "@react-freyja/material";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.querySelector("#root")!);

root.render(
    <ThemeContextProvider value={() => "hello"}>
        <App />
    </ThemeContextProvider>
);
