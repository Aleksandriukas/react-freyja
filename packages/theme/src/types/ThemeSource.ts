import { ExtractTokenReturnTypes } from "./ExtractReturnTypes";
import { ConvertAllVariableNames, ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./Theme";

export type Token = Partial<StyleProperties>;
export type Modifiers = Record<string, Record<`$${string}`, unknown>>;

export type TokenGenerator<TVariables> = (variables: TVariables) => Token;
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => Modifiers;

export type Tokens<
    TDefinitions,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>
> = Record<
    string,
    TokenGenerator<ExtractVariables<ReturnType<TModifiersGenerator>>>
>;
export type Components<
    TDefinitions,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>
> = Record<string, FreyjaComponent<ReturnType<TModifiersGenerator>>>;

export type FreyjaComponent<TModifiers extends Modifiers> = {
    tokens: Token[];
    // TODO rename it **sync in ./Theme.ts**
    propsModifiers: (
        modifierTokens: ConvertAllVariableNames<TModifiers>
    ) => Record<
        string,
        Record<string, Token | Partial<ExtractVariables<TModifiers>>>
    >;
};

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<TDefinitions, TModifiersGenerator>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
> = {
    definitions: TDefinitions;
    tokens: {
        modifierTokens: TModifiersGenerator;
        staticTokens: (definitions: TDefinitions) => TTokens;
    };
    components: (tokens: ExtractTokenReturnTypes<TTokens>) => TComponents;
};
