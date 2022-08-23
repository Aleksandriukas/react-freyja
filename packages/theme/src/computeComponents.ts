import {
    ExecutedThemeComponents,
    ExtractVariables,
    Components,
    Modifiers,
} from "@react-freyja/types";

const replaceTokens = (
    result: ExecutedThemeComponents<Modifiers>,
    components: Components<Modifiers>,
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
    components: Components<Modifiers>,
    componentName: string,
    variables: ExtractVariables<Modifiers>
) => {
    const component = components[componentName];
    for (const [propertyName, propertyValues] of Object.entries(
        component.variants
    )) {
        result[componentName].variants[propertyName] = {};
        for (const [propertyValue, token] of Object.entries(propertyValues)) {
            result[componentName].variants[propertyName][propertyValue] =
                typeof token === "function" ? token(variables) : token;
        }
    }
};

export const computeComponents = (
    components: Components<Modifiers>,
    variables: ExtractVariables<Modifiers>
): ExecutedThemeComponents<Modifiers> => {
    const result = {} as ExecutedThemeComponents<Modifiers>;

    for (const [componentName, component] of Object.entries(components)) {
        result[componentName] = {
            tokens: Array.from({ length: component.tokens.length }),
            variants: {},
        };

        replaceTokens(result, components, componentName, variables);
        replaceModifiers(result, components, componentName, variables);
    }

    return result;
};
