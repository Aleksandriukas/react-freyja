import type {
    ModifiersGenerator,
    Tokens,
    FreyjaComponents,
    ThemeSource,
    ExecutedTheme,
    ExecutedThemeComponents,
    ExtractVariables,
    SourceModifiers,
} from "@react-freyja/types";

const getVariables = <TModifiers extends SourceModifiers>(
    modifiers: TModifiers
): ExtractVariables<TModifiers> => {
    const result = {} as ExtractVariables<TModifiers>;

    for (const tokenName of Object.keys(modifiers)) {
        for (const propertyName of Object.keys(modifiers[tokenName])) {
            (result as Record<string, symbol>)[propertyName] =
                Symbol(propertyName);
        }
    }

    return result;
};

const parseExecutedComponents = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends FreyjaComponents<ReturnType<TModifiersGenerator>>
>(
    components: TComponents,
    variables: ExtractVariables<ReturnType<TModifiersGenerator>>
): ExecutedThemeComponents<ReturnType<TModifiersGenerator>> => {
    const result = {} as ExecutedThemeComponents<
        ReturnType<TModifiersGenerator>
    >;

    for (const [componentName, component] of Object.entries(components)) {
        result[componentName] = {
            tokens: Array.from({ length: component.tokens.length }),
            modifiersMap: {},
        };

        for (let index = 0; index < component.tokens.length; ++index) {
            const token = component.tokens[index];
            if (typeof token === "function") {
                result[componentName].tokens[index] = token(variables);
            } else {
                result[componentName].tokens[index] = token;
            }
        }

        for (const propertyName of Object.keys(component.modifiersMap)) {
            result[componentName].modifiersMap[propertyName] = {};

            for (const [propertyValue, token] of Object.entries(
                component.modifiersMap[propertyName]
            )) {
                if (typeof token === "function") {
                    result[componentName].modifiersMap[propertyName][
                        propertyValue
                    ] = token(variables);
                } else if (
                    Object.keys(token).some((value) => value.startsWith("$"))
                ) {
                    result[componentName].modifiersMap[propertyName][
                        propertyValue
                    ] = {
                        _type: "modifier",
                        ...token,
                    };
                } else {
                    result[componentName].modifiersMap[propertyName][
                        propertyValue
                    ] = token;
                }
            }
        }
    }

    return result;
};

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends FreyjaComponents<ReturnType<TModifiersGenerator>>
>(
    themeSource: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
): ExecutedTheme<
    ReturnType<TModifiersGenerator>,
    ExecutedThemeComponents<ReturnType<TModifiersGenerator>>
> => {
    const { definitions, components, tokens } = themeSource;

    const modifierTokens = tokens.modifiers(definitions);
    const constant = tokens.constant(definitions);

    const executedComponents = components(
        constant,
        modifierTokens as ReturnType<TModifiersGenerator>
    );

    const variables = getVariables<ReturnType<TModifiersGenerator>>(
        modifierTokens as ReturnType<TModifiersGenerator>
    );

    const computedComponents = parseExecutedComponents<
        TDefinitions,
        TModifiersGenerator,
        TComponents
    >(executedComponents, variables);

    return {
        components: computedComponents,
        modifiers: modifierTokens as ReturnType<TModifiersGenerator>,
    };
};
