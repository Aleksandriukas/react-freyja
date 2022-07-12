import { StyleProp, ViewStyle } from 'react-native';
import { SharedButtonProps } from './components/Button/Button';
import { useThemeContext } from './useThemeContext';

export const useComponentStyle = (component: 'Button', customProps: SharedButtonProps): ViewStyle => {
    const theme = useThemeContext();

    if (!(component in theme.components)) {
        throw Error(`Component ${component} was not defined`);
    }

    return {
        ...theme.components.Button.propModifiers.variant(customProps.variant),
    };
};
