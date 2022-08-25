import type { Components, Modifiers } from "@react-freyja/theme";

export type StyleEngineResult<TCompiledStyles> = (
    component: string,
    variant: Record<string, string>
) => TCompiledStyles;

export interface StyleEngine<
    TCompiledStyles,
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> {
    compile: (theme: TComponents) => StyleEngineResult<TCompiledStyles>;
}

export * from "./native/RNStyleEngine";
