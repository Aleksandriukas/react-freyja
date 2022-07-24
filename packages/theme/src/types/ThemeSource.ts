import { StyleProperties } from "./Theme";

export type ThemeToken<TVariables extends Record<string, string>> = {
    [K in keyof StyleProperties]?:
        | StyleProperties[K]
        | ((variables: TVariables) => StyleProperties[K]);
};

type OnlyStringKeys<T> = {
    [K in keyof T]: K extends symbol ? never : K;
}[keyof T];

export type VariableToken<TVariables extends Record<string, string>> = Record<`$${OnlyStringKeys<TVariables>}`, string>;

export type Token<TVariables extends Record<string, string>> = ThemeToken<TVariables> | VariableToken<TVariables>;
export type Modifiers<TVariables extends Record<string, string>> = Record<string, Record<string, TVariables>>;

export type ThemeComponent<TVariables extends Record<string, string>, TModifiers extends Modifiers<TVariables>> = {
    tokens: Token<TVariables>[];
    modifiers: TModifiers;
};

export type ThemeSource<
    TVariables extends Record<string, string>,
    TComponents extends Record<string, ThemeComponent<TVariables, Modifiers<TVariables>>>,
    TTokens extends Record<string, Token<TVariables>>,
    TDefinitions extends object
> = {
    definitions: TDefinitions;
    tokens: (definitions: TDefinitions) => TTokens;
    components: (tokens: TTokens) => TComponents;
};
