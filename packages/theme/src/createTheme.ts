import { Theme } from "./types/Theme";
import { ThemeSource, Tokens } from "./types/ThemeSource";

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TVariableGenerator extends (definitions: TDefinitions) => unknown,
    TTokens extends Tokens<ReturnType<TVariableGenerator>>,
    TComponents extends Record<string, any>
>(
    source: ThemeSource<TDefinitions, TVariableGenerator, TTokens, TComponents>
): Theme => {
    return {} as Theme;
};
