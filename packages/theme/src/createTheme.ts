import { combineTokens } from "./combineTokens";
import { convertVariableNames } from "./convertVariableNames";
import { executeTokenGenerators } from "./executeTokenGenerators";
import { getAllVariables } from "./getAllVariables";
import { markModifierTokens, markTokens } from "./markTokens";
import type {
    ModifiersGenerator,
    Tokens,
    Components,
    ThemeSource,
    ExecutedTheme,
    ExecutedThemeComponents,
    SourceModifiers,
    ConvertTokens,
    ConvertModifiers,
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

    const modifierTokens = convertVariableNames(
        modifiersGenerator(definitions)
    );
    const variables = getAllVariables(modifierTokens);
    const constantTokens = executeTokenGenerators(
        tokensGenerator(definitions) as Tokens<SourceModifiers>,
        variables
    );

    const markedTokens = markTokens(constantTokens);
    const markedModifierTokens = markModifierTokens(modifierTokens);

    const allTokens = combineTokens<TDefinitions, TModifiersGenerator, TTokens>(
        markedTokens as ConvertTokens<TTokens>,
        markedModifierTokens as ConvertModifiers<
            ReturnType<TModifiersGenerator>
        >
    );

    const components = componentsGenerator(allTokens);

    return components;
};
