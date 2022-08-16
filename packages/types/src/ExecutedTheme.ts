import { ExtractVariables } from "./ExtractVariables";
import { Token } from "./ThemeSource";

export type Modifiers = Record<string, Record<string, unknown>>;

export type ModifierToken<TModifiers> = {
    _type: "modifier";
} & Partial<ExtractVariables<TModifiers>>;

export type ExecutedThemeComponent<TModifiers> = {
    tokens: (Token | ModifierToken<TModifiers>)[];
    modifiersMap: Record<
        string,
        Record<string, Token | ModifierToken<TModifiers>>
    >;
};

export type ExecutedThemeComponents<TModifiers> = Record<
    string,
    ExecutedThemeComponent<TModifiers>
>;

export type ExecutedTheme<
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> = {
    components: TComponents;
    modifiers: TModifiers;
};

export type UnknownExecutedTheme = ExecutedTheme<
    Modifiers,
    ExecutedThemeComponents<Modifiers>
>;