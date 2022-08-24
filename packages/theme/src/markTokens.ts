import {
    ConvertModifiers,
    MarkedToken,
    Modifiers,
    Token,
    tokenModifierUniqueSymbol,
    tokenUniqueSymbol,
    uniqueKey,
} from "@react-freyja/types";

export const markTokens = (
    tokens: Record<string, Token>
): Record<string, MarkedToken> => {
    const result = {} as Record<string, MarkedToken>;

    for (const [tokenName, token] of Object.entries(tokens)) {
        result[tokenName] = {
            ...token,
            [uniqueKey]: tokenUniqueSymbol,
        };
    }

    return result;
};

export const markModifierTokens = (
    modifiers: Modifiers
): ConvertModifiers<Modifiers> => {
    const result = {} as ConvertModifiers<Modifiers>;

    for (const tokenName of Object.keys(modifiers)) {
        result[tokenName] = {
            ...modifiers[tokenName],
            [uniqueKey]: tokenModifierUniqueSymbol,
        };
    }

    return result;
};
