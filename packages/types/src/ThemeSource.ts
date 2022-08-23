import {
    ExtractVariableNamesFromToken,
    ExtractVariables,
} from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";
import {
    TokenUniqueSymbol,
    TokenModifierUniqueSymbol,
    uniqueKey,
} from "./uniqueSymbols";
import { AnyFunction } from "./utils";

/* TOKENS */
export type Token = Partial<StyleProperties>;
export type TokenGenerator<TModifiers> = (
    variables: ExtractVariables<TModifiers>
) => Token;
export type TokenModifier<TModifiers> = Partial<ExtractVariables<TModifiers>>;
export type Tokens<TModifiers> = Record<
    string,
    Token | TokenGenerator<TModifiers>
>;

/* MARKED TOKENS */
export type MarkedToken = Token & {
    [uniqueKey]: TokenUniqueSymbol;
};
export type MarkedTokenModifier<TModifiers> = TokenModifier<TModifiers> & {
    [uniqueKey]: TokenModifierUniqueSymbol;
};
export type MarkedTokenGenerator = <TModifiers>(
    variables: ExtractVariables<TModifiers>
) => MarkedToken;

/* MODIFIERS */
export type SourceModifiers = Record<string, Record<`$${string}`, unknown>>;
export type ModifiersGenerator<TDefinitions> = (
    definitions: TDefinitions
) => SourceModifiers;

/* COMPONENTS */
export type Component<TModifiers> = {
    tokens: (Token | TokenModifier<TModifiers>)[];
    variants: Record<string, Record<string, Token | TokenModifier<TModifiers>>>;
};
export type Components<TModifiers> = Record<string, Component<TModifiers>>;

/* CONVERT TOKENS */
export type ConvertTokens<TTokens> = {
    [TKey in keyof TTokens]: (TTokens[TKey] extends AnyFunction
        ? ReturnType<TTokens[TKey]>
        : TTokens[TKey]) & {
        [uniqueKey]: TokenUniqueSymbol;
    };
};

export type ConvertModifiers<TModifiers extends SourceModifiers> = {
    [TTokenKey in keyof TModifiers]: {
        [TPropertyKey in ExtractVariableNamesFromToken<
            TModifiers[TTokenKey]
        >]: TPropertyKey extends string
            ? TModifiers[TTokenKey][`$${TPropertyKey}`]
            : never;
    } & {
        [uniqueKey]: TokenModifierUniqueSymbol;
    };
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
        tokens: ConvertTokens<TTokens> &
            ConvertModifiers<ReturnType<TModifiersGenerator>>
    ) => TComponents;
};

export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Tokens<ReturnType<ModifiersGenerator<Record<string, unknown>>>>,
    Components<ReturnType<ModifiersGenerator<Record<string, unknown>>>>
>;
