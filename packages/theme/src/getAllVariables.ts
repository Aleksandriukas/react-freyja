import { SourceModifiers } from "@react-freyja/types";

export const getAllVariables = (
    modifiers: SourceModifiers
): Record<string, symbol> => {
    const variables = {} as Record<string, symbol>;

    for (const modifier of Object.values(modifiers)) {
        for (const property of Object.keys(modifier)) {
            variables[property.slice(1)] = Symbol(property);
        }
    }

    return variables;
};
