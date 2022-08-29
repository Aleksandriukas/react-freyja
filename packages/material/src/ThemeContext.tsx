import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import type { StylesGenerator } from "@react-freyja/style-engine";

export const ThemeContext = createSafeContext<StylesGenerator<unknown>>();

export const useThemeContext = <
    TCompiledStyles,
>(): StylesGenerator<TCompiledStyles> =>
    useSafeContext(ThemeContext) as StylesGenerator<TCompiledStyles>;

export type ThemeContextProviderProps<TCompiledStyles> = PropsWithChildren<{
    value: StylesGenerator<TCompiledStyles>;
}>;

export const ThemeContextProvider = <TCompiledStyles,>({
    children,
    value,
}: ThemeContextProviderProps<TCompiledStyles>) => {
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
