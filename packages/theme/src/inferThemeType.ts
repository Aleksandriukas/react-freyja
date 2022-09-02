import {
    Components,
    ModifiersGenerator,
    ThemeSource,
    Tokens,
} from "./types/Theme";

export const inferThemeType = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
>(
    themeSource: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
): ThemeSource<TDefinitions, TModifiersGenerator, TTokens, TComponents> =>
    themeSource;
