import { MarkedToken, MarkedTokenModifier } from "./ThemeSource";

export type SymbolizeToken<TToken> = {
    [K in keyof TToken]: TToken[K] | symbol;
};

export type TokenOrModifier<TModifiers> =
    | SymbolizeToken<MarkedToken>
    | MarkedTokenModifier<TModifiers>;

export type Modifiers = Record<string, Record<string, unknown>>;

export type ExecutedThemeComponent<TModifiers> = {
    tokens: TokenOrModifier<TModifiers>[];
    variants: Record<string, Record<string, TokenOrModifier<TModifiers>>>;
};

export type ExecutedThemeComponents<TModifiers> = Record<
    string,
    ExecutedThemeComponent<TModifiers>
>;

export type ExecutedTheme<
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> = TComponents;

export type UnknownExecutedTheme = ExecutedTheme<
    Modifiers,
    ExecutedThemeComponents<Modifiers>
>;
