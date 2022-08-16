import { ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";

export type Token = Partial<StyleProperties>;
export type TokenGenerator<TModifiers> = (
    variables: ExtractVariables<TModifiers>
) => Token;
export type Tokens<TModifiers> = Record<
    string,
    TokenGenerator<TModifiers> | Token
>;

export type SourceModifiers = Record<string, Record<`$${string}`, unknown>>;
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => SourceModifiers;

export type FreyjaComponentModifier<TModifiers> =
    | TokenGenerator<TModifiers>
    | Token
    | Partial<ExtractVariables<TModifiers>>;

export type FreyjaComponent<TModifiers> = {
    tokens: (TokenGenerator<TModifiers> | Token)[];
    modifiersMap: Record<
        string,
        Record<string, FreyjaComponentModifier<TModifiers>>
    >;
};
export type FreyjaComponents<TModifiers> = Record<
    string,
    FreyjaComponent<TModifiers>
>;

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends FreyjaComponents<ReturnType<TModifiersGenerator>>
> = {
    definitions: TDefinitions;
    tokens: {
        modifiers: TModifiersGenerator;
        constant: (definitions: TDefinitions) => TTokens;
    };
    components: (
        constantTokens: TTokens,
        modifierTokens: ReturnType<TModifiersGenerator>
    ) => TComponents;
};

export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Tokens<ReturnType<ModifiersGenerator<Record<string, unknown>>>>,
    FreyjaComponents<ReturnType<ModifiersGenerator<Record<string, unknown>>>>
>;
