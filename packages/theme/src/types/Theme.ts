export type StyleProperties = {
    backgroundColor?: string;
    color?: string;
};

export type Theme = {
    components: Record<string, StyleProperties>;
};
