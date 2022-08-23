import {
    MarkedToken,
    MarkedTokenModifier,
    TokenGenerator,
} from "./ThemeSource";
import { uniqueKey, tokenModifierUniqueSymbol } from "./uniqueSymbols";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...arguments_: any[]) => any;

export const isModifierToken = <TModifiers>(
    token:
        | MarkedToken
        | MarkedTokenModifier<TModifiers>
        | TokenGenerator<TModifiers>
): token is MarkedTokenModifier<TModifiers> =>
    typeof token !== "function" &&
    token[uniqueKey] === tokenModifierUniqueSymbol;
