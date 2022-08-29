import { ButtonBase } from "@react-freyja/base";
import { useThemeContext } from "@react-freyja/theme-context";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ButtonProps } from "./ButtonProps";

export const Button = ({ children, color, ...other }: ButtonProps) => {
    const getComponentStyles = useThemeContext();

    const style = useMemo(
        () => getComponentStyles("Button", { color }),
        [getComponentStyles, color]
    );

    return (
        <ButtonBase Root={View} props={{ style, ...other }}>
            {children}
        </ButtonBase>
    );
};
