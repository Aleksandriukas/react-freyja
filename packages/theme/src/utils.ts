import { StyleProperties } from './types/Theme';
import { ThemeToken, ThemeTokens, ThemeComponents } from './types/ThemeSource';

export const convertTokensToStyles = (tokens: ThemeToken[], variables: Record<string, unknown>): StyleProperties => {
    const styles: StyleProperties = {};

    for (const token of tokens) {
        for (const property in token) {
            const value = token[property as keyof StyleProperties];

            if (typeof value === 'function') {
                styles[property as keyof StyleProperties] = value(variables);
            } else {
                styles[property as keyof StyleProperties] = value;
            }
        }
    }

    return styles;
};

export const getVariables = (tokens: ThemeTokens): Record<string, unknown> => {
    const variables: Record<string, unknown> = {};

    for (const name in tokens) {
        const token = tokens[name];

        for (const property in token) {
            if (property.startsWith('$')) {
                variables[property] = token[property as keyof StyleProperties];
            }
        }
    }

    return variables;
};

export const getThemeComponents = (
    components: ThemeComponents,
    variables: Record<string, unknown>,
): Record<string, StyleProperties> => {
    const themeComponents: Record<string, StyleProperties> = {};

    for (const [name, component] of Object.entries(components)) {
        themeComponents[name] = convertTokensToStyles(component.tokens, variables);
    }

    return themeComponents;
};
