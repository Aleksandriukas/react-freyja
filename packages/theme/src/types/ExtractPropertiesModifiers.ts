// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...arguments_: any[]) => any;

export type ExtractPropertiesModifiers<TComponents> = {
    [TComponentName in keyof TComponents]: {
        [TKey in keyof TComponents[TComponentName]]: TComponents[TComponentName][TKey] extends AnyFunction
            ? ReturnType<TComponents[TComponentName][TKey]>
            : TComponents[TComponentName][TKey];
    };
};
