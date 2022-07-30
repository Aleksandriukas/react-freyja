import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import { Theme, ThemeComponents } from "./types/Theme";

const ThemeContext =
    createSafeContext<Theme<unknown, ThemeComponents<unknown>>>();

export type ThemeContextProviderProps<
    TComputedToken,
    TComponents extends ThemeComponents<TComputedToken>
> = PropsWithChildren<{
    theme: Theme<TComputedToken, TComponents>;
}>;

export const ThemeContextProvider = <
    TComputedToken,
    TComponents extends ThemeComponents<TComputedToken>
>({
    theme,
    children,
}: ThemeContextProviderProps<TComputedToken, TComponents>) => {
    return (
        <ThemeContext.Provider
            value={theme as Theme<unknown, ThemeComponents<unknown>>}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = <
    TComputedToken,
    TComponents extends ThemeComponents<TComputedToken>
>(): Theme<TComputedToken, TComponents> => {
    return useSafeContext(ThemeContext) as Theme<TComputedToken, TComponents>;
};
