import merge from "lodash/merge";
import mergeWith from "lodash/mergeWith";
import {
    Components,
    ConvertedTokens,
    Modifiers,
    Token,
    UnknownThemeSource,
} from "./types/Theme";
import { combineTokens } from "./utils/combineTokens";
import { convertVariableNames } from "./utils/convertVariableNames";
import { executeTokenGenerators } from "./utils/executeTokenGenerators";
import { getAllVariables } from "./utils/getAllVariables";
import { markModifierTokens, markTokens } from "./utils/markTokens";

const mergeDefinitions = (
    definitions: Record<string, unknown>[]
): Record<string, unknown> => {
    const result = {};

    for (const definitionObject of definitions) {
        merge(result, definitionObject);
    }

    return result;
};

type MergedTokens = {
    modifierTokens: Modifiers;
    tokens: Record<string, Token>;
};

const mergeTokens = (
    tokensSource: UnknownThemeSource["tokens"][],
    definitions: Record<string, unknown>
): MergedTokens => {
    const result: MergedTokens = {
        modifierTokens: {},
        tokens: {},
    };

    for (const { modifiers: modifiersGenerator } of tokensSource) {
        const modifierTokens = convertVariableNames(
            modifiersGenerator(definitions)
        );

        merge(result.modifierTokens, modifierTokens);
    }

    const variables = getAllVariables(result.modifierTokens);

    for (const { constant: constantGenerator } of tokensSource) {
        const tokens = executeTokenGenerators(
            constantGenerator(definitions),
            variables
        );

        merge(result.tokens, tokens);
    }

    return result;
};

const customArrayMerge = (objectValue: unknown, sourceValue: unknown) => {
    if (Array.isArray(objectValue) && Array.isArray(sourceValue)) {
        return [...objectValue, ...sourceValue];
    }
};

const mergeComponents = (
    componentsSource: UnknownThemeSource["components"][],
    tokens: ConvertedTokens<Record<string, Token>, Modifiers>
): Components<Modifiers> => {
    const result: Components<Modifiers> = {};

    for (const componentsGenerator of componentsSource) {
        const components = componentsGenerator(tokens);

        mergeWith(result, components, customArrayMerge);
    }

    return result;
};

export const mergeThemes = (...themes: UnknownThemeSource[]) => {
    const definitions = mergeDefinitions(
        themes.map(({ definitions }) => definitions)
    );

    const { modifierTokens, tokens } = mergeTokens(
        themes.map(({ tokens }) => tokens),
        definitions
    );

    const markedTokens = markTokens(tokens);
    const markedModifierTokens = markModifierTokens(modifierTokens);

    const combinedTokens = combineTokens(markedTokens, markedModifierTokens);

    const components = mergeComponents(
        themes.map(({ components }) => components),
        combinedTokens
    );

    return components;
};
