import { ConvertAllVariableNames, ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";

// Single token unit - defines styles of a component
export type Token = {
    [K in keyof StyleProperties]?: StyleProperties[K] | symbol;
};
// Function to generate token
export type TokenGenerator<TModifiers> = (
    variables: ExtractVariables<TModifiers>
) => Token;
// Token or function to get token
export type AnyToken<TModifiers> = Token | TokenGenerator<TModifiers>;
// All defined tokens in theme
export type Tokens<TModifiers> = Record<string, AnyToken<TModifiers>>;

// All defined modifiers in theme
export type SourceModifiers = Record<string, Record<`$${string}`, unknown>>;
// Function to generate all modifiers
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => SourceModifiers;

// Modifier for single prop value
export type VariantModifier<TModifiers> =
    | AnyToken<TModifiers>
    | Partial<ExtractVariables<TModifiers>>;

export type Component<TModifiers> = {
    tokens: AnyToken<TModifiers>[];
    variants: Record<string, Record<string, VariantModifier<TModifiers>>>;
};
export type Components<TModifiers> = Record<string, Component<TModifiers>>;

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
