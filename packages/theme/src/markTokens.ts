import {
    isModifierToken,
    ModifiersGenerator,
    OmitUniqueKeys,
    SourceModifiers,
    tokenModifierSymbol,
    Tokens,
    tokenSymbol,
    uniqueKey,
} from "@react-freyja/types";

export const markTokens = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>
>(
    tokens: OmitUniqueKeys<TTokens>
): TTokens => {
    const result: TTokens = {} as TTokens;

    for (const [tokenName, token] of Object.entries(
        tokens as Tokens<SourceModifiers>
    )) {
        if (typeof token === "function") {
            result[tokenName as keyof TTokens] =
                token as TTokens[keyof TTokens];
        } else {
            result[tokenName as keyof TTokens] = {
                ...token,
                [uniqueKey]: isModifierToken(token)
                    ? tokenModifierSymbol
                    : tokenSymbol,
            } as TTokens[keyof TTokens];
        }
    }

    return result;
};
