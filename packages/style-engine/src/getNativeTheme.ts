import type {
    UknownThemeContextType,
    ModifiersGenerator,
    Components,
    ExtractVariables,
    Modifiers,
    FreyjaComponentModifier,
    Theme,
} from "@react-freyja/types";

const extractVariables = <TModifiers extends Modifiers>(
    modifierTokens: TModifiers
): ExtractVariables<TModifiers> => {
    const result: ExtractVariables<TModifiers> =
        {} as ExtractVariables<TModifiers>;

    for (const token of Object.values(modifierTokens)) {
        for (const [name, value] of Object.entries(token)) {
            (result as Record<string, unknown>)[name] = value;
        }
    }

    return result;
};

const getMockVariables = <TModifiers extends Modifiers>(
    variables: ExtractVariables<TModifiers>
) => {
    const result: Record<string, symbol> = {};

    for (const key of Object.keys(variables)) {
        result[key] = Symbol(key);
    }

    return result;
};

type ParseModifiersMapType<TModifiersMap> = {
    [TKey in keyof TModifiersMap]: {
        [TValueKey in keyof TModifiersMap[TKey]]: symbol;
    };
};

const parseModifiersMap = <
    TModifiers extends Modifiers,
    TModifiersMap extends Record<
        string,
        Record<string, FreyjaComponentModifier<TModifiers>>
    >
>(
    modifiersMap: TModifiersMap,
    mockVariables: Record<string, symbol>
): ParseModifiersMapType<TModifiersMap> => {
    const result = {} as ParseModifiersMapType<TModifiersMap>;

    for (const [property, values] of Object.entries(modifiersMap)) {
        (result as Record<string, unknown>)[property] = {};

        for (const [value, token] of Object.entries(values)) {
            let parsedToken;

            if (typeof token === "function") {
                parsedToken = token(
                    mockVariables as ExtractVariables<TModifiers>
                );
            } else {
                parsedToken = token;
            }

            (result as Record<string, Record<string, unknown>>)[property][
                value
            ] = parsedToken;
        }
    }

    return result;
};

export const getNativeTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
>({
    components,
    modifierTokens,
}: Theme<
    TDefinitions,
    TModifiersGenerator,
    TComponents
>): UknownThemeContextType => {
    const variables = extractVariables(modifierTokens);
    const result: UknownThemeContextType = {};
    const mockVariables = getMockVariables(variables);

    for (const [name, component] of Object.entries(components)) {
        result[name] = {
            tokens: component.tokens.map((token) => {
                if (typeof token !== "function") {
                    return token;
                }

                const computedToken = token(
                    mockVariables as ExtractVariables<
                        ReturnType<TModifiersGenerator>
                    >
                );

                return computedToken;
            }),
            modifiersMap: parseModifiersMap<
                ReturnType<TModifiersGenerator>,
                Record<
                    string,
                    Record<
                        string,
                        FreyjaComponentModifier<ReturnType<TModifiersGenerator>>
                    >
                >
            >(component.modifiersMap, mockVariables),
        };
    }

    return result;
};
