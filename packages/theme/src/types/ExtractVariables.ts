import { StyleProperties } from "./StyleProperties";

type ExtractPropertyName<K extends string | number | symbol> =
    K extends `$${infer T}` ? T : K;

export type ExtractVariableNamesFromToken<TToken> = {
    [TPropertyKey in keyof TToken]: TPropertyKey extends keyof StyleProperties
        ? never
        : ExtractPropertyName<TPropertyKey>;
}[keyof TToken];

type ExtractAllVariableNames<TModifiers> = {
    [TTokenKey in keyof TModifiers]: ExtractVariableNamesFromToken<
        TModifiers[TTokenKey]
    >;
}[keyof TModifiers];

type ExtractAllVariableTypes<TModifiers, TKey> = TKey extends string
    ? {
          [TTokenKey in keyof TModifiers]: {
              [TPropertyKey in keyof TModifiers[TTokenKey]]: TPropertyKey extends `$${TKey}`
                  ? TModifiers[TTokenKey][TPropertyKey]
                  : never;
          }[keyof TModifiers[TTokenKey]];
      }[keyof TModifiers]
    : never;

export type ExtractVariables<TModifiers> = {
    [TKey in ExtractAllVariableNames<TModifiers>]: ExtractAllVariableTypes<
        TModifiers,
        TKey
    >;
};

export type ExtractSymbolizedVariables<TModifiers> = {
    [TKey in ExtractAllVariableNames<TModifiers>]: symbol;
};