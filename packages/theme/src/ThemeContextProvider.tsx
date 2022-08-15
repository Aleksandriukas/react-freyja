import { getNativeTheme } from "@react-freyja/style-engine";
import React, { PropsWithChildren, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import type {
    Components,
    Modifiers,
    ModifiersGenerator,
    Theme,
    UknownThemeContextType,
} from "@react-freyja/types";

export type ThemeContextProviderProps<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
> = PropsWithChildren<{
    theme: Theme<TDefinitions, TModifiersGenerator, TComponents>;
}>;

export const ThemeContextProvider = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
>({
    theme,
    children,
}: ThemeContextProviderProps<
    TDefinitions,
    TModifiersGenerator,
    TComponents
>) => {
    const compiledTheme = useRef(
        getNativeTheme(
            theme as Theme<
                Record<string, unknown>,
                ModifiersGenerator<Record<string, unknown>>,
                Components<Modifiers>
            >
        )
    );

    return (
        <ThemeContext.Provider
            value={compiledTheme.current as unknown as UknownThemeContextType}
        >
            {children}
        </ThemeContext.Provider>
    );
};