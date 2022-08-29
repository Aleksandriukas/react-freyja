import { ButtonBase } from "@react-freyja/base";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useThemeContext } from "../../ThemeContext";
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
