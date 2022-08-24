import {
    ConvertedTokens,
    ConvertModifiers,
    ConvertTokens,
    ModifiersGenerator,
    Tokens,
} from "@react-freyja/types";

export const combineTokens = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>
>(
    tokens: ConvertTokens<TTokens>,
    modifierTokens: ConvertModifiers<ReturnType<TModifiersGenerator>>
): ConvertedTokens<TTokens, ReturnType<TModifiersGenerator>> => {
    const result = {} as ConvertedTokens<
        TTokens,
        ReturnType<TModifiersGenerator>
    >;

    for (const tokenName of Object.keys(tokens)) {
        const token = tokens[tokenName];

        (result as Record<string, unknown>)[tokenName] = token;
    }

    for (const tokenName of Object.keys(modifierTokens)) {
        const token = modifierTokens[tokenName];

        (result as Record<string, unknown>)[tokenName] = token;
    }

    return result;
};
