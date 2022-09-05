import {
    ConvertModifiers,
    MarkedToken,
    MarkedTokenModifier,
    Modifiers,
    Token,
} from "../types/Theme";
import { tokenUniqueSymbol, tokenModifierUniqueSymbol } from "./uniqueSymbols";

const defineTokenIdentifier = (token: object, id: symbol) => {
    Object.defineProperty(token, "_type", {
        value: id,
        enumerable: false,
        writable: false,
    });
};

export const markTokens = (
    tokens: Record<string, Token>
): Record<string, MarkedToken> => {
    const result = {} as Record<string, MarkedToken>;

    for (const tokenName of Object.keys(tokens)) {
        result[tokenName] = { ...tokens[tokenName] } as MarkedToken;

        defineTokenIdentifier(result[tokenName], tokenUniqueSymbol);
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
        } as MarkedTokenModifier<Modifiers>;

        defineTokenIdentifier(result[tokenName], tokenModifierUniqueSymbol);
    }

    return result;
};
