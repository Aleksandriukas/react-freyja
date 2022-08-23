import {
    ExtractVariableNamesFromToken,
    ExtractVariables,
} from "./ExtractVariables";
import { StyleProperties } from "./StyleProperties";
import {
    TokenUniqueSymbol,
    TokenModifierUniqueSymbol,
    uniqueKey,
    tokenModifierUniqueSymbol,
} from "./uniqueSymbols";

/* UTILS */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...arguments_: any[]) => any;

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

/* PARSING TOKENS */
export type ParseTokens<TTokens> = {
    [TKey in keyof TTokens]: (TTokens[TKey] extends AnyFunction
        ? ReturnType<TTokens[TKey]>
        : TTokens[TKey]) & {
        [uniqueKey]: TokenUniqueSymbol;
    };
};

export type ParseModifiers<TModifiers extends SourceModifiers> = {
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
        tokens: ParseTokens<TTokens> &
            ParseModifiers<ReturnType<TModifiersGenerator>>
    ) => TComponents;
};

export type UnknownThemeSource = ThemeSource<
    Record<string, unknown>,
    ModifiersGenerator<Record<string, unknown>>,
    Tokens<ReturnType<ModifiersGenerator<Record<string, unknown>>>>,
    Components<ReturnType<ModifiersGenerator<Record<string, unknown>>>>
>;

export const isModifierToken = <TModifiers>(
    token:
        | MarkedToken
        | MarkedTokenModifier<TModifiers>
        | TokenGenerator<TModifiers>
): token is MarkedTokenModifier<TModifiers> =>
    typeof token !== "function" &&
    token[uniqueKey] === tokenModifierUniqueSymbol;
