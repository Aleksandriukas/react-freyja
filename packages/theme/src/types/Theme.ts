export type StyleProperties = {
    backgroundColor: string;
    color: string;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
    fontSize: number;
};

export type Theme<TComponents> = {
    components: TComponents;
};
