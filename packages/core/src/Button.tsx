import React from "react";
import { Button as NativeButton, ButtonProps as NativeButtonProps } from "react-native";

export type ButtonProps = NativeButtonProps;

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <NativeButton {...props} />
    );
};

