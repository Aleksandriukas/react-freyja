import { CSSProperties } from "react";

const getStyleValue = (styleValue: CSSProperties[keyof CSSProperties]) => {
    if (Number.isInteger(styleValue)) {
        return `${styleValue}px`;
    }

    return styleValue;
};

export const styleObjectToCss = (style: CSSProperties) => {
    return Object.keys(style).reduce(
        (accumulator, key) =>
            accumulator +
            key
                .split(/(?=[A-Z])/)
                .join("-")
                .toLowerCase() +
            ":" +
            getStyleValue(style[key as keyof CSSProperties]) +
            ";",
        ""
    );
};
