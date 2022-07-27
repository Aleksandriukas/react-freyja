import { ExtractPropertiesModifiers } from "./types/ExtractPropertiesModifiers";
import { Theme } from "./types/Theme";
import {
    FreyjaComponent,
    Modifiers,
    ThemeSource,
    Token,
} from "./types/ThemeSource";

export const createTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends (definitions: TDefinitions) => Modifiers,
    TTokens extends Record<string, Token<ReturnType<TModifiersGenerator>>>,
    TComponents extends Record<
        string,
        FreyjaComponent<ReturnType<TModifiersGenerator>>
    >
>(
    source: ThemeSource<TDefinitions, TModifiersGenerator, TTokens, TComponents>
): Theme<ExtractPropertiesModifiers<TComponents>> => {
    // TODO
    return source as unknown as Theme<ExtractPropertiesModifiers<TComponents>>;
};
