import { Token } from "@react-freyja/theme";
import { CSSProperties } from "react";

export const tokensToStyleObject = (tokens: Token[]): CSSProperties => {
    const styles = {};

    for (const token of tokens) {
        for (const [key, value] of Object.entries(token)) {
            (styles as Record<string, unknown>)[key] = value;
        }
    }

    return styles;
};
