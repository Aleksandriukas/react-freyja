import { getNativeTheme } from "@react-freyja/style-engine";
import React, { PropsWithChildren, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import type {
    ModifiersGenerator,
    ExecutedTheme,
    UknownThemeContextType,
    ExecutedThemeComponents,
} from "@react-freyja/types";

export type ThemeContextProviderProps<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>
> = PropsWithChildren<{
    theme: ExecutedTheme<
        ReturnType<TModifiersGenerator>,
        ExecutedThemeComponents<ReturnType<TModifiersGenerator>>
    >;
}>;

export const ThemeContextProvider = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>
>({
    theme,
    children,
}: ThemeContextProviderProps<TDefinitions, TModifiersGenerator>) => {
    const compiledTheme = useRef(getNativeTheme(theme));

    return (
        <ThemeContext.Provider
            value={compiledTheme.current as unknown as UknownThemeContextType}
        >
            {children}
        </ThemeContext.Provider>
    );
};
