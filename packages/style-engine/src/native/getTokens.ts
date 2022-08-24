import { Modifiers, Token, isToken, Component } from "@react-freyja/types";
import { injectVariablesInToken } from "./injectVariablesInToken";

export const getTokens = (
    { tokens, variants }: Component<Modifiers>,
    variables: Record<string, unknown>,
    variant: Record<string, string>
): Token[] => {
    const result: Token[] = [];

    for (const token of tokens) {
        if (isToken(token)) {
            result.push(injectVariablesInToken(token, variables));
        }
    }

    for (const [key, value] of Object.entries(variant)) {
        const token = variants[key][value];

        if (isToken(token)) {
            result.push(injectVariablesInToken(token, variables));
        }
    }

    return result;
};
