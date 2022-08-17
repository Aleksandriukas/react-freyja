import { ConvertAllVariableNames, ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";

export type Token = {
    [K in keyof StyleProperties]?: StyleProperties[K] | symbol;
};
export type TokenGenerator<TModifiers> = (
    variables: ExtractVariables<TModifiers>
) => Token;
export type AnyToken<TModifiers> = Token | TokenGenerator<TModifiers>;
export type Tokens<TModifiers> = Record<string, AnyToken<TModifiers>>;

export type SourceModifiers = Record<string, Record<`$${string}`, unknown>>;
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => SourceModifiers;

export type FreyjaComponentModifier<TModifiers> =
    | AnyToken<TModifiers>
    | Partial<ExtractVariables<TModifiers>>;

export type FreyjaComponent<TModifiers> = {
    tokens: AnyToken<TModifiers>[];
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
        modifierTokens: ConvertAllVariableNames<ReturnType<TModifiersGenerator>>
    ) => TComponents;
};

export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Tokens<ReturnType<ModifiersGenerator<Record<string, unknown>>>>,
    FreyjaComponents<ReturnType<ModifiersGenerator<Record<string, unknown>>>>
>;
