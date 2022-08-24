import {
    MarkedToken,
    MarkedTokenModifier,
    TokenOrModifier,
} from "./ThemeSource";
import {
    uniqueKey,
    tokenModifierUniqueSymbol,
    tokenUniqueSymbol,
} from "./uniqueSymbols";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...arguments_: any[]) => any;

export const isModifierToken = <TModifiers>(
    token: TokenOrModifier<TModifiers>
): token is MarkedTokenModifier<TModifiers> =>
    token[uniqueKey] === tokenModifierUniqueSymbol;

export const isToken = <TModifiers>(
    token: TokenOrModifier<TModifiers>
): token is MarkedToken => token[uniqueKey] === tokenUniqueSymbol;
