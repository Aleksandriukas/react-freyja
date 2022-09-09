import React, { useMemo } from "react";
import { useThemeContext } from "../../ThemeContext";
import { ButtonProps } from "./ButtonProps";

export const Button = ({
    color = "primary",
    children,
    onClick,
}: ButtonProps) => {
    const getComponentClassName = useThemeContext<string>();

    const className = useMemo(
        () => getComponentClassName("Button", { color }),
        [color, getComponentClassName]
    );

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};
