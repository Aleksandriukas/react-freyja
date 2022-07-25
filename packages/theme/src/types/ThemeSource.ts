import { StyleProperties } from "./Theme";

export type Token<TModifiers> = {
    [K in keyof StyleProperties]?:
        | StyleProperties[K]
        | ExtractModifiersProperties<TModifiers>;
};
export type Modifiers = Record<string, Record<string, unknown>>;

export type ExtractModifiersProperties<TModifiers> = {
    [TModifierName in keyof TModifiers]: {
        [TPropertyName in keyof TModifiers[TModifierName]]: TPropertyName;
    }[keyof TModifiers[TModifierName]];
}[keyof TModifiers];

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiers extends Modifiers,
    TTokens extends Record<string, Token<TModifiers>>,
    TComponents extends Record<string, any>
> = {
    definitions: TDefinitions;
    tokens: {
        modifiers: (definitions: TDefinitions) => TModifiers;
        static: (definitions: TDefinitions) => TTokens;
    };
    components: (tokens: TTokens) => TComponents;
};
