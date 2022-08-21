import React, {useMemo} from 'react';
import {View} from 'react-native';
import {getComponentStyles} from '../App';

export type ButtonProps = {
    color: 'primary' | 'secondary';
    variant: 'text' | 'outlined';
};

export const Button = (props: ButtonProps) => {
    const style = useMemo(() => getComponentStyles('Button', props), [props]);

    return <View style={style} />;
};
