import { Theme } from "./types/Theme";
import { Modifiers, ThemeComponent, ThemeSource, Token } from "./types/ThemeSource";

export const createTheme = <
TComponents extends Record<string, ThemeComponent<Modifiers>>,
TVariables extends Record<string, string>,
TTokens extends Record<string, Token<TVariables>>,
TDefinitions extends object
>(
    source: ThemeSource<TComponents, TVariables, TTokens, TDefinitions>
): Theme<TComponents> => {
    const tokens = source.tokens(source.definitions);
    const components = source.components(tokens);
    // const variables = getVariables(source.tokens);

    return {
        // components: getThemeComponents(components, variables),
    } as Theme<TComponents>;
};
