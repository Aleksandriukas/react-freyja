import React, { PropsWithChildren } from "react";
import { View, Text } from "react-native";

export type ButtonProps = PropsWithChildren<{}> 

export const Button = ({children}: ButtonProps) => {
    return (
        <View>
            {children}
        </View>
    );
};

