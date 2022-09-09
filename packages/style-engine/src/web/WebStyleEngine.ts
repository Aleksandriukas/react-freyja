import { Modifiers, Components, Token } from "@react-freyja/theme";
import { StyleEngine } from "..";
import { getTokens } from "../utils/getTokens";

import { getVariables } from "../utils/getVariables";
import type { CSSProperties } from "react";

const tokensToCSSProperties = (tokens: Token[]): CSSProperties => {
    const styles = {};

    for (const token of tokens) {
        for (const [key, value] of Object.entries(token)) {
            (styles as Record<string, unknown>)[key] = value;
        }
    }

    return styles;
};

const styleToCss = (style: CSSProperties) => {
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

export class WebStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> implements StyleEngine<string, TModifiers, TComponents>
{
    public compile = (components: TComponents) => {
        const getComponentClassName = <P extends Record<string, string>>(
            componentName: string,
            variant: P
        ) => {
            const component = components[componentName];

            const variables = getVariables(component, variant);

            const tokens = getTokens(component, variables, variant);

            const styleObject = tokensToCSSProperties(tokens);

            const css = styleToCss(styleObject);
            const className = "Freyja--" + componentName;

            const style =
                document.querySelector("style") ||
                document.createElement("style");

            style.textContent = `
                .${className} {${css}}
            `;

            document.head.append(style);

            return className;
        };

        return getComponentClassName;
    };
}
