import { createSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren, useRef } from "react";
import type {
    ExecutedTheme,
    ExecutedThemeComponents,
    Modifiers,
    UknownThemeContextType,
} from "@react-freyja/types";

export const ThemeContext = createSafeContext<UknownThemeContextType>();

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
