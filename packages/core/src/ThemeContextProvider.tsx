import React, { PropsWithChildren } from 'react';
import { defaultTheme, ThemeContext } from './ThemeContext';

export const ThemeContextProvider = ({ children }: PropsWithChildren<{}>) => {
    return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};
