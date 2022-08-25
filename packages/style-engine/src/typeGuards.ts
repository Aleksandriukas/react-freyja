import {
    TokenOrModifier,
    MarkedTokenModifier,
    tokenModifierUniqueSymbol,
    MarkedToken,
    tokenUniqueSymbol,
} from "@react-freyja/theme";

export const isModifierToken = <TModifiers>(
    token: TokenOrModifier<TModifiers>
): token is MarkedTokenModifier<TModifiers> =>
    token._type === tokenModifierUniqueSymbol;

export const isToken = <TModifiers>(
    token: TokenOrModifier<TModifiers>
): token is MarkedToken => token._type === tokenUniqueSymbol;
