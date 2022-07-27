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
        modifierTokens: (definitions) => ({
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
        }),
    },
    components: (tokens) => ({
        Button: {
            tokens: [tokens.buttonText],
            propsModifiers: (modifiers) => ({
                variant: {
                    text: tokens.buttonText,
                    outlined: tokens.buttonOutlined,
                },
                color: {
                    primary: modifiers.primaryColor,
                    secondary: modifiers.secondaryColor,
                },
            }),
        },
    }),
});
