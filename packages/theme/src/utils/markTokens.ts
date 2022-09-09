import {
    ConvertModifiers,
    MarkedToken,
    Modifiers,
    Token,
} from "../types/Theme";
import { tokenUniqueSymbol, tokenModifierUniqueSymbol } from "./uniqueSymbols";

export const markTokens = (
    tokens: Record<string, Token>
): Record<string, MarkedToken> => {
    const result = {} as Record<string, MarkedToken>;

    for (const tokenName of Object.keys(tokens)) {
        result[tokenName] = { ...tokens[tokenName], _type: tokenUniqueSymbol };
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
            _type: tokenModifierUniqueSymbol,
        };
    }

    return result;
};
