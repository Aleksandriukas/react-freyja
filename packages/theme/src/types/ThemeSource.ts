import { StyleProperties } from "./Theme";

export type ThemeToken = {
    [K in keyof StyleProperties]:
        | StyleProperties[K]
        | ((variables: Record<string, string | number>) => StyleProperties[K]);
};

export type VariableToken = Record<`$${string}`, number | string>;
export type Variables = Record<string, VariableToken>;

export type ThemeTokens<T extends string> = Record<T, ThemeToken>;

export type ThemeComponent = {
    tokens: ThemeToken[];
    propsToTokensMap: Record<string, Record<string, ThemeToken>>;
};

export type ThemeComponents<C extends string> = Record<C, ThemeComponent>;

export type ThemeSource<
    C extends string,
    T extends string,
    D extends object
> = {
    definitions: D;
    tokens: (definitions: D) => ThemeTokens<T>;
    variables: (definitions: D) => Variables;
    components: (tokens: ThemeTokens<T>) => ThemeComponents<C>;
};
