/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from "@react-freyja/theme";

export const materialTheme = createTheme({
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
        staticTokens: (definitions) => ({
            buttonText: (variables) => ({
                color: variables.color,
                borderWidth: definitions.numbers.lg,
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
            propsModifiers: {
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
});
