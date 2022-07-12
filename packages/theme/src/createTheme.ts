import { Theme } from './types/Theme';
import { ThemeSource } from './types/ThemeSource';
import { getVariables, getThemeComponents } from './utils';

export const createTheme = (source: ThemeSource): Theme => {
    const tokens = source.tokens(source.definitions);
    const components = source.components(tokens);
    const variables = getVariables(tokens);

    return {
        components: getThemeComponents(components, variables),
    };
};
