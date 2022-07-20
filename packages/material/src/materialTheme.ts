import { createTheme } from "@react-freyja/theme";

export const exampleTheme = createTheme({
    definitions: {
        palette: {
            primary: "blue",
            secondary: "green",
            error: "red",
        },
    },
    variables: (definitions) => ({
        primaryColor: {
            $color: definitions.palette.primary,
        },
        secondaryColor: {
            $color: definitions.palette.secondary,
        },
    }),
    tokens: () => ({
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
            propsToTokensMap: {
                variant: {
                    text: tokens.buttonText,
                    outlined: tokens.buttonOutlined,
                },
            },
        },
    }),
});
