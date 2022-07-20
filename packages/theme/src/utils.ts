import { StyleProperties } from "./types/Theme";
import {
    ThemeToken,
    ThemeComponents,
    ThemeComponent,
} from "./types/ThemeSource";

const convertTokensToStyles = (
    tokens: ThemeToken[],
    variables: Record<string, unknown>
): StyleProperties => {
    const styles: Partial<Record<keyof StyleProperties, unknown>> = {};

    for (const token of tokens) {
        for (const property in token) {
            if (!property.startsWith("$")) {
                const value = token[property as keyof StyleProperties];

                if (typeof value === "function") {
                    styles[property as keyof StyleProperties] =
                        value(variables);
                } else {
                    styles[property as keyof StyleProperties] = value;
                }
            }
        }
    }

    return styles as StyleProperties;
};

const getVariables = (tokens: ThemeToken[]): Record<string, unknown> => {
    const variables: Record<string, unknown> = {};

    for (const token of tokens) {
        for (const property in token) {
            if (property.startsWith("$")) {
                variables[property] = token[property as keyof StyleProperties];
            }
        }
    }

    return variables;
};

export const getThemeComponents = <C extends string>(
    components: ThemeComponents<C>
): Record<C, (props: object) => StyleProperties> => {
    const themeComponents: Record<C, (props: object) => StyleProperties> =
        {} as Record<C, (props: object) => StyleProperties>;

    for (const [name, component] of Object.entries(components)) {
        themeComponents[name as C] = (props: object) => {
            const tokens = (component as (props: object) => ThemeComponent)(
                props
            ).tokens;
            const variables = getVariables(tokens);
            return convertTokensToStyles(
                (component as (props: object) => ThemeComponent)(props).tokens,
                variables
            );
        };
    }

    return themeComponents;
};
