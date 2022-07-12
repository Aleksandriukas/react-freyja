import { Palette } from './Palette';
import { StyleProperties } from './Theme';

export type ThemeDefinitions = {
    palette: Palette;
};

export type ThemeToken = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof StyleProperties]: StyleProperties[K] | ((variables: Record<string, any>) => StyleProperties[K]);
};

export type ThemeTokens = Record<string, ThemeToken>;

export type ThemeComponent = {
    tokens: ThemeToken[];
};

export type ThemeComponents = Record<string, ThemeComponent>;

export type ThemeSource = {
    definitions: ThemeDefinitions;
    tokens: (definitions: ThemeDefinitions) => ThemeTokens;
    components: (tokens: ThemeTokens) => ThemeComponents;
};
