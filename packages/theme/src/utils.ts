import { ParsedComponents, StyleProperties } from "./types/Theme";
import {
    ThemeComponents,
    ThemeComponent,
    ThemeToken,
    VariableValue,
    ThemeTokens,
    VariableToken,
} from "./types/ThemeSource";

const isVariableToken = (
    token: ThemeToken | VariableToken
): token is VariableToken =>
    Object.keys(token).some((key) => key.startsWith("$"));

export const getVariables = <T extends string>(
    tokens: ThemeTokens<T>
): VariableToken => {
    const result: VariableToken = {};

    for (const _token of Object.values(tokens)) {
        const token = _token as ThemeToken | VariableToken;
        if (isVariableToken(token)) {
            for (const [key, value] of Object.entries(token)) {
                if (key.startsWith("$")) {
                    result[key as `$${string}`] = value as VariableValue;
                }
            }
        }
    }

    return result;
};

const generateStyleCombinations = (
    component: ThemeComponent,
    variables: VariableToken
): Record<string, StyleProperties> => {
    const result: Record<string, StyleProperties> = {};

    // TODO extract logic in style-engine package

    return result;
};

export const getThemeComponents = <C extends string>(
    components: ThemeComponents<C>,
    variables: VariableToken
): ParsedComponents<C> => {
    const result: ParsedComponents<C> = {} as ParsedComponents<C>;

    for (const [name, component] of Object.entries<ThemeComponent>(
        components
    )) {
        result[name as C] = generateStyleCombinations(component, variables);
    }

    return result;
};
