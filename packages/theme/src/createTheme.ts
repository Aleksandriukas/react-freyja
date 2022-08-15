import type {
    ModifiersGenerator,
    Tokens,
    Components,
    ThemeSource,
    Theme,
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

    const modifierTokens = tokens.modifiers(definitions);
    const constant = tokens.constant(definitions);

    const computedComponents = components(
        constant,
        modifierTokens as ReturnType<TModifiersGenerator>
    );

    return {
        components: computedComponents,
        modifierTokens: modifierTokens as ReturnType<TModifiersGenerator>,
    };
};
