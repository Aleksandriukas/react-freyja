import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import { Theme } from "./types/Theme";

const ThemeContext = createSafeContext<Theme>();

export type ThemeContextProviderProps = PropsWithChildren<{
    theme: Theme;
}>;

export const ThemeContextProvider = ({
    theme,
    children,
}: ThemeContextProviderProps) => {
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useThemeContext = (): Theme => {
    return useSafeContext(ThemeContext) as Theme;
};
