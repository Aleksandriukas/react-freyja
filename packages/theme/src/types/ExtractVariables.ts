import { StyleProperties } from "./Theme";

type ExtractPropertyName<K extends string | number | symbol> =
    K extends `$${infer T}` ? T : K;

type ExtractAllVariableNames<TTokens> = {
    [TTokenKey in keyof TTokens]: {
        [TPropertyKey in keyof TTokens[TTokenKey]]: TPropertyKey extends keyof StyleProperties
            ? never
            : ExtractPropertyName<TPropertyKey>;
    }[keyof TTokens[TTokenKey]];
}[keyof TTokens];

type ExtractAllVariableTypes<TTokens, TKey> = TKey extends string
    ? {
          [TTokenKey in keyof TTokens]: {
              [TPropertyKey in keyof TTokens[TTokenKey]]: TPropertyKey extends `$${TKey}`
                  ? TTokens[TTokenKey][TPropertyKey]
                  : never;
          }[keyof TTokens[TTokenKey]];
      }[keyof TTokens]
    : never;

export type ExtractVariables<TTokens> = {
    [TKey in ExtractAllVariableNames<TTokens>]: ExtractAllVariableTypes<
        TTokens,
        TKey
    >;
};
