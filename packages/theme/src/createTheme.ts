import { Theme } from "./types/Theme";
import { Modifiers, ThemeSource, Token } from "./types/ThemeSource";

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiers extends Modifiers,
    TTokens extends Record<string, Token<TModifiers>>,
    TComponents extends Record<string, any>
>(
    source: ThemeSource<TDefinitions, TModifiers, TTokens, TComponents>
): Theme => {
    return {} as Theme;
};
