import { createTheme, Palette } from '@react-freyja/theme';

export const materialTheme = createTheme({
    definitions: {
        palette: {
            primary10: '#004ba0',
            primary40: '#1976d2',
            primary90: '#63a4ff',
            primary100: '#ffffff',

            secondary10: '#c8b900',
            secondary40: '#ffeb3b',
            secondary90: '#ffff72',
            secondary100: '#ffffff',

            error10: '#7f0000',
            error40: '#b71c1c',
            error90: '#f05545',
            error100: '#ffffff',
        } as Palette,
    },
    tokens: (definitions) => ({
        ButtonText: {
            color: (variables) => variables.$color,
        },
        primary: {
            $color: definitions.palette.primary40,
        },
    }),
    components: (tokens) => ({}),
});
