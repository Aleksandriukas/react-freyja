import {
    ModifiersGenerator,
    Tokens,
    ExtractSymbolizedVariables,
    Token,
    ExtractVariables,
} from "@react-freyja/types";

export const executeTokenGenerators = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>
>(
    tokens: TTokens,
    variables: ExtractSymbolizedVariables<ReturnType<TModifiersGenerator>>
): Record<string, Token> => {
    const result = {} as Record<string, Token>;

    for (const tokenName of Object.keys(tokens)) {
        const token = tokens[tokenName];

        if (typeof token === "function") {
            result[tokenName] = token(
                // Insert symbols in tokens
                variables as ExtractVariables<ReturnType<TModifiersGenerator>>
            );
        } else {
            result[tokenName] = token;
        }
    }

    return result;
};
