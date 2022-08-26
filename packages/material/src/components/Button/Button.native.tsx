import { ButtonBase } from "@react-freyja/base";
import { useThemeContext } from "@react-freyja/theme-context";
import React, { useMemo } from "react";
import {
    Button as NativeButton,
    ButtonProps as NativeButtonProps,
} from "react-native";
import { ButtonProps } from "./ButtonProps";

export const Button = ({
    children,
    color,
    ...other
}: ButtonProps & NativeButtonProps) => {
    const getComponentStyles = useThemeContext();

    const style = useMemo(
        () => getComponentStyles("Button", { color }),
        [getComponentStyles, color]
    );

    return (
        <ButtonBase Root={NativeButton} props={{ style, ...other }}>
            {children}
        </ButtonBase>
    );
};
