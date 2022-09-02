import {
    TokenUniqueSymbol,
    TokenModifierUniqueSymbol,
} from "../utils/uniqueSymbols";
import {
    ExtractVariableNamesFromToken,
    ExtractVariables,
} from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...arguments_: any[]) => any;

export type Modifiers = Record<string, Record<string, unknown>>;

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
    _type: TokenUniqueSymbol;
};
export type MarkedTokenModifier<TModifiers> = TokenModifier<TModifiers> & {
    _type: TokenModifierUniqueSymbol;
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
        _type: TokenUniqueSymbol;
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
        _type: TokenModifierUniqueSymbol;
    };
};
export type ConvertedTokens<
    TTokens,
    TModifiers extends Modifiers
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

// TODO fix this type - it is not assignable to regular ThemeSource
export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Record<string, Token | TokenGenerator<SourceModifiers>>,
    Components<SourceModifiers>
>;
