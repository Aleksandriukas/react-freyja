import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import { Theme } from "./types/Theme";

const ThemeContext = createSafeContext<Theme<unknown>>();

export type ThemeContextProviderProps<TComponents> = PropsWithChildren<{
    theme: Theme<TComponents>;
}>;

export const ThemeContextProvider = <TComponents,>({
    theme,
    children,
}: ThemeContextProviderProps<TComponents>) => {
    return (
        <ThemeContext.Provider value={theme as Theme<unknown>}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = <TComponents,>(): Theme<TComponents> => {
    return useSafeContext(ThemeContext) as Theme<TComponents>;
};
