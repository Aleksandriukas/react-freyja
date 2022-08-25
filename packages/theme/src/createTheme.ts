import {
    ModifiersGenerator,
    Tokens,
    Components,
    ThemeSource,
    SourceModifiers,
    ConvertTokens,
    ConvertModifiers,
} from "./types/Theme";
import { combineTokens } from "./utils/combineTokens";
import { convertVariableNames } from "./utils/convertVariableNames";
import { executeTokenGenerators } from "./utils/executeTokenGenerators";
import { getAllVariables } from "./utils/getAllVariables";
import { markTokens, markModifierTokens } from "./utils/markTokens";

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
