import { convertVariableNames } from "./convertVariableNames";
import { ConvertAllVariableNames } from "./types/ExtractVariables";
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
): TComponents => {
    const { definitions, components, tokens } = themeSource;

    const modifiers = tokens.modifiers(definitions);
    const constant = tokens.constant(definitions);

    const computedComponents = components(
        constant,
        convertVariableNames(modifiers) as ConvertAllVariableNames<
            ReturnType<TModifiersGenerator>
        >
    );

    return computedComponents;
};
