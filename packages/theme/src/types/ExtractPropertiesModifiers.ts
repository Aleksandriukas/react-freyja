// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...arguments_: any[]) => any;

export type ExtractPropertiesModifiers<TComponents> = {
    [TComponentKey in keyof TComponents]: {
        [TKey in keyof TComponents[TComponentKey]]: TComponents[TComponentKey][TKey] extends AnyFunction
            ? ReturnType<TComponents[TComponentKey][TKey]>
            : TComponents[TComponentKey][TKey];
    };
};
