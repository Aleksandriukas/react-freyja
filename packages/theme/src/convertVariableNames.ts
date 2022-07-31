import { ConvertAllVariableNames } from "./types/ExtractVariables";
import { Modifiers } from "./types/ThemeSource";

export const convertVariableNames = (
    modifiers: Modifiers
): ConvertAllVariableNames<Modifiers> => {
    const result = {} as ConvertAllVariableNames<Modifiers>;

    for (const [name, token] of Object.entries(modifiers)) {
        for (const [variable, value] of Object.entries(token)) {
            if (!result[name]) {
                result[name] = {};
            }

            result[name][variable.slice(1)] = value;
        }
    }

    return result;
};
