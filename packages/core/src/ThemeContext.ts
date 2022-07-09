import { createContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ThemeOptions = {
    components: {
        Button: {
            style: StyleProp<ViewStyle>;
        };
    };
};

export const defaultTheme: ThemeOptions = {
    components: {
        Button: {
            style: {
                backgroundColor: '#dad',
            },
        },
    },
};

export const ThemeContext = createContext<ThemeOptions | undefined>(undefined);
