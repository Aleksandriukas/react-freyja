export type StyleProperties = {
    backgroundColor?: string;
    color?: string;
    borderStyle?: 'solid' | 'dotted' | 'dashed';
    borderColor?: string;
    borderWidth?: number;
};

export type Theme<C extends string> = {
    components: Record<C, (props: object) => StyleProperties>;
};
