import { ViewStyle, ImageStyle, TextStyle } from "react-native";
import { ModifiersGenerator, Components, Token } from "./ThemeSource";
import { AnyFunction } from "./utils";

export type RNStyles = ViewStyle | ImageStyle | TextStyle;

export type StyleProperties = {
    backgroundColor: string;
    color: string;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
    fontSize: number;
};

export type Platform = "mobile" | "web";

type ConvertModifiersType<TPlatform extends Platform, TPropertiesModifiers> = {
    [T1 in keyof TPropertiesModifiers]: {
        [T2 in keyof TPropertiesModifiers[T1]]: keyof TPropertiesModifiers[T1][T2] extends {
            _type: "token";
        }
            ? TPlatform extends "mobile"
                ? RNStyles
                : string
            : TPropertiesModifiers[T1][T2];
    };
};

export type ComputedComponents<
    TPlatform extends Platform,
    TComponents extends Record<string, unknown>
> = {
    [TName in keyof TComponents]: {
        [TKey in keyof TComponents[TName]]: TComponents[TName][TKey] extends AnyFunction
            ? ConvertModifiersType<
                  TPlatform,
                  ReturnType<TComponents[TName][TKey]>
              >
            : TPlatform extends "mobile"
            ? RNStyles
            : string[];
    };
};

type MyComponents = {
    button: {
        tokens: Token[];
        propsModifiers: () => {
            variant: {
                text: {
                    color: string;
                    borderWidth: number;
                    _type: "token";
                };
                outlined: {
                    color: string;
                    borderColor: string;
                    fontSize: number;
                    borderWidth: number;
                    _type: "token";
                };
            };
            color: {
                primary: {
                    color: string;
                    _type: "modifier";
                };
                secondary: {
                    color: string;
                    _type: "modifier";
                };
            };
        };
    };
};

type A = ComputedComponents<"mobile", MyComponents>;

const a: A = {
    button: {
        propsModifiers: {
            variant: {
                text: {},
            },
        },
    },
};

export type Theme<
    TPlatform extends Platform,
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<TDefinitions, TModifiersGenerator>
> = {
    components: ComputedComponents<TPlatform, TComponents>;
};
