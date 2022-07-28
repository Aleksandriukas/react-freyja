import { ExtractTokenReturnTypes } from "./ExtractReturnTypes";
import { ConvertAllVariableNames, ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./Theme";

export type Token<TVariables> = (
    variables: TVariables
) => Partial<StyleProperties>;

export type Modifiers = Record<string, Record<`$${string}`, unknown>>;

export type FreyjaComponent<TModifiers extends Modifiers> = {
    tokens: Partial<StyleProperties>[];
    // TODO rename it
    propsModifiers: (
        modifierTokens: ConvertAllVariableNames<TModifiers>
    ) => Record<
        string,
        Record<
            string,
            Partial<StyleProperties> | Partial<ExtractVariables<TModifiers>>
        >
    >;
};

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<
        string,
        Token<ExtractVariables<ReturnType<TModifiersGenerator>>>
    >,
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
    components: (tokens: ExtractTokenReturnTypes<TTokens>) => TComponents;
};
