import { createTheme } from "@react-freyja/theme";

export const materialTheme = createTheme({
    definitions: {
        palette: {
            primary: "blue",
            secondary: "green",
            error: "red",
        },
    },
    tokens: (definitions) => ({
        primaryColor: {
            $color: definitions.palette.primary,
        },
        buttonText: {
            color: (variables) => variables.$color as string,
        },
        buttonOutlined: {
            color: (variables) => variables.$color as string,
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 2,
        },
    }),
    components: (tokens) => ({
        Button: {
            tokens: [tokens.buttonText],
            modifiers: {
                variant: {
                    text: tokens.buttonText,
                    outlined: tokens.buttonOutlined,
                },
                color: {
                    primary: tokens.primaryColor,
                },
                // State: {
                //     Hovered: tokens.hovered,
                //     Pressed: tokens.pressed,
                //     Focused: tokens.focused,
                // }
            },
        },
    }),
});
