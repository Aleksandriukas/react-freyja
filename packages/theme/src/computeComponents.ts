import {
    ExecutedThemeComponents,
    ExtractVariables,
    FreyjaComponents,
    Modifiers,
} from "@react-freyja/types";

const replaceTokens = (
    result: ExecutedThemeComponents<Modifiers>,
    components: FreyjaComponents<Modifiers>,
    componentName: string,
    variables: ExtractVariables<Modifiers>
) => {
    const component = components[componentName];
    for (let index = 0; index < component.tokens.length; ++index) {
        const token = component.tokens[index];
        if (typeof token === "function") {
            result[componentName].tokens[index] = token(variables);
        } else {
            result[componentName].tokens[index] = token;
        }
    }
};

const replaceModifiers = (
    result: ExecutedThemeComponents<Modifiers>,
    components: FreyjaComponents<Modifiers>,
    componentName: string,
    variables: ExtractVariables<Modifiers>
) => {
    const component = components[componentName];
    for (const [propertyName, propertyValues] of Object.entries(
        component.modifiersMap
    )) {
        result[componentName].modifiersMap[propertyName] = {};
        for (const [propertyValue, modifier] of Object.entries(
            propertyValues
        )) {
            result[componentName].modifiersMap[propertyName][propertyValue] =
                typeof modifier === "function" ? modifier(variables) : modifier;
        }
    }
};

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

        replaceTokens(result, components, componentName, variables);
        replaceModifiers(result, components, componentName, variables);
    }

    return result;
};
