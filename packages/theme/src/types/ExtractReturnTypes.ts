// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...arguments_: any[]) => any;

export type ExtractTokenReturnTypes<TTokens> = {
    [TKey in keyof TTokens]: TTokens[TKey] extends AnyFunction
        ? ReturnType<TTokens[TKey]>
        : TTokens[TKey];
};
