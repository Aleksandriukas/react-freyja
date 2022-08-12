import { convertVariableNames } from "./convertVariableNames";
import type {
    ModifiersGenerator,
    Tokens,
    Components,
    ThemeSource,
    Theme,
    ConvertAllVariableNames,
} from "@react-freyja/types";

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
