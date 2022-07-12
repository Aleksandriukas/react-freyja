import { createTheme } from './createTheme';

const theme = createTheme({
    definitions: {
        // ...
    },
    tokens: (definitions, variables) => ({
        buttonOutlined: {
            backgroundColor: variables.$color,
        },
        primary: {
            $color: definitions.palette.color,
        },
    }),
    components: () => ({}),
});
