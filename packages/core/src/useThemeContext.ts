import { ThemeContext } from './ThemeContext';
import { useSafeContext } from '@sirse-dev/safe-context';
export const useThemeContext = () => {
    return useSafeContext(ThemeContext);
};
