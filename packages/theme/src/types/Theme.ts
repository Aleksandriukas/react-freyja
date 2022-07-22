export type StyleProperties = {
    backgroundColor?: string;
    color?: string;
    borderStyle?: "solid" | "dotted" | "dashed";
    borderColor?: string;
    borderWidth?: number;
};

// For each combination of props generate different StyleProperties object
export type ParsedComponents<C extends string> = Record<C, Record<string, StyleProperties>>;

export type Theme<C extends string> = {
    components: ParsedComponents<C>;
};
