import { ButtonBase } from "@react-freyja/base";
import React, { CSSProperties, useMemo } from "react";
import { useThemeContext } from "../../ThemeContext";
import { ButtonProps } from "./ButtonProps";

export const Button = ({ color, children }: ButtonProps) => {
    const getComponentStyles = useThemeContext<CSSProperties>();

    const style = useMemo(
        () => getComponentStyles("Button", { color }),
        [color, getComponentStyles]
    );

    return (
        <ButtonBase Root="button" props={{ style }}>
            {children}
        </ButtonBase>
    );
};
