import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import { Theme } from "./types/Theme";

const ThemeContext = createSafeContext<Theme<string>>();

export type ThemeContextProviderProps<C extends string> = PropsWithChildren<{
    theme: Theme<C>;
}>;

export const ThemeContextProvider = <C extends string>({
    theme,
    children,
}: ThemeContextProviderProps<C>) => {
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useThemeContext = <C extends string>(): Theme<C> => {
    return useSafeContext(ThemeContext);
};
