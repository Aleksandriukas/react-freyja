import { StyleProperties } from "./StyleProperties";
import { SourceModifiers } from "./ThemeSource";

type ExtractPropertyName<K extends string | number | symbol> =
    K extends `$${infer T}` ? T : K;

type ExtractVariableNamesFromToken<TToken> = {
    [TPropertyKey in keyof TToken]: TPropertyKey extends keyof StyleProperties
        ? never
        : ExtractPropertyName<TPropertyKey>;
}[keyof TToken];

type ExtractAllVariableNames<TModifiers> = {
    [TTokenKey in keyof TModifiers]: ExtractVariableNamesFromToken<
        TModifiers[TTokenKey]
    >;
}[keyof TModifiers];

export type ExtractVariables<TModifiers> = {
    [TKey in ExtractAllVariableNames<TModifiers>]: symbol;
};

export type ConvertAllVariableNames<TModifiers extends SourceModifiers> = {
    [TTokenKey in keyof TModifiers]: {
        [TPropertyKey in ExtractVariableNamesFromToken<
            TModifiers[TTokenKey]
        >]: TPropertyKey extends string
            ? TModifiers[TTokenKey][`$${TPropertyKey}`]
            : never;
    };
};
