import { Theme } from "./types/Theme";
import { ThemeSource } from "./types/ThemeSource";
import { getThemeComponents } from "./utils";

export const createTheme = <
    C extends string,
    T extends string,
    D extends object
>(
    source: ThemeSource<C, T, D>
): Theme<C> => {
    const tokens = source.tokens(source.definitions);
    const components = source.components(tokens);

    return {
        components: getThemeComponents(components),
    };
};
