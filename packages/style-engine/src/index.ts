import {
    ThemeSource,
    ParsedComponents,
    ThemeTokens,
    VariableToken,
    ThemeToken,
    VariableValue,
    ThemeComponent,
    StyleProperties,
} from "@react-freyja/theme";
import { extractVariables } from "./extractVariables";

const generateStyleCombinations = (
    component: ThemeComponent,
    variables: VariableToken
): Record<string, StyleProperties> => {
    const result: Record<string, StyleProperties> = {};

    return result;
};

export const main = <C extends string, T extends string, D extends object>(
    source: ThemeSource<C, T, D>
): ParsedComponents<C> => {
    const result = {} as ParsedComponents<C>;
    const tokens = source.tokens(source.definitions);
    const components = source.components(tokens);
    const variables = extractVariables(tokens);

    for (const [name, component] of Object.entries<ThemeComponent>(
        components
    )) {
        result[name as C] = generateStyleCombinations(component, variables);
    }

    return result;
};
