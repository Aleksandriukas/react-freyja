import { ExtractVariables } from "./ExtractVariables";
import { Token } from "./ThemeSource";

export type Modifiers = Record<string, Record<string, unknown>>;

export type ExecutedThemeComponent<TModifiers> = {
    tokens: Token[];
    variants: Record<
        string,
        Record<string, Token | Partial<ExtractVariables<TModifiers>>>
    >;
};

export type ExecutedThemeComponents<TModifiers> = Record<
    string,
    ExecutedThemeComponent<TModifiers>
>;

export type ExecutedTheme<
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> = TComponents;

export type UnknownExecutedTheme = ExecutedTheme<
    Modifiers,
    ExecutedThemeComponents<Modifiers>
>;
