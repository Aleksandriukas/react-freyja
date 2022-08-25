import {useThemeContext} from '@react-freyja/theme-context';
import React, {useMemo} from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

export type ButtonProps = {
    color: 'primary' | 'secondary';
    onPress?: () => void;
};

export const Button = ({onPress, ...variant}: ButtonProps) => {
    const getComponentStyles = useThemeContext<ViewStyle>();

    const style = useMemo(
        () =>
            getComponentStyles(
                'Button',
                variant as unknown as Record<string, string>,
            ),
        [getComponentStyles, variant],
    );

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text>Click me</Text>
        </TouchableOpacity>
    );
};
