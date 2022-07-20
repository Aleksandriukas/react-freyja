import { StyleProperties } from "./Theme";

export type ThemeToken = {
    [K in keyof StyleProperties]:
        | StyleProperties[K]
        | ((variables: VariableToken) => StyleProperties[K]);
};

export type VariableValue = number | string;
export type VariableToken = Record<`$${string}`, VariableValue>;

export type Token = ThemeToken | VariableToken;
export type ThemeTokens<T extends string> = Record<T, Token>;
export type Modifiers = Record<string, Record<string, Token>>;

export type ThemeComponent = {
    tokens: Token[];
    modifiers: Modifiers;
}

export type ThemeComponents<C extends string> = Record<C, ThemeComponent>;

export type ThemeSource<
    C extends string,
    T extends string,
    D extends object
> = {
    definitions: D;
    tokens: (definitions: D) => ThemeTokens<T>;
    components: (tokens: ThemeTokens<T>) => ThemeComponents<C>;
};
