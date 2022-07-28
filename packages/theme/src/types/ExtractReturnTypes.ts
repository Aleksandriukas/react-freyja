// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...arguments_: any[]) => any;

export type ExtractTokenReturnTypes<TTokens> = {
    [TKey in keyof TTokens]: TTokens[TKey] extends AnyFunction
        ? ReturnType<TTokens[TKey]>
        : TTokens[TKey];
};

export type ExtractComponentReturnTypes<TComponents> = {
    [TComponentName in keyof TComponents]: {
        [TKey in keyof TComponents[TComponentName]]: TComponents[TComponentName][TKey] extends AnyFunction
            ? ReturnType<TComponents[TComponentName][TKey]>
            : TComponents[TComponentName][TKey];
    };
};
