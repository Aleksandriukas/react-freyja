import { SourceModifiers } from "../types/Theme";

export const getAllVariables = (
    modifiers: SourceModifiers
): Record<string, symbol> => {
    const variables = {} as Record<string, symbol>;

    for (const modifier of Object.values(modifiers)) {
        for (const property of Object.keys(modifier)) {
            variables[property] = Symbol(property);
        }
    }

    return variables;
};
