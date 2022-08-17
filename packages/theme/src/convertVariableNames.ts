import { ConvertAllVariableNames, SourceModifiers } from "@react-freyja/types";

export const convertVariableNames = (modifiers: SourceModifiers) => {
    const result = {} as ConvertAllVariableNames<SourceModifiers>;

    for (const modifierName of Object.keys(modifiers)) {
        result[modifierName] = {};

        for (const [property, value] of Object.entries(
            modifiers[modifierName]
        )) {
            result[modifierName][property.slice(1)] = value;
        }
    }

    return result;
};
