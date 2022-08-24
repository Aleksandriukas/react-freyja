/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from "@react-freyja/theme";

export const materialTheme = createTheme({
    definitions: {
        palette: {
            primary: "blue",
            secondary: "red",
        },
        hello: {
            width: 120,
            height: 40,
            borderWidth: 1,
            borderStyle: "solid" as const,
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
        }),
        constant: (definitions) => ({
            buttonDefault: (variables) => ({
                width: definitions.hello.width,
                height: definitions.hello.height,
                borderWidth: definitions.hello.borderWidth,
                borderColor: variables.color,
                borderStyle: definitions.hello.borderStyle,
                alignItems: "center",
                justifyContent: "center",
            }),
        }),
    },
    components: (tokens) => ({
        Button: {
            tokens: [tokens.buttonDefault],
            variants: {
                color: {
                    primary: tokens.primaryColor,
                    secondary: tokens.secondaryColor,
                },
            },
        },
    }),
});
