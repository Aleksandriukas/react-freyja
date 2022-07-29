import { AnyFunction } from "./utils";

export type StyleProperties = {
    backgroundColor: string;
    color: string;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
    fontSize: number;
};

export type Platform = "mobile" | "web";

export type ThemeComponent<TPlatform extends Platform> = {
    tokens: TPlatform extends "mobile" ? Partial<StyleProperties>[] : string[];
    propsModifiers: Record<
        string,
        Record<
            string,
            TPlatform extends "mobile" ? Partial<StyleProperties> : string
        >
    >;
};

export type ConvertValue<TComponentValue> = TComponentValue extends AnyFunction
    ? ReturnType<AnyFunction>
    : number;

export type ConvertComponentsType<TComponents> = {
    [TName in keyof TComponents]: {
        [TProperty in keyof TComponents[TName]]: ConvertValue<
            TComponents[TName][TProperty]
        >;
    };
};

// TODO create this type
export type Theme<T> = {
    components: T;
};
