import { ExtractPropertiesModifiers } from "./types/ExtractPropertiesModifiers";
import { Theme } from "./types/Theme";
import {
    ConvertTokensType,
    FreyjaComponent,
    Modifiers,
    ThemeSource,
    Token,
} from "./types/ThemeSource";

const getThemeComponents = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<string, Token<ReturnType<TModifiersGenerator>>>,
    TComponents extends Record<
        string,
        FreyjaComponent<ReturnType<TModifiersGenerator>>
    >
>(
    themeSource: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
): ExtractPropertiesModifiers<TComponents> => {
    const result: ExtractPropertiesModifiers<TComponents> =
        {} as ExtractPropertiesModifiers<TComponents>;

    const {
        tokens: { modifierTokens: modifierTokensSource, staticTokens },
        definitions,
        components: sourceComponents,
    } = themeSource;

    const modifierTokens = modifierTokensSource(definitions);
    const tokens = staticTokens(definitions);
    const components = sourceComponents(
        tokens as unknown as ConvertTokensType<TTokens>
    );

    for (const [componentName, { tokens, propsModifiers }] of Object.entries(
        components
    )) {
        (result as Record<string, unknown>)[componentName] = {
            tokens: tokens,
            propsModifiers: propsModifiers(
                modifierTokens as unknown as Record<
                    keyof ReturnType<TModifiersGenerator>,
                    symbol
                >
            ),
        };
    }

    return result;
};

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<string, Token<ReturnType<TModifiersGenerator>>>,
    TComponents extends Record<
        string,
        FreyjaComponent<ReturnType<TModifiersGenerator>>
    >
>(
    themeSource: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
): Theme<ExtractPropertiesModifiers<TComponents>> => {
    const result: Theme<ExtractPropertiesModifiers<TComponents>> = {
        components: getThemeComponents(themeSource),
    };

    return result;
};
