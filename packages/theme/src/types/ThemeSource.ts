import { ConvertAllVariableNames, ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";

export type Token = Partial<StyleProperties>;
export type Modifiers = Record<string, Record<`$${string}`, unknown>>;

export type TokenGenerator<TModifiers> = (
    variables: ExtractVariables<TModifiers>
) => Token;
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => Modifiers;

export type Tokens<TModifiers> = Record<
    string,
    TokenGenerator<TModifiers> | Token
>;
export type Components<TModifiers> = Record<
    string,
    FreyjaComponent<TModifiers>
>;

export type FreyjaComponentModifier<TModifiers> =
    | TokenGenerator<TModifiers>
    | Token
    | ExtractVariables<TModifiers>;

export type FreyjaComponent<TModifiers> = {
    tokens: TokenGenerator<TModifiers>[];
    modifiersMap: Record<
        string,
        Record<string, FreyjaComponentModifier<TModifiers>>
    >;
};

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
> = {
    definitions: TDefinitions;
    tokens: {
        modifiers: TModifiersGenerator;
        constant: (definitions: TDefinitions) => TTokens;
    };
    components: (
        constantTokens: TTokens,
        modifierTokens: ConvertAllVariableNames<ReturnType<TModifiersGenerator>>
    ) => TComponents;
};

export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Tokens<ReturnType<ModifiersGenerator<Record<string, unknown>>>>,
    Components<ReturnType<ModifiersGenerator<Record<string, unknown>>>>
>;
