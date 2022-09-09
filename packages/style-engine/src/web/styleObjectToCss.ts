import { CSSProperties } from "react";

export const styleObjectToCss = (style: CSSProperties) => {
    return Object.keys(style).reduce(
        (accumulator, key) =>
            accumulator +
            key
                .split(/(?=[A-Z])/)
                .join("-")
                .toLowerCase() +
            ":" +
            style[key as keyof CSSProperties] +
            ";",
        ""
    );
};
