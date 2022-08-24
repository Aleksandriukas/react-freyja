import React, {useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {getComponentStyles} from '../App';

export type ButtonProps = {
    color: 'primary' | 'secondary';
    onPress?: () => void;
};

export const Button = ({onPress, ...variant}: ButtonProps) => {
    const style = useMemo(
        () =>
            getComponentStyles(
                'Button',
                variant as unknown as Record<string, string>,
            ),
        [variant],
    );

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text>Click me</Text>
        </TouchableOpacity>
    );
};
