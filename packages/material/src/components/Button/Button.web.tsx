import React, { CSSProperties, useMemo } from "react";
import { useThemeContext } from "../../ThemeContext";
import { ButtonProps } from "./ButtonProps";

export const Button = ({
    color = "primary",
    children,
    onClick,
}: ButtonProps) => {
    const getComponentStyles = useThemeContext<CSSProperties>();

    const style = useMemo(
        () => getComponentStyles("Button", { color }),
        [color, getComponentStyles]
    );

    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
};
