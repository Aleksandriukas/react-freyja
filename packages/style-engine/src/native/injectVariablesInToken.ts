import { SymbolizeToken, MarkedToken, Token } from "@react-freyja/types";

export const injectVariablesInToken = (
    token: SymbolizeToken<MarkedToken>,
    variables: Record<string, unknown>
): Token => {
    const result = {} as Token;

    for (const [key, value] of Object.entries(token)) {
        const newValue =
            typeof value === "symbol" ? variables[value.description!] : value;

        (result as Record<string, unknown>)[key] = newValue;
    }

    return result;
};
