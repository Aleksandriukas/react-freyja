import { StyleProperties } from "./types/Theme";
import {
    ThemeComponents,
    ThemeComponent,
    Variables,
    ThemeToken,
} from "./types/ThemeSource";

const parseVariables = (
    sourceVariables: Variables
): Record<string, string | number> => {
    const result: Record<string, string | number> = {};

    for (const variableGroup in sourceVariables) {
        for (const [property, value] of Object.entries(
            sourceVariables[variableGroup]
        )) {
            result[property] = value;
        }
    }

    return result;
};

const convertTokensToStyles = (
    tokens: ThemeToken[],
    variables: Variables
): StyleProperties => {
    const styles: Partial<Record<keyof StyleProperties, unknown>> = {};

    for (const token of tokens) {
        for (const property in token) {
            const value = token[property as keyof StyleProperties];

            if (typeof value === "function") {
                styles[property as keyof StyleProperties] = value(
                    parseVariables(variables)
                );
            } else {
                styles[property as keyof StyleProperties] = value;
            }
        }
    }

    return styles as StyleProperties;
};

const getComponentStyles = (
    component: ThemeComponent,
    variables: Variables,
    props: object
): StyleProperties => {
    const tokens = [...component.tokens];

    for (const [key, value] of Object.entries(props)) {
        if (
            component.propsToTokensMap[key] &&
            component.propsToTokensMap[key][value]
        ) {
            tokens.push(component.propsToTokensMap[key][value]);
        }
    }

    return convertTokensToStyles(tokens, variables);
};

export const getThemeComponents = <C extends string>(
    components: ThemeComponents<C>,
    variables: Variables
): Record<C, (props: object) => StyleProperties> => {
    const themeComponents: Record<C, (props: object) => StyleProperties> =
        {} as Record<C, (props: object) => StyleProperties>;

    for (const [name, component] of Object.entries(components)) {
        themeComponents[name as C] = (props: object) =>
            getComponentStyles(component as ThemeComponent, variables, props);
    }

    return themeComponents;
};
