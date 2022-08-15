/* eslint-disable @typescript-eslint/naming-convention */
import {
    Components,
    createTheme,
    ModifiersGenerator,
    ThemeSource,
    Tokens,
} from "@react-freyja/theme";
import merge from "lodash/merge";

type MaterialDefinitions = {
    palette: {
        primary: string;
        secondary: string;
    };
    numbers: {
        lg: number;
        md: number;
        xs: number;
    };
};

export const extendMaterialTheme = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TTokens extends Tokens<ReturnType<TModifiersGenerator>>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
>(
    customTheme?: ThemeSource<
        TDefinitions,
        TModifiersGenerator,
        TTokens,
        TComponents
    >
) => {
    const materialTheme = {
        definitions: {
            palette: {
                primary: "#dad",
                secondary: "#add",
            },
            numbers: {
                lg: 10,
                md: 5,
                xs: 2,
            },
        },
        tokens: {
            modifiers: (definitions) => ({
                primaryColor: {
                    $color: definitions.palette.primary,
                },
                secondaryColor: {
                    $color: definitions.palette.secondary,
                },
                fakeScenario: {
                    $fontSize: definitions.numbers.lg,
                },
            }),
            constant: (definitions) => ({
                buttonText: (variables) => ({
                    color: variables.color,
                    borderWidth: definitions.numbers.xs,
                    borderStyle: "dashed",
                    fontSize: 36,
                }),
                buttonOutlined: (variables) => ({
                    color: variables.color,
                    borderColor: variables.color,
                    fontSize: variables.fontSize,
                    borderWidth: definitions.numbers.md,
                }),
                buttonStatic: {
                    color: definitions.palette.primary,
                    fontSize: definitions.numbers.lg,
                },
            }),
        },
        components: (staticTokens, modifiers) => ({
            Button: {
                tokens: [staticTokens.buttonText],
                modifiersMap: {
                    variant: {
                        text: staticTokens.buttonText,
                        outlined: staticTokens.buttonOutlined,
                    },
                    color: {
                        primary: modifiers.primaryColor,
                        secondary: modifiers.secondaryColor,
                    },
                },
            },
        }),
    } as ThemeSource<
        MaterialDefinitions,
        ModifiersGenerator<MaterialDefinitions>,
        Tokens<ReturnType<ModifiersGenerator<MaterialDefinitions>>>,
        Components<ReturnType<ModifiersGenerator<MaterialDefinitions>>>
    >;

    const mergedTheme = merge(materialTheme, customTheme);

    return createTheme(mergedTheme);
};
