import { Token } from "@react-freyja/theme";
import { CSSProperties } from "react";

export const tokensToStyleObject = (tokens: Token[]): CSSProperties => {
    const styles = {};

    for (const token of tokens) {
        for (const [key, value] of Object.entries(token)) {
            if (key !== "_type") {
                (styles as Record<string, unknown>)[key] = value;
            }
        }
    }

    return styles;
};
