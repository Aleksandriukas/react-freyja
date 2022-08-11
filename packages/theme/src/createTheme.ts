import { convertVariableNames } from "./convertVariableNames";
import { ConvertAllVariableNames } from "./types/ExtractVariables";
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
    TComponents extends Components<ReturnType<TModifiersGenerator>>
>(
    themeSource: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
): Theme<TDefinitions, TModifiersGenerator, TComponents> => {
    const { definitions, components, tokens } = themeSource;

    const modifiers = tokens.modifiers(definitions);
    const constant = tokens.constant(definitions);
    const modifierTokens = convertVariableNames(
        modifiers
    ) as ConvertAllVariableNames<ReturnType<TModifiersGenerator>>;

    const computedComponents = components(constant, modifierTokens);

    return {
        components: computedComponents,
        modifierTokens,
    };
};
