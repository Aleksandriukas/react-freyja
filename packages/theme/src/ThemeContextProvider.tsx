import { getNativeTheme } from "@react-freyja/style-engine";
import React, { PropsWithChildren, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import type {
    ExecutedTheme,
    UknownThemeContextType,
    ExecutedThemeComponents,
    Modifiers,
} from "@react-freyja/types";

export type ThemeContextProviderProps<
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> = PropsWithChildren<{
    theme: ExecutedTheme<TModifiers, TComponents>;
}>;

export const ThemeContextProvider = <
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
>({
    theme,
    children,
}: ThemeContextProviderProps<TModifiers, TComponents>) => {
    const compiledTheme = useRef(
        getNativeTheme<TModifiers, TComponents>(theme)
    );

    return (
        <ThemeContext.Provider
            value={compiledTheme.current as unknown as UknownThemeContextType}
        >
            {children}
        </ThemeContext.Provider>
    );
};
