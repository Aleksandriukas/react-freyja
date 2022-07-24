import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import { Theme } from "./types/Theme";
import { Modifiers, ThemeComponent } from "./types/ThemeSource";

const ThemeContext = createSafeContext<Theme<Record<string, ThemeComponent<Modifiers>>>>();

export type ThemeContextProviderProps<TComponents extends Record<string, ThemeComponent<Modifiers>>> = PropsWithChildren<{
    theme: Theme<TComponents>;
}>;

export const ThemeContextProvider = <TComponents extends Record<string, ThemeComponent<Modifiers>>>({
    theme,
    children,
}: ThemeContextProviderProps<TComponents>) => {
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useThemeContext = <TComponents extends Record<string, ThemeComponent<Modifiers>>>(): Theme<TComponents> => {
    return useSafeContext(ThemeContext) as Theme<TComponents>;
};
