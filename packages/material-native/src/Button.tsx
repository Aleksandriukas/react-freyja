import { ButtonBase } from "@react-freyja/base";
import { useThemeContext } from "@react-freyja/theme-context";
import React, { PropsWithChildren, useMemo } from "react";
import {
    Button as NativeButton,
    ButtonProps as NativeButtonProps,
} from "react-native";

export type ButtonProps = PropsWithChildren<{
    color: "primary" | "secondary";
}>;

export const Button = ({
    children,
    color,
    ...other
}: ButtonProps & NativeButtonProps) => {
    const getComponentStyles = useThemeContext();

    const style = useMemo(
        () =>
            getComponentStyles("Button", { color } as unknown as Record<
                string,
                string
            >),
        [getComponentStyles, color]
    );

    console.log(style);

    return (
        <ButtonBase Root={NativeButton} props={{ style, ...other }}>
            {children}
        </ButtonBase>
    );
};
