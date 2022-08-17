import React, { PropsWithChildren, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import type {
    ExecutedTheme,
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
    // TODO handle first compilation step (Token -> CompiledToken)
    const compiledTheme = useRef(theme);

    return (
        <ThemeContext.Provider value={compiledTheme.current}>
            {children}
        </ThemeContext.Provider>
    );
};
