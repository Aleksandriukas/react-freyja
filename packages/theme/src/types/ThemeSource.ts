import { ExtractTokenReturnTypes } from "./ExtractReturnTypes";
import { ConvertAllVariableNames, ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./Theme";

export type Token = Partial<StyleProperties>;
export type Modifiers = Record<string, Record<`$${string}`, unknown>>;

export type TokenGenerator<TVariables> = (variables: TVariables) => Token;
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => Modifiers;

export type Tokens<TModifiers> = Record<
    string,
    TokenGenerator<ExtractVariables<TModifiers>> | Token
>;
export type Components<
    TDefinitions,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>
> = Record<string, FreyjaComponent<ReturnType<TModifiersGenerator>>>;

export type FreyjaComponentModifier<TModifiers> =
    | Token
    | Partial<ExtractVariables<TModifiers>>;

export type FreyjaComponent<TModifiers extends Modifiers> = {
    tokens: Token[];
    // TODO rename it **sync in ./Theme.ts**
    propsModifiers: Record<
        string,
        Record<string, FreyjaComponentModifier<TModifiers>>
    >;
};

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
> = {
    definitions: TDefinitions;
    tokens: {
        modifiers: TModifiersGenerator;
        staticTokens: (definitions: TDefinitions) => TTokens;
    };
    components: (
        tokens: ExtractTokenReturnTypes<TTokens>,
        modifiers: ConvertAllVariableNames<ReturnType<TModifiersGenerator>>
    ) => TComponents;
};
