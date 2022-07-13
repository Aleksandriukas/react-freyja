import { StyleProperties } from './Theme';

export type ThemeToken = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof StyleProperties]: StyleProperties[K] | ((variables: Record<string, any>) => StyleProperties[K]);
};

export type VariableToken = Record<`$${string}`, unknown>;

export type ThemeTokens<T extends string> = Record<T, ThemeToken | VariableToken>;

export type ThemeComponent = {
    tokens: ThemeToken[];
};

export type ThemeComponents<C extends string> = Record<C, (props: object) => ThemeComponent>;

export type ThemeSource<C extends string, T extends string, D extends object> = {
    definitions: D;
    tokens: (definitions: D) => ThemeTokens<T>;
    components: (tokens: ThemeTokens<T>) => ThemeComponents<C>;
};
