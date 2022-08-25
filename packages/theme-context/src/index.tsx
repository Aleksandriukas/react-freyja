import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import type { StyleEngineResult } from "@react-freyja/style-engine";

export const ThemeContext = createSafeContext<StyleEngineResult<unknown>>();

export const useThemeContext = <
    TCompiledStyles,
>(): StyleEngineResult<TCompiledStyles> =>
    useSafeContext(ThemeContext) as StyleEngineResult<TCompiledStyles>;

export type ThemeContextProviderProps<TCompiledStyles> = PropsWithChildren<{
    value: StyleEngineResult<TCompiledStyles>;
}>;

export const ThemeContextProvider = <TCompiledStyles,>({
    children,
    value,
}: ThemeContextProviderProps<TCompiledStyles>) => {
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
