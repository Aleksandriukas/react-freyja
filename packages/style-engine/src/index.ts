import type { Components, ExecutedTheme, Modifiers } from "@react-freyja/types";

export interface StyleEngineResult<TCompiledStyles> {
    (component: string, variant: Record<string, string>): TCompiledStyles;
}

export interface StyleEngine<
    TCompiledStyles,
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> {
    compile: (
        theme: ExecutedTheme<TModifiers, TComponents>
    ) => StyleEngineResult<TCompiledStyles>;
}

export * from "./native/RNStyleEngine";
