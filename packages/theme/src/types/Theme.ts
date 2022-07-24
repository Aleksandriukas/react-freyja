import { Modifiers, ThemeComponent } from "./ThemeSource";

export type StyleProperties = {
    backgroundColor: string;
    color: string;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
};

// For each combination of props generate different StyleProperties object
export type ParsedComponents<TComponents extends Record<string, ThemeComponent<Modifiers>>> = Record<
    keyof TComponents,
    Record<string, StyleProperties>
>;

export type Theme<TComponents extends Record<string, ThemeComponent<Modifiers>>> = {
    components: ParsedComponents<TComponents>;
};
