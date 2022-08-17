import {
    ExecutedThemeComponents,
    ExtractVariables,
    FreyjaComponents,
    Modifiers,
} from "@react-freyja/types";

export const computeComponents = (
    components: FreyjaComponents<Modifiers>,
    variables: ExtractVariables<Modifiers>
): ExecutedThemeComponents<Modifiers> => {
    const result = {} as ExecutedThemeComponents<Modifiers>;

    for (const [componentName, component] of Object.entries(components)) {
        result[componentName] = {
            tokens: Array.from({ length: component.tokens.length }),
            modifiersMap: {},
        };

        // Execute tokens
        for (let index = 0; index < component.tokens.length; ++index) {
            const token = component.tokens[index];
            if (typeof token === "function") {
                result[componentName].tokens[index] = token(variables);
            } else {
                result[componentName].tokens[index] = token;
            }
        }

        // Execute tokens that were passed in modifiersMap
        for (const [propertyName, propertyValues] of Object.entries(
            component.modifiersMap
        )) {
            result[componentName].modifiersMap[propertyName] = {};
            for (const [propertyValue, modifier] of Object.entries(
                propertyValues
            )) {
                if (typeof modifier === "function") {
                    result[componentName].modifiersMap[propertyName][
                        propertyValue
                    ] = modifier(variables);
                } else {
                    result[componentName].modifiersMap[propertyName][
                        propertyValue
                    ] = modifier;
                }
            }
        }
    }

    return result;
};
