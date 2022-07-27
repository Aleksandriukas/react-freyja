import { ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./Theme";

export type Token<TModifiers> = (
    variables: ExtractVariables<TModifiers>
) => Partial<StyleProperties>;
export type Modifiers = Record<string, Record<`$${string}`, unknown>>;

export type FreyjaComponent<TModifiers> = {
    tokens: symbol[];
    // TODO rename it
    propsModifiers: (
        modifierTokens: Record<keyof TModifiers, symbol>
    ) => Record<string, Record<string, symbol>>;
};

export type ConvertTokensType<TTokens> = Record<keyof TTokens, symbol>;

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<string, Token<ReturnType<TModifiersGenerator>>>,
    TComponents extends Record<
        string,
        FreyjaComponent<ReturnType<TModifiersGenerator>>
    >
> = {
    definitions: TDefinitions;
    tokens: {
        modifierTokens: TModifiersGenerator;
        staticTokens: (definitions: TDefinitions) => TTokens;
    };
    components: (tokens: ConvertTokensType<TTokens>) => TComponents;
};
