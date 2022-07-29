import { StyleProperties } from "./Theme";

type ExtractPropertyName<K extends string | number | symbol> =
    K extends `$${infer T}` ? T : K;

type ExtractAllVariableNames<TModifiers> = {
    [TTokenKey in keyof TModifiers]: {
        [TPropertyKey in keyof TModifiers[TTokenKey]]: TPropertyKey extends keyof StyleProperties
            ? never
            : ExtractPropertyName<TPropertyKey>;
    }[keyof TModifiers[TTokenKey]];
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
