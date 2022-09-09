import { ButtonBase } from "@react-freyja/base";
import { RNStyles } from "@react-freyja/style-engine";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useThemeContext } from "../../ThemeContext";
import { ButtonProps } from "./ButtonProps";

export const Button = ({
    children,
    color = "primary",
    onClick,
}: ButtonProps) => {
    const getComponentStyles = useThemeContext<RNStyles>();

    const style = useMemo(
        () => getComponentStyles("Button", { color }),
        [getComponentStyles, color]
    );

    return (
        <ButtonBase Root={TouchableOpacity} props={{ style, onPress: onClick }}>
            {children}
        </ButtonBase>
    );
};
