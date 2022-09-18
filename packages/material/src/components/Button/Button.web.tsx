import React, { useMemo } from "react";
import { useThemeContext } from "../../ThemeContext";
import { ButtonProps } from "./ButtonProps";

export const Button = ({ children, onClick }: ButtonProps) => {
    const getComponentClassName = useThemeContext<string>();

    const className = useMemo(
        () => getComponentClassName("Button", {}),
        [getComponentClassName]
    );

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};
