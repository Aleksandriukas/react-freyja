import { Component, Modifiers, MarkedTokenModifier } from "@react-freyja/theme";
import { isModifierToken } from "../typeGuards";

export const getVariables = (
    { tokens, variants }: Component<Modifiers>,
    variant: Record<string, string>
): Record<string, unknown> => {
    const variables = {} as Record<string, unknown>;

    const addVariables = (tokenModifier: MarkedTokenModifier<Modifiers>) => {
        for (const [key, value] of Object.entries(tokenModifier)) {
            variables[key] = value;
        }
    };

    for (const token of tokens) {
        if (isModifierToken(token)) {
            addVariables(token);
        }
    }

    for (const [key, value] of Object.entries(variant)) {
        const token = variants[key][value];

        if (isModifierToken(token)) {
            addVariables(token);
        }
    }

    return variables;
};
