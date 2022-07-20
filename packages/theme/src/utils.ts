import { ParsedComponents, StyleProperties } from "./types/Theme";
import {
    ThemeComponents,
    ThemeComponent,
    ThemeToken,
    VariableValue,
    ThemeTokens,
    VariableToken,
    Token,
    Modifiers,
} from "./types/ThemeSource";

const isVariableToken = (token: ThemeToken | VariableToken): token is VariableToken => Object.keys(token).some((key) => key.startsWith('$'));

export const getVariables = <T extends string>(tokens: ThemeTokens<T>): VariableToken => {
    const result: VariableToken = {};

    for (const _token of Object.values(tokens)) {
        const token = _token as ThemeToken | VariableToken;
        if (isVariableToken(token)) {
            for (const [key, value] of Object.entries(token)) {
                if (key.startsWith('$')) {
                    result[key as `$${string}`] = value as VariableValue;
                }
            }
        }
    }

    return result;
}

const getPropsKey = (props: string[]) => props.sort().reduce((acc, currentValue) => {
    acc += currentValue + ';'
    return acc;
}, '');

const parseModifiers = (modifiers: Modifiers): string[][] => {
    const keys = Object.keys(modifiers);
    const possibleValues: string[][] = [...new Array(keys.length)].map(() => []);

    for (let i = 0; i < keys.length; i++) {
        for (const value of Object.keys(modifiers[keys[i]])) {
            possibleValues[i].push(value);
        }
    }

    possibleValues.sort((a, b) => b.length - a.length);

    const resultLength = possibleValues.map((arr) => arr.length).reduce((acc, currentValue) => {
        acc *= currentValue;
        return acc;
    }, 1);
    // TODO add check for large lenth of this array
    const result: string[][] = [...new Array(resultLength)].map(() => []);

    for (let i = 0; i < resultLength; i++) {
        // TODO
    }
}

const generateStylePermutations = (component: ThemeComponent, variables: VariableToken): Record<string, StyleProperties> => {
    const result: Record<string, StyleProperties> = {};

    const parsedModifiers = parseModifiers(component.modifiers);
    const permutationArray: string[][] = [];

    for (const asdf of parsedModifiers[0]) {

    }

    // Permutate over components.modifiers
    /**
     * {variant: {v1: 1, v2: 2}, color: {c1: 2, c2: 3, c3: 4}} ->
     * [[v1, v2], [c1, c2, c3]] ->
     * ['v1;c1', 'v1;c2', 'v1;c3', 'v2;c1', 'v2;c2', 'v2;c3']
     */

    return result;
}

export const getThemeComponents = <C extends string>(
    components: ThemeComponents<C>,
    variables: VariableToken
): ParsedComponents<C> => {
    const result: ParsedComponents<C> =
        {} as ParsedComponents<C>

    for (const [name, _component] of Object.entries(components)) {
        const component = _component as ThemeComponent;
        result[name as C] = generateStylePermutations(component, variables);
    }

    return result;
};
