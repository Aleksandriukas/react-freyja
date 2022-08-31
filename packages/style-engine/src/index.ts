import type { Components, Modifiers } from "@react-freyja/theme";

export type StylesGenerator<TCompiledStyles> = (
    component: string,
    variant: Record<string, string>
) => TCompiledStyles;

export interface StyleEngine<
    TCompiledStyles,
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> {
    compile: (components: TComponents) => StylesGenerator<TCompiledStyles>;
}

export * from "./native/RNStyleEngine";
export * from "./web/WebStyleEngine";
