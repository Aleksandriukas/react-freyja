import { Theme } from "./types/Theme";
import {
    Components,
    ModifiersGenerator,
    ThemeSource,
    Tokens,
} from "./types/ThemeSource";

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
>(
    themeSource: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
): Theme<unknown> => {
    return themeSource as Theme<unknown>;
};
