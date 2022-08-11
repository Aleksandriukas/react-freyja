import { getNativeTheme } from "@react-freyja/style-engine";
import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import { useRef } from "react";
import { isBrowser } from "./isBrowser";
import { Theme } from "./types/Theme";
import { Components, ModifiersGenerator } from "./types/ThemeSource";

export type ThemeComponents<TCompiledToken> = Record<
    string,
    {
        tokens: TCompiledToken[];
        modifiersMap: Record<string, Record<string, TCompiledToken>>;
    }
>;

export type ThemeContextType<
    TCompiledToken,
    TComponents extends ThemeComponents<TCompiledToken>
> = TComponents;

export type UknownThemeContextType = ThemeContextType<
    unknown,
    ThemeComponents<unknown>
>;

const ThemeContext = createSafeContext<UknownThemeContextType>();

export type ThemeContextProviderProps<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
> = PropsWithChildren<{
    theme: Theme<TDefinitions, TModifiersGenerator, TComponents>;
}>;

export const ThemeContextProvider = <
    TCompiledToken,
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
    // TODO extract all specific platform logic on user side
    // Const platform = isBrowser() ? "web" : "native";

    const compiledTheme = useRef(getNativeTheme(theme));

    return (
        <ThemeContext.Provider
            value={theme as unknown as ThemeComponents<TCompiledToken>}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
>(): TComponents => {
    return useSafeContext(ThemeContext) as TComponents;
};
