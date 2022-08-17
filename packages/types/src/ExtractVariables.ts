import { StyleProperties } from "./StyleProperties";

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
