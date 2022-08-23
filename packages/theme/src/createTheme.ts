import { computeComponents } from "./computeComponents";
import { convertVariableNames } from "./convertVariableNames";
import { getAllVariables } from "./getAllVariables";
import { getSourceModifiers } from "./getSourceModifiers";
import { markTokens } from "./markTokens";
import type {
    ModifiersGenerator,
    Tokens,
    Components,
    ThemeSource,
    ExecutedTheme,
    ExecutedThemeComponents,
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
    const {
        definitions,
        components: componentsGenerator,
        tokens: { constant: tokensGenerator, modifiers: modifiersGenerator },
    } = themeSource;

    const tokens = markTokens(tokensGenerator(definitions));
    const components = componentsGenerator(tokens as TTokens);

    const sourceModifiers = getSourceModifiers(tokens);
    const variables = getAllVariables(convertVariableNames(sourceModifiers));

    const computedComponents = computeComponents(
        components as Components<Modifiers>,
        variables
    );

    return computedComponents;
};
