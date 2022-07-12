import React, { useContext, createContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useComponentStyle } from '../../useComponentStyle';
import { useThemeContext } from '../../useThemeContext';
import { ButtonProps } from './Button';

export const Button: React.FC<ButtonProps> = ({ leftIcon, rightIcon, ...customProps }) => {
    const [onPress, setOnPress] = useState(false);

    const styles = useComponentStyle('Button', customProps);

    return (
        <Pressable>
            <View style={styles}>
                <Text>hello</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressed: {},
});
