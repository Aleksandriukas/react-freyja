import { Components } from "./ThemeSource";

export type Modifiers = Record<string, Record<string, unknown>>;

export type ExecutedTheme<
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> = TComponents;

export type UnknownExecutedTheme = ExecutedTheme<
    Modifiers,
    Components<Modifiers>
>;
