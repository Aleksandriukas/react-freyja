import React from 'react';
import { View, Text } from 'react-native';
import { useThemeContext } from './useThemeContext';

export type ButtonProps = {
    //
};

export const Button: React.FC<ButtonProps> = () => {
    const theme = useThemeContext();

    return (
        <View style={theme.components.Button.style}>
            <Text>hello</Text>
        </View>
    );
};
