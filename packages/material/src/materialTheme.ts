import { createTheme } from "@react-freyja/theme";

export const materialTheme = createTheme({
    definitions: {
        palette: {
            primary: "#6750A4",
            secondary: "#625B71",
        },
    },
    tokens: {
        modifiers: (definitions) => ({}),
        constant: (definitions) => ({
            button: (variables) => ({
                minWidth: 64,
                borderRadius: 4,
                backgroundColor: definitions.palette.primary,
                border: 0,
                margin: 0,
                cursor: "pointer",
            }),
        }),
    },
    components: (tokens) => ({
        Button: {
            tokens: [tokens.button],
            variants: {},
        },
    }),
});
