import {
    isModifierToken,
    SourceModifiers,
    TokenModifier,
    Tokens,
} from "@react-freyja/types";

export const getSourceModifiers = (
    tokens: Tokens<SourceModifiers>
): Record<string, TokenModifier<SourceModifiers>> => {
    const result = {} as Record<string, TokenModifier<SourceModifiers>>;

    for (const [tokenName, token] of Object.entries(tokens)) {
        if (isModifierToken(token)) {
            result[tokenName] = token;
        }
    }

    return result;
};
