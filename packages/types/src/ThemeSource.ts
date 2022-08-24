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

export type SymbolizeToken<TToken> = {
    [K in keyof TToken]: TToken[K] | symbol;
};

export type TokenOrModifier<TModifiers> =
    | SymbolizeToken<MarkedToken>
    | MarkedTokenModifier<TModifiers>;

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
    tokens: TokenOrModifier<TModifiers>[];
    variants: Record<string, Record<string, TokenOrModifier<TModifiers>>>;
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
export type ConvertedTokens<
    TTokens,
    TModifiers extends SourceModifiers
> = ConvertTokens<TTokens> & ConvertModifiers<TModifiers>;

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Record<
        string,
        Token | TokenGenerator<ReturnType<TModifiersGenerator>>
    >,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
> = {
    definitions: TDefinitions;
    tokens: {
        modifiers: TModifiersGenerator;
        constant: (definitions: TDefinitions) => TTokens;
    };
    components: (
        tokens: ConvertedTokens<TTokens, ReturnType<TModifiersGenerator>>
    ) => TComponents;
};

export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Record<string, Token | TokenGenerator<SourceModifiers>>,
    Components<ReturnType<ModifiersGenerator<Record<string, unknown>>>>
>;
