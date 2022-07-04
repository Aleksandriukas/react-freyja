import React from "react";
import { TouchableHighlight } from "react-native";

export type ButtonProps = React.PropsWithChildren<{
    onPress: () => void;
}>;

export const Button = ({ children, onPress }: ButtonProps) => {
    return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
};

