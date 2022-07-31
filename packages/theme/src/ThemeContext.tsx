import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import React, { PropsWithChildren } from "react";
import {
    Components,
    ModifiersGenerator,
    UnknownComponents,
} from "./types/ThemeSource";

const ThemeContext = createSafeContext<UnknownComponents>();

export type ThemeContextProviderProps<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
> = PropsWithChildren<{
    theme: TComponents;
}>;

export const ThemeContextProvider = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
>({
    theme,
    children,
}: ThemeContextProviderProps<
    TDefinitions,
    TModifiersGenerator,
    TComponents
>) => {
    return (
        <ThemeContext.Provider value={theme as UnknownComponents}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = <
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
>(): TComponents => {
    return useSafeContext(ThemeContext) as TComponents;
};
