import type {
    UknownThemeContextType,
    ExtractVariables,
    SourceModifiers,
    FreyjaComponentModifier,
    ExecutedTheme,
    Modifiers,
    ExecutedThemeComponents,
} from "@react-freyja/types";

const extractVariables = <TModifiers extends SourceModifiers>(
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

const getMockVariables = <TModifiers extends SourceModifiers>(
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
    TModifiers extends SourceModifiers,
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
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
>({
    components,
    modifiers,
}: ExecutedTheme<TModifiers, TComponents>): UknownThemeContextType => {
    const variables = extractVariables(modifiers);
    const result: UknownThemeContextType = {};
    const mockVariables = getMockVariables(variables);

    // For (const [name, component] of Object.entries(components)) {
    //     Result[name] = {
    //         Tokens: component.tokens.map((token) => {
    //             If (typeof token !== "function") {
    //                 Return token;
    //             }

    //             Const computedToken = token(
    //                 MockVariables as ExtractVariables<
    //                     ReturnType<TModifiersGenerator>
    //                 >
    //             );

    //             Return computedToken;
    //         }),
    //         ModifiersMap: parseModifiersMap<
    //             ReturnType<TModifiersGenerator>,
    //             Record<
    //                 String,
    //                 Record<
    //                     String,
    //                     FreyjaComponentModifier<ReturnType<TModifiersGenerator>>
    //                 >
    //             >
    //         >(component.modifiersMap, mockVariables),
    //     };
    // }

    return result;
};
