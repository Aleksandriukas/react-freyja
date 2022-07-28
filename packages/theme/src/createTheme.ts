import {
    AnyFunction,
    ExtractComponentReturnTypes,
    ExtractTokenReturnTypes,
} from "./types/ExtractReturnTypes";
import {
    ConvertAllVariableNames,
    ExtractVariables,
} from "./types/ExtractVariables";
import { Theme } from "./types/Theme";
import {
    FreyjaComponent,
    Modifiers,
    ThemeSource,
    Token,
} from "./types/ThemeSource";

const parseModifierTokens = <TModifiers extends Modifiers>(
    modifiers: TModifiers
) => {
    const result: Record<string, Record<string, unknown>> = {};

    for (const [name, token] of Object.entries(modifiers)) {
        // eslint-disable-next-line unicorn/no-array-reduce
        result[name] = Object.entries(token).reduce(
            (accumulator, [sourceKey, value]) => {
                const key = sourceKey.startsWith("$")
                    ? sourceKey.slice(1)
                    : sourceKey;
                accumulator[key] = value;
                return accumulator;
            },
            {} as Record<string, unknown>
        );
    }

    return result;
};

const getVariablesFromModifiers = <TModifiers>(modifierTokens: TModifiers) => {
    const result: Record<string, unknown> = {};

    for (const token of Object.values(modifierTokens)) {
        for (const [key, value] of Object.entries(token)) {
            result[key] = value;
        }
    }

    return result;
};

const executeStaticTokens = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<
        string,
        Token<ExtractVariables<ReturnType<TModifiersGenerator>>>
    >
>(
    tokens: TTokens,
    variables: ExtractVariables<ReturnType<TModifiersGenerator>>
): ExtractTokenReturnTypes<TTokens> => {
    const result: ExtractTokenReturnTypes<TTokens> =
        {} as ExtractTokenReturnTypes<TTokens>;

    for (const [key, token] of Object.entries(tokens)) {
        // TODO fix type
        result[key as keyof TTokens] = token(
            variables
        ) as TTokens[keyof TTokens] extends AnyFunction
            ? ReturnType<TTokens[keyof TTokens]>
            : TTokens[keyof TTokens];
    }

    return result;
};

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<
        string,
        Token<ExtractVariables<ReturnType<TModifiersGenerator>>>
    >,
    TComponents extends Record<
        string,
        FreyjaComponent<ReturnType<TModifiersGenerator>>
    >
>({
    tokens: { modifierTokens: modifierTokensSource, staticTokens },
    definitions,
    components: sourceComponents,
}: ThemeSource<TDefinitions, TModifiersGenerator, TTokens, TComponents>): Theme<
    ExtractComponentReturnTypes<TComponents>
> => {
    const themeComponents: ExtractComponentReturnTypes<TComponents> =
        {} as ExtractComponentReturnTypes<TComponents>;

    const modifierTokens = modifierTokensSource(definitions);
    const tokens = staticTokens(definitions);
    const variables = getVariablesFromModifiers(modifierTokens);
    const components = sourceComponents(
        executeStaticTokens<TDefinitions, TModifiersGenerator, TTokens>(
            tokens,
            variables as ExtractVariables<ReturnType<TModifiersGenerator>>
        )
    );

    for (const [componentName, { tokens, propsModifiers }] of Object.entries(
        components
    )) {
        (themeComponents as Record<string, unknown>)[componentName] = {
            tokens: tokens,
            propsModifiers: propsModifiers(
                parseModifierTokens(modifierTokens) as ConvertAllVariableNames<
                    ReturnType<TModifiersGenerator>
                >
            ),
        };
    }

    return {
        components: themeComponents,
    };
};
