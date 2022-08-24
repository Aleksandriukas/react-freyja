import {
    TokenOrModifier,
    MarkedTokenModifier,
    uniqueKey,
    tokenModifierUniqueSymbol,
    MarkedToken,
    tokenUniqueSymbol,
} from "@react-freyja/theme";

export const isModifierToken = <TModifiers>(
    token: TokenOrModifier<TModifiers>
): token is MarkedTokenModifier<TModifiers> =>
    token[uniqueKey] === tokenModifierUniqueSymbol;

export const isToken = <TModifiers>(
    token: TokenOrModifier<TModifiers>
): token is MarkedToken => token[uniqueKey] === tokenUniqueSymbol;
