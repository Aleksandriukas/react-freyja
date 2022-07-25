import { createTheme } from "@react-freyja/theme";

export const materialTheme = createTheme({
    // const
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
        // Modifiers must only contain properties that could change (variables)
        modifiers: (definitions) => ({
            primaryColor: {
                $color: definitions.palette.primary,
            },
            secondaryColor: {
                $color: definitions.numbers.lg,
            },
            fakeScenario: {
                $fontSize: definitions.numbers.lg,
            },
        }),
        // Static tokens refet to defintions and can take properties from modifiers
        static: (definitions) => ({
            buttonText: {
                color: (variables) => variables.$color,
            },
        }),
    },
    components: (tokens) => ({
        Button: {
            tokens: [tokens.outlinedButton],
            props: (modifiers) => ({
                variant: {
                    text: tokens.textHello,
                    outlined: tokens.outlinedHello,
                },
                color: {
                    primary: modifiers.primaryColor,
                    secondary: modifiers.secondaryColor,
                },
            }),
        },
    }),
});

const useComponentStyles = (component: 'Button', props) => {
    const { getPlatformSpecificStyles, theme, getAllTokensFromComponent } = useContext()

    const tokens = getAllTokensFromComponent(theme.components[component], props);

    /**
     * Some tokens refer only to modifiers ($propName) and some refer to static tokens
     * 
     */

    const defaultStyles = getPlatformSpecificStyles(tokens);

    return {
        ...defaultStyles,
        ...props.styles
    }
}

const Button = () => {
    const styles = useComponentStyles('Button');

    return (
        // ...
    )
}
