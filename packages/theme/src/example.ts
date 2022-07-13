import { createTheme } from './createTheme';

export const exampleTheme = createTheme({
    definitions: {
        palette: {
            primary: 'blue',
            secondary: 'green',
            error: 'red',
        },
    },
    tokens: (definitions) => ({
        buttonText: {
            color: (variables) => variables.$color,
        },
        buttonOutlined: {
            color: (variables) => variables.$color,
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 2,
        },
        primaryColor: {
            $color: definitions.palette.primary,
        },
        secondaryColor: {
            $color: definitions.palette.secondary,
        },
    }),
    components: (sysTokens) => ({
        button: (props) => {
            const tokens = [];

            if (props.variant === 'text') {
                tokens.push(sysTokens.buttonText)
            } else {
                tokens.push(sysTokens.buttonOutlined)
            }

            if (props.color === 'primary') {
                tokens.push(sysTokens.primaryColor)
            } else if (props.color === 'secondary') {
                tokens.push(sysTokens.secondaryColor)
            }

            return {
                tokens,
            };
        },
    }),
});

const useButtonStyles = (props) => {
    const theme = useTheme();
    return theme.components.button(props);
}

const Button = (props) => {
    const styles = useButtonStyles()

    return <style={styles}>contents</>
}
