import { createTheme } from "@react-freyja/theme";

export const exampleTheme = createTheme({
    definitions: {
        palette: {
            primary: "blue",
            secondary: "green",
            error: "red",
        },
    },
    tokens: (definitions) => ({
        buttonText: {
            color: (variables) => variables.$color,
        },
        buttonOutlined: {
            color: (variables) => variables.$color,
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 2,
        },
        primaryColor: {
            $color: definitions.palette.primary,
        },
        secondaryColor: {
            $color: definitions.palette.secondary,
        },
    }),
});
