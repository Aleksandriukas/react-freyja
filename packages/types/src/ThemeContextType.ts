export type ThemeComponent<TCompiledToken> = {
    tokens: TCompiledToken[];
    modifiersMap: Record<string, Record<string, TCompiledToken>>;
};

export type ThemeComponents<TCompiledToken> = Record<
    string,
    ThemeComponent<TCompiledToken>
>;

// TODO pass variables here
export type ThemeContextType<
    TCompiledToken,
    TComponents extends ThemeComponents<TCompiledToken>
> = TComponents;

export type UknownThemeContextType = ThemeContextType<
    unknown,
    ThemeComponents<unknown>
>;
