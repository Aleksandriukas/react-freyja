import { useContext } from 'react';
import invariant from 'tiny-invariant';
import { ThemeContext } from './ThemeContext';
export const useThemeContext = () => {
    const theme = useContext(ThemeContext);

    invariant(theme, 'Error message');

    return theme;
};
