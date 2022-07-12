import React, { PropsWithChildren } from 'react';
import { defaultTheme } from './theme';
import { ThemeContext } from './ThemeContext';

export const ThemeContextProvider = ({ children }: PropsWithChildren<{}>) => {
    return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};
