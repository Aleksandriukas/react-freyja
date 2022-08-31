import merge from "lodash/merge";
import {
    Components,
    ConvertedTokens,
    Modifiers,
    SourceModifiers,
    Token,
    UnknownThemeSource,
} from "./types/Theme";
import { combineTokens } from "./utils/combineTokens";
import { convertVariableNames } from "./utils/convertVariableNames";
import { executeTokenGenerators } from "./utils/executeTokenGenerators";
import { getAllVariables } from "./utils/getAllVariables";

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
    modifierTokens: SourceModifiers;
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

const mergeComponents = (
    componentsSource: UnknownThemeSource["components"][],
    tokens: ConvertedTokens<Record<string, Token>, Modifiers>
): Components<Modifiers> => {
    const result: Components<Modifiers> = {};

    for (const componentsGenerator of componentsSource) {
        const components = componentsGenerator(tokens);

        merge(result, components);
    }

    return result;
};

export const mergeThemes = (themes: UnknownThemeSource[]) => {
    const definitions = mergeDefinitions(
        themes.map(({ definitions }) => definitions)
    );

    const { modifierTokens, tokens } = mergeTokens(
        themes.map(({ tokens }) => tokens),
        definitions
    );

    // TODO solve issue with _type marking - it is nor safe nor readable
    const combinedTokens = combineTokens(tokens, modifierTokens);
};
