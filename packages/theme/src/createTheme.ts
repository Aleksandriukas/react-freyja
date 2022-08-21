import { computeComponents } from "./computeComponents";
import { convertVariableNames } from "./convertVariableNames";
import { getAllVariables } from "./getAllVariables";
import type {
    ModifiersGenerator,
    Tokens,
    Components,
    ThemeSource,
    ExecutedTheme,
    ExecutedThemeComponents,
    ConvertAllVariableNames,
    Modifiers,
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
): ExecutedTheme<
    ReturnType<TModifiersGenerator>,
    ExecutedThemeComponents<ReturnType<TModifiersGenerator>>
> => {
    const { definitions, components, tokens } = themeSource;

    const modifiers = tokens.modifiers(definitions);
    const convertedModifiers = convertVariableNames(modifiers);

    const constant = tokens.constant(definitions);

    const executedComponents = components(
        constant,
        convertedModifiers as ConvertAllVariableNames<
            ReturnType<TModifiersGenerator>
        >
    );

    const variables = getAllVariables(convertedModifiers);

    const computedComponents = computeComponents(
        executedComponents as Components<Modifiers>,
        variables
    );

    return computedComponents;
};
