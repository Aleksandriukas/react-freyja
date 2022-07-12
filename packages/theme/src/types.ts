export type Theme = Record<string, unknown>;

export type ThemeDefinitions = {};

export type ThemeToken = {
    backgroundColor: string | ((variables) => string);
};

export type ThemeTokens = Record<string, ThemeToken>;

export type ThemeComponent = {};

export type ThemeComponents = Record<string, ThemeComponent>;

export type ThemeSource = {
    definitions: ThemeDefinitions;
    tokens: (definitions: ThemeDefinitions) => ThemeTokens;
    components: (tokens: ThemeTokens) => ThemeComponents;
};
